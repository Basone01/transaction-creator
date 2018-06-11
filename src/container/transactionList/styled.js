import styled from 'styled-components';
//Main Container
export const TransactionListContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 480px;
	padding: 12px 48px 24px 48px;
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	max-height: 95vh;
	margin: auto;    
	@media screen and (max-width: 768px) {
		max-width: 95%;
		padding: 12px 32px 24px 32px;
	}
	@media screen and (max-width: 480px) {
		max-width: 100%;
		padding: 12px 12px 24px 12px;
	}
`;
// List Container
export const Scroller = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	> *:not(:last-child) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}
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

export const SectionBox = styled.div`
	display: flex;
	align-items: center;
	padding: 8px;
	> * {
		margin-right: 16px;
	}
`;

export const BoldText = styled.span`font-weight: bold;`;

export const DateAndAmount = styled.div`
	display: flex;
	justify-content: space-between;
`;
