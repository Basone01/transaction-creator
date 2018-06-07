import styled from 'styled-components';

export const Flex = styled.div`
	display: flex;
	flex-direction: ${(props) => props.fd || 'column'};
	align-items: ${(props) => props.ali || 'stretch'};
	justify-content: ${(props) => props.jc || 'flex-start'};
	margin: auto;
	max-width: 480px;
	& > * {
		margin-bottom: 12px;
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
	cursor:pointer;
`;

