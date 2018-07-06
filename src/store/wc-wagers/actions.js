import _ from 'lodash';

import * as types from './actionTypes';
import * as wcwagersSelectors from './reducer';
import * as matchesSelectors from '../matches/reducer';
import * as matchesActions from '../matches/actions';
import * as userProfileSelectors from '../user-profile/reducer';

import * as WCwagers from '../../contracts/WCwagers';
import moment from 'moment-timezone';



import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
import { writeUrl } from '../../contracts/WCwagers';

export function fetchParticipants(wcwagersAddress) {
    return async (dispatch, getState) => {

        try {
            let details = await WCwagers.getContestInfo(wcwagersAddress);

            let user = userProfileSelectors.getAddress;
            details.isOwner = details.owner === user;
            dispatch({ type: types.CONTEST_DETAILS, details });

            let participants = await WCwagers.getParticipants(wcwagersAddress);

            dispatch({ type: types.PARTICIPANTS_FETCHED, participants });
            dispatch(loadOtherParticipantBets());
        } catch (error) {
            console.error(error);
        }
    };
}

export function registerParticipant(nickname) {
    return async (dispatch, getState) => {
        try {
            let contestDetails = wcwagersSelectors.getContestDetails(getState());
            let wcwagersAddress = wcwagersSelectors.getAddress(getState());
            await WCwagers.registerParticipant(wcwagersAddress, contestDetails, nickname, dispatch);

            dispatch(fetchParticipants(wcwagersAddress));
        } catch (error) {
            console.error(error);
        }
    };
}

export function setContractAddress(wcwagersAddress) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_CONTRACT_ADDRESS, address: wcwagersAddress });
            dispatch(fetchParticipants(wcwagersAddress));
            dispatch(loadPhasesDates());
            dispatch(loadBetsSubmitted());
        } catch (error) {
            console.error(error);
        }
    };
}

export function showContestDetailsDialog() {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SHOW_CONTEST_DETAILS_DIALOG, showContestDetailsDialog: true });
        } catch (error) {
            console.error(error);
        }
    };
}

export function hideContestDetailsDialog() {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SHOW_CONTEST_DETAILS_DIALOG, showContestDetailsDialog: false });
        } catch (error) {
            console.error(error);
        }
    };
}

export function setParticipantRegistrationTxStatus(status) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.PARTICIPANT_REGISTRATION_TX_STATUS, status });
        } catch (error) {
            console.error(error);
        }
    };
}

export function setBetsTxStatus(status) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.BETS_TX_STATUS, status });
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
                contractPhase = wcwagersSelectors.subPhaseIdToSCPhase(phase);
            }
            else {
                ipfsLinks[subPhase] = url;
                contractPhase = wcwagersSelectors.subPhaseIdToSCPhase(subPhase);
            }

            let address = wcwagersSelectors.getAddress(getState());
            await writeUrl(address, url, contractPhase, dispatch);
            dispatch(loadBetsSubmitted());
        } catch (error) {
            console.error(error);
        }
    };
}

export function loadPhasesDates() {
    return async (dispatch, getState) => {
        try {
            let address = wcwagersSelectors.getAddress(getState());
            let allPhases = wcwagersSelectors.getAllPhases();
            let phasesDates = {};
            for (let i = 0; i < allPhases.length; i++) {
                let phase = allPhases[i];
                let phaseDate = await WCwagers.getPhaseDate(address, phase.smartcontract);
                phasesDates[phase.json] = phaseDate;
            }
            // phasesDates['round_16'] = 1527915600;
            console.log(phasesDates);
            dispatch({ type: types.PHASES_DATES_FETCHED, phasesDates });

        } catch (error) {
            console.error(error);
        }
    };
}

export function loadBetsSubmitted() {
    return async (dispatch, getState) => {
        try {
            let address = wcwagersSelectors.getAddress(getState());
            console.log("ADDRESS: " + address);
            let allPhases = wcwagersSelectors.getAllPhases();
            let betsSubmitted = {};
            for (let i = 0; i < allPhases.length; i++) {
                let phase = allPhases[i];
                let url = await WCwagers.getOwnURL(address, phase.smartcontract);
                console.log('WCwagers.getOwnURL(' + address + ', ' + phase.smartcontract + ') = ' + url);
                // url = await WCwagers.getOwnURL(address, phase.smartcontract);
                // console.log('WCwagers.getOwnURL(' + address + ', ' + phase.smartcontract + ') = '+url);
                // debugger;
                betsSubmitted[phase.json] = url;
            }
            // phasesDates['round_16'] = 1527915600;
            console.log(betsSubmitted);
            dispatch({ type: types.BETS_SUBMITTED_FETCHED, betsSubmitted });
            dispatch(matchesActions.fetchSavedBets());
        } catch (error) {
            console.error(error);
        }
    };
}

export function toggleTimePast() {
    return async (dispatch, getState) => {
        try {
            let address = wcwagersSelectors.getAddress(getState());

            await WCwagers.toggleTimePast(address);

        } catch (error) {
            console.error(error);
        }
    };
}


export function loadOtherParticipantBets() {
    return async (dispatch, getState) => {
        try {
            let address = wcwagersSelectors.getAddress(getState());

            let allPhases = wcwagersSelectors.getAllPhases(getState());
            let phasesDates = wcwagersSelectors.getPhaseDates(getState());
            let participants = wcwagersSelectors.getParticipants(getState());
            let otherParticipantsBets = {};
            let currentTime = moment();
            let matches = matchesSelectors.getFlatMatches(getState());

            let currentWinners = [];
            let winnerScore = 0;
            for (let i = 0; i < participants.length; i++) {
                let participant = participants[i];
                console.log("Participant: " + participant.address);
                let betsSubmitted = {
                    groups: undefined,
                    round_16: undefined,
                    round_8: undefined,
                    round_4: undefined,
                    round_2: undefined
                };
                let participantPoints = 0;
                for (let j = 0; j < allPhases.length; j++) {
                    let phase = allPhases[j];

                    let phaseDate = moment.unix(phasesDates[phase.json]);
                    if (phaseDate.isBefore(currentTime)) {

                        let url = await WCwagers.getURL(address, participant.address, phase.smartcontract);

                        let response = await fetch(url);
                        console.log(url);
                        // debugger;
                        let bets = undefined;
                        try {
                             bets = await response.json();
                        }
                        catch (error) {
                            // debugger;
                        }
                        let points = bets ? matchesSelectors.calculatePoints(matches, bets, phase.json) : 0;
                        participantPoints += points;
                        // debugger;
                        betsSubmitted[phase.json] = {
                            url,
                            bets,
                            points
                        };
                    }
                }

                otherParticipantsBets[participant.address] = {
                    betsSubmitted,
                    points: participantPoints,
                };

                // set winner
                if (participantPoints > winnerScore) {
                    currentWinners = [participant];
                    winnerScore = participantPoints;
                }
                else if (participantPoints === winnerScore) {
                    currentWinners.push(participant);
                }
            };

            console.log(otherParticipantsBets);
            dispatch({ type: types.OTHER_PARTICIPANTS_BETS_FETCHED, otherParticipantsBets, currentWinners });
        } catch (error) {
            console.error(error);
        }
    };
}

export function payWinners() {
    return async (dispatch, getState) => {
        try {
            let winners = wcwagersSelectors.getCurrentWinners(getState());
            let address = wcwagersSelectors.getAddress(getState());
            let contractBalance = await WCwagers.getBalanceWei(address);
            let ammountPayee = Math.floor(contractBalance / winners.length);
            for (let i = 0; i < winners.length; i++) {
                let winner = winners[i];
                WCwagers.payWinner(address, winner.address, winner.nickname, ammountPayee, dispatch);
            }
        } catch (error) {
            console.error(error);
        }
    };
}


export function showMatchPredictionsDialog(matchNumber) {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SHOW_MATCH_PREDICTIONS_DIALOG, showMatchPredictionsDialog: matchNumber });
        } catch (error) {
            console.error(error);
        }
    };
}

export function hideMatchPredictionsDialog() {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SHOW_MATCH_PREDICTIONS_DIALOG, showMatchPredictionsDialog: 0 });
        } catch (error) {
            console.error(error);
        }
    };
}