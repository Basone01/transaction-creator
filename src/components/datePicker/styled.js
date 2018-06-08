import styled from 'styled-components';

export const NoBorderInput = styled.input`
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
