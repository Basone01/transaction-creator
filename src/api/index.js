import config from '../config';

export const findInstagram = (username) => {
	return fetch(config.CHECK_IG_API + username).then((res) => res.json());
};
