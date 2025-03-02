import { createSlice } from "@reduxjs/toolkit";
import { DashboardActivity, RecentWorkoutsByType } from "./types";
import { Workout } from "../workouts/types";

interface DashboardSlice {
	recentActivity: DashboardActivity;
	recentsByType: RecentWorkoutsByType;
	recentWorkouts: Workout[];
}

const initialState: DashboardSlice = {
	recentActivity: {
		recentMins: [],
		recentSteps: 0,
		recentCalories: 0,
	},
	recentWorkouts: [],
	recentsByType: {} as RecentWorkoutsByType,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: initialState,
	reducers: {},
});

export default dashboardSlice.reducer;
