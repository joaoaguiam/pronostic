import _ from 'lodash';

import * as types from './actionTypes';
import * as matchesSelectors from './reducer';
import * as wcwagersSelectors from '../wc-wagers/reducer';

import update from 'immutability-helper';

import Web3 from 'web3';
import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
import { writeUrl } from '../../contracts/WCwagers';


const DATA_SOURCE = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";

export function fetchMatches() {
    return async (dispatch, getState) => {
        try {

            let response = await fetch(DATA_SOURCE);
            let matches = await response.json();
            console.log(matches);

            dispatch({ type: types.MATCHES_FETCHED, matches });

            let cachedbets = localStorage.getItem('bets');
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
            localStorage.setItem('bets', JSON.stringify(bets));

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
            localStorage.setItem('bets', JSON.stringify(bets));

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
            localStorage.setItem('bets', JSON.stringify(bets));

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
                contractPhase = 'Group';
            }
            else {
                let subPhaseId = subPhase.replace('_', '');
                ipfsLinks[subPhaseId] = url;
                switch (subPhaseId) {
                    case 'round16':
                        contractPhase = 'Round16';
                        break;
                    case 'round8':
                        contractPhase = 'Quarters';
                        break;
                    case 'round4':
                        contractPhase = 'Semis';
                        break;
                    case 'round2':
                        contractPhase = 'Finals';
                        break;
                    default:
                        break;
                }

            }


            let address = wcwagersSelectors.getAddress(getState());
            let txResult = await writeUrl(address, url, contractPhase, dispatch);
            dispatch({ type: types.BETS_SUBMITTED, ipfsLinks });
        } catch (error) {
            console.error(error);
        }
    };
}