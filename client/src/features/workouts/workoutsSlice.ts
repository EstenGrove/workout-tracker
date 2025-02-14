import { createSlice } from "@reduxjs/toolkit";
import { TStatus } from "../types";

export interface WorkoutsSlice {
	status: TStatus;
	workouts: Array<object>;
	activeWorkout: {
		record: object;
		startedAt: string;
		endedAt: string | null;
		data: Array<object>;
	};
}

const initialState = {
	status: "IDLE",
	workouts: [],
	activeWorkout: {
		record: {},
		startedAt: new Date().toString(),
		endedAt: null,
		data: [],
		steps: [],
	},
};

const workoutsSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {},
});

export default workoutsSlice.reducer;
