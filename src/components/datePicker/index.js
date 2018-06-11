import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import moment from 'moment';
import React from 'react';
import 'rc-datetime-picker/dist/picker.min.css';
import { InputBox, InputLabel, NoBorderInput } from './styled';

const enhance = compose(
	withState('date', 'setDate', moment(new Date().toUTCString())),
	withHandlers({
		handleChange: (props) => (newDate) => {
			props.setDate(newDate);
			console.log(newDate);
			if (props.onChange) {
				props.onChange(newDate);
			}
		}
	}),
	lifecycle({
		componentDidMount() {
			if (this.props.value) {
				this.props.setDate(this.props.value);
			}
			if (this.props.onChange) {
				this.props.onChange(this.props.date);
			}
		}
	})
);

const DatePicker = ({ name, value, date, label, handleChange, ...props }) => {
	const display = value ? value : date;
	return (
		<InputBox style={{ ...props.style }}>
			<InputLabel>{label}</InputLabel>
			<DatetimePickerTrigger moment={display} onChange={(newDate) => handleChange(newDate)}>
				<NoBorderInput
					maxLength="24"
					type="text"
					value={moment.weekdays(display.weekday()) + ' ' + display.format('DD/MM/YYYY HH:mm')}
					name={name}
					readOnly
				/>
			</DatetimePickerTrigger>
		</InputBox>
	);
};

export default enhance(DatePicker);
