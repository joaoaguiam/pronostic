import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
    matches:undefined,
    isFetched: false
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.MATCHES_FETCHED:
            return state.merge({
                matches: action.matches,
                isFetched: true
            });
        default:
            return state;
    }
}

// selectors

export function getMatches(state) {
    return state.matches.matches;
}
export function isFetched(state) {
    return state.matches.isFetched;
}
export function getTeam(matches, teamId) {
    return matches.teams[(teamId - 1)];
}


