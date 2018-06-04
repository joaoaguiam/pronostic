import _ from 'lodash';

import * as types from './actionTypes';
import * as matchesSelectors from './reducer';
import * as wcwagersSelectors from '../wc-wagers/reducer';

import update from 'immutability-helper';

import Web3 from 'web3';



const DATA_SOURCE = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";

export function fetchMatches() {
    return async (dispatch, getState) => {
        try {

            let response = await fetch(DATA_SOURCE);
            let matches = await response.json();
            console.log(matches);
            let contractAddress = wcwagersSelectors.getAddress(getState());

            dispatch({ type: types.MATCHES_FETCHED, matches });

            let cachedbets = localStorage.getItem('pronostic-bets-' + contractAddress);
            console.log(cachedbets);
            if (cachedbets !== null) {
                // localStorage.removeItem('bets');
                dispatch({ type: types.BETS_UPDATED, bets: JSON.parse(cachedbets) });
            }
            else {
                let bets = [];
                for (let i = 0; i < 64; i++) {
                    bets.push({
                        match: i + 1,
                        homeBet: undefined,
                        awayBet: undefined,
                        winnerBet: undefined,
                    })
                }
                dispatch({ type: types.BETS_UPDATED, bets });
            }

        } catch (error) {
            console.error(error);
        }
    };
}


export function setGroupHomeBet(phase, subPhase, matchId, bet) {
    return async (dispatch, getState) => {
        try {
            let bets = _.cloneDeep(matchesSelectors.getBets(getState()));
            bets[matchId - 1].homeBet = bet;

            dispatch({ type: types.BETS_UPDATED, bets });
            localStorage.setItem('pronostic-bets-' + contractAddress, JSON.stringify(bets));

        } catch (error) {
            console.error(error);
        }
    };
}

export function setGroupAwayBet(phase, subPhase, matchId, bet) {
    return async (dispatch, getState) => {
        try {
            let bets = _.cloneDeep(matchesSelectors.getBets(getState()));
            bets[matchId - 1].awayBet = bet;

            dispatch({ type: types.BETS_UPDATED, bets });
            localStorage.setItem('pronostic-bets-' + contractAddress, JSON.stringify(bets));

        } catch (error) {
            console.error(error);
        }
    };
}

export function setWinnerBet(phase, subPhase, matchId, bet) {
    return async (dispatch, getState) => {
        try {
            let bets = _.cloneDeep(matchesSelectors.getBets(getState()));
            bets[matchId - 1].winnerBet = bet;

            dispatch({ type: types.BETS_UPDATED, bets });
            localStorage.setItem('pronostic-bets-' + contractAddress, JSON.stringify(bets));

        } catch (error) {
            console.error(error);
        }
    };
}

export function selectTab(tab) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.TAB_SELECTED, tab });
        } catch (error) {
            console.error(error);
        }
    };
}

export function fetchSavedBets() {
    return async (dispatch, getState) => {
        try {
            let submissionLinks = wcwagersSelectors.getBetsSubmitted(getState());
            let savedBets = {
                groups: undefined,
                round_16: undefined,
                round_8: undefined,
                round_4: undefined,
                round_2: undefined,
            };
            // _.forOwn(submissionLinks, async function (value, key) {
            //     let response = await fetch(value);
            //     let bets = await response.json();
            //     console.log(bets);
            //     savedBets[key] = bets;
            // });
            console.log(savedBets);
            dispatch({ type: types.SAVED_BETS_FETCHED, savedBets });
        } catch (error) {
            console.error(error);
        }
    };
}