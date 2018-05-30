import web3 from '../helpers/web3/Web3Helper';
import Promise from "bluebird";

import WCwagerArtifact from '../../build/contracts/WCwagers.json';


export const WCwagers = function (address) {
    let abiStr = JSON.stringify(WCwagerArtifact.abi);
    let WCwagerABI = web3.eth.contract(JSON.parse(abiStr))
    let contract = WCwagerABI.at(address);
    return Promise.promisifyAll(contract);
}




export async function getParticipants(wcwagersAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            let participants = await contract.getParticipantsAsync();
            console.log(participants);
            resolve(participants);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

export async function registerParticipant(wcwagersAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            let tx = await contract.registerParticipantAsync({value: web3.toWei(0.03, 'ether')});
            console.log(tx);
            resolve(tx);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

// function _donatePixel(address, x, y, color, donation, dispatch) {
//     return new Promise((resolve, reject) => {
//         let contract = Pixel4Impact(address);
//         contract.donatePixel(x, y, color, { value: donation },
//             (err, txHash) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 dispatch(showCampaignActions.updateStatus(DONATION_STATUS.WAITING_MINING));
//                 dispatch(showCampaignActions.updateTxHash(txHash));

//                 waitForMined(txHash, { blockNumber: null }, // see next area
//                     function pendingCB() {
//                         console.log("Waiting for tx " + txHash + "...");
//                     },
//                     function successCB(data) {
//                         console.log(data);
//                         resolve(data);
//                     }
//                 )
//             }
//         );
//     });
// }

// export async function donatePixel(address, pixelX, pixelY, color, donation, dispatch) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let x = parseInt(pixelX);
//             let y = parseInt(pixelY);
//             let donationWei = web3.toWei(parseFloat(donation), 'ether');
//             let tx = await _donatePixel(address, x, y, color, donationWei, dispatch);


//             dispatch(showCampaignActions.updateStatus(DONATION_STATUS.MINED));

//             // dispatch(createCampaignActions.eventCreationCompleted())

//             resolve(tx);
//         } catch (e) {
//             console.log(e);
//         }
//     });
// }

// // (uint _x, uint _y, string _color)