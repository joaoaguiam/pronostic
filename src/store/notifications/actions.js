import _ from 'lodash';

import * as types from './actionTypes';
import * as notificationsSelectors from './reducer';

export function addNotification(message) {
    return async (dispatch, getState) => {
        try {
            let notif = {
                message,
                key: new Date().getTime(),
            };
            dispatch({ type: types.REMOVE_NOTIF });
            dispatch({ type: types.SHOW_NOTIF, notif });
        } catch (error) {
            console.error(error);
        }
    };
}

export function removeNotification() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.REMOVE_NOTIF });
        } catch (error) {
            console.error(error);
        }
    };
}