import React from 'react';
import PropTypes from 'prop-types';
import Searches from './Searches';
import { getNoResultSearches, exportCSVFile } from '../utils';
import Loader from '../../shared/Loader/Spinner';

const headers = {
	key: 'Search Terms',
	count: 'Total Queries',
};
class NoResultsSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetching: true,
			noResults: [],
		};
	}

	componentDidMount() {
		const { appName } = this.props;
		getNoResultSearches(appName)
			.then((res) => {
				this.setState({
					noResults: res,
					isFetching: false,
				});
			})
			.catch(() => {
				this.setState({
					isFetching: false,
				});
			});
	}

	render() {
		const { isFetching, noResults } = this.state;
		if (isFetching) {
			return <Loader />;
		}
		return (
			<Searches
				tableProps={{
					scroll: { x: 700 },
				}}
				showViewOption={false}
				dataSource={noResults}
				title="No Results Searches"
				pagination={{
					pageSize: 10,
				}}
				onClickDownload={() => exportCSVFile(
						headers,
						noResults.map(item => ({
							key: item.key,
							count: item.count,
						})),
						'no_results_searches',
					)
				}
			/>
		);
	}
}
NoResultsSearch.propTypes = {
	appName: PropTypes.string.isRequired,
};
export default NoResultsSearch;
