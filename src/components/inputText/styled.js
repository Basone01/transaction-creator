import styled from 'styled-components';

export const InputBox = styled.label`
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(0, 0, 0, 0.15);
	padding: 6px 24px;
`;

export const InputLabel = styled.span`
	line-height: 24px;
	font-size: 14px;
`;

export const NoBorderInput = styled.input`
	border: none;
	outline: none;
	font-size: 16px;
	padding: 11px 0;
	font-weight: 400;
	&[type=number]::-webkit-inner-spin-button,
	&[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;