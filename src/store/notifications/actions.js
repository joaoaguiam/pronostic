import _ from 'lodash';

import * as types from './actionTypes';
import * as notificationsSelectors from './reducer';

export function addNotification(message) {
    return async (dispatch, getState) => {
        try {
            let queue = _.clone(notificationsSelectors.getQueue(getState()));
            queue.push({
                message,
                key: new Date().getTime(),
            });
            dispatch({ type: types.ADD_NOTIF, queue });
        } catch (error) {
            console.error(error);
        }
    };
}