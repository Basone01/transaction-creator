import { Link } from 'react-router-dom';
import moment from 'moment';
import Parse from 'parse';
import React, { Component } from 'react';
import swal from 'sweetalert';

import { findInstagram } from '../../api';
import { BigButton, Scroller, FlexDown, Flex } from '../../sharedStyle';
import { BrandSocialAccount, SocialAccount, Transaction } from '../../parse';
import {
	DatePicker,
	ImageUploader,
	InputText,
	LoadingSpinner,
	SocialAccountDropdown,
	TransactionTypeSelect
} from '../../components';
class TransactionForm extends Component {
	state = {
		socialAccounts: [],
		selectedSocialAccount: null,
		amount: 0,
		date: moment(),
		recipient: '',
		brandSocialAccountInput: '',
		transferSlipFile: '',
		transactionType: 101,
		error: '',
		isLoading: false
	};

	constructor(props) {
		super(props);
		this.file = null;
		this.add = this.submitOrder.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.submitOrder = this.submitOrder.bind(this);
		this.reset = this.reset.bind(this);
	}

	async componentDidMount() {
		const Query = new Parse.Query(SocialAccount);
		try {
			const socialAccounts = await Query.find();
			this.setState({ socialAccounts: socialAccounts });
		} catch (error) {
			console.error(error);
		}
	}

	validateData() {
		const { selectedSocialAccount, amount, recipient, transferSlipFile, brandSocialAccountInput } = this.state;

		if (!selectedSocialAccount) {
			const errorMessage = 'No social account selected';
			this.setState({
				error: errorMessage
			});
			return errorMessage;
		}
		if (!amount) {
			const errorMessage = 'Amount is 0';
			this.setState({
				error: errorMessage
			});
			return errorMessage;
		}
		if (!recipient) {
			const errorMessage = 'No recipient specified';
			this.setState({
				error: errorMessage
			});
			return errorMessage;
		}
		if (!brandSocialAccountInput) {
			const errorMessage = 'No brand specified';
			this.setState({
				error: errorMessage
			});
			return errorMessage;
		}
		if (!transferSlipFile) {
			const errorMessage = 'No slip uploaded';
			this.setState({
				error: errorMessage
			});
			return errorMessage;
		}

		return false;
	}

	async submitOrder() {
		const { brandSocialAccountInput } = this.state;
		const err = this.validateData();
		if (err) {
			return alert(err);
		}
		this.setState({ isLoading: true });
		const brandUsername = brandSocialAccountInput.toLowerCase();
		const BrandQuery = new Parse.Query(BrandSocialAccount);
		BrandQuery.equalTo('username', brandUsername);
		try {
			let brand = await BrandQuery.first();
			if (!brand) {
				const brandIG = await findInstagram(brandUsername);
				if (brandIG.found) {
					const { followed_by, instagramId } = brandIG;
					const creatingBrandData = new BrandSocialAccount();
					creatingBrandData.set('username', brandUsername);
					creatingBrandData.set('followers', followed_by);
					creatingBrandData.set('socialAccountId', instagramId);
					const createdBrandData = await creatingBrandData.save();
					brand = createdBrandData;
				}
				else {
					this.setState((state, props) => {
						return { isLoading: false };
					});
					return alert(`Instagram Account Doesn't Exist!`);
				}
			}
			const selfRef = this;
			this.setState(
				(state) => ({
					brandSocialAccount: brand
				}),
				() => {
					const order = new Transaction();
					order.selectAndSetValueFromState({ ...this.state, date: this.state.date.toISOString() });
					order.save(null, {
						success: function(order) {
							selfRef.reset();
							swal({
								title: 'OK!',
								text: 'Order Created',
								icon: 'success',
								button: 'OK'
							});
							console.log(order);
						},
						error: function(order, error) {
							selfRef.setState({ isLoading: false });
							alert('Failed to create new object, with error code: ' + error.message);
							console.log(order, error);
						}
					});
				}
			);
		} catch (error) {
			console.log(error);
			this.setState({ isLoading: false });
		}
	}

	reset() {
		this.setState((state) => ({
			selectedSocialAccount: null,
			amount: 0,
			date: moment(),
			recipient: '',
			brandSocialAccountInput: '',
			transferSlipFile: '',
			transactionType: 61,
			error: '',
			isLoading: false
		}));
	}

	onInputChange(e) {
		let value =
			e.target.type === 'number' || e.target.name === 'transactionType' ? Number(e.target.value) : e.target.value;

		this.setState({
			[e.target.name]: value,
			error: {
				...this.state.error,
				[e.target.name]: ''
			}
		});
	}

	onImageChange(file) {
		console.log(file._url)
		this.setState({
			transferSlipFile: file
		});
	}

	onImageClick() {
		this.setState({
			transferSlipFile: ''
		});
	}

	onSelectAccount(data) {
		this.setState({
			selectedSocialAccount: data
		});
	}

	render() {
		const {
			socialAccounts,
			amount,
			date,
			recipient,
			brandSocialAccountInput,
			transactionType,
			isLoading,
			transferSlipFile
		} = this.state;
		return (
			<FlexDown>
				<Flex ait="center" jc="space-between" style={{ flexShrink: 0 }}>
					<Link to="/transactions">List</Link>
					<h3 style={{ textAlign: 'center' }}>Transaction Creator</h3>
					<span>.....</span>
				</Flex>
				<LoadingSpinner isDisplay={isLoading} />
				<Scroller childMargin={12}>
					<SocialAccountDropdown
						socialAccounts={socialAccounts}
						onSelect={(data) => this.onSelectAccount(data)}
					/>
					<InputText
						label="Amount :"
						name="amount"
						type="number"
						placeholder="฿ Amount"
						min={0}
						value={amount === 0 ? '' : amount}
						onChange={this.onInputChange}
					/>
					<DatePicker label="Date :" value={date} onChange={(newDate) => this.setState({ date: newDate })} />
					<InputText
						label="Recipient :"
						name="recipient"
						placeholder="Recipient"
						type="text"
						value={recipient}
						onChange={this.onInputChange}
					/>
					<InputText
						label="Brand Social Account :"
						name="brandSocialAccountInput"
						placeholder="Brand Social Account"
						type="text"
						value={brandSocialAccountInput}
						onChange={this.onInputChange}
					/>

					<TransactionTypeSelect
						name="transactionType"
						label="Transaction Type :"
						value={transactionType}
						onChange={this.onInputChange}
					/>
					<ImageUploader
						name="transferSlipFile"
						value={transferSlipFile}
						onImageChange={(file) => this.onImageChange(file)}
						onImageClick={() => this.onImageClick()}
					/>

					<BigButton onClick={this.submitOrder} style={{ margin: '0 24px' }}>
						Submit
					</BigButton>
					<BigButton onClick={this.reset} style={{ margin: '12px 24px', opacity: 0.5 }}>
						Reset
					</BigButton>
				</Scroller>
			</FlexDown>
		);
	}
}

export default TransactionForm;
