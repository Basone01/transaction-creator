import Parse from 'parse';

export default class Transaction extends Parse.Object {
	constructor() {
		super('Order');
	}
	selectAndSetValueFromState(state) {
		const {
			selectedSocialAccount,
			amount,
			date,
			transactionSlipFile,
			recipient,
			brandSocialAccount,
			transactionType
		} = state;
		this.set('socialAccount', selectedSocialAccount);
		this.set('amount', amount);
		this.set('date', new Date(date));
		this.set('transactionSlipFile', transactionSlipFile);
		this.set('recipient', recipient);
		this.set('brandSocialAccount', brandSocialAccount);
		this.set('transactionType', transactionType);
	}
}
