import styled from 'styled-components';

export const ImageInputLabel = styled.label`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #eee;
	padding: 24px;
	user-select: none;
	cursor: pointer;
	position:relative;
	& > input[type="file"] {
		display: none;
	}
	&:after {
		content: '';
		position: absolute;
		display: ${(props) => (props.isLoading ? 'block' : 'none')};
		padding: 16px;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.5);
		@keyframes spin {
			from {
				transform: rotateY(0deg);
			}
			from {
				transform: rotateY(359deg);
			}
		}
		animation: spin 1s infinite;
	}
`;

export const ImageDisplay = styled.img`
	margin: 0 24px;
	max-width: 100%;
	min-height: 100px;
	object-fit: contain;
	object-position: center;
	user-select: none;
	cursor: pointer;
`;

export const Flex = styled.div`
	display: flex;
	flex-direction: ${(props) => props.fd || 'column'};
	align-items: ${(props) => props.ali || 'stretch'};
	justify-content: ${(props) => props.jc || 'flex-start'};
	margin: auto;
	max-width: 480px;
	& > * {
		margin-bottom: 12px;
	}
`;
