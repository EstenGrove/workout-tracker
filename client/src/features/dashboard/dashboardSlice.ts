import { createSlice } from "@reduxjs/toolkit";
import { RecentWorkoutsByType } from "./types";

interface DashboardSlice {
	recentsByType: RecentWorkoutsByType;
}

const initialState: DashboardSlice = {
	recentsByType: {} as RecentWorkoutsByType,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: initialState,
	reducers: {},
});

export default dashboardSlice.reducer;
