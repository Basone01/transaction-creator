import React, { Component } from 'react';
import styled from 'styled-components';
import Parse from 'parse';
export default class ImageUpoader extends Component {
	state = {
		isFileLoading: false,
		display_image: '',
		file: ''
	};

	onImageChange(e) {
		if (e.target.files && e.target.files[0]) {
			let reader = new FileReader();
			this.setState({
				isFileLoading: true
			});
			reader.onload = (e) => {
				if (!e.target.result.includes('data:image')) {
					this.setState({
						isFileLoading: false
					});
					return;
				}
				//upload start
				const file = new Parse.File('file', {
					base64: e.target.result
				});
				file
					.save()
					.then((upoaded_file) => {
						//upload success
						this.setState({
							display_image: upoaded_file._url,
							file: upoaded_file,
							isFileLoading: false
						});
						if (this.props.onImageChange) {
							this.props.onImageChange(upoaded_file);
						}
					})
					.catch((e) => {
						//upload failed
						console.log(e);
						this.setState({
							isFileLoading: false
						});
					});
			};
			reader.onerror = (e) => {
				this.setState({
					isFileLoading: false
				});
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	}

	onImageClick() {
		this.setState({
			display_image: '',
			file: ''
		});
		if (this.props.onImageClick) {
			this.props.onImageClick();
		}
	}

	render() {
		const { name } = this.props;
		const { display_image, isFileLoading, file } = this.state;
		return (
			<Flex jc="center">
				{display_image ? (
					<ImageDisplay src={display_image} alt="" onClick={this.onImageClick.bind(this)} />
				) : (
					<ImageInputLabel isLoading={isFileLoading}>
						Click to Upload Slip
						<input name={name} type="file" value={file} onChange={this.onImageChange.bind(this)} />
					</ImageInputLabel>
				)}
			</Flex>
		);
	}
}

//style

export const ImageInputLabel = styled.label`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #eee;
	padding: 24px;
	user-select: none;
	cursor: pointer;
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
