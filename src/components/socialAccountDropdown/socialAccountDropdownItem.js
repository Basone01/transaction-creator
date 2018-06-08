import React from 'react';
import { DropdownItem, ProfilePic } from './styled';

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
