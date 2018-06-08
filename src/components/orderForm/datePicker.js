import React, { Component } from 'react';
import InputMoment from 'input-moment';
import moment from 'moment';

import 'input-moment/dist/input-moment.css';

const m = moment();

class DatePicker extends Component {
	state = {
		m: moment()
	};
	render() {
		return (
			<InputMoment
				moment={m}
				minStep={5}
				onSave={(e) => this.state.m.format('1111')}
				onChange={(e) => this.setState({ m: e })}
				prevMonthIcon="ion-ios-arrow-left"
				nextMonthIcon="ion-ios-arrow-right"
				style={{ width: 'auto', userSelect: 'none' }}
			/>
		);
	}
}

export default DatePicker;
