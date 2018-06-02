import _ from 'lodash';

import * as types from './actionTypes';
import * as wcwagerSelectors from './reducer';

import * as WCwagers from '../../contracts/WCwagers';

export function fetchParticipants(wcwagersAddress) {
    return async (dispatch, getState) => {
        try {
            debugger;
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
            let contestDetails = wcwagerSelectors.getContestDetails(getState());
            let wcwagersAddress = wcwagerSelectors.getAddress(getState());
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
