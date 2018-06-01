import web3, { getTransactionReceiptMined } from '../helpers/web3/Web3Helper';
import Promise from "bluebird";

import WCwagerArtifact from '../../build/contracts/WCwagers.json';


export const WCwagers = function (address) {
    let abiStr = JSON.stringify(WCwagerArtifact.abi);
    let WCwagerABI = web3.eth.contract(JSON.parse(abiStr))
    let contract = WCwagerABI.at(address);
    return Promise.promisifyAll(contract);
}


export async function getContestInfo(wcwagersAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            let details = await contract.getContestInfoAsync();

            contract.getContestInfo((err, res) => { console.log(res); });
            console.log(details);
            let participationFeeWei = details[0].toNumber();
            let participationFeeEther = web3.fromWei(participationFeeWei, 'ether');
            let contestName = details[1];
            let contestStartDate = details[2].toNumber();
            let contestBalanceWei = (await web3.eth.getBalanceAsync(wcwagersAddress)).toNumber();
            let contestBalanceEther = web3.fromWei(contestBalanceWei, 'ether');
            resolve({
                participationFeeWei,
                participationFeeEther,
                contestName,
                contestStartDate,
                contestBalanceEther
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

export async function getParticipants(wcwagersAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            let participantsAddresses = await contract.getParticipantsAsync();
            let participants = [];
            for(let i = 0; i < participantsAddresses.length; i++) {
                let participant = participantsAddresses[i];
                let nickname = await contract.getNicknameAsync(participant);
                participants.push({address: participant, nickname});
            }
            console.log(participants);
            resolve({participants});
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

export async function registerParticipant(wcwagersAddress, contestDetails, nickname) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            let tx = await contract.registerParticipantAsync(nickname, { value: web3.toWei(contestDetails.participationFeeEther, 'ether') });
            console.log(tx);
            let result = await getTransactionReceiptMined(tx);
            console.log(result);
            resolve(result);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

export async function writeUrl(wcwagersAddress, url, phase) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);

            let tx = await contract.writeURLAsync(url, phase);
            console.log(tx);
            let result = await getTransactionReceiptMined(tx);
            console.log(result);
            resolve(result);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
