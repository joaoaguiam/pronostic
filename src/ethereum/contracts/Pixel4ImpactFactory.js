import _ from 'lodash';
import { web3, waitForMined, getEventLog } from '../uport/uport-connectors'

import Pixel4ImpactFactoryArtifact from '../../../build/contracts/Pixel4ImpactFactory.json'

import { ETHEREUM_NETWORK } from '../config';


import * as createCampaignActions from '../../store/create-campaign/actions';

import Promise from "bluebird";
import { CAMPAIGN_STATUS } from '../../store/create-campaign/reducer';



function Pixel4ImpactFactorySetup() {
    let defaultNetwork = ETHEREUM_NETWORK;
    let contractArtifact = _.clone(Pixel4ImpactFactoryArtifact);

    let abiStr = JSON.stringify(contractArtifact.abi);
    let address = contractArtifact.networks[defaultNetwork].address;

    let Pixel4ImpactFactoryABI = web3.eth.contract(JSON.parse(abiStr))
    // let address = Pixel4ImpactFactoryArtifact.networks[ETHEREUM_NETWORK].address;
    console.log("Pixel4ImpactFactory address:" + address);

    return Pixel4ImpactFactoryABI.at(address);
}
const Pixel4ImpactFactory = Promise.promisifyAll(Pixel4ImpactFactorySetup());


function _createPixel4ImpactSmartContract(xPixels, yPixels, minDonation, metadataUri, dispatch) {
    return new Promise((resolve, reject) => {
        let contractDetails = {
            txHash: undefined,
            address: undefined,
            owner: undefined
        }

        Pixel4ImpactFactory.createCampaign(xPixels, yPixels, minDonation, metadataUri,
            (err, txHash) => {
                if (err) {
                    reject(err);
                }
                contractDetails.txHash = txHash;
                dispatch(createCampaignActions.updateStatus(CAMPAIGN_STATUS.WAITING_MINING));
                dispatch(createCampaignActions.updateContractDetails(contractDetails));

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
export async function createPixel4Impact(campaign, dispatch) {
    return new Promise(async (resolve, reject) => {
        try {
            let xPixels = parseInt(campaign.xPixels);
            let yPixels = parseInt(campaign.yPixels);
            let minDonation = web3.toWei(parseFloat(campaign.minDonation), 'ether');
            let metadataUri = campaign.metadataUri;

            let contractDetails = {
                txHash: undefined,
                address: undefined,
                owner: undefined
            }
            // debugger;
            let tx = await _createPixel4ImpactSmartContract(xPixels, yPixels, minDonation, metadataUri, dispatch);

            let campaignCreatedLog = await getEventLog(Pixel4ImpactFactory, tx.hash, "CampaignCreated");

            contractDetails.address = campaignCreatedLog.addr;
            contractDetails.owner = campaignCreatedLog.owner;

            dispatch(createCampaignActions.updateContractDetails(contractDetails));
            dispatch(createCampaignActions.updateStatus(CAMPAIGN_STATUS.CREATED));

            // dispatch(createCampaignActions.eventCreationCompleted())
            
            resolve(contractDetails);
        } catch (e) {
            console.log(e);
        }
    });
}

// export async function getNumberEventsByOwner(owner) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let numEvents = await Pixel4ImpactFactory.getNumberEventsByOwnerAsync(owner);
//             resolve(numEvents);
//         } catch (e) {
//             console.log(e);
//             reject(e);
//         }
//     });
// }

// export async function getEventAddressByOwnerByIndex(owner, index) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let address = await Pixel4ImpactFactory.getEventAddressByOwnerByIndexAsync(owner, index);
//             resolve(address);
//         } catch (e) {
//             console.log(e);
//             reject(e);
//         }
//     });
// }