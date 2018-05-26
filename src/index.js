import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

// import ReactGA from 'react-ga';
import App from './App'

import * as reducers from './store/reducers';
import PhasesContainer from './components/phases/PhasesContainer';


const initStore = (reducer, initialState) => {
    if (typeof window === 'undefined') {
        return createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunk)));
    } else {
        if (!window.store) {
            window.store = createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunk)));
        }
        return window.store
    }
}
const store = initStore();


const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={PhasesContainer} />
                {/* <Route path="show-campaign/:address" component={ShowCampaign} />
                <Route path="create-campaign" component={CreateCampaign} />
                <Route path="home" component={Home} /> */}
            </Route>
        </Router>
    </Provider>
),
    document.getElementById('root')
)
