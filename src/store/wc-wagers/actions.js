import _ from 'lodash';

import * as types from './actionTypes';
import * as wcwagersSelectors from './reducer';
import * as matchesSelectors from '../matches/reducer';

import * as WCwagers from '../../contracts/WCwagers';

import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
import { writeUrl } from '../../contracts/WCwagers';

export function fetchParticipants(wcwagersAddress) {
    return async (dispatch, getState) => {
        try {
            let details = await WCwagers.getContestInfo(wcwagersAddress);

            dispatch({ type: types.CONTEST_DETAILS, details });

            let participants = await WCwagers.getParticipants(wcwagersAddress);

            dispatch({ type: types.PARTICIPANTS_FETCHED, participants });

        } catch (error) {
            console.error(error);
        }
    };
}

export function registerParticipant(nickname) {
    return async (dispatch, getState) => {
        try {
            let contestDetails = wcwagersSelectors.getContestDetails(getState());
            let wcwagersAddress = wcwagersSelectors.getAddress(getState());
            await WCwagers.registerParticipant(wcwagersAddress, contestDetails, nickname, dispatch);

            dispatch(fetchParticipants(wcwagersAddress));
        } catch (error) {
            console.error(error);
        }
    };
}

export function setContractAddress(wcwagersAddress) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_CONTRACT_ADDRESS, address: wcwagersAddress });
            dispatch(fetchParticipants(wcwagersAddress));
        } catch (error) {
            console.error(error);
        }
    };
}

export function showContestDetailsDialog() {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SHOW_CONTEST_DETAILS_DIALOG, showContestDetailsDialog: true });
        } catch (error) {
            console.error(error);
        }
    };
}

export function hideContestDetailsDialog() {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SHOW_CONTEST_DETAILS_DIALOG, showContestDetailsDialog: false });
        } catch (error) {
            console.error(error);
        }
    };
}

export function setParticipantRegistrationTxStatus(status) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.PARTICIPANT_REGISTRATION_TX_STATUS, status });
        } catch (error) {
            console.error(error);
        }
    };
}

export function setBetsTxStatus(status) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.BETS_TX_STATUS, status });
        } catch (error) {
            console.error(error);
        }
    };
}

export function submitBets(phase, subPhase, bets) {
    return async (dispatch, getState) => {
        try {
            let res = await uploadObjectIpfs(bets);
            console.log(res);
            let url = res.url;
            let ipfsLinks = _.cloneDeep(matchesSelectors.getIpfsLinks(getState()));
            let contractPhase = '';
            if (phase === 'groups') {
                ipfsLinks.groups = url;
                contractPhase = wcwagersSelectors.subPhaseIdToSCPhase(phase);
            }
            else {
                ipfsLinks[subPhase] = url;
                contractPhase = wcwagersSelectors.subPhaseIdToSCPhase(subPhase);
            }

            debugger;
            let address = wcwagersSelectors.getAddress(getState());
            await writeUrl(address, url, contractPhase, dispatch);
            dispatch({ type: types.BETS_SUBMITTED, ipfsLinks });
        } catch (error) {
            console.error(error);
        }
    };
}

export function loadPhasesDates() {
    return async (dispatch, getState) => {
        try {
            let address = wcwagersSelectors.getAddress(getState());
            let allPhases = wcwagersSelectors.getAllPhases();
            let phasesDates = {};
            for (let i = 0; i < allPhases.length; i++) {
                let phase = allPhases[i];
                let phaseDate = await WCwagers.getPhaseDate(address, phase.smartcontract);
                phasesDates[phase.json] = phaseDate;
            }
            console.log(phasesDates);
            dispatch({ type: types.PHASES_DATES_FETCHED, phasesDates });
        } catch (error) {
            console.error(error);
        }
    };
}
