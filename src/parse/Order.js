import Parse from 'parse';

export default class Order extends Parse.Object {
	constructor() {
		super('Order');
	}
	selectAndSetValueFromState(state) {
		const { selectedSocialAccount, value, date, slipFile, recipient, brandSocialAccount,orderType } = state;
		this.set('socialAccount', selectedSocialAccount);
		this.set('value', value);
		this.set('date', new Date(date));
		this.set('slipFile', slipFile);
		this.set('recipient', recipient);
		this.set('brandSocialAccount', brandSocialAccount);
		this.set('orderType', orderType);
    	}
}
