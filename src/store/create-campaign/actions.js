import _ from 'lodash';

import * as types from './actionTypes';
import * as createCampaingSelectors from './reducer';
import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
import { createPixel4Impact } from '../../ethereum/contracts/Pixel4ImpactFactory';
// import { createEvent } from '../../ethereum/contracts/TaigaEventFactory';

// import * as createTicketActions from '../create-ticket/actions';


export function updateNewCampaignField(fieldName, fieldValue) {
    return async (dispatch, getState) => {
        try {
            let newCampaign = _.clone(createCampaingSelectors.getNewCampaign(getState()));
            newCampaign[fieldName] = fieldValue;
            dispatch({ type: types.NEW_CAMPAIGN_FIELD_UPDATED, newCampaign, fieldName, fieldValue });
        } catch (error) {
            console.error(error);
        }
    };
}


// export function moveNextPage() {
//     return async (dispatch, getState) => {
//         try {
//             let nextStep = createEventSelectors.getCurrentStep(getState()) + 1;
//             dispatch({ type: types.MOVE_NEXT_STEP, nextStep});
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }

// export function movePrevPage() {
//     return async (dispatch, getState) => {
//         try {
//             let prevStep = createEventSelectors.getCurrentStep(getState()) - 1;
//             dispatch({ type: types.MOVE_PREV_STEP, prevStep});
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }

export function createCampaignOnBlockchain() {
    return async (dispatch, getState) => {
        try {
            dispatch(updateStatus(createCampaingSelectors.CAMPAIGN_STATUS.CONFIRMED));
            let campaign = _.clone(createCampaingSelectors.getNewCampaign(getState()));

            uploadObjectIpfs(campaign)
                .then(async (result) => {
                    let url = result.url;
                    campaign.metadataUri = url;
                    dispatch(updateNewCampaignField('metadataUri', url));
                    createPixel4Impact(campaign, dispatch);
                    //createCampaign(campaign, dispatch);
                    // let contractDetails = await createEvent(event, dispatch);
                    // dispatch(updateNewEventField('contractDetails', contractDetails));
                    // dispatch(updateStatus(createEventSelectors.EVENT_STATUS.CREATED));

                })
                .catch((err) => {
                    debugger;
                });
            
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

export function updateContractDetails(contractDetails) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.CONTRACT_DETAILS_UPDATED, contractDetails});
        } catch (error) {
            console.error(error);
        }
    };
}

// export function updateContraeventCreationCompletedctDetails() {
//     return async (dispatch, getState) => {
//         try {
//             let newEvent = createEventSelectors.getNewEvent(getState());
//             dispatch(createTicketActions.selectEvent(newEvent));
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }


