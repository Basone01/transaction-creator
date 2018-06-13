import { compose, withState, lifecycle, withProps } from 'recompose';
import { Link } from 'react-router-dom';
import { Query } from 'parse';
import React from 'react';

import { FlexDown, Scroller, Flex } from '../../sharedStyle';
import { Transaction } from '../../parse';
import TransactionItem from './transactionItem';
import { LoadingSpinner } from '../../components';

const enhance = compose(
	withState('transactions', 'setTransactions', []),
	withState('isLoading', 'setLoading', false),
	lifecycle({
		async componentDidMount() {
			this.props.setLoading(true);
			const query = new Query(Transaction);
			query.containedIn('transactionType', [
				101,
				102,
				103
			]);
			try {
				const transactions = await query.include('brandSocialAccount', 'socialAccount').find();
				console.log(transactions);
				this.props.setTransactions(transactions);
				this.props.setLoading(false);
			} catch (error) {
				this.props.setLoading(false);
				console.log(error);
			}
		}
	}),
	withProps((props) => ({
		transactionsList:
			props.transactions.length > 0 ? (
				props.transactions.map((transaction, i) => <TransactionItem key={i} {...transaction.attributes} />)
			) : (
				<span style={{ textAlign: 'center' }}>no transaction available</span>
			)
	}))
);

const TransactionList = (props) => {
	const { transactionsList, isLoading } = props;
	return (
		<FlexDown style={{ flexGrow: 1 }}>
			<Flex ait="center" jc="space-between" style={{ flexShrink: 0 }}>
				<Link to="/">Add</Link>
				<h3 style={{ textAlign: 'center' }}>Transaction List</h3>
				<span>.....</span>
			</Flex>
			{isLoading ? (
				<LoadingSpinner isDisplay={isLoading} />
			) : (
				<Scroller childUnderline>{transactionsList}</Scroller>
			)}
		</FlexDown>
	);
};

export default enhance(TransactionList);
