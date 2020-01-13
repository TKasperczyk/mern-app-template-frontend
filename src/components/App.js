import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import history from '../history';

import Home from './Home';
import LogIn from './LogIn';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/login" exact component={LogIn}></Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;