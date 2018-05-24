import { Connect, SimpleSigner } from 'uport-connect';
import { promisifyAll } from "bluebird";

// import * as contract from 'truffle-contract';

export let uport = new Connect('Pixel4Impact', {
  clientId: '2owVMZkRNdA5nDdBZM1aELUtCskJ6maRgKA',
  network: 'rinkeby', 
  signer: SimpleSigner('fad940fbfb3c67bcd4488e001e353c47962944b75779bf7c2d3a893deef06544')
});

let uWeb3 = uport.getWeb3();
uWeb3.eth = promisifyAll(uWeb3.eth);
export const web3 = uWeb3;


let pollingLoop = undefined;


// Callback handler for whether it was mined or not

export const waitForMined = (txHash, response, pendingCB, successCB) => {
  if (response.blockNumber) {
    successCB(response);
  } else {
    pendingCB();
    pollingLoop(txHash, response, pendingCB, successCB);
  }
}

// Recursive polling to do continuous checks for when the transaction was mined
pollingLoop = (txHash, response, pendingCB, successCB) => {
  setTimeout(function () {
    web3.eth.getTransaction(txHash, (error, response) => {
      if (error) { throw error }
        if (response === null) {
          response = { blockNumber: null }
        } // Some ETH nodes do not return pending tx
        waitForMined(txHash, response, pendingCB, successCB)
    })
  }, 1000) // check again in one sec.
}


export const getEventLog = (contract, txHash, eventName) => {
    return new Promise(
        (resolve, reject) => {
            web3.eth.getTransactionReceipt(txHash, function (err, receipt) {
                if(err) {
                    reject(err)
                }
                else {
                    let abiDecoder = require('abi-decoder');
                    abiDecoder.addABI(contract.abi);
                    let decodedLogs = abiDecoder.decodeLogs(receipt.logs);
                    console.log(decodedLogs);
                    for(let i in decodedLogs) {
                        let log = decodedLogs[i];
                        if(log === undefined) {
                            continue;
                        }
                        if(log.name === eventName) {
                            let event = {};
                            for(let j in log.events) {
                                event[log.events[j].name] = log.events[j].value;
                            }
                            resolve(event);
                        }
                    }
                    reject("Event '"+eventName+"' not found in transaction "+txHash);
                }
            });
        }
    );
    
}

export const getEtherscanLinkTx = (txHash) => {
    return "https://rinkeby.etherscan.io/tx/"+txHash;
}