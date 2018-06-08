import styled from 'styled-components';

//style
export const InputBox = styled.label`
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(0, 0, 0, 0.15);
`;
export const InputLabel = styled.span`
	line-height: 24px;
	font-size: 14px;
	padding: 6px 24px;
`;
export const SocialSelectBox = styled.div`
	position: relative;
	min-height: 64px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	${'' /* border: 1px solid rgba(0, 0, 0, 0.15); */}
	padding: 0;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const DropdownBox = styled.ul`
	padding: 0;
	margin: 0;
	position: absolute;

	top: 100%;
	left: 0;
	right: 0;

	display: flex;
	flex-direction: column;
	align-items: stretch;
	background-color: white;
	max-height: 360px;
	overflow: scroll;

	border: 1px solid rgba(0, 0, 0, 0.15);
	&::-webkit-scrollbar {
		display: none;
	}
	& > * {
		flex-shrink: 0;
	}
`;

export const DropdownItem = styled.li`
	display: flex;
	padding: 6px 24px;
	align-items: center;
	&:first-of-type {
		padding-top: 12px;
	}
	&:last-of-type {
		padding-bottom: 12px;
	}
	&:hover {
		background-color: #ff9;
	}
`;

export const ProfilePic = styled.img`
	width: 64px;
	height: 64px;
	object-fit: cover;
	object-position: center;
	border-radius: 50%;
	margin-right: 16px;
`;
