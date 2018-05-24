var Pixel4Impact = artifacts.require("Pixel4Impact");

contract("Pixel4Impact", async function (accounts) {

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

    describe('Pixel4Impact - Create Contract', () => {

        /*beforeEach(async function() {
          contract = await
        })*/
        it("should create a new contract and check initial values", async function () {
            let owner = accounts[0];

            let xPixels = 10;
            let yPixels = 10;
            let minDonation = 1000000;
            let metadataUri = "test.test";

            const contract = await Pixel4Impact.new(xPixels, yPixels, minDonation, metadataUri, { from: owner });

            let details = await contract.getDetails.call();

            let _xPixels = details[0];
            let _yPixels = details[1];
            let _minDonation = details[2];
            let _metadataUri = details[3];

            assert.equal(xPixels, _xPixels, "xPixels is not correct");
            assert.equal(yPixels, _yPixels, "yPixels is not correct");
            assert.equal(minDonation, _minDonation, "minDonation is not correct");
            assert.equal(metadataUri, _metadataUri, "metadataUri is not correct");
        });

        it("should create a new contract and verify if we can get the pixels", async function () {
            let owner = accounts[0];
            let user2 = accounts[1];

            let xPixels = 5;
            let yPixels = 6;
            let minDonation = parseInt(web3.toWei(0.001, 'ether'));
            let metadataUri = "test.test";

            const contract = await Pixel4Impact.new(xPixels, yPixels, minDonation, metadataUri, { from: owner });
            let address = contract.address;
            // let res = await contract.donatePixel(0, 0, "red",{from: user2, value: minDonation});
            // console.log(res);
            for (let x = 0; x < xPixels; x++) {
                for (let y = 0; y < yPixels; y++) {
                    let initialBalance = parseInt(web3.eth.getBalance(address).toNumber());
                    let expectedBalance = initialBalance+minDonation;
                    let res = await contract.donatePixel(x, y, "red",{from: user2, value: minDonation});
                    let newBalance = web3.eth.getBalance(address).toNumber();
                    
                    assert.equal(expectedBalance, newBalance);
                }
            }
        });
    });
});