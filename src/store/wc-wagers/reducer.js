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
    address: '',
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
    phasesDates: {
        groups: 0,
        round_16: 0,
        round_8: 0,
        round_4: 0,
        round_2: 0
    },
    betsSubmitted: {
        groups: undefined,
        round_16: undefined,
        round_8: undefined,
        round_4: undefined,
        round_2: undefined
    },
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
        case types.PHASES_DATES_FETCHED:
            return state.merge({
                phasesDates: action.phasesDates,
            });
        case types.BETS_SUBMITTED_FETCHED:
            return state.merge({
                betsSubmitted: action.betsSubmitted,
            });
        default:
            return state;
    }
}
export function subPhaseIdToSCPhase(subPhaseId) {
    switch (subPhaseId) {
        case 'groups':
            return 'Group';
        case 'round_16':
            return 'Round16';
        case 'round_8':
            return 'Quarters';
        case 'round_4':
            return 'Semis';
        case 'round_2':
            return 'Finals';
        default:
            return 'unknown';
    }
}
export function getAllPhases() {
    return [
        { json: 'groups', smartcontract: 'Group' },
        { json: 'round_16', smartcontract: 'Round16' },
        { json: 'round_8', smartcontract: 'Quarters' },
        { json: 'round_4', smartcontract: 'Semis' },
        { json: 'round_2', smartcontract: 'Finals' }
    ];
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

export function getPhaseDates(state) {
    return state.wcwagers.phasesDates;
}
export function getBetsSubmitted(state) {
    return state.wcwagers.betsSubmitted;
}