import React, { useEffect, useState } from 'react';
import { Spin, Icon, Card } from 'antd';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import Filter from './Filter';
import Flex from '../../shared/Flex';
import { popularFiltersCol, popularResultsCol, popularSearchesCol, noResultsFull } from '../utils';
import { getFilteredResults } from '../../../utils/helpers';
import { mediaKey } from '../../../utils/media';
import Searches from './Searches';
import SearchVolumeChart from '../../shared/Chart/SearchVolume';
import SearchLatency from './SearchLatency';
import Summary from './Summary';
import GeoDistribution from './GeoDistribution';
import RequestDistribution from './RequestDistribution';

const results = css`
	width: 100%;
	margin-top: 20px;
	${mediaKey.small} {
		flex-direction: column;
	}
`;
const searchCls = css`
	flex: 50%;
	margin-right: 10px;
	${mediaKey.small} {
		margin-right: 0;
	}
`;
const noResultsCls = css`
	flex: 50%;
	margin-left: 10px;
	${mediaKey.small} {
		margin-left: 0;
		margin-top: 20px;
	}
`;

const handleClickBar = (payload) => {
	const startLatency = payload.key;
	const endLatency = startLatency + 10;
	const newURL = `${window.location.protocol}//${
		window.location.host
	}${window.location.pathname.replace(
		'analytics',
		'search-latency',
	)}?start_latency=${startLatency}&end_latency=${endLatency}&redirect_to=logs`;
	window.location.href = newURL;
};
const Analytics = ({
	noResults,
	popularSearches,
	searchVolume,
	popularFilters,
	popularResults,
	plan,
	loading,
	onClickViewAll,
	displayReplaySearch,
	handleReplaySearch,
	filterId,
}) => {
	useEffect(() => {
		window.addEventListener('scroll', tracker);
		return () => {
			window.removeEventListener('scroll', tracker);
		};
	}, []);

	const [visibility, setVisibility] = useState({
		'geo-distribution-component': false,
		'no-results-searches-component': false,
		'popular-filters-component': false,
		'popular-results-component': false,
		'popular-searches-component': false,
		'request-distribution-component': false,
		'search-latency-component': false,
		'search-volume-component': false,
		'summary-component': true,
	});

	const inViewPort = (id) => {
		if (window && document) {
			const element = document.getElementById(id);
			const rect = element.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}
		return true;
	};

	const tracker = () => {
		Object.keys(visibility).forEach((key) => {
			if (inViewPort(key) && !visibility[key]) {
				setVisibility((prev) => ({ ...prev, [key]: true }));
			}
		});
	};

	if (loading) {
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		return <Spin indicator={antIcon} />;
	}

	return (
		<React.Fragment>
			{filterId && <Filter filterId={filterId} />}
			<Card
				extra={
					<a href="https://docs.appbase.io/docs/analytics/Overview/">
						Read More about these stats
					</a>
				}
				css="margin-bottom: 20px"
				title="Summary"
				id="summary-component"
			>
				{visibility['summary-component'] && <Summary filterId={filterId} />}
			</Card>
			<div id="search-volume-component">
				{visibility['search-volume-component'] && (
					<SearchVolumeChart height={300} data={searchVolume} />
				)}
			</div>
			<Flex css={results}>
				<div css={searchCls} id="popular-searches-component">
					{visibility['popular-searches-component'] && (
						<Searches
							href="popular-searches"
							dataSource={getFilteredResults(popularSearches).map((item) => ({
								...item,
								handleReplaySearch,
							}))}
							columns={popularSearchesCol(plan, displayReplaySearch)}
							title="Popular Searches"
							css="height: 100%"
							onClickViewAll={
								(onClickViewAll && onClickViewAll.popularSearches) || null
							}
						/>
					)}
				</div>
				<div css={noResultsCls} id="no-results-searches-component">
					{visibility['no-results-searches-component'] && (
						<Searches
							href="no-results-searches"
							dataSource={getFilteredResults(noResults).map((item) => ({
								...item,
								handleReplaySearch,
							}))}
							columns={noResultsFull(plan, displayReplaySearch)}
							title="No Result Searches"
							css="height: 100%"
							onClickViewAll={
								(onClickViewAll && onClickViewAll.noResultsSearch) || null
							}
						/>
					)}
				</div>
			</Flex>
			{plan === 'growth' && (
				<React.Fragment>
					<Flex css={results}>
						<div css={searchCls} id="popular-results-component">
							{visibility['popular-results-component'] && (
								<Searches
									dataSource={getFilteredResults(popularResults).map((item) => ({
										...item,
										handleReplaySearch,
									}))}
									columns={popularResultsCol(plan, displayReplaySearch)}
									title="Popular Results"
									href="popular-results"
									css="height: 100%"
									onClickViewAll={
										(onClickViewAll && onClickViewAll.popularResults) || null
									}
									breakWord
								/>
							)}
						</div>
						<div css={noResultsCls} id="popular-filters-component">
							{visibility['popular-filters-component'] && (
								<Searches
									dataSource={getFilteredResults(popularFilters).map((item) => ({
										...item,
										handleReplaySearch,
									}))}
									columns={popularFiltersCol(plan, displayReplaySearch)}
									title="Popular Filters"
									href="popular-filters"
									css="height: 100%"
									onClickViewAll={
										(onClickViewAll && onClickViewAll.popularFilters) || null
									}
									breakWord
								/>
							)}
						</div>
					</Flex>
					<Flex
						flexDirection="column"
						css="width: 100%;margin-top: 20px"
						id="geo-distribution-component"
					>
						{visibility['geo-distribution-component'] && (
							<GeoDistribution filterId={filterId} displayFilter={false} />
						)}
					</Flex>
					<Flex
						flexDirection="column"
						css="width: 100%;margin-top: 20px"
						id="search-latency-component"
					>
						{visibility['search-latency-component'] && (
							<SearchLatency
								onClickBar={handleClickBar}
								filterId={filterId}
								displayFilter={false}
							/>
						)}
					</Flex>
					<Flex
						flexDirection="column"
						css="width: 100%;margin-top: 20px"
						id="request-distribution-component"
					>
						{visibility['request-distribution-component'] && (
							<RequestDistribution filterId={filterId} displayFilter={false} />
						)}
					</Flex>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
Analytics.defaultProps = {
	loading: false,
	noResults: [],
	popularSearches: [],
	searchVolume: [],
	popularResults: [],
	popularFilters: [],
	onClickViewAll: null,
	displayReplaySearch: false,
	filterId: undefined,
};
Analytics.propTypes = {
	onClickViewAll: PropTypes.shape({
		popularFilters: PropTypes.func,
		popularResults: PropTypes.func,
		popularSearches: PropTypes.func,
		noResultsSearch: PropTypes.func,
	}),
	filterId: PropTypes.string,
	loading: PropTypes.bool,
	displayReplaySearch: PropTypes.bool,
	noResults: PropTypes.array,
	popularSearches: PropTypes.array,
	plan: PropTypes.string.isRequired,
	handleReplaySearch: PropTypes.func.isRequired,
	searchVolume: PropTypes.array,
	popularResults: PropTypes.array,
	popularFilters: PropTypes.array,
};

export default Analytics;
