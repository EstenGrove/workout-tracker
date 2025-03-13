import { addMinutes, formatDistance } from "date-fns";
import { ActiveTimer, TimerStatus } from "../hooks/useWorkoutTimer";
import { apiEndpoints, currentEnv } from "./utils_env";
import { AsyncResponse } from "../features/types";
import {
	Workout,
	WorkoutCategory,
	WorkoutHistoryEntry,
	WorkoutSummaryResp,
} from "../features/workouts/types";
import { Activity } from "../features/activity/types";
import { applyTimeStrToDate, toBackendFormat } from "./utils_dates";

export type Effort = "Easy" | "Moderate" | "Hard" | "Strenuous" | "None";

export interface LogWorkoutValues {
	activityType: Activity | string;
	workout: number | string;
	workoutDate: Date | string;
	startTime: Date | string;
	endTime: Date | string;
	effort: Effort;
	workoutMins: number;
	// Walk
	steps: number;
	miles: number;
	// Strength
	weight: number;
	// Strength/Yoga/Stretch etc
	reps: number;
	sets: number;
	// ALTERNATIVE
}

export interface LogWorkoutPayload {
	userID: string;
	activityType: Activity;
	workoutID: number;
	workoutDate: string;
	startTime: string;
	endTime: string;
	recordedEffort: string;
	recordedMins: number;
	recordedWeight: number;
	recordedReps: number;
	recordedSets: number;
	recordedSteps: number;
	recordedMiles: number;
}

export type LoggedWorkoutResp = AsyncResponse<{ log: WorkoutHistoryEntry }>;
export type UserWorkoutsResp = AsyncResponse<{ userWorkouts: Workout[] }>;
export type CategoryResp = AsyncResponse<{ categories: WorkoutCategory[] }>;
export type SummaryByDateResp = AsyncResponse<WorkoutSummaryResp>;

const saveWorkoutHistoryLog = async (
	userID: string,
	values: LogWorkoutPayload
): LoggedWorkoutResp => {
	let url = currentEnv.base + apiEndpoints.workouts.logWorkout;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				userID: userID,
				newLog: values,
			}),
		});
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

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

const fetchUserWorkoutsByDate = async (
	userID: string,
	targetDate: string
): UserWorkoutsResp => {
	let url = currentEnv.base + apiEndpoints.workouts.getUserWorkoutsByDate;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response as UserWorkoutsResp;
	} catch (error) {
		return error;
	}
};

const fetchUserWorkoutSummaryByDate = async (
	userID: string,
	range: { startDate: string; endDate: string }
): SummaryByDateResp => {
	const { startDate, endDate } = range;
	let url = currentEnv.base + apiEndpoints.workouts.getWorkoutSummaryByDate;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ startDate, endDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
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

	const distance = formatDistance(endDate, startDate, { includeSeconds: true });
	return distance;
};

interface StartAndEnd {
	startTime: string;
	endTime: string;
}

const calculateEndTimeFromDuration = (values: {
	startTime: string;
	date: Date | string;
	mins: number;
}) => {
	const { startTime, date, mins } = values;
	const start = applyTimeStrToDate(startTime, date);
	const endByMins = addMinutes(start, mins);

	return endByMins;
};

// Checks if the start/end times line up with the workout mins & fixes it, if needed
const prepareStartAndEndDuration = (values: LogWorkoutValues): StartAndEnd => {
	const { startTime, workoutDate, workoutMins } = values;
	const startStr = startTime as string;
	const start = applyTimeStrToDate(startStr, workoutDate);
	const endTime = calculateEndTimeFromDuration({
		startTime: startStr,
		date: workoutDate,
		mins: workoutMins,
	});

	return {
		startTime: toBackendFormat(new Date(start)),
		endTime: toBackendFormat(new Date(endTime)),
	};
};

interface LogWorkoutValsWithUser extends LogWorkoutValues {
	userID: string;
}

const prepareWorkoutHistory = (
	values: LogWorkoutValsWithUser,
	workouts: Workout[]
): LogWorkoutPayload => {
	const newTimes = prepareStartAndEndDuration(values);
	const matchingWorkout = workouts.find((w) => {
		return (
			w.workoutName === values.workout && w.activityType === values.activityType
		);
	});
	const workoutID = matchingWorkout?.workoutID ?? (10 as number);

	return {
		userID: values.userID,
		activityType: values.activityType as Activity,
		startTime: newTimes.startTime,
		endTime: newTimes.endTime,
		workoutID: workoutID,
		workoutDate: values.workoutDate as string,
		recordedMins: values.workoutMins,
		recordedWeight: values.weight,
		recordedReps: values.reps,
		recordedSets: values.sets,
		recordedMiles: values.miles,
		recordedSteps: values.steps,
		recordedEffort: values.effort,
	};
};

export {
	saveWorkoutHistoryLog,
	fetchUserWorkouts,
	fetchUserWorkoutsByDate,
	fetchWorkoutCategories,
	fetchWorkoutDetails,
	fetchUserWorkoutSummaryByDate,
	getTotalTime,
	isWorkoutInProgress,
	prepareWorkoutHistory,
	calculateEndTimeFromDuration,
};
