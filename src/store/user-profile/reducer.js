import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    address: '',
    balanceWei: '',
    balanceEther: '',
    network: '',
    isFetched: false,
    showUserProfileDialog: false,
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.USER_FETCHED:
            return state.merge({
                address: action.address,
                balanceEther: action.balanceEther,
                balanceWei: action.balanceWei,
                network: action.network,
                isFetched: true,
            });
        case types.SHOW_USER_DIALOG:
            return state.merge({
                showUserProfileDialog: action.showUserProfileDialog
            });
        default:
            return state;
    }
}

export function isFetched(state) {
    return state.userProfile.isFetched;
}

export function getAddress(state) {
    return state.userProfile.address;
}
export function getBalanceWei(state) {
    return state.userProfile.balanceWei;
}
export function getBalanceEther(state) {
    return state.userProfile.balanceEther;
}
export function getNetwork(state) {
    return state.userProfile.network;
}
export function isShowUserProfileDialog(state) {
    return state.userProfile.showUserProfileDialog;
}
