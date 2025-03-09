import { createAsyncThunk } from "@reduxjs/toolkit";
import { ByDateParams } from "../workouts/operations";
import { fetchDashboardSummaryForDate } from "../../utils/utils_dashboard";
import { AwaitedResponse } from "../types";
import { DashboardSummary } from "./types";

// Returns:
// - recentMins
// - recentSteps
// - recentCalories
// - recentWorkoutCount,
// - recentWorkouts
const getDashboardSummary = createAsyncThunk(
	"dashboard/getDashboardSummary",
	async (params: ByDateParams) => {
		const { userID, targetDate } = params;
		const response = (await fetchDashboardSummaryForDate(
			userID,
			targetDate
		)) as AwaitedResponse<DashboardSummary>;
		const data = response.Data as DashboardSummary;

		return data as DashboardSummary;
	}
);

export { getDashboardSummary };
