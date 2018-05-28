var Migrations = artifacts.require("./Migrations.sol");

var WCwagers = artifacts.require("./WCwagers.sol");

module.exports = async function(deployer, network, accounts) {
    //console.log(accounts);
    let contestOwner = accounts[0];
    await Promise.all([
        deployer.deploy(WCwagers, "WC contest", 20, { from: contestOwner })
    ]);
    instances = await Promise.all([
        WCwagers.deployed()
    ]);
    let contest = instances[0];
    console.log("contest Smart Contract Address: " + contest.address);
}
