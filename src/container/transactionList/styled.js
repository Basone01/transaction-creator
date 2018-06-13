import styled, { css } from 'styled-components';

export const SectionBox = styled.div`
	display: flex;
	align-items: center;
	padding: 8px;
	> * {
		margin-right: 16px;
	}
	@media screen and (max-width: 480px) {
		${(props) =>
			props.brake &&
			css`
				flex-direction: column;
				& > * {
					margin-bottom: 12px;
				}
			`};
	}
`;

export const BoldText = styled.span`
	font-weight: bold;
	padding-right: 4px;
`;

export const PullLeftAndRight = styled.div`
	display: flex;
	justify-content: space-between;
	@media screen and (max-width: 480px) {
		flex-direction: column;
	}
`;

export const Flex = styled.div`
	display: flex;
	position: relative;
	flex-direction: ${(props) => props.fd || 'row'};
	justify-content: ${(props) => props.jc || 'flex-start'};
	align-items: ${(props) => props.ait || 'stretch'};
	flex-grow: ${(props) => props.grow || 0};
	flex-shrink: ${(props) => props.shrink || 0};
	${'' /* flex-basis: ${(props) => props.basis || 'auto'}; */}
`;

// list item
export const ProfileImage = styled.img`
	margin: 0;
	border-radius: 50%;
	width: 64px;
	height: 64px;
	object-fit: cover;
	object-position: center;
	padding: 4px;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, 0.15);
`;

export const ItemContainer = styled.div`
	position: relative;
	font-size: 14px;
	border-radius: 8px;
	margin: 16px 0;
	overflow: hidden;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
	padding-top:8px;
`;
