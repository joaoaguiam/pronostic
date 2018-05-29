import Web3 from 'web3'; // Must specfiy node_modules to avoid importing itself
import { promisifyAll } from "bluebird";

let web3;
// Instantiate new web3 global instance
if (typeof window !== 'undefined' && // Check we're on the client-side
    (typeof window.web3 === 'undefined' ||
        typeof window.web3.currentProvider === 'undefined')) {
    window.web3 = new Web3('ws://127.0.0.1:8546');
}

// Instantiate new web3 local instance
if (typeof window !== 'undefined' && // Check we're on the client-side
    typeof window.web3 !== 'undefined' &&
    typeof window.web3.currentProvider !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
}

// Get current provider
export function getCurrentProvider() {
    return web3.currentProvider;
}

// Export web3 object instance
const web3ForExport = web3; // To avoid error from exporting non-read-only variable

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) { reject(err) }

            resolve(res);
        })
    );

// simple proxy to promisify the web3 api. It doesn't deal with edge cases like web3.eth.filter and contracts.
const proxiedWeb3Handler = {
    // override getter                               
    get: (target, name) => {
        const inner = target[name];
        if (inner instanceof Function) {
            // Return a function with the callback already set.  
            return (...args) => promisify(cb => inner(...args, cb));
        } else if (typeof inner === 'object') {
            // wrap inner web3 stuff                             
            return new Proxy(inner, proxiedWeb3Handler);
        } else {
            return inner;
        }
    },
};
const proxiedWeb3 = new Proxy(web3, proxiedWeb3Handler);

web3ForExport.eth = promisifyAll(web3ForExport.eth);
web3ForExport.version = promisifyAll(web3ForExport.version);
web3ForExport.net = promisifyAll(web3ForExport.net);
// export const web3 = uWeb3;

// export const web3Async = proxiedWeb3;
export default web3ForExport;
