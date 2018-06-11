import React from 'react';
import styled from 'styled-components';

const FullScreenBox = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 5;
	
`;

const Spinner = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	min-width: 64px;
	min-height: 64px;
	padding: 2em;
	font-weight:bold;
	&::after {
		content: '';
		@keyframes spin {
			0%,
			100% {
				border-radius: 50%;
				transform: scale(1);
			}
			50% {
				border-radius: 8px;
				transform: scale(2);
			}
		}

		
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
		animation: spin 1s infinite ease-in-out;
	}
`;
const LoadingSpinner = ({ isDisplay = false }) => {
	return (
		isDisplay && (
			<FullScreenBox>
				<Spinner>LOADING...</Spinner>
			</FullScreenBox>
		)
	);
};

export default LoadingSpinner;
