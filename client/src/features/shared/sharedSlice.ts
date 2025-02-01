import { createSlice } from "@reduxjs/toolkit";

interface ActivityTypeRecord {
	activityID: number;
	name: string;
	desc: string;
	isActive: boolean;
	createdDate: string;
}

interface WorkoutTypeRecord {
	workoutTypeID: number;
	name: string;
	desc: string;
	isActive: boolean;
	createdDate: string;
}

interface SharedSlice {
	activityTypes: ActivityTypeRecord[];
	workoutTypes: WorkoutTypeRecord[];
	categories: Array<object>;
}

const initialState: SharedSlice = {
	activityTypes: [],
	workoutTypes: [],
	categories: [],
};

const sharedSlice = createSlice({
	name: "shared",
	initialState: initialState,
	reducers: {},
});

export default sharedSlice.reducer;
