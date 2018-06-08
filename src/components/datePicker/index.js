import React, { Component } from 'react';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.min.css';
import { InputBox, InputLabel, NoBorderInput } from './styled';
class DatePicker extends Component {
	state = {
		m: moment()
	};
	handleChange(e) {
		window.m = e;
		this.setState(
			(state) => ({ m: e }),
			() => {
				if (this.props.onChange) {
					this.props.onChange(this.state.m.toISOString());
				}
			}
		);
	}
	componentDidMount() {
		if (this.props.onChange) {
			this.props.onChange(this.state.m.toISOString());
		}
		console.log(this.state.m);
	}

	render() {
		const { name, label, ...props } = this.props;
		return (
			<InputBox style={{ ...props.style }}>
				<InputLabel>{label}</InputLabel>
				<DatetimePickerTrigger moment={this.state.m} onChange={(e) => this.handleChange(e)}>
					<NoBorderInput
						maxLength="24"
						type="text"
						value={moment.weekdays(this.state.m.weekday()) + ' ' + this.state.m.format('DD/MM/YYYY HH:mm')}
						name={name}
						readOnly
					/>
				</DatetimePickerTrigger>
			</InputBox>
		);
	}
}

export default DatePicker;
