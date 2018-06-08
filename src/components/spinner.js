import React from 'react';
import styled from 'styled-components';

const Spinner = styled.span`
	@keyframes spin {
		0%,
		100% {
			border-radius: 50%;
			transform: scale(1);
		}
		50% {
			border-radius: 8px;
			transform: scale(3);
		}
	}
	position: fixed;
	top: 50%;
	left: 45%;
	width: 10vw;
	height: 10vw;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 5;
	animation: spin 1s infinite ease-in-out;
`;
const LoadingSpinner = ({ isDisplay = false }) => {
	return isDisplay && <Spinner />;
};

export default LoadingSpinner;
