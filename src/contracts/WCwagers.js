import web3, { getTransactionReceiptMined } from '../helpers/web3/Web3Helper';
import Promise from "bluebird";

import WCwagerArtifact from '../../build/contracts/WCwagers.json';

import * as wcwagersActions from '../store/wc-wagers/actions';
import * as notificationsActions from '../store/notifications/actions';
import { TX_STATUS } from '../store/wc-wagers/reducer';

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

            let owner = await contract.ownerAsync();
            resolve({
                participationFeeWei,
                participationFeeEther,
                contestName,
                contestStartDate,
                contestBalanceEther,
                owner
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

export async function registerParticipant(wcwagersAddress, contestDetails, nickname, dispatch) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            dispatch(notificationsActions.addNotification("Registration transaction needs to be validated on Metamask"));
            let tx = await contract.registerParticipantAsync(nickname, { value: web3.toWei(contestDetails.participationFeeEther, 'ether') });
            dispatch(wcwagersActions.setParticipantRegistrationTxStatus(TX_STATUS.PENDING));
            dispatch(notificationsActions.addNotification("Waiting for registration transaction "+tx+" to be mined by the blockchain"));
            console.log(tx);
            let result = await getTransactionReceiptMined(tx);
            dispatch(wcwagersActions.setParticipantRegistrationTxStatus(TX_STATUS.MINED));
            dispatch(notificationsActions.addNotification("Participant successfully registered"));
            console.log(result);
            resolve(result);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

export async function writeUrl(wcwagersAddress, url, phase, dispatch) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            dispatch(notificationsActions.addNotification("Submission transaction needs to be validated on Metamask"));
            console.log('contract.writeURLAsync('+url+', '+phase+')');
            let tx = await contract.writeURLAsync(url, phase);

            dispatch(notificationsActions.addNotification("Waiting for submission transaction "+tx+" to be mined by the blockchain"));

            dispatch(wcwagersActions.setBetsTxStatus(TX_STATUS.PENDING));

            console.log(tx);
            let result = await getTransactionReceiptMined(tx);
            dispatch(notificationsActions.addNotification("Submission successfully registered on the blockchain"));
            dispatch(wcwagersActions.setBetsTxStatus(TX_STATUS.MINED));
            console.log(result);
            resolve(result);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}


export async function getPhaseDate(wcwagersAddress, phase) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            let phaseDate = await contract.getPhaseDateAsync(phase);
            
            resolve(phaseDate.toNumber());
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

export async function getOwnURL(wcwagersAddress, phase) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            let url = await contract.getOwnURLAsync(phase);
            
            resolve(url);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

export async function getURL(wcwagersAddress, participantAddress, phase) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            let url = await contract.getURLAsync(participantAddress, phase);
            
            resolve(url);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

export async function toggleTimePast(wcwagersAddress) {
    return new Promise(async (resolve, reject) => {
        try {
            let contract = WCwagers(wcwagersAddress);
            
            let tx = await contract.toggleTimePastAsync();

            let result = await getTransactionReceiptMined(tx);
            console.log(result);
            resolve(result);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}