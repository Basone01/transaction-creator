import { compose, withState, lifecycle, withProps } from 'recompose';
import { Link } from 'react-router-dom';
import { Query } from 'parse';
import React from 'react';

import { FlexDown, Scroller, Flex } from '../../sharedStyle';
import Transaction from '../../parse/Transaction';
import TransactionItem from './transactionItem';

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
		<FlexDown style={{ flexGrow:1 }}>
			<Flex ait="center" jc="space-between">
				<Link to="/">Add</Link>
				<h2 style={{ textAlign: 'center' }}>Transaction List</h2>
				<span>.....</span>
			</Flex>
			<Scroller>{props.transactionsList}</Scroller>
		</FlexDown>
	);
};

export default enhance(TransactionList);
