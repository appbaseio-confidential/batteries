import React from 'react';
import { Spin, Icon, Card } from 'antd';
import PropTypes from 'prop-types';
import Flex from '../../shared/Flex';
import { popularFiltersCol, popularResultsCol, noResultSearchesCol } from './../utils';
import Searches from './Searches';
import SearchVolumeChart from '../../shared/Chart/SearchVolume';

const Analytics = ({
	noResults,
	popularSearches,
	searchVolume,
	popularFilters,
	popularResults,
	plan,
	redirectTo,
	loading,
}) => {
	if (loading) {
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		return <Spin indicator={antIcon} />;
	}
	return (
		<React.Fragment>
			<Card title="Daily Search Volume">
				<SearchVolumeChart
					width={window.innerWidth - 300}
					height={300}
					data={searchVolume}
				/>
			</Card>
			<Flex css="width: 100%;margin-top: 20px">
				<div css="flex: 50%;margin-right: 10px">
					<Searches
						onClick={() => redirectTo('popularSearches')}
						dataSource={popularSearches}
						title="Popular Searches"
						plan={plan}
					/>
				</div>
				<div css="flex: 50%;margin-left: 10px">
					<Searches
						onClick={() => redirectTo('noResultSearches')}
						dataSource={noResults}
						columns={noResultSearchesCol}
						title="No Result Searches"
						plan={plan}
					/>
				</div>
			</Flex>
			{plan === 'growth' && (
				<Flex css="width: 100%;margin-top: 50px">
					<div css="flex: 50%;margin-right: 10px">
						<Searches
							dataSource={popularResults}
							columns={popularResultsCol(plan)}
							title="Popular Results"
							onClick={() => redirectTo('popularResults')}
						/>
					</div>
					<div css="flex: 50%;margin-left: 10px">
						<Searches
							dataSource={popularFilters}
							columns={popularFiltersCol(plan)}
							title="Popular Filters"
							onClick={() => redirectTo('popularFilters')}
						/>
					</div>
				</Flex>
			)}
		</React.Fragment>
	);
};
Analytics.propTypes = {
	noResults: PropTypes.array,
	popularSearches: PropTypes.array,
	plan: PropTypes.string.isRequired,
	searchVolume: PropTypes.array,
	popularResults: PropTypes.array,
	redirectTo: PropTypes.func,
	popularFilters: PropTypes.array,
};

export default Analytics;
