import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

export const CAMPAIGN_STATUS = {
    DRAFT: 0,
    CONFIRMED: 1,
    WAITING_MINING: 2,
    CREATED: 3
}

const initialState = Immutable({
    newCampaign: {
        ngoName: '',
        campaignName: '',
        campaignWebsite: '',
        campaignLogo: '',
        xPixels: 0,
        yPixels: 0,
        minDonation: 0,
        metadataUri: '',
    },
    status: CAMPAIGN_STATUS.DRAFT,
    contractDetails: {
        txHash: undefined,
        address: undefined,
        owner: undefined
    },
    currentStep: 1
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.CREATE_CAMPAING:
            return state.merge({
                newCampaign: action.newCampaign
            });
        case types.NEW_CAMPAIGN_FIELD_UPDATED:
            return state.merge({
                newCampaign: action.newCampaign
            });
        // case types.MOVE_NEXT_STEP:
        //     return state.merge({
        //         currentStep: action.nextStep
        //     });
        // case types.MOVE_PREV_STEP:
        //     return state.merge({
        //         currentStep: action.prevStep
        //     });
        case types.STATUS_UPDATED:
            return state.merge({
                status: action.newStatus
            });
        case types.CONTRACT_DETAILS_UPDATED:
            return state.merge({
                contractDetails: action.contractDetails
            });
        default:
            return state;
    }
}

// selectors

export function getNewCampaign(state) {
    return state.createCampaign.newCampaign;
}

export function getStatus(state) {
    return state.createCampaign.status;
}

export function getContractDetails(state) {
    return state.createCampaign.contractDetails;
}