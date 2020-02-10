import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import history from '../history';

import Home from './Home';
import SignIn from './SignIn';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/signin" exact component={SignIn}></Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;