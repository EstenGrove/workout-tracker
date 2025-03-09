import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { Workout, WorkoutCategory, WorkoutSummary } from "./types";
import {
	getUserWorkouts,
	getUserWorkoutsByDate,
	getWorkoutSummaryByDate,
} from "./operations";
import { formatDate } from "../../utils/utils_dates";
import { RootState } from "../../store/store";

export interface WorkoutsSlice {
	status: TStatus;
	workouts: Workout[];
	categories: WorkoutCategory[];
	summary: WorkoutSummary | null;
	activeWorkout: {
		record: Workout | null;
		startedAt: string;
		endedAt: string | null;
		data: Array<object>;
	};
}

const initialState: WorkoutsSlice = {
	status: "IDLE",
	workouts: [],
	categories: [],
	summary: null,
	activeWorkout: {
		record: null,
		startedAt: formatDate(new Date(), "long"),
		endedAt: null,
		data: [],
	},
};

const workoutsSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {
		resetState() {
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getUserWorkouts.pending, (state: WorkoutsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getUserWorkouts.fulfilled,
				(state: WorkoutsSlice, action: PayloadAction<Workout[]>) => {
					state.status = "FULFILLED";
					state.workouts = action.payload;
				}
			);

		// Fetch workouts by date
		builder
			.addCase(getUserWorkoutsByDate.pending, (state: WorkoutsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getUserWorkoutsByDate.fulfilled,
				(state: WorkoutsSlice, action: PayloadAction<Workout[]>) => {
					state.status = "FULFILLED";
					state.workouts = action.payload;
				}
			);
		// Fetch summary for a given date
		builder
			.addCase(getWorkoutSummaryByDate.pending, (state: WorkoutsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getWorkoutSummaryByDate.fulfilled,
				(state: WorkoutsSlice, action: PayloadAction<WorkoutSummary>) => {
					state.status = "FULFILLED";
					state.summary = action.payload;
				}
			);
	},
});

export const selectIsLoading = (state: RootState) => {
	return state.workouts.status === "PENDING";
};

export const selectWorkoutSummary = (state: RootState) => {
	return state.workouts.summary as WorkoutSummary;
};

export const selectUserWorkouts = (state: RootState) => {
	return state.workouts.workouts as Workout[];
};

export default workoutsSlice.reducer;
