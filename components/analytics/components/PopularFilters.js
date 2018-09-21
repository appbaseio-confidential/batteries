import React from 'react';
import PropTypes from 'prop-types';
import Searches from './Searches';
import { getPopularFilters, popularFiltersFull, exportCSVFile } from '../utils';
import Loader from '../../shared/Loader/Spinner';

const headers = {
	key: 'Filters',
	count: 'Impressions',
	clicks: 'Clicks',
	source: 'Source',
	conversionrate: 'Conversion Rate',
};

class PopularFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetching: true,
			popularFilters: [],
		};
	}

	componentDidMount() {
		const { appName } = this.props;
		getPopularFilters(appName)
			.then((res) => {
				this.setState({
					popularFilters: res,
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
		const { isFetching, popularFilters } = this.state;
		const { plan } = this.props;
		if (isFetching) {
			return <Loader />;
		}
		return (
			<Searches
				showViewOption={false}
				columns={popularFiltersFull(plan)}
				dataSource={popularFilters}
				title="Popular Filters"
				pagination={{
					pageSize: 10,
				}}
				onClickDownload={() => exportCSVFile(
						headers,
						popularFilters.map(item => ({
							key: item.key.replace(/,/g, ''),
							count: item.count,
							clicks: item.clicks || '-',
							source: item.source.replace(/,/g, '') || '-',
							conversionrate: item.conversionrate || '-',
						})),
						'popular_results',
					)
				}
			/>
		);
	}
}
PopularFilters.propTypes = {
	plan: PropTypes.string.isRequired,
	appName: PropTypes.string.isRequired,
};

export default PopularFilters;
