import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivityTypeRecord } from "./types";
import { UserWorkout, WorkoutCategory } from "../workouts/types";
import { getSharedAppData } from "./operations";
import { TStatus } from "../types";
import { SharedAppData } from "../../utils/utils_shared";
import { RootState } from "../../store/store";

interface SharedSlice {
	status: TStatus;
	categories: WorkoutCategory[];
	activityTypes: ActivityTypeRecord[];
	workoutsByCategory: UserWorkout[];
}

const initialState: SharedSlice = {
	status: "IDLE",
	activityTypes: [],
	categories: [],
	workoutsByCategory: [],
};

const sharedSlice = createSlice({
	name: "shared",
	initialState: initialState,
	reducers: {
		resetState() {
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getSharedAppData.pending, (state: SharedSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getSharedAppData.fulfilled,
				(state: SharedSlice, action: PayloadAction<SharedAppData>) => {
					state.status = "FULFILLED";
					state.categories = action.payload.categories;
					state.activityTypes = action.payload.activityTypes;
					state.workoutsByCategory = action.payload.workoutsByCategory;
				}
			);
	},
});

export const selectActivityTypes = (state: RootState) => {
	return state.shared.activityTypes as ActivityTypeRecord[];
};
export const selectWorkoutCategories = (state: RootState) => {
	return state.shared.categories as WorkoutCategory[];
};
export const selectWorkoutsWithCategory = (state: RootState) => {
	return state.shared.workoutsByCategory as UserWorkout[];
};

export default sharedSlice.reducer;
