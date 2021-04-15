import { getCredentialsFromPermissions, ARC_PLANS } from '../../utils';
import { computeMetrics, getPlanFromTier, getApiCalls } from '../helpers';

export const computePlan = ({ payload }) => {
	const daysLeft = payload.time_validity ? Math.ceil(payload.time_validity / (24 * 60 * 60)) : 0;
	const isArcBasic =
		daysLeft > 0 &&
		[ARC_PLANS.ARC_BASIC, ARC_PLANS.HOSTED_ARC_BASIC, ARC_PLANS.HOSTED_ARC_BASIC_V2].includes(
			payload.tier,
		);
	const isArcStandard =
		daysLeft > 0 &&
		[
			ARC_PLANS.ARC_STANDARD,
			ARC_PLANS.HOSTED_ARC_STANDARD,
			ARC_PLANS.HOSTED_ARC_STANDARD_2021,
		].includes(payload.tier);
	const isArcEnterprise =
		daysLeft > 0 &&
		[
			ARC_PLANS.ARC_ENTERPRISE,
			ARC_PLANS.HOSTED_ARC_ENTERPRISE,
			ARC_PLANS.HOSTED_ARC_ENTERPRISE_2021,
		].includes(payload.tier);
	const isHostedArc = payload.billing_type === 'hosted_arc';
	const isClusterBilling = payload.billing_type === 'cluster';
	return {
		...payload,
		isArcBasic,
		isArcStandard,
		isArcEnterprise,
		isHostedArc,
		isClusterBilling,
		isPaid: payload.billing === false ? true : !!payload.tier && payload.time_validity > 0,
		plan: getPlanFromTier(payload.tier),
		daysLeft,
	};
};
export const computeAppPlanState = ({ payload }) => ({
	results: computePlan({ payload }),
});

export const computeAppMappingState = (action, state) => ({
	results: Object.assign({}, state.results, {
		[action.meta.appName]: {
			...action.payload,
			computedMetrics: computeMetrics(action.payload),
			totalApiCalls: getApiCalls(action.payload),
		},
	}),
});

export const computeStateByAppName = (action, state) => ({
	results: Object.assign({}, state.results, {
		[action.meta.appName]: action.payload,
	}),
});

export const computeAppPermissionState = (action, state) => {
	if (action.meta.source === 'user_apps') {
		const collectResults = {};
		Object.keys(action.payload || {}).forEach((key) => {
			collectResults[key] = {
				credentials: getCredentialsFromPermissions(action.payload[key]),
				results: action.payload[key],
			};
		});
		return {
			results: Object.assign({}, state.results, collectResults),
		};
	}
	return {
		results: Object.assign({}, state.results, {
			[action.meta.appName]: {
				credentials: getCredentialsFromPermissions(action.payload),
				results: action.payload,
			},
		}),
	};
};
