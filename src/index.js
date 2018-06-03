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
import Home from './components/Home';
import ContestDetails from './components/contest-details/ContestDetails';
import Rules from './components/Rules';


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

const test = function (component) {
    return (
        <div>
            <p>ola</p>
            {component}
        </div>
    )
}

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="/contest/:address" component={ContestDetails} />
                <Route path="/contest/:address/bet" component={PhasesContainer} />
                <Route path="/contest/:address/rules" component={Rules} />
            </Route>
        </Router>
    </Provider>
),
    document.getElementById('root')
)
