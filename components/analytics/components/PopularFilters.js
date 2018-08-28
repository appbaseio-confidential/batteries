import React from 'react';
import PropTypes from 'prop-types';
import Searches from './Searches';
import { getPopularFilters, popularFiltersFull } from './../utils';
import Loader from './../../shared/Loader/Spinner';

class PopularFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFetching: true,
			popularFilters: [],
		};
	}
	componentDidMount() {
		getPopularFilters(this.props.appName)
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
		if (this.state.isFetching) {
			return <Loader />;
		}
		return (
			<Searches
				showViewOption={false}
				columns={popularFiltersFull(this.props.plan)}
				dataSource={this.state.popularFilters}
				title="Popular Filters"
				pagination={{
					pageSize: 10,
				}}
			/>
		);
	}
}
PopularFilters.propTypes = {
	plan: PropTypes.string,
	appName: PropTypes.string,
};

export default PopularFilters;
