import React, { Component } from 'react';
import { Menu, Button, Dropdown, Icon, Modal, Input, Affix } from 'antd';
import { css } from 'emotion';
import { getParameters } from 'codesandbox/lib/api/define';
import PropTypes from 'prop-types';

import { getMappings, getMappingsTree } from '../../utils/mappings';
import { getPreferences, setPreferences } from '../../utils/sandbox';
import { SCALR_API } from '../../utils';
import getSearchTemplate, { getTemplateStyles } from './template';

const wrapper = css`
	padding: 15px;
`;

const NEW_PROFILE = 'SEARCH_SANDBOX_NEW_PROFILE_APPBASE';
const SAVE_AS_NEW_PROFILE = 'SEARCH_SANDBOX_SAVE_NEW_PROFILE_APPBASE';

export const SandboxContext = React.createContext();

export default class SearchSandbox extends Component {
	constructor(props) {
		super(props);
		const profile = 'default';
		this.profileInput = React.createRef();

		this.state = {
			profile,
			profileList: ['default'],
			configs: [],
			mappings: null,
			filterCount: 0,
			componentProps: {},
			showNewProfileModal: false,
			profileModalError: '',
		};
	}

	componentDidMount() {
		if (this.props.isDashboard) {
			getPreferences(this.props.appId)
				.then((pref) => {
					this.pref = pref || {};
					const profileList = Array.from(new Set([...this.state.profileList, ...Object.keys(this.pref)]));
					const componentProps = this.pref[this.state.profile] || {};
					this.setState({
						componentProps,
						profileList,
						filterCount: Object.keys(componentProps).filter(item => item !== 'search' && item !== 'result'),
					});
				})
				.catch(() => this.getLocalPref());
		} else {
			this.getLocalPref();
		}

		getMappings(this.props.appName, this.props.credentials, this.props.url).then((res) => {
			this.setState({
				mappings: getMappingsTree(res),
			});
		});
	}

	getLocalPref = () => {
		let pref = localStorage.getItem(this.props.appName);
		if (pref) pref = JSON.parse(pref);
		this.pref = pref;
	};

	setLocalPref = (pref = {}) => {
		const value = JSON.stringify(pref);
		localStorage.setItem(this.props.appName, value);
	};

	getActiveConfig = () =>
		this.state.configs.find(config => config.profile === this.state.profile);

	setFilterCount = (filterCount) => {
		this.setState({
			filterCount,
		});
	};

	savePreferences = () => {
		this.pref = {
			...this.pref,
			[this.state.profile]: this.state.componentProps,
		};

		if (this.props.isDashboard) {
			setPreferences(this.props.appId, this.pref).catch(() => this.setLocalPref(this.pref));
		} else {
			this.setLocalPref(this.pref);
		}
	};

	deleteComponent = (id) => {
		const { componentProps } = this.state;
		const { [id]: del, ...remProps } = componentProps;
		this.setState(
			{
				componentProps: remProps,
			},
			this.savePreferences,
		);
	};

	handleProfileChange = (e) => {
		const { key } = e;
		if (key === NEW_PROFILE) {
			this.setState({
				showNewProfileModal: true,
				filterCount: 0,
			});
		} else if (key === SAVE_AS_NEW_PROFILE) {
			this.newComponentProps = this.pref[this.state.profile];
			this.setState({
				showNewProfileModal: true,
				filterCount: Object.keys(this.newComponentProps).filter(item => item !== 'search' && item !== 'result'),
			});
		} else {
			const componentProps = this.pref[key] || {};
			this.setState({
				profile: key,
				componentProps,
				filterCount: Object.keys(componentProps).filter(item => item !== 'search' && item !== 'result'),
			});
		}
	};

	handleComponentPropChange = (component, newProps) => {
		// strip out onData prop from result component
		const { onData, ...validProps } = newProps;
		this.setState(
			state => ({
				...state,
				componentProps: {
					...state.componentProps,
					[component]: {
						...state.componentProps[component],
						...validProps,
					},
				},
			}),
			this.savePreferences,
		);
	};

	handleSaveProfile = () => {
		const { value } = this.profileInput.current.input;
		const componentProps = this.newComponentProps || {};
		if (this.state.profileList.includes(value)) {
			this.setState({
				profileModalError: 'A search profile with the same name already exists',
			});
		} else {
			this.setState({
				profileList: [...this.state.profileList, value],
				profile: value,
				componentProps,
				showNewProfileModal: false,
				profileModalError: '',
			});
		}
		this.newComponentProps = null;
	};

	handleCancel = () => {
		this.newComponentProps = null;
		this.setState({
			showNewProfileModal: false,
			profileModalError: '',
		});
	};

	openSandbox = () => {
		const config = {
			appId: this.props.appId || null,
			appName: this.props.appName || null,
			url: this.props.url,
			credentials: this.props.credentials || null,
			componentProps: this.state.componentProps,
			mappings: this.state.mappings,
			attribution: this.props.attribution || null,
		};
		const code = getSearchTemplate(config);
		const html = '<div id="root"></div>';
		const styles = getTemplateStyles();

		const parameters = getParameters({
			files: {
				'index.js': {
					content: code,
				},
				'package.json': {
					content: {
						dependencies: {
							react: '16.3.2',
							'react-dom': '16.3.2',
							antd: '^3.6.6',
							'@appbaseio/reactivesearch': 'latest',
							'react-expand-collapse': 'latest',
						},
					},
				},
				'index.html': {
					content: html,
				},
				'styles.css': {
					content: styles,
				},
			},
		});

		window.open(
			`https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
			'_blank',
		);
	};

	render() {
		const vcenter = {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 20,
			height: 300,
			fontSize: 16,
			lineHeight: 26,
		};

		if (!this.state.mappings) {
			return <div style={vcenter}>Loading...</div>;
		}
		if (!Object.keys(this.state.mappings).length) {
			return <div style={vcenter}>No data found. Please insert data to use this feature</div>;
		}

		const menu = (
			<Menu
				onClick={this.handleProfileChange}
				style={{ maxHeight: 300, overflowY: 'scroll' }}
			>
				{this.state.profileList.map(item => <Menu.Item key={item}>{item}</Menu.Item>)}
				<Menu.Divider />
				<Menu.Item key={NEW_PROFILE}>
					<Icon type="plus" />&nbsp; Create a New Profile
				</Menu.Item>
				<Menu.Item key={SAVE_AS_NEW_PROFILE}>
					<Icon type="save" />&nbsp; Save as New Profile
				</Menu.Item>
			</Menu>
		);

		const contextValue = {
			appId: this.props.appId || null,
			appName: this.props.appName || null,
			url: this.props.url,
			credentials: this.props.credentials || null,
			profile: this.state.profile,
			config: this.getActiveConfig(),
			mappings: this.state.mappings,
			componentProps: this.state.componentProps,
			onPropChange: this.handleComponentPropChange,
			filterCount: this.state.filterCount,
			setFilterCount: this.setFilterCount,
			deleteComponent: this.deleteComponent,
		};

		return (
			<SandboxContext.Provider value={contextValue}>
				<div className={wrapper} key={this.state.profile}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row-reverse',
							padding: '10px 20px 0',
						}}
					>
						{this.props.isDashboard ? (
							<Dropdown overlay={menu} trigger={['click']}>
								<Button size="large" style={{ marginLeft: 8 }}>
									Search Profile - {this.state.profile} <Icon type="down" />
								</Button>
							</Dropdown>
						) : null}
						<Button onClick={this.openSandbox} size="large" type="primary">
							Open in Codesandbox
						</Button>
					</div>
					{React.Children.map(this.props.children, child => (
						<SandboxContext.Consumer>
							{props => React.cloneElement(child, { ...props })}
						</SandboxContext.Consumer>
					))}
					{this.props.message ? (
						<Affix
							style={{
								position: 'fixed',
								bottom: '10px',
								right: '35px',
								padding: '5px',
								background: 'white',
								boxShadow: '0px 0px 1px rgba(0,0,0,.2)',
							}}
						>
							{this.props.message.link ? <a href={this.props.message.link} rel="noopener noreferrer" target="_blank">
								{this.props.message.text}
                                  </a> : this.props.message.text}
						</Affix>
					) : null}
				</div>

				<Modal
					title="Create a new Search Profile"
					visible={this.state.showNewProfileModal}
					onOk={this.handleSaveProfile}
					onCancel={this.handleCancel}
					destroyOnClose
				>
					<div style={{ margin: '0 0 6px' }} className="ant-form-extra">
						Set search profile name
					</div>
					<Input type="text" ref={this.profileInput} placeholder="Search Profile Name" />
					{this.state.profileModalError ? (
						<p style={{ color: 'tomato' }}>{this.state.profileModalError}</p>
					) : null}
				</Modal>
			</SandboxContext.Provider>
		);
	}
}

SearchSandbox.propTypes = {
	appId: PropTypes.string,
	appName: PropTypes.string.isRequired,
	attribution: PropTypes.object,
	credentials: PropTypes.string.isRequired,
	isDashboard: PropTypes.bool,
	url: PropTypes.string.isRequired,
};

SearchSandbox.defaultProps = {
	isDashboard: false,
	url: SCALR_API,
};
