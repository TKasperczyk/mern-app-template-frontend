import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import {AUTH_SUCCESS} from './actions/types';

export const getStore = ({initialState = {}} = {}) => {
    //Make sure that we can connect with redux-dev-tools
    const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        reducers,
        initialState,
        composeEnchancers(applyMiddleware(reduxThunk))
    );
};

export default ({children, initialState = {}}) => {
    const store = getStore({initialState});
    //Initiate the AUTH_SUCCESS action if the user is already logged in (e.g. when the page was refreshed)
    const user = localStorage.getItem('user');
    if(user){
        store.dispatch({type: AUTH_SUCCESS});
    }
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};