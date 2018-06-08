import { compose, withState, withHandlers } from 'recompose';
import Parse from 'parse';
import React, { Component } from 'react';

import { Flex, ImageDisplay, ImageInputLabel } from './styled';

const enhance = compose(
	withState('isFileLoading', 'setIsFileLoading', false),
	withState('display_image', 'setDisplay_image', ''),
	withState('file', 'setFile', ''),
	withHandlers({
		onImageChange: ({ setIsFileLoading, setDisplay_image, setFile, onImageChange }) => (e) => {
			if (e.target.files && e.target.files[0]) {
				let reader = new FileReader();
				setIsFileLoading(true);
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
							setIsFileLoading(false);
							setDisplay_image(upoaded_file._url);
							setFile(upoaded_file);
							if (onImageChange) {
								onImageChange(upoaded_file);
							}
						})
						.catch((e) => {
							//upload failed
							console.log(e);
							setIsFileLoading(false);
						});
				};
				reader.onerror = (e) => {
					setIsFileLoading(false);
				};
				reader.readAsDataURL(e.target.files[0]);
			}
		},
		onImageClick: ({ onImageClick, setDisplay_image, setFile }) => () => {
			setDisplay_image('');
			setFile('');
			if (onImageClick) {
				onImageClick();
			}
		}
	})
);

const ImageUploader = ({ name, display_image, isFileLoading, file, onImageChange, onImageClick }) => {
	return (
		<Flex jc="center">
			{display_image ? (
				<ImageDisplay src={display_image} alt="" onClick={onImageClick} />
			) : (
				<ImageInputLabel isLoading={isFileLoading}>
					Click to Upload Slip
					<input name={name} type="file" value={file} onChange={onImageChange} />
				</ImageInputLabel>
			)}
		</Flex>
	);
};

export default enhance(ImageUploader);
