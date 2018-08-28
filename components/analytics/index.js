import React from 'react';
import { Tabs, Icon, Spin } from 'antd';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { getAnalytics, bannerMessages } from './utils';
import UpgradePlan from '../shared/UpgradePlan/Banner';
import Flex from '../shared/Flex';
import Analytics from './components/Analytics';
import PopularSearches from './components/PopularSearches';
import NoResultsSearch from './components/NoResultsSearch';
import PopularResults from './components/PopularResults';
import PopularFilters from './components/PopularFilters';
import { checkUserStatus } from './../../utils';
import RequestLogs from './components/RequestLogs';

const { TabPane } = Tabs;
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.tabKeys = [
			'analytics',
			'popularSearches',
			'noResultSearches',
			'popularResults',
			'popularFilters',
			'requestLogs',
		];
		this.state = {
			isFetching: true,
			noResults: [],
			popularSearches: [],
			popularResults: [],
			popularFilters: [],
			searchVolume: [],
			// change it to true to test paid user
			isPaidUser: false,
			// change it to plan for eg. growth, bootstrap to test user with different plans
			currentPlan: undefined,
			activeTabKey: this.tabKeys.includes(props.tab) ? props.tab : this.tabKeys[0],
		};
	}
	componentDidMount() {
		// Comment out the below code to test paid user
		// COMMENT START
		checkUserStatus().then(
			(response) => {
				if (response.isPaidUser) {
					this.setState(
						{ isPaidUser: response.isPaidUser, currentPlan: response.plan },
						() => {
							// COMMENT END
							getAnalytics(this.props.appName, this.state.currentPlan)
								.then((res) => {
									this.setState({
										noResults: res.noResultSearches,
										popularSearches: res.popularSearches,
										searchVolume: res.searchVolume,
										popularResults: res.popularResults,
										popularFilters: res.popularFilters,
										isFetching: false,
									});
								})
								.catch(() => {
									this.setState({
										isFetching: false,
									});
								});
							// COMMENT START
						},
					);
				} else {
					this.setState({
						isFetching: false,
						isPaidUser: false,
					});
				}
			},
			() => {
				this.setState({
					isFetching: false,
				});
				// eslint-disable-next-line
				toastr.error('Error', 'Something went wrong');
			},
		);
		// COMMENT END
	}
	componentWillReceiveProps(nextProps) {
		if (get(nextProps, 'location.pathname') !== get(this.props, 'location.pathname')) {
			window.location.reload();
		}
	}
	changeActiveTabKey = (tab) => {
		this.setState(
			{
				activeTabKey: tab,
			},
			() => this.redirectTo(tab),
		);
	};
	redirectTo = (tab) => {
		window.history.pushState(
			null,
			null,
			`${window.location.origin}/analytics/${this.props.appName}/${tab}`,
		);
	};
	render() {
		const {
			noResults,
			popularSearches,
			searchVolume,
			popularResults,
			popularFilters,
			isFetching,
			isPaidUser,
			activeTabKey,
			currentPlan,
		} = this.state;
		if (isFetching) {
			const antIcon = (
				<Icon type="loading" style={{ fontSize: 50, marginTop: '250px' }} spin />
			);
			return (
				<Flex justifyContent="center" alignItems="center">
					<Spin indicator={antIcon} />
				</Flex>
			);
		}
		return (
			<div className="ad-detail-page ad-dashboard row" style={{ padding: '40px' }}>
				{isPaidUser ? (
					<React.Fragment>
						{bannerMessages[currentPlan] && (
							<UpgradePlan {...bannerMessages[currentPlan]} />
						)}
						<Tabs onTabClick={this.changeActiveTabKey} activeKey={activeTabKey}>
							<TabPane tab="Analytics" key={this.tabKeys[0]}>
								<Analytics
									loading={isFetching}
									noResults={noResults}
									plan={currentPlan}
									popularSearches={popularSearches}
									popularFilters={popularFilters}
									popularResults={popularResults}
									searchVolume={searchVolume}
									redirectTo={tab => this.changeActiveTabKey(tab)}
								/>
							</TabPane>
							<TabPane tab="Popular Searches" key={this.tabKeys[1]}>
								<PopularSearches plan={currentPlan} appName={this.props.appName} />
							</TabPane>
							<TabPane tab="No Result Searches" key={this.tabKeys[2]}>
								<NoResultsSearch plan={currentPlan} appName={this.props.appName} />
							</TabPane>
							{currentPlan === 'growth' && (
								<TabPane tab="Popular Results" key={this.tabKeys[3]}>
									<PopularResults
										plan={currentPlan}
										appName={this.props.appName}
									/>
								</TabPane>
							)}
							{currentPlan === 'growth' && (
								<TabPane tab="Popular Filters" key={this.tabKeys[4]}>
									<PopularFilters
										plan={currentPlan}
										appName={this.props.appName}
									/>
								</TabPane>
							)}
							<TabPane tab="Request Logs" key={this.tabKeys[5]}>
								<RequestLogs
									tab={this.props.subTab}
									appName={this.props.appName}
									redirectTo={this.redirectTo}
								/>
							</TabPane>
						</Tabs>
					</React.Fragment>
				) : (
					<UpgradePlan {...bannerMessages.free} />
				)}
			</div>
		);
	}
}
Main.propTypes = {
	appName: PropTypes.string.isRequired,
	subTab: PropTypes.string,
	tab: PropTypes.string,
};
export default Main;
