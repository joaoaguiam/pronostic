import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

export const TX_STATUS = {
    NONE: 0,
    PENDING: 1,
    MINED: 2,
}


const initialState = Immutable({
    participants: [],
    address: '0x1e0b778e6e3b2924a3715fc785d83ec8509c1009',
    showContestDetailsDialog: false,
    contestDetails: {
        participationFeeWei: 0,
        participationFeeEther: 0,
        contestName: '',
        contestStartDate: 0,
        contestBalanceEther: 0
    },
    isFetched: false,
    participantRegistrationTxStatus: TX_STATUS.NONE,
    betsTxStatus: TX_STATUS.NONE,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.PARTICIPANTS_FETCHED:
            return state.merge({
                participants: action.participants.participants,
                isFetched: true,
            });
        case types.SET_CONTRACT_ADDRESS:
            return state.merge({
                address: action.address,
            });
        case types.SHOW_CONTEST_DETAILS_DIALOG:
            return state.merge({
                showContestDetailsDialog: action.showContestDetailsDialog,
            });
        case types.CONTEST_DETAILS:
            return state.merge({
                contestDetails: action.details,
            });
        case types.PARTICIPANT_REGISTRATION_TX_STATUS:
            return state.merge({
                participantRegistrationTxStatus: action.status,
            });
        case types.BETS_TX_STATUS:
            return state.merge({
                betsTxStatus: action.status,
            });
        default:
            return state;
    }
}

export function isFetched(state) {
    return state.wcwagers.isFetched;
}

export function getParticipants(state) {
    return state.wcwagers.participants;
}

export function getAddress(state) {
    return state.wcwagers.address;
}

export function isShowContestDetailsDialog(state) {
    return state.wcwagers.showContestDetailsDialog;
}

export function getContestDetails(state) {
    return state.wcwagers.contestDetails;
}

export function getParticipantRegistrationTxStatus(state) {
    return state.wcwagers.participantRegistrationTxStatus;
}

export function getBetsTxStatus(state) {
    return state.wcwagers.betsTxStatus;
}