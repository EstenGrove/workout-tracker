import { formatDistance } from "date-fns";
import { ActiveTimer, TimerStatus } from "../hooks/useWorkoutTimer";
import { apiEndpoints, currentEnv } from "./utils_env";
import { AsyncResponse } from "../features/types";
import { Workout, WorkoutCategory } from "../features/workouts/types";

export type UserWorkoutsResp = AsyncResponse<{ userWorkouts: Workout[] }>;
export type CategoryResp = AsyncResponse<{ categories: WorkoutCategory[] }>;

const fetchWorkoutCategories = async (userID: string): CategoryResp => {
	let url = currentEnv.base + apiEndpoints.workouts.getCategories;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response as CategoryResp;
	} catch (error) {
		return error;
	}
};

const fetchUserWorkouts = async (userID: string): UserWorkoutsResp => {
	let url = currentEnv.base + apiEndpoints.workouts.getUserWorkouts;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response as UserWorkoutsResp;
	} catch (error) {
		return error;
	}
};

// Fetch by ID
const fetchWorkoutDetails = async (userID: string, workoutID: number) => {
	let url = currentEnv.base + apiEndpoints.workouts.getWorkoutDetails;
	url += "?" + new URLSearchParams({ userID, workoutID: String(workoutID) });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

const isWorkoutInProgress = (status: TimerStatus, info: ActiveTimer) => {
	const hasActiveStatus = ["ACTIVE", "PAUSED", "IDLE"].includes(status);
	const { startedAt, stoppedAt } = info;

	const inProgress = hasActiveStatus && !!startedAt && !stoppedAt;

	return inProgress;
};

const getTotalTime = (info: ActiveTimer) => {
	const start = info.startedAt as string;
	const end = info.stoppedAt as string;
	const startDate = new Date(start);
	const endDate = new Date(end);

	console.log("start", start);
	console.log("end", end);
	console.log("---------------");
	console.log("startDate", startDate);
	console.log("endDate", endDate);

	const distance = formatDistance(endDate, startDate, { includeSeconds: true });
	return distance;
};

export {
	fetchUserWorkouts,
	fetchWorkoutCategories,
	fetchWorkoutDetails,
	getTotalTime,
	isWorkoutInProgress,
};
