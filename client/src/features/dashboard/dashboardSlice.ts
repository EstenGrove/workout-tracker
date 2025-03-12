import {
	DashboardActivity,
	DashboardSummary,
	RecentWorkout,
	RecentWorkoutsByType,
} from "./types";
import { TStatus } from "../types";
import { RootState } from "../../store/store";
import { StreakDay } from "../workouts/types";
import { getDashboardSummary } from "./operations";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardSlice {
	status: TStatus;
	weeklyStreak: StreakDay[];
	totalMins: number;
	recentActivity: DashboardActivity;
	recentsByType: RecentWorkoutsByType;
	recentWorkouts: RecentWorkout[];
}

const initialState: DashboardSlice = {
	status: "IDLE",
	weeklyStreak: [],
	totalMins: 0,
	recentActivity: {
		recentMins: [],
		recentSteps: 0,
		recentCalories: 0,
		recentWorkoutCount: 0,
	},
	recentWorkouts: [],
	recentsByType: {} as RecentWorkoutsByType,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getDashboardSummary.pending, (state: DashboardSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getDashboardSummary.fulfilled,
				(state: DashboardSlice, action: PayloadAction<DashboardSummary>) => {
					const {
						weeklyStreak,
						recentMins,
						recentSteps,
						recentCalories,
						recentWorkoutCount,
						recentWorkouts,
					} = action.payload;
					state.status = "FULFILLED";
					state.weeklyStreak = weeklyStreak;
					state.recentWorkouts = recentWorkouts;
					state.recentActivity = {
						recentMins: recentMins,
						recentSteps: recentSteps,
						recentCalories: recentCalories,
						recentWorkoutCount: recentWorkoutCount,
					};
				}
			);
	},
});

export const selectIsLoadingDashboard = (state: RootState) => {
	return state.dashboard.status === "PENDING";
};

export const selectDashboard = (state: RootState) => {
	return state.dashboard;
};

export const selectRecentActivity = (state: RootState) => {
	return state.dashboard.recentActivity as DashboardActivity;
};

export const selectWeeklyStreak = (state: RootState) => {
	return state.dashboard.weeklyStreak;
};
export const selectRecentWorkouts = (state: RootState) => {
	return state.dashboard.recentWorkouts;
};

export default dashboardSlice.reducer;
