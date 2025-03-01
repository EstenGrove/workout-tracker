import { WorkoutHistory } from "../features/history/types";
import { AsyncResponse } from "../features/types";
import { IDateRange } from "./utils_dates";
import { apiEndpoints, currentEnv } from "./utils_env";

export type HistoryResp = AsyncResponse<{ history: WorkoutHistory[] }>;

const fetchWorkoutHistoryByDate = async (
	userID: string,
	targetDate: string
): HistoryResp => {
	let url = currentEnv.base + apiEndpoints.history.getByDate;
	url += "?" + new URLSearchParams({ userID, targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const fetchWorkoutHistoryByRange = async (
	userID: string,
	range: IDateRange
): HistoryResp => {
	const { startDate, endDate } = range;
	let url = currentEnv.base + apiEndpoints.history.getByRange;
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

export { fetchWorkoutHistoryByDate, fetchWorkoutHistoryByRange };
