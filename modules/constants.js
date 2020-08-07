export default {
	ACCOUNT: {
		CHECK_USER_PLAN: {
			GET: '$GET_CHECK_USER_PLAN',
			GET_SUCCESS: '$GET_CHECK_USER_PLAN_SUCCESS',
			GET_ERROR: '$GET_CHECK_USER_PLAN_ERROR',
		},
		UPDATE_USER: '$UPDATE_USER',
		UPDATE_USER_SUCCESS: '$UPDATE_USER_SUCCESS',
		UPDATE_USER_ERROR: '$UPDATE_USER_ERROR',
		GET_USER: '$GET_USER',
		GET_USER_SUCCESS: '$GET_USER_SUCCESS',
		GET_USER_ERROR: '$GET_USER_ERROR',
		PAYMENT: {
			UPDATE: '$UPDATE_PAYMENT',
			UPDATE_SUCCESS: '$UPDATE_PAYMENT_SUCCESS',
			UPDATE_ERROR: '$UPDATE_PAYMENT_ERROR',
		},
	},
	APP: {
		SET_SEARCH_STATE: '$SET_SEARCH_STATE',
		CLEAR_SEARCH_STATE: '$CLEAR_SEARCH_STATE',
		SET_CURRENT_APP: '$SET_CURRENT_APP',
		CLEAR_CURRENT_APP: '$CLEAR_CURRENT_APP',
		GET_INFO: '$GET_APP_INFO',
		GET_INFO_SUCCESS: '$GET_APP_INFO_SUCCESS',
		GET_INFO_ERROR: '$GET_APP_INFO_ERROR',
		GET_MAPPINGS: '$GET_APP_MAPPINGS',
		GET_MAPPINGS_SUCCESS: '$GET_APP_MAPPINGS_SUCCESS',
		GET_MAPPINGS_ERROR: '$GET_APP_MAPPINGS_ERROR',
		CLEAR_MAPPINGS: '$CLEAR_APP_MAPPINGS',
		DELETE_APP: '$$DELETE_APP',
		DELETE_APP_SUCCESS: '$$DELETE_APP_SUCCESS',
		DELETE_APP_ERROR: '$$DELETE_APP_ERROR',
		GET_SHARE: '$GET_APP_SHARE',
		GET_SHARE_SUCCESS: '$GET_SHARE_SUCCESS',
		GET_SHARE_ERROR: '$GET_SHARE_ERROR',
		DELETE_SHARE: '$DELETE_APP_SHARE',
		DELETE_SHARE_SUCCESS: '$DELETE_SHARE_SUCCESS',
		DELETE_SHARE_ERROR: '$DELETE_SHARE_ERROR',
		GET_PLAN: '$GET_APP_PLAN',
		GET_PLAN_SUCCESS: '$GET_APP_PLAN_SUCCESS',
		GET_PLAN_ERROR: '$GET_APP_PLAN_ERROR',
		CREATE_SHARE: '$CREATE_APP_SHARE',
		CREATE_SHARE_SUCCESS: '$CREATE_APP_SHARE_SUCCESS',
		CREATE_SHARE_ERROR: '$CREATE_APP_SHARE_ERROR',
		TRANSFER_OWNERSHIP: '$TRANSFER_OWNERSHIP_SHARE',
		TRANSFER_OWNERSHIP_SUCCESS: '$TRANSFER_OWNERSHIP_SHARE_SUCCESS',
		TRANSFER_OWNERSHIP_ERROR: '$TRANSFER_OWNERSHIP_SHARE_ERROR',
		CREATE_SUBSCRIPTION: '$CREATE_APP_SUBSCRIPTION',
		CREATE_SUBSCRIPTION_SUCCESS: '$CREATE_APP_SUBSCRIPTION_SUCCESS',
		CREATE_SUBSCRIPTION_ERROR: '$CREATE_APP_SUBSCRIPTION_ERROR',
		DELETE_SUBSCRIPTION: '$DELETE_APP_SUBSCRIPTION',
		DELETE_SUBSCRIPTION_SUCCESS: '$DELETE_APP_SUBSCRIPTION_SUCCESS',
		DELETE_SUBSCRIPTION_ERROR: '$DELETE_APP_SUBSCRIPTION_ERROR',
		GET_METRICS: '$GET_APP_METRICS',
		GET_METRICS_SUCCESS: '$GET_APP_METRICS_SUCCESS',
		GET_METRICS_ERROR: '$GET_APP_METRICS_ERROR',
		GET_BUILD_INFO: '$GET_APP_BUILD_INFO',
		GET_BUILD_INFO_SUCCESS: '$GET_APP_BUILD_INFO_SUCCESS',
		GET_BUILD_INFO_ERROR: '$GET_APP_BUILD_INFO_ERROR',
		INSIGHTS_SIDEBAR: '$INSIGHTS_SIDEBAR',
		USERS: {
			GET: '$GET_USERS',
			GET_SUCCESS: '$GET_USERS_SUCCESS',
			GET_ERROR: '$GET_USERS_ERROR',
			CREATE_USER: '$CREATE_USER_USERS',
			CREATE_USER_SUCCESS: '$CREATE_USER_USERS_SUCCESS',
			CREATE_USER_ERROR: '$CREATE_USER_USERS_ERROR',
			EDIT_USER: '$EDIT_USER_USERS',
			EDIT_USER_SUCCESS: '$EDIT_USER_USERS_SUCCESS',
			EDIT_USER_ERROR: '$EDIT_USER_USERS_ERROR',
			DELETE_USER: '$DELETE_USER_USERS',
			DELETE_USER_SUCCESS: '$DELETE_USER_USERS_SUCCESS',
			DELETE_USER_ERROR: '$DELETE_USER_USERS_ERROR',
		},
		ANALYTICS: {
			GET: '$GET_ANALYTICS',
			GET_SUCCESS: '$GET_ANALYTICS_SUCCESS',
			GET_ERROR: '$GET_ANALYTICS_ERROR',
			GET_SUMMARY: '$GET_ANALYTICS_SUMMARY',
			GET_SUMMARY_SUCCESS: '$GET_ANALYTICS_SUMMARY_SUCCESS',
			GET_SUMMARY_ERROR: '$GET_ANALYTICS_SUMMARY_ERROR',
			GET_LATENCY: '$GET_ANALYTICS_LATENCY',
			GET_LATENCY_SUCCESS: '$GET_ANALYTICS_LATENCY_SUCCESS',
			GET_LATENCY_ERROR: '$GET_ANALYTICS_LATENCY_ERROR',
			GET_GEO_DISTRIBUTION: '$GET_ANALYTICS_GEO_DISTRIBUTION',
			GET_GEO_DISTRIBUTION_SUCCESS: '$GET_ANALYTICS_GEO_DISTRIBUTION_SUCCESS',
			GET_GEO_DISTRIBUTION_ERROR: '$GET_ANALYTICS_GEO_DISTRIBUTION_ERROR',
			GET_REQUEST_DISTRIBUTION: '$GET_ANALYTICS_REQUEST_DISTRIBUTION',
			GET_REQUEST_DISTRIBUTION_SUCCESS: '$GET_ANALYTICS_REQUEST_DISTRIBUTION_SUCCESS',
			GET_REQUEST_DISTRIBUTION_ERROR: '$GET_ANALYTICS_REQUEST_DISTRIBUTION_ERROR',
			GET_INSIGHTS: '$GET_ANALYTICS_INSIGHTS',
			GET_INSIGHTS_SUCCESS: '$GET_ANALYTICS_INSIGHTS_SUCCESS',
			GET_INSIGHTS_ERROR: '$GET_ANALYTICS_INSIGHTS_ERROR',
			UPDATE_INSIGHTS_STATUS: '$UPDATE_INSIGHTS_STATUS',
			UPDATE_INSIGHTS_STATUS_SUCCESS: '$UPDATE_INSIGHTS_STATUS_SUCCESS',
			UPDATE_INSIGHTS_STATUS_ERROR: '$UPDATE_INSIGHTS_STATUS_ERROR',
			GET_QUERY_VOLUME: '$GET_ANALYTICS_QUERY_VOLUME',
			GET_QUERY_VOLUME_SUCCESS: '$GET_ANALYTICS_QUERY_VOLUME_SUCCESS',
			GET_QUERY_VOLUME_ERROR: '$GET_ANALYTICS_QUERY_VOLUME_ERROR',
		},
		PERMISSION: {
			GET: '$GET_APP_PERMISSION',
			GET_SUCCESS: '$GET_APP_PERMISSION_SUCCESS',
			GET_ERROR: '$GET_APP_PERMISSION_ERROR',
			CREATE: '$CREATE_APP_PERMISSION',
			CREATE_SUCCESS: '$CREATE_APP_PERMISSION_SUCCESS',
			CREATE_ERROR: '$CREATE_APP_PERMISSION_ERROR',
			DELETE: '$DELETE_APP_PERMISSION',
			DELETE_SUCCESS: '$DELETE_APP_PERMISSION_SUCCESS',
			DELETE_ERROR: '$DELETE_APP_PERMISSION_ERROR',
			UPDATE: '$UPDATE_APP_PERMISSION',
			UPDATE_SUCCESS: '$UPDATE_APP_PERMISSION_SUCCESS',
			UPDATE_ERROR: '$UPDATE_APP_PERMISSION_ERROR',
		},
		FUNCTIONS: {
			GET: '$GET_APP_FUNCTIONS',
			GET_SUCCESS: '$GET_APP_FUNCTIONS_SUCCESS',
			GET_ERROR: '$GET_APP_FUNCTIONS_ERROR',
			SINGLE_GET: '$SINGLE_GET_APP_FUNCTIONS',
			SINGLE_GET_SUCCESS: '$SINGLE_GET_APP_FUNCTIONS_SUCCESS',
			SINGLE_GET_ERROR: '$SINGLE_GET_APP_FUNCTIONS_ERROR',
			CREATE: '$CREATE_APP_FUNCTIONS',
			CREATE_SUCCESS: '$CREATE_APP_FUNCTIONS_SUCCESS',
			CREATE_ERROR: '$CREATE_APP_FUNCTIONS_ERROR',
			DELETE: '$DELETE_APP_FUNCTIONS',
			DELETE_SUCCESS: '$DELETE_APP_FUNCTIONS_SUCCESS',
			DELETE_ERROR: '$DELETE_APP_FUNCTIONS_ERROR',
			UPDATE: '$UPDATE_APP_FUNCTIONS',
			UPDATE_SUCCESS: '$UPDATE_APP_FUNCTIONS_SUCCESS',
			UPDATE_ERROR: '$UPDATE_APP_FUNCTIONS_ERROR',
			INVOKE: '$INVOKE_APP_FUNCTIONS',
			INVOKE_SUCCESS: '$INVOKE_APP_FUNCTIONS_SUCCESS',
			INVOKE_ERROR: '$INVOKE_APP_FUNCTIONS_ERROR',
			REORDER: '$REORDER_APP_FUNCTIONS',
			REORDER_SUCCESS: '$REORDER_APP_FUNCTIONS_SUCCESS',
			REORDER_ERROR: '$REORDER_APP_FUNCTIONS_ERROR',
		},
		RULES: {
			GET: '$GET_APP_RULES',
			GET_SUCCESS: '$GET_APP_RULES_SUCCESS',
			GET_ERROR: '$GET_APP_RULES_ERROR',
			REORDER: '$REORDER_APP_RULES',
			REORDER_SUCCESS: '$REORDER_APP_RULES_SUCCESS',
			REORDER_ERROR: '$REORDER_APP_RULES_ERROR',
			DELETE: '$DELETE_APP_RULE',
			DELETE_SUCCESS: '$DELETE_APP_RULE_SUCCESS',
			DELETE_ERROR: '$DELETE_APP_RULE_ERROR',
			TOGGLE_STATUS: '$TOGGLE_STATUS',
			TOGGLE_STATUS_SUCCESS: '$TOGGLE_STATUS_SUCCESS',
			TOGGLE_STATUS_ERROR: '$TOGGLE_STATUS_ERROR',
			CREATE: '$CREATE_RULE',
			CREATE_ERROR: '$CREATE_RULE_ERROR',
			CREATE_SUCCESS: '$CREATE_RULE_SUCCESS',
			UPDATE_RULE: '$UPDATE_RULE',
			UPDATE_RULE_SUCCESS: '$UPDATE_RULE_SUCCESS',
			UPDATE_RULE_ERROR: '$UPDATE_RULE_ERROR',
			CLONE: '$CLONE_RULE',
			CLONE_ERROR: '$CLONE_RULE_ERROR',
			CLONE_SUCCESS: '$CLONE_RULE_SUCCESS',
		},
		PRIVATE_REGISTRY: {
			GET: '$GET_PRIVATE_REGISTRY',
			GET_SUCCESS: '$GET_PRIVATE_REGISTRY_SUCCESS',
			GET_ERROR: '$GET_PRIVATE_REGISTRY_ERROR',
			UPDATE: '$UPDATE_PRIVATE_REGISTRY',
			UPDATE_SUCCESS: '$UPDATE_PRIVATE_REGISTRY_SUCCESS',
			UPDATE_ERROR: '$UPDATE_PRIVATE_REGISTRY_ERROR',
		},
		TEMPLATES: {
			GET: '$GET_APP_TEMPLATE',
			GET_SUCCESS: '$GET_APP_TEMPLATE_SUCCESS',
			GET_ERROR: '$GET_APP_TEMPLATE_ERROR',
			GET_ALL: '$GET_ALL_APP_TEMPLATE',
			GET_ALL_SUCCESS: '$GET_ALL_APP_TEMPLATE_SUCCESS',
			GET_ALL_ERROR: '$GET_ALL_APP_TEMPLATE_ERROR',
			UPDATE: '$UPDATE_APP_TEMPLATE',
			UPDATE_SUCCESS: '$UPDATE_APP_TEMPLATE_SUCCESS',
			UPDATE_ERROR: '$UPDATE_APP_TEMPLATE_ERROR',
			DELETE: '$DELETE_APP_TEMPLATE',
			DELETE_SUCCESS: '$DELETE_APP_TEMPLATE_SUCCESS',
			DELETE_ERROR: '$DELETE_APP_TEMPLATE_ERROR',
			VALIDATE: '$VALIDATE_APP_TEMPLATE',
			CLEAR_VALIDATE: '$CLEAR_VALIDATE_APP_TEMPLATE',
			VALIDATE_SUCCESS: '$VALIDATE_APP_TEMPLATE_SUCCESS',
			VALIDATE_ERROR: '$VALIDATE_APP_TEMPLATE_ERROR',
		},
		PUBLIC_KEY: {
			GET: '$GET_APP_PUBLIC_KEY',
			GET_SUCCESS: '$GET_APP_PUBLIC_KEY_SUCCESS',
			GET_ERROR: '$GET_APP_PUBLIC_KEY_ERROR',
			UPDATE: '$UPDATE_APP_PUBLIC_KEY',
			UPDATE_SUCCESS: '$UPDATE_APP_PUBLIC_KEY_SUCCESS',
			UPDATE_ERROR: '$UPDATE_APP_PUBLIC_KEY_ERROR',
		},
		FILTER: {
			GET_LABEL: '$GET_FILTER_LABEL',
			GET_LABEL_SUCCESS: 'GET_FILTER_LABEL_SUCCESS',
			GET_LABEL_ERROR: 'GET_FILTER_LABEL_ERROR',
			GET_VALUE: '$GET_FILTER_VALUE',
			GET_VALUE_SUCCESS: 'GET_FILTER_VALUE_SUCCESS',
			GET_VALUE_ERROR: 'GET_FILTER_VALUE_ERROR',
			SET_FILTER_VALUE: 'SET_FILTER_VALUE',
			CLEAR_FILTER_VALUE: 'CLEAR_FILTER_VALUE',
		},
		SUGGESTIONS: {
			GET_PREFERENCES: '$GET_SUGGESTIONS_PREFERENCES',
			GET_PREFERENCES_SUCCESS: 'GET_SUGGESTIONS_PREFERENCES_SUCCESS',
			GET_PREFERENCES_ERROR: 'GET_SUGGESTIONS_PREFERENCES_ERROR',
			SAVE_PREFERENCES: '$SAVE_SUGGESTIONS_PREFERENCES',
			SAVE_PREFERENCES_SUCCESS: 'SAVE_SUGGESTIONS_PREFERENCES_SUCCESS',
			SAVE_PREFERENCES_ERROR: 'SAVE_SUGGESTIONS_PREFERENCES_ERROR',
		},
		SEARCH_SETTINGS: {
			GET: '$GET_SEARCH_SETTINGS',
			GET_SUCCESS: '$GET_SEARCH_SETTINGS_SUCCESS',
			GET_ERROR: '$GET_SEARCH_SETTINGS_ERROR',
			GET_DEFAULT: '$GET_DEFAULT_SEARCH_SETTINGS',
			GET_DEFAULT_SUCCESS: '$GET_DEFAULT_SEARCH_SETTINGS_SUCCESS',
			GET_DEFAULT_ERROR: '$GET_DEFAULT_SEARCH_SETTINGS_ERROR',
			UPDATE: '$UPDATE_SEARCH_SETTINGS',
			UPDATE_SUCCESS: '$UPDATE_SEARCH_SETTINGS_SUCCESS',
			UPDATE_ERROR: '$GET_SEARCH_SETTINGS_ERROR',
			DELETE: '$DELETE_SEARCH_SETTINGS',
			DELETE_SUCCESS: '$DELETE_SEARCH_SETTINGS_SUCCESS',
			DELETE_ERROR: '$DELETE_SEARCH_SETTINGS_ERROR',
		},
		GRADE: {
			GET: '$GET_APP_GRADE',
			GET_SUCCESS: '$GET_APP_GRADE_SUCCESS',
			GET_ERROR: '$GET_APP_GRADE_ERROR',
		},
	},
};
