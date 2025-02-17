import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { Workout, WorkoutCategory } from "./types";
import { getUserWorkouts } from "./operations";
import { formatDate } from "../../utils/utils_dates";
import { RootState } from "../../store/store";

export interface WorkoutsSlice {
	status: TStatus;
	workouts: Workout[];
	categories: WorkoutCategory[];
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
	},
});

export const selectUserWorkouts = (state: RootState) => {
	return state.workouts.workouts as Workout[];
};

export default workoutsSlice.reducer;
