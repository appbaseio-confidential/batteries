import get from 'lodash/get';
import {
	getAnalytics,
	getGeoDistribution,
	getSearchLatency,
	getAnalyticsSummary,
} from '../../components/analytics/utils';
import { getAppPlanByName } from '../selectors';
import { createAction } from './utils';
import AppConstants from '../constants';
/**
 * Get the app analytics
 * @param {string} name App name ( Optional )
 * @param {string} plan App Plan ( Optional )
 * @param {boolean} clickanalytics Whether to return click analytics data ( Optional )
 */
export function getAppAnalytics(name, plan, clickanalytics) {
	return (dispatch, getState) => {
		const appName = name || get(getState(), '$getCurrentApp.name', 'default');
		const appPlan = plan || get(getAppPlanByName(getState()), 'plan', 'free');
		dispatch(createAction(AppConstants.APP.ANALYTICS.GET));
		return getAnalytics(appName, appPlan, clickanalytics)
			.then(res => dispatch(
					createAction(AppConstants.APP.ANALYTICS.GET_SUCCESS, res, undefined, {
						appName,
					}),
				))
			.catch(error => dispatch(createAction(AppConstants.APP.ANALYTICS.GET_ERROR, null, error)));
	};
}
export function getAppAnalyticsSummary(name) {
	return (dispatch, getState) => {
		const appName = name || get(getState(), '$getCurrentApp.name', 'default');
		dispatch(createAction(AppConstants.APP.ANALYTICS.GET_SUMMARY));
		return getAnalyticsSummary(appName)
			.then(res => dispatch(
					createAction(AppConstants.APP.ANALYTICS.GET_SUMMARY_SUCCESS, res, undefined, {
						appName,
					}),
				))
			.catch(error => dispatch(createAction(AppConstants.APP.ANALYTICS.GET_SUMMARY_ERROR, null, error)));
	};
}

export function getAppSearchLatency(name) {
	return (dispatch, getState) => {
		const appName = name || get(getState(), '$getCurrentApp.name', 'default');
		dispatch(createAction(AppConstants.APP.ANALYTICS.GET_LATENCY));
		return getSearchLatency(appName)
			.then(res => dispatch(
					createAction(AppConstants.APP.ANALYTICS.GET_LATENCY_SUCCESS, res, undefined, {
						appName,
					}),
				))
			.catch(error => dispatch(createAction(AppConstants.APP.ANALYTICS.GET_LATENCY_ERROR, null, error)));
	};
}

export function getAppGeoDistribution(name) {
	return (dispatch, getState) => {
		const appName = name || get(getState(), '$getCurrentApp.name', 'default');
		dispatch(createAction(AppConstants.APP.ANALYTICS.GET_GEO_DISTRIBUTION));
		return getGeoDistribution(appName)
			.then(res => dispatch(
					createAction(
						AppConstants.APP.ANALYTICS.GET_GEO_DISTRIBUTION_SUCCESS,
						res,
						undefined,
						{
							appName,
						},
					),
				))
			.catch(error => dispatch(
					createAction(
						AppConstants.APP.ANALYTICS.GET_GEO_DISTRIBUTION_ERROR,
						null,
						error,
					),
				));
	};
}
