import { routerReducer as routing } from 'react-router-redux'

import userProfile from './user-profile/reducer';
import matches from './matches/reducer';
import wcwagers from './wc-wagers/reducer';
import notifications from './notifications/reducer';

export {
    routing, 
    userProfile,
    matches,
    wcwagers,
    notifications,
};