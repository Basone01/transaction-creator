import React from 'react';
import { compose, withState, lifecycle, withProps } from 'recompose';
import Transaction from '../../parse/Transaction';
import { Query } from 'parse';
import TransactionItem from './transactionItem';
import { TransactionListContainer, Scroller } from './styled';

const enhance = compose(
	withState('transactions', 'setTransactions', []),
	lifecycle({
		async componentDidMount() {
			const query = new Query(Transaction);
			try {
				const transactions = await query.include('brandSocialAccount', 'socialAccount').find();
				console.log(transactions);
				this.props.setTransactions(transactions);
			} catch (error) {
				console.log(error);
			}
		}
	}),
	withProps((props) => ({
		transactionsList: props.transactions.map((transaction, i) => (
			<TransactionItem key={i} {...transaction.attributes} />
		))
	}))
);

const TransactionList = (props) => {
	return (
		<TransactionListContainer>
			<h2 style={{ textAlign: 'center' }}>Transaction List</h2>
			<Scroller>{props.transactionsList}</Scroller>
		</TransactionListContainer>
	);
};

export default enhance(TransactionList);
