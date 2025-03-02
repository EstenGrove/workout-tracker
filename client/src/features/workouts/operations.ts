import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchUserWorkouts,
	fetchUserWorkoutsByDate,
	fetchUserWorkoutSummaryByDate,
	LogWorkoutPayload,
	saveWorkoutHistoryLog,
} from "../../utils/utils_workouts";
import { AwaitedResponse } from "../types";
import {
	Workout,
	WorkoutHistoryEntry,
	WorkoutSummaryForDate,
	WorkoutSummaryResp,
} from "./types";

const getUserWorkouts = createAsyncThunk(
	"workouts/getUserWorkouts",
	async (userID: string) => {
		const response = (await fetchUserWorkouts(userID)) as AwaitedResponse<{
			userWorkouts: Workout[];
		}>;
		const data = response.Data;

		return data.userWorkouts as Workout[];
	}
);

export interface ByDateParams {
	userID: string;
	targetDate: string;
}

export interface ByRangeParams {
	userID: string;
	startDate: string;
	endDate: string;
	targetDate?: string;
}

const getUserWorkoutsByDate = createAsyncThunk(
	"workouts/getUserWorkoutsByDate",
	async (params: ByDateParams) => {
		const { userID, targetDate } = params;
		const response = (await fetchUserWorkoutsByDate(
			userID,
			targetDate
		)) as AwaitedResponse<{ userWorkouts: Workout[] }>;
		const data = response.Data;

		return data.userWorkouts as Workout[];
	}
);

// Includes weekly streak & some calculated totals (eg. mins, calories etc)
const getWorkoutSummaryByDate = createAsyncThunk(
	"workouts/getWorkoutSummaryByDate",
	async (params: ByRangeParams) => {
		const { userID, startDate, endDate } = params;
		const range = { startDate, endDate };
		const response = (await fetchUserWorkoutSummaryByDate(
			userID,
			range
		)) as AwaitedResponse<WorkoutSummaryResp>;
		const data = response.Data as WorkoutSummaryResp;

		const summaryData: WorkoutSummaryForDate = {
			date: endDate,
			totalMins: data.totalMins.totalMins,
			totalCalories: data.totalCalories.totalCalories,
			totalWorkouts: data.totalWorkouts.totalWorkouts,
		};

		// return data as WorkoutsSummaryByDate;
		return summaryData as WorkoutSummaryForDate;
	}
);

interface LogWorkoutParams {
	userID: string;
	newLog: LogWorkoutPayload;
}

// Records a single workout history entry for a historical workout
const saveWorkoutHistory = createAsyncThunk(
	"workouts/saveWorkoutHistory",
	async (params: LogWorkoutParams) => {
		const { userID, newLog } = params;
		const response = (await saveWorkoutHistoryLog(
			userID,
			newLog
		)) as AwaitedResponse<{ log: WorkoutHistoryEntry }>;
		const data = response.Data;

		return data as { log: WorkoutHistoryEntry };
	}
);

export {
	getUserWorkouts,
	getUserWorkoutsByDate,
	getWorkoutSummaryByDate,
	saveWorkoutHistory,
};
