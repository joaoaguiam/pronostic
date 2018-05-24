import { web3, waitForMined } from '../uport/uport-connectors'
import Promise from "bluebird";

import Pixel4ImpactArtifact from '../../../build/contracts/Pixel4Impact.json';
import * as showCampaignActions from '../../store/show-campaign/actions';
import { DONATION_STATUS } from '../../store/show-campaign/reducer';

export const Pixel4Impact = function (address) {
    let abiStr = JSON.stringify(Pixel4ImpactArtifact.abi);
    let Pixel4ImpactABI = web3.eth.contract(JSON.parse(abiStr))
    let contract = Pixel4ImpactABI.at(address);
    return Promise.promisifyAll(contract);

    // contract.setProvider(web3.currentProvider);
    //dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
    // debugger;
    // if (typeof contract.currentProvider.sendAsync !== "function") {
    //   contract.currentProvider.sendAsync = function() {
    //     return contract.currentProvider.send.apply(
    //       contract.currentProvider, arguments
    //     );
    //   };
    // }
    // return contract;
}


export async function getPixel4ImpactDetails(address) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = Pixel4Impact(address);
            let details = await contract.getDetailsAsync.call();
            console.log(details);
            console.log("minDonation:" + details[2].toNumber());
            let result = {
                xPixels: parseInt(details[0].toNumber()),
                yPixels: parseInt(details[1].toNumber()),
                minDonation: web3.fromWei(parseInt(details[2].toNumber()), 'ether'),
                metadataUri: details[3]
            }


            let response = await fetch(result.metadataUri);
            console.log(response);
            let metadata = await response.json();
            result.ngoName = metadata.ngoName;
            result.campaignName = metadata.campaignName;
            result.campaignWebsite = metadata.campaignWebsite;
            result.campaignLogo = metadata.campaignLogo;


            result.pixels = new Array(result.xPixels);

            for (let iX = 0; iX < result.xPixels; iX++) {
                result.pixels[iX] = new Array(result.yPixels);
            }

            let numPixels = await contract.getNumPixelsTakenAsync.call();
            numPixels = parseInt(numPixels.toNumber());
            console.log("numPixels: " + numPixels);
            let pixelsHandled = 0;
            for (let i = 0; i < numPixels; i++) {
                contract.getPixelTakenByIndex.call(i, (err, res) => {
                    // console.log(err);
                    // console.log(res);
                    let x = parseInt(res[0].toNumber());
                    let y = parseInt(res[1].toNumber());
                    let color = res[2];
                    result.pixels[x][y] = color;
                    pixelsHandled++;
                    if (pixelsHandled == numPixels) {
                        resolve(result);
                    }
                });

                // let res = await contract.getPixelTakenByIndexAsync.call(i);
                // debugger;
                // let x = parseInt(res[0].toNumber());
                // let y = parseInt(res[1].toNumber());
                // let color = res[2];
                // result.pixels[x][y] = color;
            }
            if (numPixels === 0) {
                resolve(result);
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}


function _donatePixel(address, x, y, color, donation, dispatch) {
    return new Promise((resolve, reject) => {
        let contract = Pixel4Impact(address);
        contract.donatePixel(x, y, color, { value: donation },
            (err, txHash) => {
                if (err) {
                    reject(err);
                }
                dispatch(showCampaignActions.updateStatus(DONATION_STATUS.WAITING_MINING));
                dispatch(showCampaignActions.updateTxHash(txHash));

                waitForMined(txHash, { blockNumber: null }, // see next area
                    function pendingCB() {
                        console.log("Waiting for tx " + txHash + "...");
                    },
                    function successCB(data) {
                        console.log(data);
                        resolve(data);
                    }
                )
            }
        );
    });
}

export async function donatePixel(address, pixelX, pixelY, color, donation, dispatch) {
    return new Promise(async (resolve, reject) => {
        try {
            let x = parseInt(pixelX);
            let y = parseInt(pixelY);
            let donationWei = web3.toWei(parseFloat(donation), 'ether');
            let tx = await _donatePixel(address, x, y, color, donationWei, dispatch);


            dispatch(showCampaignActions.updateStatus(DONATION_STATUS.MINED));

            // dispatch(createCampaignActions.eventCreationCompleted())

            resolve(tx);
        } catch (e) {
            console.log(e);
        }
    });
}

// (uint _x, uint _y, string _color)