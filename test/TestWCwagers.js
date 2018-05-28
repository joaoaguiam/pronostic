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

    describe('WCwagers - Create Contract', () => {

      let owner = accounts[0];
      let user2 = accounts[1];
      let user3 = accounts[2];
      let user4 = accounts[3];
      let betValue = 20;
      let contestName = "Test Contest";

        it("should create a new contract and check initial values", async function () {
          //  let owner = accounts[0]

            const contract = await WCwager.new(contestName, betValue, { from: owner });

            let details = await contract.getContestInfo.call();

            let _wagerSize = details[0];
            let _name = details[1];
            let _date = details[2];

            assert.equal(betValue * 1666666666666666, _wagerSize, "wager size not correct");
            assert.equal(contestName, _name, "name of contest is not correct");
            assert.equal(1529010000, _date, "Date is not correct");
        });

        it("should create a new contract and verify participants creation", async function () {
            const contract = await WCwager.new(contestName, betValue, { from: owner });
            let address = contract.address;
            await contract.registerParticipant({from: user2, value: betValue * 1666666666666666});
            await contract.registerParticipant({from: user3, value: (betValue + 1) * 1666666666666666});
            await tryCatch(contract.registerParticipant({from: user4, value: (betValue - 1) * 1666666666666666}), errTypes.revert);

            // console.log(res);
            let participants = await contract.getParticipants.call();

            assert.equal(participants[0], user2, "participant wasn't added");
            assert.equal(participants[1], user3, "participant wasn't added");
            assert.equal(participants.length, 2, "participant wasn't added");

        });
        it("should abort with an error", async function() {
          const contract = await WCwager.new(contestName, betValue, { from: owner });
          await tryCatch(contract.registerParticipant({from: user4, value: (betValue - 1) * 1666666666666666}), errTypes.revert);
        });
    });
});
