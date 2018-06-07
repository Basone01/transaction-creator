export const findBrandSocialAccount = (username) => {
	return;
};

export const findInstagram = (username) => {
	return fetch('http://bearboost.co/checkig/' + username).then((res) => res.json());
};
