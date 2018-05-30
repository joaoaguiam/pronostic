import _ from 'lodash';

import * as types from './actionTypes';
import * as wcwagerSelectors from './reducer';

import web3 from '../../helpers/web3/Web3Helper';
import * as WCwagers from '../../contracts/WCwagers';

export function fetchParticipants(wcwagersAddress) {
    return async (dispatch, getState) => {
        try {

            let participants = await WCwagers.getParticipants(wcwagersAddress);

            dispatch({ type: types.PARTICIPANTS_FETCHED, participants});
        } catch (error) {
            console.error(error);
        }
    };
}



export function registerParticipant(wcwagersAddress) {
    return async (dispatch, getState) => {
        try {

            await WCwagers.registerParticipant(wcwagersAddress);

            dispatch(fetchParticipants(wcwagersAddress));
            // dispatch({ type: types.PARTICIPANTS_FETCHED, participants});
        } catch (error) {
            console.error(error);
        }
    };
}



0x1e0b778e6e3b2924a3715fc785d83ec8509c1009