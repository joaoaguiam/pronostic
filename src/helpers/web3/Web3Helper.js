import Web3 from 'web3'; // Must specfiy node_modules to avoid importing itself
import { promisifyAll } from "bluebird";

let web3 = undefined;
// Instantiate new web3 global instance
// if (typeof window !== 'undefined' && // Check we're on the client-side
//     (typeof window.web3 === 'undefined' ||
//         typeof window.web3.currentProvider === 'undefined')) {
//     window.web3 = new Web3('ws://127.0.0.1:8546');
// }

// Instantiate new web3 local instance
if (typeof window !== 'undefined' && // Check we're on the client-side
    typeof window.web3 !== 'undefined' &&
    typeof window.web3.currentProvider !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
}


export const isWeb3Available = () => {
    return typeof window !== 'undefined' && // Check we're on the client-side
        typeof window.web3 !== 'undefined' &&
        typeof window.web3.currentProvider !== 'undefined';
}

export function getCurrentProvider() {
    return web3.currentProvider;
}

const web3ForExport = web3; // To avoid error from exporting non-read-only variable

if (web3 !== undefined) {

    // Get current provider


    // Export web3 object instance


    web3ForExport.eth = promisifyAll(web3ForExport.eth);
    web3ForExport.version = promisifyAll(web3ForExport.version);
    web3ForExport.net = promisifyAll(web3ForExport.net);
    // export const web3 = uWeb3;

    // export const web3Async = proxiedWeb3;
}
export default web3ForExport;



export const getTransactionReceiptMined = (txHash, interval) => {
    const transactionReceiptAsync = function (resolve, reject) {
        web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
            if (error) {
                reject(error);
            } else if (receipt == null) {
                console.log('waiting for tx ' + txHash + ' to be mined...');
                setTimeout(
                    () => transactionReceiptAsync(resolve, reject),
                    interval ? interval : 1000);
            } else {
                resolve(receipt);
            }
        });
    };

    if (Array.isArray(txHash)) {
        return Promise.all(txHash.map(
            oneTxHash => self.getTransactionReceiptMined(oneTxHash, interval)));
    } else if (typeof txHash === "string") {
        return new Promise(transactionReceiptAsync);
    } else {
        throw new Error("Invalid Type: " + txHash);
    }
};

