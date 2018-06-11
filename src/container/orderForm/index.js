import Parse from 'parse';
import React, { Component } from 'react';

import { findInstagram } from '../../api';
import { FormContainer, Button } from './styled';
import BrandSocialAccount from '../../parse/BrandSocialAccount';
import ImageUploader from '../../components/imageUploader';
import InputText from '../../components/inputText';
import SocialAccount from '../../parse/SocialAccount';
import SocialAccountDropdown from '../../components/socialAccountDropdown';
import Transaction from '../../parse/Transaction';

import LoadingSpinner from '../../components/spinner';
import DatePicker from '../../components/datePicker';
import moment from 'moment';
import swal from 'sweetalert';
class OrderForm extends Component {
	state = {
		socialAccounts: [],
		selectedSocialAccount: null,
		amount: 0,
		date: moment(),
		recipient: '',
		brandSocialAccountInput: '',
		transactionSlipFile: '',
		transactionType: 6,
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

	componentDidMount() {
		const Query = new Parse.Query(SocialAccount);
		Query.find({
			success: (results) => {
				this.setState({ socialAccounts: results });
			}
		});
	}

	validateData() {
		const {
			selectedSocialAccount,
			amount,
			date,
			recipient,
			transactionSlipFile,
			brandSocialAccountInput
		} = this.state;

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
		if (new Date(date) - new Date() < 0) {
			const errorMessage = 'Date must be in future';
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
		if (!transactionSlipFile) {
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
					order.selectAndSetValueFromState(this.state);
					console.log(order);
					order.save(null, {
						success: function(order) {
							selfRef.setState({ isLoading: false });
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
		this.setState({
			selectedSocialAccount: null,
			amount: 0,
			date: moment(),
			recipient: '',
			brandSocialAccountInput: '',
			transactionSlipFile: '',
			transactionType: 6,
			error: '',
			isLoading: false
		});
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
		this.setState({
			transactionSlipFile: file
		});
	}

	onImageClick() {
		this.setState({
			transactionSlipFile: ''
		});
	}

	onSelectAccount(data) {
		this.setState({
			selectedSocialAccount: data
		});
	}

	render() {
		const { socialAccounts, amount, date, recipient, brandSocialAccountInput, isLoading } = this.state;
		return (
			<FormContainer>
				<LoadingSpinner isDisplay={isLoading} />
				<h3 style={{ textAlign: 'center', marginBottom: 24 }}>Transaction Creator</h3>
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
				<DatePicker label="Date :" value={date} onChange={(newDate) => this.setState({ date:newDate })} />
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

				{/* <transactionTypeSelect name="transactionType" label="transactionType :" onChange={this.onInputChange} /> */}
				<ImageUploader
					name="transactionSlipFile"
					onImageChange={(file) => this.onImageChange(file)}
					onImageClick={() => this.onImageClick()}
				/>

				<Button onClick={this.submitOrder} style={{ margin: '0 24px' }}>
					Submit
				</Button>
				<Button onClick={this.reset} style={{ margin: '12px 24px', opacity: 0.5 }}>
					Reset
				</Button>
			</FormContainer>
		);
	}
}

export default OrderForm;
