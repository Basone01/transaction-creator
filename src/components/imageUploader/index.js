import React, { Component } from 'react';
import Parse from 'parse';
import { Flex, ImageDisplay, ImageInputLabel } from './styled';
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
