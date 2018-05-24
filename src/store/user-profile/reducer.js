import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    userProfile: {
        ethAddress: '',//'0xee7e80908d1c146495acbd40a20f35d1a9571219',
        ethNetwork: '',
        name: '',
        email: '',
        avatar: '',
    },
    isFetched: false,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.USER_FETCHED:
            return state.merge({
                userProfile: action.userProfile,
                isFetched: true
            });
        default:
            return state;
    }
}

// selectors

export function isFetched(state) {
    return state.userProfile.isFetched;
}


export function getEthAddress(state) {
    const userProfile = state.userProfile.userProfile;
    return userProfile.ethAddress;
}
export function getEthNetwork(state) {
    const userProfile = state.userProfile.userProfile;
    return userProfile.ethNetwork;
}
export function getName(state) {
    const userProfile = state.userProfile.userProfile;
    return userProfile.name;
}
export function getEmail(state) {
    const userProfile = state.userProfile.userProfile;
    return userProfile.email;
}
export function getAvatar(state) {
    const userProfile = state.userProfile.userProfile;
    return userProfile.avatar;
}