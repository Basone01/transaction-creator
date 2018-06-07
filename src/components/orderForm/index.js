import Parse from 'parse';
import React, { Component } from 'react';
import { findInstagram } from '../../api';
import { Flex, Button } from './styled';
import ImageUploader from './imageUploader';
import InputText from './inputText';
import Order from '../../parse/Order';
import SocialAccountDropdown from './socialAccountDropdown';
import SocialAccount from '../../parse/SocialAccount';
import BrandSocialAccount from '../../parse/BrandSocialAccount';
import Select from './select';
class OrderForm extends Component {
	state = {
		socialAccounts: [],
		selectedSocialAccount: null,
		value: 0,
		date: new Date(Date.now() + 1000 * 60 * 60 * 7).toISOString().substring(0, 16),
		recipient: '',
		brandSocialAccount: null,
		brandSocialAccountInput: '',
		slipFile: '',
		orderType: 1,
		error: ''
	};

	constructor(props) {
		super(props);
		this.file = null;
		this.add = this.submitOrder.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.submitOrder = this.submitOrder.bind(this);
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
		const { selectedSocialAccount, value, date, recipient, slipFile, brandSocialAccountInput } = this.state;

		if (!selectedSocialAccount) {
			const errorMessage = 'No social account selected';
			this.setState({
				error: errorMessage
			});
			return errorMessage;
		}
		if (!value) {
			const errorMessage = 'Value is 0';
			this.setState({
				error: errorMessage
			});
			return errorMessage;
		}
		if (new Date(date) - new Date(Date.now()) < 0) {
			const errorMessage = 'Date must be in future';
			this.setState({
				error: errorMessage
			});
			return errorMessage;
		}
		if (!slipFile) {
			const errorMessage = 'No slip uploaded';
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
		return false;
	}

	async submitOrder() {
		const { brandSocialAccountInput } = this.state;
		const err = this.validateData();
		if (err) {
			return alert(err);
		}
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
					creatingBrandData.set('follwers', followed_by);
					creatingBrandData.set('socialAccountId', instagramId);
					const createdBrandData = await creatingBrandData.save();
					brand = createdBrandData;
				}
			}

			this.setState(
				(state) => ({
					brandSocialAccount: brand
				}),
				() => {
					const order = new Order();
					order.selectAndSetValueFromState(this.state);
					order.save(null, {
						success: function(order) {
							alert('Order created with objectId: ' + order.id);
							console.log(order);
						},
						error: function(order, error) {
							alert('Failed to create new object, with error code: ' + error.message);
							console.log(order, error);
						}
					});
				}
			);
		} catch (error) {
			console.log(error);
		}
	}

	onInputChange(e) {
		let value =
			e.target.type === 'number' || e.target.name === 'orderType' ? Number(e.target.value) : e.target.value;

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
			slipFile: file
		});
	}

	onImageClick() {
		this.setState({
			slipFile: ''
		});
	}

	onSelectAccount(data) {
		this.setState({
			selectedSocialAccount: data
		});
	}

	render() {
		const { socialAccounts, value, date, recipient, brandSocialAccountInput } = this.state;

		return (
			<Flex style={{ padding: '0 12px' }}>
				<h3 style={{ textAlign: 'center' }}>Create Order</h3>
				<SocialAccountDropdown
					socialAccounts={socialAccounts}
					onSelect={(data) => this.onSelectAccount(data)}
				/>
				<InputText
					label="Value :"
					name="value"
					type="number"
					placeholder="Value"
					min={0}
					value={value === 0 ? '' : value}
					onChange={this.onInputChange}
				/>
				<InputText
					label="Date :"
					name="date"
					type="datetime-local"
					value={date}
					onChange={this.onInputChange}
				/>

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

				<ImageUploader
					name="slipFile"
					onImageChange={(file) => this.onImageChange(file)}
					onImageClick={() => this.onImageClick()}
				/>

				<Select name="orderType" label="OrderType :" onChange={this.onInputChange} />
				<Button onClick={this.submitOrder}>Submit</Button>
			</Flex>
		);
	}
}

export default OrderForm;
