import _ from 'lodash';

import * as types from './actionTypes';
import * as userProfileSelectors from './reducer';

import * as createEventActions from '../create-event/actions';
import * as createEventSelectors from '../create-event/reducer';

import { loginUserUport } from '../../ethereum/uport/uport-user-profile';

// import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
// import { createEvent } from '../../ethereum/contracts/TaigaEventFactory';


export function loginUser(userLoggedInCallback = () => {}) {
    return async (dispatch, getState) => {
        try {
            if (!userProfileSelectors.isFetched(getState())) {
                let userProfile = await loginUserUport();

                dispatch({ type: types.USER_FETCHED, userProfile });
                
            }
            userLoggedInCallback();
        } catch (error) {
            console.error(error);
        }
    };
}
