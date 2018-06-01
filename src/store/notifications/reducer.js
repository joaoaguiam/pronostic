import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    queue: []
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD_NOTIF:
        case types.REMOVE_NOTIF:
            return state.merge({
                queue: action.queue,
            });
        default:
            return state;
    }
}

export function getQueue(state) {
    return state.notifications.queue;
}
