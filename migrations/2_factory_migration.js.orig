var Migrations = artifacts.require("./Migrations.sol");

var Pixel4ImpactFactory = artifacts.require("./Pixel4ImpactFactory.sol");

module.exports = async function(deployer, network, accounts) {
    //console.log(accounts);
    let factoryOwner = accounts[0];
    await Promise.all([
        deployer.deploy(Pixel4ImpactFactory, { from: factoryOwner })
    ]);
    instances = await Promise.all([
        Pixel4ImpactFactory.deployed()
    ]);
    let factory = instances[0];
    console.log("Factory Smart Contract Address: " + factory.address);
}
