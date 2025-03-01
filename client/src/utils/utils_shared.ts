import {
	ActivityTypeRecord,
	// WorkoutsByCategoryID,
} from "../features/shared/types";
import { AsyncResponse } from "../features/types";
import {
	UserWorkout,
	Workout,
	WorkoutCategory,
} from "../features/workouts/types";
import { apiEndpoints, currentEnv } from "./utils_env";

export interface SharedAppData {
	workouts: Workout[];
	categories: WorkoutCategory[];
	activityTypes: ActivityTypeRecord[];
	workoutsByCategory: UserWorkout[];
}

export type WorkoutsAndActivityResp = AsyncResponse<SharedAppData>;

// Fetches workouts, activity types, categories and more
const fetchSharedAppData = async (userID: string): WorkoutsAndActivityResp => {
	let url = currentEnv.base + apiEndpoints.shared.getSharedAppData;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response as WorkoutsAndActivityResp;
	} catch (error) {
		return error;
	}
};

export { fetchSharedAppData };
