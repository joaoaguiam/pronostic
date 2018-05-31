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
    const conversionRate = 1600000000000000;
    let owner = accounts[0];
    let ownersnn = "Bob";
    let user2 = accounts[1];
    let user2snn = "Nick";
    let user3 = accounts[2];
    let user3snn = "Chris";
    let user4 = accounts[3];
    let user4snn = "Arthur";
    let USDregistration = 20
    let registrationFee = USDregistration * conversionRate;
    let contestName = "Test Contest";
    describe('WCwagers - Create Contract and add participants', () => {

        it("should create a new contract and check initial values", async function () {
          //  let owner = accounts[0]

            const contract = await WCwager.new(contestName, registrationFee, { from: owner });

            let details = await contract.getContestInfo.call();

            let _registrationFee = details[0];
            let _name = details[1];
            let _date = details[2];

            assert.equal(registrationFee , _registrationFee, "wager size not correct");
            assert.equal(contestName, _name, "name of contest is not correct");
            assert.equal(1528991100, _date, "Date is not correct");
        });

        it("should create a new contract and verify participants creation", async function () {
            const contract = await WCwager.new(contestName, registrationFee, { from: owner });
            let address = contract.address;
            await contract.registerParticipant(user2snn, {from: user2, value: registrationFee});
            await contract.registerParticipant(user3snn,{from: user3, value: (registrationFee + 1)});
            await tryCatch(contract.registerParticipant(user4snn, {from: user4, value: (registrationFee - 100)}), errTypes.revert);

            // console.log(res);
            let participants = await contract.getParticipants.call();
            let user2sReturnedName = await contract.getNickname.call(user2, {from:user3});
            //console.log(participants);

            assert.equal(participants[0], user2, "participant wasn't added");
            assert.equal(user2sReturnedName, user2snn, "participant Nickname not correct");
            assert.equal(participants[1], user3, "participant wasn't added");
            assert.equal(participants.length, 2, "participant wasn't added");

        });
        it("should abort with when registration fee is not enough", async function() {
          const contract = await WCwager.new(contestName, registrationFee, { from: owner });
          await tryCatch(contract.registerParticipant(user4snn, {from: user4, value: registrationFee - 100}), errTypes.revert);
        });

        it("should prevent one person from paying twice", async function() {
          const contract = await WCwager.new(contestName, registrationFee, { from: owner });
          await contract.registerParticipant(user2snn, {from: user2, value: registrationFee});
          await tryCatch(contract.registerParticipant(user2snn, {from: user2, value: registrationFee}), errTypes.revert);
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

        const contract = await WCwager.new(contestName, registrationFee, { from: owner });
        await contract.registerParticipant(user2snn, {from: user2, value: registrationFee});
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
        const contract = await WCwager.new(contestName, registrationFee, { from: owner });
        await contract.registerParticipant(user2snn, {from: user2, value: registrationFee});
        await contract.registerParticipant(user3snn,{from: user3, value: (registrationFee + 1)});

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
        assert.equal(theGroupReturnedURL, groupURL, "Group URL wasn't returned even though it was allowed");
        await tryCatch(contract.getURL.call( user2, "Round16", {from: user3}), errTypes.revert);

        });
    });
    describe('WCwagers - Add and retrieve URLs', () => {
      let groupURL = "https://ipfs.myGroupURL";
      let groupURL2 = "https://ipfs.myGroupURL2";
      let r16URL = "https://ipfs.r16";
      let quartersURL = "https://ipfs.quarters";
      let semisURL = "https://ipfs.semis";
      let finalsURL = "https://ipfs.finals";
      it("should enter 4 participants and pay one of them", async function () {
        const contract = await WCwager.new(contestName, registrationFee, { from: owner });
        await contract.registerParticipant(user2snn, {from: user2, value: registrationFee});
        await contract.registerParticipant(user3snn,{from: user3, value: registrationFee});
        await contract.registerParticipant(user4snn, {from: user4, value: registrationFee});
        await contract.registerParticipant(ownersnn,{from: owner, value: registrationFee});
        let amount = web3.eth.getBalance(contract.address);
        // await contract.getBalance.call({from: user3});
        console.log("contract pot size amount : " + amount);
        let usrBalance = await web3.eth.getBalance(user3);
        console.log("Initial user balance : " + usrBalance);
        let potSize = Number(amount);
        let tx = await contract.payWinner(potSize, user3, {from: owner});
        let expectedBalance = Number(usrBalance) + Number(amount);
        console.log("The expected balance is : " + expectedBalance);

        let usrBalanceAfterPay = await web3.eth.getBalance(user3);
        console.log("user balance after pay: " + usrBalanceAfterPay);
        assert.equal(expectedBalance, Number(usrBalanceAfterPay), "Payment failed");
        });

        it("should fail to pay an unregistered participant and fail to pay more than available", async function () {
          const contract = await WCwager.new(contestName, registrationFee, { from: owner });
          await contract.registerParticipant(user2snn, {from: user2, value: registrationFee});
          await contract.registerParticipant(user3snn,{from: user3, value: registrationFee});
          await contract.registerParticipant(ownersnn,{from: owner, value: registrationFee});
          let amount = web3.eth.getBalance(contract.address);
          let potSize = Number(amount);
          console.log("contract pot size amount : " + potSize);
          await tryCatch(contract.payWinner(potSize, user4, {from: owner}), errTypes.revert);
          await tryCatch(contract.payWinner(potSize + 200, user3, {from: owner}), errTypes.revert);
          let newAmount = web3.eth.getBalance(contract.address);
          let newPotSize = Number(amount);
          assert.equal(potSize,newPotSize,"Pot was depleted!")


        });

        it("should allow paying the owner", async function () {
          const contract = await WCwager.new(contestName, registrationFee, { from: owner });
          await contract.registerParticipant(user2snn, {from: user2, value: registrationFee});
          await contract.registerParticipant(user3snn,{from: user3, value: registrationFee});
          await contract.registerParticipant(ownersnn,{from: owner, value: registrationFee});
          let amount = web3.eth.getBalance(contract.address);
          let potSize = Number(amount);
          console.log("contract pot size amount : " + potSize);
          let usrBalance = await web3.eth.getBalance(owner);
          let tx = await contract.payWinner(potSize, owner, {from: owner});
          getEvent(tx.logs, "DebugInt")
          getEvent(tx.logs, "DebugStr")
          let usrBalanceAfterPay = await web3.eth.getBalance(owner);
          let expectedBalance = Number(usrBalance) + Number(amount);
          assert.equal( ( (expectedBalance - usrBalanceAfterPay) > 0 ), true, "Payment failed");

        });
      });

});
