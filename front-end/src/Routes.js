import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import GetForecast from './components/GetForecast/GetForecast';

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={ GetForecast } />
            </Switch>
        </Router>
    )
}

export default Routes;