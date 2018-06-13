import { compose, withState, withHandlers } from 'recompose';
import Parse from 'parse';
import React from 'react';

import { Flex, ImageDisplay, ImageInputLabel } from './styled';

const enhance = compose(
	withState('isFileLoading', 'setIsFileLoading', false),
	withState('display_image', 'setDisplay_image', ''),
	withHandlers({
		onImageChange: ({ setIsFileLoading, setDisplay_image, onImageChange }) => (e) => {
			if (e.target.files && e.target.files[0]) {
				let reader = new FileReader();
				setIsFileLoading(true);
				reader.onload = (e) => {
					if (!e.target.result.includes('data:image')) {
						setIsFileLoading(false);
						return;
					}
					//upload start
					const file = new Parse.File('file', {
						base64: e.target.result
					});
					file
						.save()
						.then((uploaded_file) => {
							//upload success
							setIsFileLoading(false);
							setDisplay_image(uploaded_file._url);
							console.log(uploaded_file);
							if (onImageChange) {
								onImageChange(uploaded_file);
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
		onImageClick: ({ onImageClick, setDisplay_image }) => () => {
			setDisplay_image('');
			if (onImageClick) {
				onImageClick();
			}
		}
	})
);

const ImageUploader = ({ value, name, display_image, isFileLoading, file, onImageChange, onImageClick }) => {
	return (
		<Flex jc="center">
			{value && display_image ? (
				<ImageDisplay src={display_image} alt="" onClick={onImageClick} />
			) : (
				<ImageInputLabel isLoading={isFileLoading}>
					Click to Upload Slip
					<input name={name} type="file" onChange={onImageChange} />
				</ImageInputLabel>
			)}
		</Flex>
	);
};

export default enhance(ImageUploader);
