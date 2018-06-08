import Parse from 'parse';
import React, { Component } from 'react';
import { findInstagram } from '../../api';
import { FormContainer, Button } from './styled';
import ImageUploader from './imageUploader';
import InputText from './inputText';
import Order from '../../parse/Order';
import SocialAccountDropdown from './socialAccountDropdown';
import SocialAccount from '../../parse/SocialAccount';
import BrandSocialAccount from '../../parse/BrandSocialAccount';
import OrderTypeSelect from './orderTypeSelect';
import LoadingSpinner from './spinner';
import DatePicker from './datePicker';
import moment from 'moment';
import swal from 'sweetalert';
class OrderForm extends Component {
	state = {
		socialAccounts: [],
		selectedSocialAccount: null,
		value: 0,
		date: moment(),
		recipient: '',
		brandSocialAccountInput: '',
		slipFile: '',
		orderType: 1,
		error: '',
		isLoading: false
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
		if (!slipFile) {
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
					const order = new Order();
					order.selectAndSetValueFromState(this.state);
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
		const { socialAccounts, value, date, recipient, brandSocialAccountInput, isLoading } = this.state;

		return (
			<FormContainer>
				<LoadingSpinner isDisplay={isLoading} />
				<h3 style={{ textAlign: 'center', marginBottom: 24 }}>Create Order</h3>
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
				{/* <InputText
					label="Date :"
					name="date"
					type="datetime-local"
					value={date}
					onChange={this.onInputChange}
				/> */}
				<DatePicker selected={date} name="date" onChange={(date) => this.setState({ date })} />
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

				<OrderTypeSelect name="orderType" label="OrderType :" onChange={this.onInputChange} />
				<ImageUploader
					name="slipFile"
					onImageChange={(file) => this.onImageChange(file)}
					onImageClick={() => this.onImageClick()}
				/>

				<Button onClick={this.submitOrder} style={{ margin: '0 24px' }}>
					Submit
				</Button>
			</FormContainer>
		);
	}
}

export default OrderForm;
