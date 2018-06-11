import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import { AppContainer } from './sharedStyle';
import TransactionForm from './container/transactionForm/';
import TransactionList from './container/transactionList/';

class App extends Component {
	render() {
		return (
			<AppContainer>
				<Switch>
					<Route exact path="/" component={TransactionForm} />
					<Route exact path="/transactions" component={TransactionList} />
					<Redirect to="/" />
				</Switch>
			</AppContainer>
		);
	}
}

export default App;
