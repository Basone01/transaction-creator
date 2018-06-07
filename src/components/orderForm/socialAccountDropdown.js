import React, { Component } from 'react';
import styled from 'styled-components';
import SocialSelectItem from './socialAccountDropdownItem';

export default class SocialAccountDropdown extends Component {
	state = {
		isOpen: false,
		selected: 0
	};
	constructor(props) {
		super(props);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	open() {
		this.setState(
			({ isOpen }) => ({ isOpen: true }),
			() => {
				document.addEventListener('click', this.close);
			}
		);
	}
	close() {
		this.setState(
			({ isOpen }) => ({ isOpen: false }),
			() => {
				document.removeEventListener('click', this.close);
			}
		);
	}
	onItemClick(i) {
		const { socialAccounts } = this.props;
		this.setState(
			(state) => ({ selected: i }),
			() => {
				if (this.props.onSelect) {
					this.props.onSelect(socialAccounts[i]);
				}
			}
		);
	}
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.socialAccounts.length !== this.props.socialAccounts.length) {
			this.props.onSelect(nextProps.socialAccounts[0]);
		}
	};

	render() {
		const { isOpen, selected } = this.state;
		const { socialAccounts } = this.props;
		const pureSocialData = socialAccounts.map((account) => JSON.parse(JSON.stringify(account)));
		const dropdownItem = pureSocialData.map((account, i) => {
			return <SocialSelectItem key={i} account={account} onClick={() => this.onItemClick(i)} />;
		});
		return (
			<InputBox>
				<SocialSelectBox onClick={this.open}>
				<InputLabel>Social Account :</InputLabel>
					<SocialSelectItem account={pureSocialData[selected]} />
					{isOpen && <DropdownBox>{dropdownItem}</DropdownBox>}
				</SocialSelectBox>
			</InputBox>
		);
	}
}

//style
const InputBox = styled.label`
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(0, 0, 0, 0.15);
`;
const InputLabel = styled.span`
	line-height: 24px;
	font-size: 14px;
	padding:6px 24px;
`;
export const SocialSelectBox = styled.div`
	position: relative;
	min-height: 64px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	border: 1px solid rgba(0, 0, 0, 0.15);
	padding: 0;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const DropdownBox = styled.ul`
	padding: 0;
	margin: 0;
	position: absolute;

	top: 100%;
	left: 0;
	right: 0;

	display: flex;
	flex-direction: column;
	align-items: stretch;
	background-color: white;
	max-height: 360px;
	overflow: scroll;

	border: 1px solid rgba(0, 0, 0, 0.15);
	&::-webkit-scrollbar {
		display: none;
	}
	& > * {
		flex-shrink: 0;
	}
`;
