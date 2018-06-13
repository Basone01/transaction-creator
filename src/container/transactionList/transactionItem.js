import React from 'react';
import { ProfileImage, SectionBox, BoldText, PullLeftAndRight, Flex, ItemContainer } from './styled';
import moment from 'moment';
import { compose, withProps } from 'recompose';

const enhance = compose(
	withProps(({ socialAccount, brandSocialAccount, transactionType, date }) => ({
		socialProfilePic: socialAccount.get('profilePicture'),
		socialUsername: socialAccount.get('username'),
		brandSocialUsername: brandSocialAccount.get('username'),
		formattedDate: moment(date).format('DD/MM/YYYY HH:mm'),
		type: transactionType === 101 ? 'DM' : transactionType === 102 ? 'EVENT' : 'STORY'
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
	type,
	id
}) => {
	console.log(id);
	return (
		<ItemContainer>
			<Flex style={{ padding: '0 8px' }}>
				{/* Social Picture and username */}
				<Flex fd="column" ait="center" style={{ padding:"8px 0",marginRight: 8, minWidth: 100 }}>
					<ProfileImage src={socialProfilePic} />
					<BoldText>{socialUsername}</BoldText>
				</Flex>
				{/* top right side */}
				<Flex fd="column" grow="1" style={{ padding: '8px 0' }}>
					<Flex grow="1">
						<Flex grow="2">
							<Flex fd="column">
								<span>
									<BoldText>ID :</BoldText>
									{id}
								</span>
								<span>
									<BoldText>Brand :</BoldText>
									{brandSocialUsername}
								</span>
								<span>
									<BoldText>Type :</BoldText>
									{type}
								</span>
							</Flex>
						</Flex>
						<Flex grow="1" jc="flex-end">
							<Flex fd="column" ait="flex-end">
								<a target="_blank" href={transferSlipFile._url} style={{ marginRight: 8 }}>
									Slip
								</a>
							</Flex>
						</Flex>
					</Flex>
					{/* bottom of top right side */}
					<Flex jc="space-between">
						<span>
							<BoldText>Recipient :</BoldText>
							{recipient}
						</span>
					</Flex>
				</Flex>
			</Flex>
			{/* Item Footer */}
			<Flex jc="space-between" style={{ padding: '8px', backgroundColor: 'rgba(0,0,0,0.15)' }}>
				<span>
					<BoldText>Date :</BoldText>
					{formattedDate}
				</span>
				<span>
					<BoldText>Amount :</BoldText>
					{amount}
				</span>
			</Flex>
		</ItemContainer>
	);
};

export default enhance(TransactionItem);
