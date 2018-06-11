import React from 'react';
import { compose, withState, lifecycle, withProps } from 'recompose';
import Transaction from '../../parse/Transaction';
import Parse, { Query } from 'parse';
import TransactionItem from './transactionItem';
import { TransactionListContainer } from './styled';

const enhance = compose(
	withState('transactions', 'setTransactions', []),
	lifecycle({
		async componentDidMount() {
			const query = new Query(Transaction);
			const transactions = await query.include('brandSocialAccount', 'socialAccount').find();
			this.props.setTransactions(transactions);
		}
	}),
	withProps((props) => ({
		transactionsList: props.transactions.map((transaction, i) => (
			<TransactionItem key={i} {...transaction.attributes} />
		))
	}))
);

const TransactionList = (props) => {
	return <TransactionListContainer>
        <h1 style={{textAlign:'center'}}>Transaction List</h1>
        {props.transactionsList}
    </TransactionListContainer>;
};

export default enhance(TransactionList);
