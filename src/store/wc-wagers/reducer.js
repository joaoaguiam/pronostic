import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

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
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.PARTICIPANTS_FETCHED:
            return state.merge({
                participants: action.participants,
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