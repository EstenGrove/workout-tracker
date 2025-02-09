const BASE_URL: string = import.meta.env.VITE_API_BASE;

const API_AUTH = {
	development: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_USER_PASSWORD,
		enableHttps: import.meta.env.VITE_ENABLE_HTTPS,
	},
	production: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_USER_PASSWORD,
		enableHttps: import.meta.env.VITE_ENABLE_HTTPS,
	},
	testing: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_USER_PASSWORD,
		enableHttps: import.meta.env.VITE_ENABLE_HTTPS,
	},
	local: {
		assets: import.meta.env.VITE_APP_ASSETS_URL,
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_USER_PASSWORD,
		enableHttps: import.meta.env.VITE_ENABLE_HTTPS,
	},
	// USED FOR TESTING ON LOCAL NETWORK
	network: {
		assets: import.meta.env.VITE_TEST_ASSETS_URL,
		base: import.meta.env.VITE_TEST_API_BASE,
		user: import.meta.env.VITE_TEST_API_USER,
		password: import.meta.env.VITE_TEST_API_USER_PASSWORD,
		enableHttps: import.meta.env.VITE_ENABLE_HTTPS,
	},
	ssl: {
		assets: import.meta.env.VITE_SSL_API_ASSETS_URL,
		// base: import.meta.env.VITE_SSL_API_BASE,
		base: "https://192.168.0.203:3000/api/v1",
		// base: "https://localhost:3000/api/v1",
		user: import.meta.env.VITE_SSL_API_USER,
		password: import.meta.env.VITE_SSL_API_USER_PASSWORD,
		enableHttps: true,
	},
};

const CURRENT_ENV_KEY = "ssl";
const CURRENT_ENV = API_AUTH[CURRENT_ENV_KEY];

const API_ENDPOINTS = {
	user: {
		getByLogin: "/user/getUserByLogin",
		getByID: "/user/getUserByID",
	},
	workouts: {
		getAll: "/workouts/getAllWorkouts",
		getOpen: "/workouts/getOpenWorkouts",
		getUserWorkouts: "/workouts/getUserWorkouts",
	},
	meds: {
		logMed: "/meds/logMedication",
		getPillSummaryByDate: "/meds/getPillSummary",
		getSummaryByDate: "/meds/getMedSummaryByDate",
		getSummariesByDate: "/meds/getMedSummariesByDate",
		getUserMeds: "/meds/getUserMeds",
	},
};

export const { user: userApis, workouts: workoutApis } = API_ENDPOINTS;

export {
	BASE_URL as baseUrl,
	API_AUTH as apiAuth,
	CURRENT_ENV as currentEnv,
	CURRENT_ENV_KEY as currentEnvKey,
	API_ENDPOINTS as apiEndpoints,
};
