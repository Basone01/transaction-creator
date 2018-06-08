import React from 'react';
import { InputBox, InputLabel, NoBorderInput } from './styled';

const InputText = ({ label, onChange, suffix, type = 'text', ...props }) => {
	return (
		<InputBox>
			<InputLabel>{label}</InputLabel>
			<NoBorderInput type={type} onChange={onChange} {...props} />
			{suffix && <InputLabel>{suffix}</InputLabel>}
		</InputBox>
	);
};

export default InputText;
