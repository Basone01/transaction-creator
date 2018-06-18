import Parse from 'parse';

export default class Queue extends Parse.Object {
	constructor() {
		super('Queue');
	}

	bindTransaction(transaction, date) {
		const { socialAccount, transactionType } = transaction.attributes;

		let startDate =
            (transactionType === 101 )
                ? new Date(Date.now()) 
                : new Date(date + 'T00:00');
		let endDate =
			(transactionType === 101)
                ? new Date(Date.now() + 6 * 60 * 60 * 1000)
                : new Date(date + 'T23:59');

		this.set('transaction', transaction);
		this.set('socialAccount', socialAccount);
        this.set('startDateTime', startDate);
        this.set('endDateTime', endDate);
        this.set('posted', false);

		console.log(this)
	}
}
