import _ from 'lodash';

import * as types from './actionTypes';
import * as userProfileSelectors from './reducer';

// import { loginUserUport } from '../../ethereum/uport/uport-user-profile';

// import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
// import { createEvent } from '../../ethereum/contracts/TaigaEventFactory';

import web3 from '../../helpers/web3/Web3Helper';

import * as matchesActions from '../matches/actions';

// export function loginUser(userLoggedInCallback = () => { }) {
//     return async (dispatch, getState) => {
//         try {
//             if (!userProfileSelectors.isFetched(getState())) {
//                 let userProfile = await loginUserUport();

//                 dispatch({ type: types.USER_FETCHED, userProfile });

//             }
//             userLoggedInCallback();
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }

let _fetchEthereumAccount = async (dispatch, getState) => {
    let currentAddres = userProfileSelectors.getAddress(getState());
    try {
        let address = await web3.eth.getCoinbaseAsync();

        if (currentAddres === address) {
            return;
        }
        if (currentAddres !== '') {
            location.reload();
            return;
            // matchesActions.closeBetsPage();
        }

        

        web3.eth.defaultAccount = address;

        let balanceWei = (await web3.eth.getBalanceAsync(address)).toNumber();
        let balanceEther = web3.fromWei(balanceWei, 'Ether');

        let networkId = await web3.version.getNetworkAsync();
        let network;
        switch (networkId) {
            case "1":
                network = "Main";
                break;
            case "2":
                network = "Morden";
                break;
            case "3":
                network = "Ropsten";
                break;
            case "4":
                network = "Rinkeby";
                break;
            case "42":
                network = "Kovan";
                break;
            default:
                network = "Unknown";
        }

        // if(userProfileSelectors.isMetamaskBlocked()) {
        //     debugger;
        //     window.location.reload();
        //     return;
        // }

        dispatch({ type: types.USER_FETCHED, address, balanceWei, balanceEther, network });
    }
    catch (error) {
        dispatch({ type: types.METAMASK_BLOCKED });

    }
}


export function fetchEthereumAccount() {
    return async (dispatch, getState) => {
        try {
            _fetchEthereumAccount(dispatch, getState);
            let _dispatch = dispatch;
            let _getState = getState;

            web3.currentProvider.publicConfigStore.on('update', () => {
                // debugger;
                _fetchEthereumAccount(_dispatch, _getState);
            });


        } catch (error) {
            console.error(error);
        }
    };
}


export function showUserProfileDialog() {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SHOW_USER_DIALOG, showUserProfileDialog: true });
        } catch (error) {
            console.error(error);
        }
    };
}

export function hideUserProfileDialog() {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SHOW_USER_DIALOG, showUserProfileDialog: false });
        } catch (error) {
            console.error(error);
        }
    };
}