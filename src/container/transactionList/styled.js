import styled, { css } from 'styled-components';

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

export const SectionBox = styled.div`
	display: flex;
	align-items: center;
	padding: 8px;
	> * {
		margin-right: 16px;
	}
	@media screen and (max-width: 480px) {
		${(props) => props.brake && css`
			flex-direction: column;
			&>*{
				margin-bottom:12px;
			}
		`};
	}
`;

export const BoldText = styled.span`font-weight: bold;`;

export const PullLeftAndRight = styled.div`
	display: flex;
	justify-content: space-between;
	@media screen and (max-width: 480px) {
		flex-direction: column;
	}
`;

export const MobileBR = styled.br`@media screen and (min-width: 480px) {display: none;}`;
