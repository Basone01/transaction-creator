import React from 'react';
import { ProfileImage, SectionBox, BoldText, PullLeftAndRight, MobileBR } from './styled';
import moment from 'moment';
import { compose, withProps } from 'recompose';

const enhance = compose(
	withProps(({ socialAccount, brandSocialAccount, transactionType, date }) => ({
		socialProfilePic: socialAccount.get('profilePicture'),
		socialUsername: socialAccount.get('username'),
		brandSocialUsername: brandSocialAccount.get('username'),
		formattedDate: moment(date).format('DD/MM/YYYY HH:mm'),
		type: transactionType === 61 ? 'DM' : transactionType === 62 ? 'EVENT' : 'STORY'
	}))
);

const TransactionItem = ({
	socialProfilePic,
	socialUsername,
	brandSocialUsername,
	amount,
	formattedDate,
	recipient,
	transferSlipFile,
	type
}) => {
	return (
		<div style={{ position: 'relative', padding: '16px 0' }}>
			<SectionBox brake>
				<ProfileImage src={socialProfilePic} />
				<span>
					<BoldText>Social Account : </BoldText>
					{socialUsername}
					<br />
					<BoldText>Brand Account : </BoldText>
					{brandSocialUsername}
				</span>
			</SectionBox>
			<PullLeftAndRight>
				<SectionBox>
					<BoldText>Type : </BoldText>
					{type}
				</SectionBox>
				<SectionBox>
					<BoldText>Recipient : </BoldText>
					{recipient}
				</SectionBox>
			</PullLeftAndRight>

			<PullLeftAndRight>
				<SectionBox>
					<BoldText>Date : </BoldText>
					{formattedDate}
				</SectionBox>
				<SectionBox>
					<BoldText>Amount : </BoldText>
					{amount}
				</SectionBox>
			</PullLeftAndRight>
		</div>
	);
};

export default enhance(TransactionItem);
