import React from 'react';
import { ProfileImage, SectionBox, BoldText, DateAndAmount } from './styled';
import moment from 'moment';

const TransactionItem = ({ socialAccount, brandSocialAccount, amount, date, recipient, transferSlipFile }) => {
	return (
		<div style={{ position: 'relative', padding: '16px 0' }}>
			<SectionBox>
				<ProfileImage src={socialAccount.get('profilePicture')} />
				<span>
					<BoldText>Social Account : </BoldText>
					{socialAccount.get('username')}
					<br />
					<BoldText>Brand Social Account : </BoldText>
					{brandSocialAccount.get('username')}
				</span>
			</SectionBox>
			<SectionBox>
				<BoldText>Recipient : </BoldText>
				{recipient}
			</SectionBox>
			<DateAndAmount>
				<SectionBox>
					<BoldText>Date : </BoldText>
					{moment(date).format('DD/MM/YYYY HH:mm')}
				</SectionBox>
				<SectionBox>
					<BoldText>Amount : </BoldText>
					{amount}
				</SectionBox>
			</DateAndAmount>
		</div>
	);
};

export default TransactionItem;
