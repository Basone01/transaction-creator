import styled from 'styled-components';

export const FormContainer = styled.div`
	display: flex;
	flex-direction: ${(props) => props.fd || 'column'};
	align-items: ${(props) => props.ali || 'stretch'};
	justify-content: ${(props) => props.jc || 'flex-start'};
	margin: auto;
	max-width: 480px;
	padding: 12px 48px 24px 48px;
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	& > * {
		margin-bottom: 12px;
	}
	@media screen and (max-width: 768px) {
		max-width: 95%;
		padding: 12px 32px 24px 32px;
	}
	@media screen and (max-width: 480px) {
		max-width: 100%;
		padding: 12px 12px 24px 12px;
	}
`;

export const Button = styled.button`
	border: none;
	border-radius: 30px;
	padding: 15px 30px;
	outline-color: white;
	letter-spacing: 2px;
	font-size: 24px;
	background-color: rgb(171, 62, 255);
	font-weight: 600;
	color: white;
	cursor: pointer;
`;
