import React from 'react';
import styled from 'styled-components';

export const SocialAccountDropdownItem = ({ onClick, ...props }) => {
	const account = props.account || { profilePicture: null, username: '' };
	const { profilePicture, username } = account;
	return (
		<DropdownItem onClick={onClick}>
			<ProfilePic src={profilePicture} alt="" /> {username}
		</DropdownItem>
	);
};

export default SocialAccountDropdownItem;
//style
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
