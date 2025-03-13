import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchWorkoutHistoryByDate,
	fetchWorkoutHistoryByRange,
	fetchWorkoutHistoryDetails,
} from "../../utils/utils_history";
import { AwaitedResponse } from "../types";
import { WorkoutHistory, WorkoutPlan } from "./types";

export interface HistoryByDateParams {
	userID: string;
	targetDate: string;
}
export interface HistoryByRangeParams {
	userID: string;
	startDate: string;
	endDate: string;
}
export interface HistoryDetailsParams {
	userID: string;
	historyID: number;
}

export interface HistoryDetailsBody {
	entry: WorkoutHistory;
	workoutPlan: WorkoutPlan;
	history: WorkoutHistory[];
}

const getHistoryByDate = createAsyncThunk(
	"history/getHistoryByDate",
	async (params: HistoryByDateParams) => {
		const { userID, targetDate } = params;
		const response = (await fetchWorkoutHistoryByDate(
			userID,
			targetDate
		)) as AwaitedResponse<{ history: WorkoutHistory[] }>;
		const data = response.Data;

		return data.history as WorkoutHistory[];
	}
);
const getHistoryByRange = createAsyncThunk(
	"history/getHistoryByRange",
	async (params: HistoryByRangeParams) => {
		const { userID, startDate, endDate } = params;
		const range = { startDate, endDate };
		const response = (await fetchWorkoutHistoryByRange(
			userID,
			range
		)) as AwaitedResponse<{ history: WorkoutHistory[] }>;
		const data = response.Data;

		return data.history as WorkoutHistory[];
	}
);
const getHistoryDetails = createAsyncThunk(
	"history/getHistoryDetails",
	async (params: HistoryDetailsParams) => {
		const { userID, historyID } = params;
		const response = (await fetchWorkoutHistoryDetails(
			userID,
			historyID
		)) as AwaitedResponse<HistoryDetailsBody>;
		const data = response.Data;

		return data as HistoryDetailsBody;
	}
);

export { getHistoryByDate, getHistoryByRange, getHistoryDetails };
