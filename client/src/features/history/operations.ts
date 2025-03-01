import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchWorkoutHistoryByDate,
	fetchWorkoutHistoryByRange,
} from "../../utils/utils_history";
import { AwaitedResponse } from "../types";
import { WorkoutHistory } from "./types";

interface HistoryByDateParams {
	userID: string;
	targetDate: string;
}
interface HistoryByRangeParams {
	userID: string;
	startDate: string;
	endDate: string;
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

export { getHistoryByDate, getHistoryByRange };
