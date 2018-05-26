import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
    matches: undefined,
    bets: undefined,
    selectedTab: 0,
    isFetched: false
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.MATCHES_FETCHED:
            return state.merge({
                matches: action.matches,
                isFetched: true
            });
        case types.BETS_UPDATED:
            return state.merge({
                bets: action.bets,
            });
        case types.TAB_SELECTED:
            return state.merge({
                selectedTab: action.tab,
            });
        default:
            return state;
    }
}

// selectors

export function getMatches(state) {
    return state.matches.matches;
}
export function getBets(state) {
    return state.matches.bets;
}
export function isFetched(state) {
    return state.matches.isFetched;
}
export function getTeam(matches, teamId) {
    return matches.teams[(teamId - 1)];
}

export function getSelectedTab(state) {
    return state.matches.selectedTab;
}

