import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    notif: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.SHOW_NOTIF:
            return state.merge({
                notif: action.notif,
            });
        case types.REMOVE_NOTIF:
            return state.merge({
                notif: undefined,
            });
        default:
            return state;
    }
}

export function getNotif(state) {
    return state.notifications.notif;
}
