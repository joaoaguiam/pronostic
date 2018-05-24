import _ from 'lodash';
import { uport } from '../uport/uport-connectors'
import { MNID } from 'uport-connect'


export async function loginUserUport() {
    return new Promise(
        (resolve, reject) => {
            uport.requestCredentials({
                requested:['name','avatar','email','test'],
                notifications: true
            }).then((credentials) => {
                const decodedId = MNID.decode(credentials.address);
                let userProfile = {
                    ethAddress: decodedId.address,
                    ethNetwork: decodedId.network,
                    name: credentials.name,
                    avatar: credentials.avatar,
                }
                resolve(userProfile);
            })
        }
    )
}
