import _ from 'lodash';

import * as types from './actionTypes';
import * as userProfileSelectors from './reducer';

// import { loginUserUport } from '../../ethereum/uport/uport-user-profile';

// import { uploadObjectIpfs } from '../../helpers/ipfs/ipfs';
// import { createEvent } from '../../ethereum/contracts/TaigaEventFactory';

import web3 from '../../helpers/web3/Web3Helper';


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




export function fetchEthereumAccount() {
    return async (dispatch, getState) => {
        try {

            let address = await web3.eth.getCoinbaseAsync();

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

            dispatch({ type: types.USER_FETCHED, address, balanceWei, balanceEther, network });
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