var WCwager = artifacts.require("WCwagers");

contract("WCwagers", async function (accounts) {
    let tryCatch = require("./exceptions.js").tryCatch;
    let errTypes = require("./exceptions.js").errTypes;

    let toAscii = function (str) {
        return web3.toAscii(str).replace(/\u0000/g, '');
    }

    let getEvent = function (logs, eventName) {
        let size = logs.length;
        for (i = 0; i < size; i++) {
            if (logs[i].event == eventName) {
                return logs[i];
            }
        }
    }

    let countEvents = function (logs, eventName) {
        let size = logs.length;
        let count = 0;
        for (i = 0; i < size; i++) {
            if (logs[i].event == eventName) {
                count++;
            }
        }
        return count;
    }

    let isEVMException = function (err) {
        return err.toString().includes('revert');
    }
    let owner = accounts[0];
    let user2 = accounts[1];
    let user3 = accounts[2];
    let user4 = accounts[3];
    let betValue = 20;
    let contestName = "Test Contest";
    describe('WCwagers - Create Contract and add participants', () => {

        it("should create a new contract and check initial values", async function () {
          //  let owner = accounts[0]

            const contract = await WCwager.new(contestName, betValue, { from: owner });

            let details = await contract.getContestInfo.call();

            let _wagerSize = details[0];
            let _name = details[1];
            let _date = details[2];

            assert.equal(betValue * 1666666666666666, _wagerSize, "wager size not correct");
            assert.equal(contestName, _name, "name of contest is not correct");
            assert.equal(1528991100, _date, "Date is not correct");
        });

        it("should create a new contract and verify participants creation", async function () {
            const contract = await WCwager.new(contestName, betValue, { from: owner });
            let address = contract.address;
            await contract.registerParticipant({from: user2, value: betValue * 1666666666666666});
            await contract.registerParticipant({from: user3, value: (betValue + 1) * 1666666666666666});
            await tryCatch(contract.registerParticipant({from: user4, value: (betValue - 1) * 1666666666666666}), errTypes.revert);

            // console.log(res);
            let participants = await contract.getParticipants.call();
            //console.log(participants);

            assert.equal(participants[0], user2, "participant wasn't added");
            assert.equal(participants[1], user3, "participant wasn't added");
            assert.equal(participants.length, 2, "participant wasn't added");

        });
        it("should abort with an error", async function() {
          const contract = await WCwager.new(contestName, betValue, { from: owner });
          await tryCatch(contract.registerParticipant({from: user4, value: (betValue - 1) * 1666666666666666}), errTypes.revert);
        });
    });

    describe('WCwagers - Add and retrieve URLs', () => {
      let groupURL = "https://ipfs.myGroupURL";
      let groupURL2 = "https://ipfs.myGroupURL2";
      let r16URL = "https://ipfs.r16";
      let quartersURL = "https://ipfs.quarters";
      let semisURL = "https://ipfs.semis";
      let finalsURL = "https://ipfs.finals";
      it("should enter a URL for each phase and retrieve them", async function () {

        const contract = await WCwager.new(contestName, betValue, { from: owner });
        await contract.registerParticipant({from: user2, value: betValue * 1666666666666666});
        await contract.writeURL(groupURL,"Group",{from: user2});
        await contract.toggleTimePast({from: owner});
        //getEvent(tx.logs, "DebugInt")
        //getEvent(tx.logs, "DebugStr")
        await tryCatch(contract.writeURL(groupURL2,"Group",{from: user2}),errTypes.revert);
        await contract.writeURL(r16URL,"Round16",{from: user2});
        await contract.writeURL(quartersURL,"Quarters",{from: user2});
        await contract.writeURL(semisURL,"Semis",{from: user2});
        await contract.writeURL(finalsURL,"Finals",{from: user2});

        let theGroupReturnedURL = await contract.getOwnURL.call( "Group", {from: user2});
        let theR16ReturnedURL = await contract.getOwnURL.call( "Round16", {from: user2});
        let theQuartersReturnedURL = await contract.getOwnURL.call( "Quarters", {from: user2});
        let theSemisReturnedURL = await contract.getOwnURL.call( "Semis", {from: user2});
        let theFinalsReturnedURL = await contract.getOwnURL.call( "Finals", {from: user2});

        //console.log("This is prior to the result")
        //console.log(theReturnedURL);
        assert.equal(theGroupReturnedURL, groupURL, "Group URL wasn't added");
        assert.equal(theR16ReturnedURL, r16URL, "Round16 URL wasn't added");
        assert.equal(theQuartersReturnedURL, quartersURL, "Quarters URL wasn't added");
        assert.equal(theSemisReturnedURL, semisURL, "Semis URL wasn't added");
        assert.equal(theFinalsReturnedURL, finalsURL, "Finals URL wasn't added");

      });
      it("should enter 2 URLs for a user and have another user retrieve them if deadline is past", async function () {
        const contract = await WCwager.new(contestName, betValue, { from: owner });
        await contract.registerParticipant({from: user2, value: betValue * 1666666666666666});
        await contract.registerParticipant({from: user3, value: betValue * 1666666666666666});

        await contract.writeURL(groupURL,"Group",{from: user2});
        await contract.toggleTimePast({from: owner});
        //getEvent(tx.logs, "DebugInt")
        //getEvent(tx.logs, "DebugStr")
        await tryCatch(contract.writeURL(groupURL2,"Group",{from: user2}), errTypes.revert);
        await contract.writeURL(r16URL,"Round16",{from: user2});
        await contract.writeURL(quartersURL,"Quarters",{from: user2});
        await contract.writeURL(semisURL,"Semis",{from: user2});
        await contract.writeURL(finalsURL,"Finals",{from: user2});

        let theGroupReturnedURL = await contract.getURL.call(user2, "Group", {from: user3});
        await tryCatch(contract.getURL.call( user2, "Round16", {from: user3}), errTypes.revert);

        });
    });

});
