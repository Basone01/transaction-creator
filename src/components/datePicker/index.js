import { compose, withState, withHandlers, lifecycle } from 'recompose';
import moment from 'moment';
import React from 'react';
import { InputBox, InputLabel, NoBorderInput } from './styled';

const enhance = compose(
	withState('date', 'setDate', moment()),
	withHandlers({
		handleChange: (props) => (e) => {
			props.setDate(moment(e.target.value));
			if (props.onChange) {
				props.onChange(moment(e.target.value));
			}
		}
	}),
	lifecycle({
		componentDidMount() {
			if (this.props.value) {
				this.props.setDate(moment(this.props.value));
			}
			if (this.props.onChange) {
				this.props.onChange(moment(this.props.date));
			}
		}
	})
);

const DatePicker = ({ name, value, date, label, handleChange, ...props }) => {
	let display = value ? value : date;
	let formattedValue = display.format().slice(0, 16);
	return (
		<InputBox style={{ ...props.style }}>
			<InputLabel>{label}</InputLabel>
			<NoBorderInput
				maxLength="24"
				type="datetime-local"
				value={formattedValue}
				name={name}
				onChange={handleChange}
			/>
		</InputBox>
	);
};

export default enhance(DatePicker);
