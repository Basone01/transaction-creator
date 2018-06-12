import styled, { css } from 'styled-components';

export const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	position: relative;
	max-width: 480px;
	padding: 12px 48px 24px 48px;
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	overflow-y: hidden;
	@media screen and (max-width: 768px) {
		max-width: 95%;
		padding: 12px 32px 24px 32px;
	}
	@media screen and (max-width: 480px) {
		max-width: 100%;
		padding: 12px 12px 24px 12px;
	}
	max-height: 90vh;
	min-height: 90vh;
`;

export const FlexDown = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const Flex = styled.div`
	display: flex;
	position: relative;
	flex-direction: ${(props) => props.fd || 'row'};
	justify-content: ${(props) => props.jc || 'flex-start'};
	align-items: ${(props) => props.ait || 'stretch'};
`;

export const BigButton = styled.button`
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

export const Scroller = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	flex-grow: 1;
	min-height: 0;
	&::-webkit-scrollbar {
		display: none;
	}
	& > * {
		flex-shrink: 0;
		margin-bottom: ${(props) => props.childMargin || 0}px;
		${(props) =>
			props.childUnderline &&
			css`
				&:not(:last-child) {
					border-bottom: 1px solid rgba(0, 0, 0, 0.15);
				}
			`};
	}
`;
