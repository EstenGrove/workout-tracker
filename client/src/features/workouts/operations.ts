import { apiEndpoints, currentEnv } from "../../utils/utils_env";

const fetchUserWorkouts = async (userID: string) => {
	let url = currentEnv.base + apiEndpoints.workouts.getUserWorkouts;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

export { fetchUserWorkouts };
