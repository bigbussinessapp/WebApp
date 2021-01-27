import React from 'react';
// import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Transaction from '../containers/Transaction';
import Header from './Header/Header';
import NotFound from './NotFound';
import { TransactionsTable } from './Tables/TransactionsTable';

// this function routes through different components by checking urlpath.
function Routes() {
    return (
        <Switch>
            <Route exact path='/' component={Header} />
            <Route exact path='/transaction' component={Transaction} />
            <Route exact path='/table' component={TransactionsTable} />
            <Route path='*' component={NotFound} />
        </Switch>
    )
}

export default Routes
