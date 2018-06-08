import React, { Component } from 'react';
import SocialSelectItem from './socialAccountDropdownItem';
import { DropdownBox, InputBox, InputLabel, SocialSelectBox } from './styled';

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
