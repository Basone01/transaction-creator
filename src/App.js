import React, { Component } from 'react';
import TransactionForm from './container/transactionForm/';
import TransactionList from './container/transactionList/';

import { Switch, Route, Redirect } from 'react-router-dom';
class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={TransactionForm} />
				<Route exact path="/transactions" component={TransactionList} />
				<Redirect to="/" />
			</Switch>
		);
	}
}

export default App;
