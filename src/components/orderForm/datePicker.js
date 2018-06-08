import React, { Component } from 'react';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.min.css';
import styled from 'styled-components';

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

const NoBorderInput = styled.input`
	border: none;
	outline: none;
	font-size: 16px;
	width: 100%;
	padding: 11px 0;
	font-weight: 400;
	text-align: center;
	&[type=number]::-webkit-inner-spin-button,
	&[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const InputBox = styled.label`
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(0, 0, 0, 0.15);
	padding: 6px 24px;
`;

const InputLabel = styled.span`
	line-height: 24px;
	font-size: 14px;
`;
