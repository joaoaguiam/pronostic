import _ from 'lodash';

import * as types from './actionTypes';
import * as matchesSelectors from './reducer';

const DATA_SOURCE = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";

export function fetchMatches() {
    return async (dispatch, getState) => {
        try {

            let response = await fetch(DATA_SOURCE);
            console.log(response);
            let matches = await response.json();
            console.log(matches);

            dispatch({ type: types.MATCHES_FETCHED, matches});
        } catch (error) {
            console.error(error);
        }
    };
}


export function setGroupHomeBet(phase, subPhase, matchId, bet) {
    return async (dispatch, getState) => {
        try {
            let matches = _.clone(matchesSelectors.getMatches(getState()));

            _.assign(matches[phase][subPhase].matches[matchId - 1], {home_bet: bet});
            dispatch({ type: types.MATCHES_FETCHED, matches});
        } catch (error) {
            console.error(error);
        }
    };
}
