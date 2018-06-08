import { compose, withState, withHandlers,lifecycle } from 'recompose';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import moment from 'moment';
import React from 'react';

import 'rc-datetime-picker/dist/picker.min.css';

import { InputBox, InputLabel, NoBorderInput } from './styled';

const enhance = compose(
	withState('date', 'setDate', moment()),
	withHandlers({
		handleChange: (props) => (newDate) => {
			props.setDate(newDate);
			if (props.onChange) {
				props.onChange(newDate.toISOString());
			}
		}
	}),
	lifecycle({
		componentDidMount() {
			if (this.props.onChange) {
				this.props.onChange(this.props.date.toISOString());
			}
		}
	})
);

const DatePicker = ({ name, date, label, handleChange, ...props }) => {
	return (
		<InputBox style={{ ...props.style }}>
			<InputLabel>{label}</InputLabel>
			<DatetimePickerTrigger moment={date} onChange={(newDate) => handleChange(newDate)}>
				<NoBorderInput
					maxLength="24"
					type="text"
					value={moment.weekdays(date.weekday()) + ' ' + date.format('DD/MM/YYYY HH:mm')}
					name={name}
					readOnly
				/>
			</DatetimePickerTrigger>
		</InputBox>
	);
};

export default enhance(DatePicker);
