import Parse from 'parse';

export default class Transaction extends Parse.Object {
	constructor() {
		super('Transaction');
	}
	selectAndSetValueFromState(state) {
		const {
			selectedSocialAccount,
			amount,
			date,
			transferSlipFile,
			recipient,
			brandSocialAccount,
			transactionType
		} = state;
		this.set('socialAccount', selectedSocialAccount);
		this.set('amount', amount);
		this.set('date', new Date(date));
		this.set('transferSlipFile', transferSlipFile);
		this.set('recipient', recipient);
		this.set('brandSocialAccount', brandSocialAccount);
		this.set('transactionType', transactionType);
	}
}
