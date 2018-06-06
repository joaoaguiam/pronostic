import _ from 'lodash';

import * as types from './actionTypes';
import * as matchesSelectors from './reducer';
import * as wcwagersSelectors from '../wc-wagers/reducer';
import * as wcwagersActions from '../wc-wagers/actions';

import update from 'immutability-helper';

import Web3 from 'web3';



// const DATA_SOURCE = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";
const DATA_SOURCE = "/data/wc-results.json";




export function fetchMatches() {
    return async (dispatch, getState) => {
        try {

            let response = await fetch(DATA_SOURCE);
            // debugger;
            let matches = await response.json();
            console.log(matches);
            let contractAddress = wcwagersSelectors.getAddress(getState());


            // flat matches 
            let flatMatches = new Array(64);
            let iterator = (match) => {
                flatMatches[match.name - 1] = match;
            };
            matches.groups.a.matches.forEach(iterator);
            matches.groups.b.matches.forEach(iterator);
            matches.groups.c.matches.forEach(iterator);
            matches.groups.d.matches.forEach(iterator);
            matches.groups.e.matches.forEach(iterator);
            matches.groups.f.matches.forEach(iterator);
            matches.groups.g.matches.forEach(iterator);
            matches.groups.h.matches.forEach(iterator);
            matches.knockout.round_16.matches.forEach(iterator);
            matches.knockout.round_8.matches.forEach(iterator);
            matches.knockout.round_4.matches.forEach(iterator);
            matches.knockout.round_2_loser.matches.forEach(iterator);
            matches.knockout.round_2.matches.forEach(iterator);
            console.log("FLAT MATCHES");
            console.log(flatMatches);

            dispatch({ type: types.MATCHES_FETCHED, matches, flatMatches });

            dispatch(wcwagersActions.loadOtherParticipantBets());

            
            // Load cached bets
            let cachedbets = localStorage.getItem('pronostic-bets-' + contractAddress);
            console.log(cachedbets);
            if (cachedbets !== null) {
                // localStorage.removeItem('bets');
                dispatch({ type: types.BETS_UPDATED, bets: JSON.parse(cachedbets) });
            }
            else {
                let bets = [];
                let savedBets = matchesSelectors.getSavedBets(getState());
                for (let i = 0; i < 64; i++) {
                    let phase = matchesSelectors.getPhaseFromGameNumber(i);
                    
                    // load from blockchain values
                    let homeBet = undefined;
                    let awayBet =  undefined;
                    let winnerBet = undefined;

                    if(savedBets[phase] !== undefined) {
                        homeBet = savedBets[phase][i].homeBet;
                        awayBet = savedBets[phase][i].awayBet;
                        winnerBet = savedBets[phase][i].winnerBet;
                    }
                    bets.push({
                        match: i + 1,
                        homeBet,
                        awayBet,
                        winnerBet,
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
            let contractAddress = wcwagersSelectors.getAddress(getState());

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
            let contractAddress = wcwagersSelectors.getAddress(getState());

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
            let contractAddress = wcwagersSelectors.getAddress(getState());

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

            for (var key in submissionLinks) {
                // check also if property is not inherited from prototype
                if (submissionLinks.hasOwnProperty(key)) {
                    var value = submissionLinks[key];
                    console.log(key + ' : ' + value);
                    if (value !== '') {
                        let response = await fetch(value);
                        let bets = await response.json();
                        console.log(bets);
                        savedBets[key] = bets;
                    }

                }
            }
            console.log(savedBets);
            dispatch({ type: types.SAVED_BETS_FETCHED, savedBets });
            dispatch(fetchMatches());
        } catch (error) {
            console.error(error);
        }
    };
}
export function openBetsPage() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.OPEN_BETS_PAGE });
        } catch (error) {
            console.error(error);
        }
    };
}
export function closeBetsPage() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.CLOSE_BETS_PAGE });
        } catch (error) {
            console.error(error);
        }
    };
}