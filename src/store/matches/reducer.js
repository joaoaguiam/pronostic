import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
    matches: undefined,
    flatMatches: undefined,
    bets: undefined,
    savedBets: {
        groups: undefined,
        round_16: undefined,
        round_8: undefined,
        round_4: undefined,
        round_2: undefined,
    },
    selectedTab: 2,
    isFetched: false,
    ipfsLinks: {
        groups: undefined,
        round_16: undefined,
        round_8: undefined,
        round_4: undefined,
        round_2: undefined,
    },
    openBetsPage: false,
});



export const gamesPhases = {
    groups: { from: 0, to: 47 },
    round_16: { from: 48, to: 55 },
    round_8: { from: 56, to: 59 },
    round_4: { from: 60, to: 61 },
    round_2: { from: 62, to: 63 },
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.MATCHES_FETCHED:
            return state.merge({
                matches: action.matches,
                flatMatches: action.flatMatches,
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
        case types.BETS_SUBMITTED:
            return state.merge({
                ipfsLinks: action.ipfsLinks,
            });
        case types.SAVED_BETS_FETCHED:
            return state.merge({
                savedBets: action.savedBets,
            });
        case types.OPEN_BETS_PAGE:
            return state.merge({
                openBetsPage: true,
            });
        case types.CLOSE_BETS_PAGE:
            return state.merge({
                openBetsPage: false,
            });
        default:
            return state;
    }
}

// selectors

export function getMatches(state) {
    return state.matches.matches;
}
export function getFlatMatches(state) {
    return state.matches.flatMatches;
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

export function getIpfsLinks(state) {
    return state.matches.ipfsLinks;
}

export function getSavedBets(state) {
    return state.matches.savedBets;
}

export function getOpenBetsPage(state) {
    return state.matches.openBetsPage;
}

export function getPhaseFromGameNumber(i) {
    if (i < 48) {
        return 'groups';
    }
    else if (i < 56) {
        return 'round_16';
    }
    else if (i < 60) {
        return 'round_8';
    }
    else if (i < 62) {
        return 'round_4';
    }
    else if (i < 64) {
        return 'round_2';
    }
    return 'unknown'
}

export function calculateMatchPoints(match, savedBets, phase) {
    if (savedBets === undefined) {
        return undefined;
    }
    // debugger;
    let matchNum = match.name;
    let matchId = matchNum - 1;

    let homeResult = match.home_result;
    let awayResult = match.away_result;
    if (homeResult === undefined || awayResult === undefined || homeResult === null || awayResult === null) {
        return undefined;
    }
    // let homeResult = match.home_result;

    let savedBet = savedBets[matchId];
    let homeBet = (savedBet !== undefined && _.has(savedBet, 'homeBet')) ? savedBet.homeBet : undefined;
    let awayBet = (savedBet !== undefined && _.has(savedBet, 'awayBet')) ? savedBet.awayBet : undefined;


    if (homeBet === undefined || awayBet === undefined) {
        return undefined;
    }

    if (phase === 'groups') {

        // 10 points if you predict the exact score
        if (homeBet === homeResult && awayBet === awayResult) {
            return 10;
        }

        // 5 points if you predict the winner
        if ((homeBet > awayBet && homeResult > awayResult) || (awayBet > homeBet && awayResult > homeResult)) {
            return 5;
        }

        // 3 points if you predict a draw
        if ((homeBet === awayBet && homeResult === awayResult)) {
            return 3;
        }
        return 0;
    }
    else {
        // let winnerBet = (savedBet !== undefined && _.has(savedBet[match.name - 1], 'winnerBet')) ? savedBet[match.name - 1].winnerBet : undefined;
        let winnerBet = (savedBet !== undefined && _.has(savedBet, 'winnerBet')) ? savedBet.winnerBet : undefined;

        let points = 0;

        // 10 points if you predict the exact score
        if (homeBet === homeResult && awayBet === awayResult) {
            points = 10;
        }

        // predict the correct winner
        if ((winnerBet === 'home' && match.winner === match.home_team) || (winnerBet === 'away' && match.winner === match.away_team)) {
            points += 5;
        }

        // if (matchNum === 49)
        //     debugger;
        return points;
    }
}

export function calculatePoints(matches, bets, phase) {
    if (matches === undefined) {
        return 0;
    }
    let totalPoints = 0;
    for (let i = 0; i < 64; i++) {
        let phaseI = getPhaseFromGameNumber(i);
        if (phaseI === phase) {
            // debugger;
            let match = matches[i];
            if (match === undefined) {
                debugger;
            }
            let points = calculateMatchPoints(match, bets, phase);

            totalPoints += points !== undefined ? points : 0;
        }
    }
    return totalPoints;
}
