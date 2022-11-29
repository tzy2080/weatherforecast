import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './pages/Home'

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={ Home } />
            </Switch>
        </Router>
    )
}

export default Routes;