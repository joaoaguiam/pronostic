import _ from 'lodash';

import * as types from './actionTypes';
import * as showCampaingSelectors from './reducer';
import { getPixel4ImpactDetails, donatePixel } from '../../ethereum/contracts/Pixel4Impact';
// import { getPixel4ImpactDetails } from '../../ethereum/contracts/Pixel4Impact';
// import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
// import { createPixel4Impact } from '../../ethereum/contracts/Pixel4ImpactFactory';

export function fetchCampaing(address) {
    return async (dispatch, getState) => {
        try {

            let campaign = await getPixel4ImpactDetails(address);
            console.log(campaign);
            
            dispatch({ type: types.CAMPAIGN_FETCHED, campaign});
            dispatch({ type: types.STATUS_UPDATED, newStatus: showCampaingSelectors.DONATION_STATUS.DRAFT});
            dispatch({ type: types.TX_HASH_UPDATED, txHash: undefined});
        } catch (error) {
            console.error(error);
        }
    };
}

export function updateStatus(newStatus) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.STATUS_UPDATED, newStatus});
        } catch (error) {
            console.error(error);
        }
    };
}

export function updateTxHash(txHash) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.TX_HASH_UPDATED, txHash});
        } catch (error) {
            console.error(error);
        }
    };
}
export function confirmDonationOnBlockchain(address, pixel, color, donation) {
    return async (dispatch, getState) => {
        try {
            dispatch(updateStatus(showCampaingSelectors.DONATION_STATUS.CONFIRMED));
            donatePixel(address, pixel.x, pixel.y, color, donation, dispatch);            
        } catch (error) {
            console.error(error);
        }
    };
}