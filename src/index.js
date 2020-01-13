import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import {AUTH_SUCCESS} from './actions/types';

//Make sure that we can connect with redux-dev-tools
const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnchancers(applyMiddleware(reduxThunk))
);

const user = localStorage.getItem('user');
if(user){
    store.dispatch({type: AUTH_SUCCESS});
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);