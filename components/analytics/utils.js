import React from 'react';
import { css } from 'emotion';
import moment from 'moment';
import { Button } from 'antd';
import get from 'lodash/get';
// import mockProfile from './components/mockProfile';
import { doGet, doPut } from '../../utils/requestService';
import Flex from '../shared/Flex';
import { getURL } from '../../../constants/config';
import { getUrlParams } from '../../../utils/helper';

let lastIndex = 0;
const updateIndex = () => {
	lastIndex += 1;
	return lastIndex;
};

const requestOpt = css`
	color: #00ff88;
	text-transform: uppercase;
	font-weight: 500;
	padding: 5px 10px;
	border-radius: 3px;
	border: solid 1px #00ff88;
`;
export const getQueryParams = (paramObj) => {
	let queryString = '';
	if (paramObj) {
		Object.keys(paramObj).forEach((o, i) => {
			if (i === 0) {
				queryString = `?${o}=${encodeURIComponent(paramObj[o])}`;
			} else {
				queryString += `&${o}=${encodeURIComponent(paramObj[o])}`;
			}
		});
	}
	return queryString;
};

export const getStringifiedJSON = (data) => {
	try {
		return JSON.stringify(data, null, 2);
	} catch (e) {
		return data;
	}
};

const replaySearch = [
	{
		title: 'Replay Search',
		key: 'search_state',
		width: 125,
		render: (item) => (
			<div css="text-align: center">
				<Button
					disabled={!item.search_state}
					icon="redo"
					onClick={() => item.handleReplaySearch(item.search_state)}
				/>
			</div>
		),
	},
];

export const getTimeDuration = (time) => {
	const timeInMs = moment.duration(moment().diff(time)).asMilliseconds();
	if (timeInMs >= 24 * 60 * 60 * 1000) {
		const timeD = parseInt(timeInMs / (24 * 60 * 60 * 1000), 10);
		return {
			unit: 'day',
			time: timeD,
			formattedUnit: timeD > 1 ? 'days' : 'day',
		};
	}
	if (timeInMs >= 60 * 60 * 1000) {
		const timeH = parseInt(timeInMs / (60 * 60 * 1000), 10);
		return {
			unit: 'hr',
			time: timeH,
			formattedUnit: timeH > 1 ? 'hrs' : 'hr',
		};
	}
	if (timeInMs >= 60 * 1000) {
		const timeM = parseInt(timeInMs / (60 * 1000), 10);
		return {
			unit: 'min',
			time: timeM,
			formattedUnit: timeM > 1 ? 'mins' : 'min',
		};
	}
	if (timeInMs >= 1000) {
		const timeS = parseInt(timeInMs / 1000, 10);
		return {
			unit: 'sec',
			time: timeS,
			formattedUnit: timeS > 1 ? 'secs' : 'sec',
		};
	}
	return {
		unit: 'ms',
		time: parseInt(timeInMs / 1000, 10),
	};
};

export function getFormattedTime(time = 0) {
	const secNum = parseInt(time, 10); // don't forget the second param
	let hours = Math.floor(secNum / 3600);
	let minutes = Math.floor((secNum - hours * 3600) / 60);
	let seconds = secNum - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = `0${hours}`;
	}
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	return `${hours}:${minutes}:${seconds}`;
}

export const parseTimeDuration = (time) => {
	const timeInMs = time * 1000;
	if (timeInMs >= 24 * 60 * 60 * 1000) {
		const timeD = parseInt(timeInMs / (24 * 60 * 60 * 1000), 10);
		return {
			unit: 'day',
			time: timeD,
			formattedUnit: timeD > 1 ? 'days' : 'day',
		};
	}
	if (timeInMs >= 60 * 60 * 1000) {
		const timeH = parseInt(timeInMs / (60 * 60 * 1000), 10);
		return {
			unit: 'hr',
			time: timeH,
			formattedUnit: timeH > 1 ? 'hrs' : 'hr',
		};
	}
	if (timeInMs >= 60 * 1000) {
		const timeM = parseInt(timeInMs / (60 * 1000), 10);
		return {
			unit: 'min',
			time: timeM,
			formattedUnit: timeM > 1 ? 'mins' : 'min',
		};
	}
	if (timeInMs >= 1000) {
		const timeS = parseInt(timeInMs / 1000, 10);
		return {
			unit: 'sec',
			time: timeS,
			formattedUnit: timeS > 1 ? 'secs' : 'sec',
		};
	}
	return {
		unit: 'ms',
		time: parseInt(timeInMs / 1000, 10),
	};
};

export const popularFiltersCol = (plan, displayReplaySearch) => {
	const defaults = [
		{
			title: 'Filters',
			render: (item) => (
				<React.Fragment>
					<strong>{item.key}</strong>
					{` ${item.value}`}
				</React.Fragment>
			),
			key: `pf-filters${updateIndex()}`,
		},
		{
			title: 'Selections',
			dataIndex: 'count',
			key: `pf-count${updateIndex()}`,
		},
	];
	if (!plan || (plan !== 'growth' && plan !== 'bootstrap')) {
		return defaults;
	}
	return [...defaults, ...(displayReplaySearch ? replaySearch : [])];
};
export const popularResultsCol = (plan, displayReplaySearch) => {
	const defaults = [
		{
			title: 'Results',
			dataIndex: 'key',
			key: `pr-results${updateIndex()}`,
		},
		{
			title: 'Impressions',
			dataIndex: 'count',
			key: `pr-count${updateIndex()}`,
		},
	];
	if (!plan || (plan !== 'growth' && plan !== 'bootstrap')) {
		return defaults;
	}
	return [...defaults, ...(displayReplaySearch ? replaySearch : [])];
};
export const defaultColumns = (plan, QueryOverview, filterId) => {
	const defaults = [
		{
			title: 'Search Terms',
			dataIndex: 'key',
			key: `search-term${updateIndex()}`,
			...(QueryOverview
				? {
						render: (key) => <QueryOverview query={key} filterId={filterId} />,
				  }
				: null),
		},
		{
			title: 'Total Queries',
			dataIndex: 'count',
			key: `count${updateIndex()}`,
		},
	];
	if (!plan || plan !== 'growth') {
		return defaults;
	}
	return [
		...defaults,
		{
			title: 'Click Rate',
			dataIndex: 'click_rate',
			render: (i) => i.toFixed(2),
			key: `clickrate${updateIndex()}`,
		},
	];
};

export const topClicksColumns = () => [
	{
		title: 'Results',
		dataIndex: 'key',
		key: `top-click${updateIndex()}`,
	},
	{
		title: 'Clicks',
		dataIndex: 'count',
		key: `top-click-count${updateIndex()}`,
	},
	{
		title: 'Click Type',
		dataIndex: 'click_type',
		key: `top-click_type${updateIndex()}`,
	},
];

export const topResultsColumns = (ViewSource) => [
	{
		title: 'Results',
		dataIndex: 'key',
		key: `top-results-key${updateIndex()}`,
	},
	{
		title: 'Impressions',
		dataIndex: 'count',
		key: `top-results-count${updateIndex()}`,
	},
	{
		title: 'Source',
		key: `top-results-source${updateIndex()}`,
		render: (item) => <ViewSource docID={item.key} index={item.index} />,
	},
];

export const popularSearchesCol = (plan, displayReplaySearch) => {
	if (plan !== 'growth' && plan !== 'bootstrap') {
		return defaultColumns();
	}
	return [...defaultColumns(), ...(displayReplaySearch ? replaySearch : [])];
};

export const noResultsFull = (plan, displayReplaySearch) => {
	if (plan !== 'growth' && plan !== 'bootstrap') {
		return defaultColumns();
	}
	return [...defaultColumns(), ...(displayReplaySearch ? replaySearch : [])];
};

export const ConvertToCSV = (objArray) => {
	const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
	let str = '';

	for (let i = 0; i < array.length; i += 1) {
		let line = '';
		// eslint-disable-next-line
		for (var index in array[i]) {
			if (line !== '') line += ',';
			line += array[i][index];
		}

		str += `${line}\r\n`;
	}

	return str;
};
export const exportCSVFile = (headers, items, fileTitle) => {
	if (headers) {
		items.unshift(headers);
	}

	// Convert Object to JSON
	const jsonObject = JSON.stringify(items);

	const csv = ConvertToCSV(jsonObject);

	const exportedFilenmae = fileTitle ? `${fileTitle}.csv` : 'export.csv';

	const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) {
		// IE 10+
		navigator.msSaveBlob(blob, exportedFilenmae);
	} else {
		const link = document.createElement('a');
		if (link.download !== undefined) {
			// feature detection
			// Browsers that support HTML5 download attribute
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute('download', exportedFilenmae);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
};

export const popularSearchesFull = (plan, displayReplaySearch, QueryOverview, filterId) => {
	if (!plan || plan !== 'growth') {
		return [
			...defaultColumns(plan, QueryOverview, filterId),
			...(plan === 'bootstrap' && displayReplaySearch ? replaySearch : []),
		];
	}
	return [
		...defaultColumns('free', QueryOverview, filterId),
		{
			title: 'Clicks',
			dataIndex: 'clicks',
			key: `ps-clicks${updateIndex()}`,
		},
		{
			title: 'Avg Click Position',
			dataIndex: 'click_position',
			render: (i) => i.toFixed(2),
			key: `ps-clickposition${updateIndex()}`,
		},
		{
			title: 'Click Rate',
			dataIndex: 'click_rate',
			render: (i) => i.toFixed(2),
			key: `ps-clickrate${updateIndex()}`,
		},
		{
			title: 'Conversion Rate',
			dataIndex: 'conversion_rate',
			render: (i) => i.toFixed(2),
			key: `ps-conversionrate${updateIndex()}`,
		},
		...(displayReplaySearch ? replaySearch : []),
	];
};

export const popularResultsFull = (plan, displayReplaySearch, ViewSource) => {
	return [
		...popularResultsCol('free'),
		{
			title: 'Clicks',
			dataIndex: 'clicks',
			key: `pr-clicks${updateIndex()}`,
		},
		{
			title: 'Click Rate',
			dataIndex: 'click_rate',
			render: (i) => i.toFixed(2),
			key: `pr-clickrate${updateIndex()}`,
		},
		{
			title: 'Click Position',
			dataIndex: 'click_position',
			render: (item) => (
				<div css="overflow-y: scroll; max-height:150px;">{item.toFixed(2) || '-'}</div>
			),
			key: `pr-clickposition${updateIndex()}`,
		},
		{
			title: 'Conversion Rate',
			dataIndex: 'conversion_rate',
			render: (i) => i.toFixed(2),
			key: `pr-conversionrate${updateIndex()}`,
		},
		...(displayReplaySearch ? replaySearch : []),
		// hide source at cluster level
		{
			title: 'Source',
			key: `pr-source${updateIndex()}`,
			render: (item) => <ViewSource docID={item.key} index={item.index} />,
		},
	];
};
export const popularFiltersFull = (plan, displayReplaySearch) => {
	if (plan !== 'growth') {
		return [
			...popularFiltersCol(plan),
			...(plan === 'bootstrap' && displayReplaySearch ? replaySearch : []),
		];
	}
	return [
		...popularFiltersCol('free'),
		{
			title: 'Clicks',
			dataIndex: 'clicks',
			key: `pf-clicks${updateIndex()}`,
		},
		{
			title: 'Click Rate',
			dataIndex: 'click_rate',
			render: (i) => i.toFixed(2),
			key: `pf-clickrate${updateIndex()}`,
		},
		{
			title: 'Click Position',
			dataIndex: 'click_position',
			key: `pf-clickposition${updateIndex()}`,
			render: (item) => (
				<div css="overflow-y: scroll; max-height:150px;">{item.toFixed(2) || '-'}</div>
			),
		},
		{
			title: 'Conversion Rate',
			dataIndex: 'conversion_rate',
			render: (i) => i.toFixed(2),
			key: `pf-conversionrate${updateIndex()}`,
		},
		...(displayReplaySearch ? replaySearch : []),
	];
};

export const getRequestLogsColumns = (displaySearchLogs) => [
	{
		title: 'Operation',
		dataIndex: 'operation',
		render: (operation) => (
			<div>
				<Flex>
					<div css="width: 100px;margin-top: 5px;word-break: keep-all;">
						<span css={requestOpt}>{operation.method}</span>
					</div>
					<div css="margin-left: 5px;">
						<span css="color: #74A2FF;">{operation.uri}</span>
					</div>
				</Flex>
			</div>
		),
		key: `operation${updateIndex()}`,
	},
	...(displaySearchLogs
		? [
				{
					title: 'Latency (in ms)',
					width: '150px',
					key: `type${updateIndex()}`,
					dataIndex: 'took',
				},
		  ]
		: [
				{
					title: 'Type',
					dataIndex: 'classifier',
					width: '100px',
					key: `type${updateIndex()}`,
				},
		  ]),
	{
		title: 'Time',
		dataIndex: 'timeTaken',
		width: '140px',
		key: `time${updateIndex()}`,
	},
	{
		title: 'Status',
		dataIndex: 'status',
		width: '100px',
		key: `status${updateIndex()}`,
	},
];

export const getAuthToken = () => {
	let token = null;
	try {
		token = sessionStorage.getItem('authToken');
	} catch (e) {
		console.error(e);
	}
	return token;
};

export const getApp = (app) => {
	if (window.location.pathname.startsWith('/cluster/')) return '';
	return `${app}/`;
};

/**
 * Get the analytics
 * @param {string} appName
 */
export function getAnalytics(appName, filters) {
	return new Promise((resolve, reject) => {
		const ACC_API = getURL();
		const url = `${ACC_API}/_analytics/${getApp(appName)}advanced`;
		const queryParams = getQueryParams({
			...filters,
			// from: moment()
			// 	.subtract(30, 'days')
			// 	.format('YYYY/MM/DD'),
			// to: moment().format('YYYY/MM/DD'),
		});

		const authToken = getAuthToken();
		fetch(url + queryParams, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${authToken}`,
			},
		})
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
}
/**
 * Get the search latency
 * @param {string} appName
 */
export function getSearchLatency(appName, filters) {
	return new Promise((resolve, reject) => {
		const authToken = getAuthToken();
		const ACC_API = getURL();
		fetch(`${ACC_API}/_analytics/${getApp(appName)}latency${getQueryParams(filters)}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${authToken}`,
			},
		})
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
}

/**
 * Get the query overview
 * @param {string} appName
 * @param {string} filters
 * @param {string} query
 */
export function getQueryOverview(appName, filters, query) {
	return new Promise((resolve, reject) => {
		const authToken = getAuthToken();
		const ACC_API = getURL();
		fetch(
			`${ACC_API}/_analytics/${getApp(appName)}query-overview${getQueryParams({
				...filters,
				...(query && query !== '<empty_query>' ? { query } : null),
			})}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${authToken}`,
				},
			},
		)
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
}
/**
 * Get the geo distribution
 * @param {string} appName
 */
export function getGeoDistribution(appName, filters) {
	return new Promise((resolve, reject) => {
		const authToken = getAuthToken();
		const ACC_API = getURL();
		fetch(
			`${ACC_API}/_analytics/${getApp(appName)}geo-distribution${getQueryParams(filters)}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${authToken}`,
				},
			},
		)
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
}
/**
 * Get the search latency
 * @param {string} appName
 */
export function getAnalyticsSummary(appName, filters) {
	const ACC_API = getURL();
	return doGet(`${ACC_API}/_analytics/${getApp(appName)}summary${getQueryParams(filters)}`);
}
/**
 * Get the popular seraches
 * @param {string} appName
 */
// eslint-disable-next-line
export function getPopularSearches(appName, clickanalytics = true, size = 100, filters) {
	return new Promise((resolve, reject) => {
		const authToken = getAuthToken();
		const ACC_API = getURL();
		fetch(
			`${ACC_API}/_analytics/${getApp(appName)}popular-searches${getQueryParams({
				size,
				click_analytics: clickanalytics,
				...filters,
			})}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${authToken}`,
				},
			},
		)
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
				// resolve(data.body.popularSearches);
			})
			.catch((e) => {
				reject(e);
			});
	});
}
/**
 * Get the no results seraches
 * @param {string} appName
 */
export function getNoResultSearches(appName, size = 100, filters) {
	return new Promise((resolve, reject) => {
		const authToken = getAuthToken();
		const ACC_API = getURL();
		fetch(
			`${ACC_API}/_analytics/${getApp(appName)}no-result-searches${getQueryParams({
				size,
				...filters,
			})}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${authToken}`,
				},
			},
		)
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
}
// eslint-disable-next-line
export function getPopularResults(appName, clickanalytics = true, size = 100, filters) {
	return new Promise((resolve, reject) => {
		const authToken = getAuthToken();
		const ACC_API = getURL();
		fetch(
			`${ACC_API}/_analytics/${getApp(appName)}popular-results${getQueryParams({
				size,
				click_analytics: clickanalytics,
				...filters,
			})}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${authToken}`,
				},
			},
		)
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
}
/**
 * Get the request distribution
 * @param {string} appName
 */
export function getRequestDistribution(appName, filters) {
	const ACC_API = getURL();
	return doGet(
		`${ACC_API}/_analytics/${getApp(appName)}request-distribution${getQueryParams(filters)}`,
	);
}
// eslint-disable-next-line
export function getPopularFilters(appName, clickanalytics = true, size = 100, filters) {
	return new Promise((resolve, reject) => {
		const authToken = getAuthToken();
		const ACC_API = getURL();
		fetch(
			`${ACC_API}/_analytics/${getApp(appName)}popular-filters${getQueryParams({
				size,
				click_analytics: clickanalytics,
				...filters,
			})}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${authToken}`,
				},
			},
		)
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
}
// To fetch request logs
export function getRequestLogs(
	appName,
	queryParams = {
		size: 10,
		from: 0,
		filter: undefined,
		startDate: undefined,
		endDate: undefined,
		startLatency: undefined,
		endLatency: undefined,
	},
	isSearchLogs = false,
) {
	return new Promise((resolve, reject) => {
		const authToken = getAuthToken();
		const ACC_API = getURL();
		const validFilters = ['search', 'success', 'error', 'delete'];
		fetch(
			`${ACC_API}/${getApp(appName)}${
				isSearchLogs ? '_logs/search' : '_logs'
			}${getQueryParams(
				// remove undefined
				JSON.parse(
					JSON.stringify({
						size: queryParams.size,
						from: queryParams.from,
						start_date: queryParams.startDate,
						end_date: queryParams.endDate,
						start_latency: queryParams.startLatency,
						end_latency: queryParams.endLatency,
						...(queryParams.filter &&
							validFilters.includes(queryParams.filter) && {
								filter: queryParams.filter,
							}),
					}),
				),
			)}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${authToken}`,
				},
			},
		)
			// Comment out this line
			.then((res) => res.json())
			.then((res) => {
				// resolve the promise with response
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	});
}

/**
 * Get the analytics insights
 * @param {string} appName
 */
export function getAnalyticsInsights(appName) {
	const ACC_API = getURL();
	return doGet(`${ACC_API}/_analytics/${getApp(appName)}insights`);
}

/**
 * Update the analytics insights status
 * @param {string} appName
 * @param {string} id
 * @param {string} status
 */
export function updateAnalyticsInsights({ id, status, appName }) {
	const ACC_API = getURL();
	return doPut(`${ACC_API}/_analytics/${getApp(appName)}insight-status`, {
		id,
		status,
	});
}

// Banner messages
export const bannerMessagesAnalytics = {
	free: {
		title: 'Unlock the ROI impact of your search',
		description:
			'Get a paid plan to see actionable analytics on search volume, popular searches, no results, track clicks and conversions.',
		buttonText: 'Upgrade Now',
		href: 'billing',
	},
	bootstrap: {
		title: 'Get richer analytics on clicks and conversions',
		description:
			'By upgrading to the Growth plan, you can track clicks and conversions, get a 30-day retention on analytics along with being able to view actionable analytics on popular filters, popular results, search latency and geo distribution.',
		buttonText: 'Upgrade To Growth',
		href: 'billing',
	},
	growth: {
		title: 'Learn how to track click analytics',
		description:
			'See our docs on how to track search, filters, click events, conversions and add your own custom events.',
		buttonText: 'Read Docs',
		href: 'https://docs.appbase.io',
	},
};
export const tabMappings = {
	popularSearches: 'popular-searches',
	noResultSearches: 'no-result-searches',
	popularResults: 'popular-results',
	popularFilters: 'popular-filters',
	requestLogs: 'request-logs',
	analytics: 'analytics',
};
export const getActiveKeyByRoutes = (tab) => {
	let activeKey = '';
	Object.keys(tabMappings).every((k) => {
		if (tabMappings[k] === tab) {
			activeKey = k;
			return false;
		}
		return true;
	});
	return activeKey;
};

export const applyFilterParams = ({ filters, callback, filterId, applyFilter }) => {
	const urlParams = getUrlParams(window.location.search);
	if (
		urlParams.from &&
		urlParams.to &&
		filters.from !== urlParams.from &&
		filters.to !== urlParams.to
	) {
		applyFilter(filterId, 'from', urlParams.from);
		applyFilter(filterId, 'to', urlParams.to);
		return;
	}
	if (callback) {
		callback();
	}
};

export const dateRanges = {
	'This week': {
		from: moment().startOf('week').format('YYYY/MM/DD'),
		to: moment().format('YYYY/MM/DD'),
	},
	'Last Week': {
		from: moment().subtract(1, 'weeks').startOf('week').format('YYYY/MM/DD'),
		to: moment().subtract(1, 'weeks').endOf('week').format('YYYY/MM/DD'),
	},
	'This Month': {
		from: moment().startOf('month').format('YYYY/MM/DD'),
		to: moment().format('YYYY/MM/DD'),
	},
	'Last Month': {
		from: moment().subtract(1, 'months').startOf('month').format('YYYY/MM/DD'),
		to: moment().subtract(1, 'months').endOf('month').format('YYYY/MM/DD'),
	},
	'Last 7 days': {
		from: moment().subtract(7, 'days').format('YYYY/MM/DD'),
		to: moment().format('YYYY/MM/DD'),
	},
	'Last 30 days': {
		from: moment().subtract(30, 'days').format('YYYY/MM/DD'),
		to: moment().format('YYYY/MM/DD'),
	},
	'Last 60 days': {
		from: moment().subtract(60, 'days').format('YYYY/MM/DD'),
		to: moment().format('YYYY/MM/DD'),
	},
	'Last 90 days': {
		from: moment().subtract(90, 'days').format('YYYY/MM/DD'),
		to: moment().format('YYYY/MM/DD'),
	},
};

export const requestLogsDateRanges = {
	Today: {
		from: moment().format('YYYY/MM/DD'),
		to: moment().format('YYYY/MM/DD'),
	},
	Yesterday: {
		from: moment().subtract(1, 'day').format('YYYY/MM/DD'),
		to: moment().subtract(1, 'day').format('YYYY/MM/DD'),
	},
	...dateRanges,
};

export const dateRangesColumn = (dates = dateRanges, columnItems = 4) =>
	Object.keys(dates).reduce((agg, item, index) => {
		const columnIndex = `col_${Math.floor(index / columnItems)}`;
		return {
			...agg,
			[columnIndex]: {
				...get(agg, columnIndex, {}),
				[item]: dates[item],
			},
		};
	}, {});
