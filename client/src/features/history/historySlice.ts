import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedHistoryEntry, WorkoutHistory } from "./types";
import {
	getHistoryByDate,
	getHistoryByRange,
	getHistoryDetails,
	HistoryDetailsBody,
} from "./operations";
import { TStatus } from "../types";
import { RootState } from "../../store/store";

interface HistorySlice {
	status: TStatus;
	logs: WorkoutHistory[];
	selectedEntry: SelectedHistoryEntry | null;
}

const initialState: HistorySlice = {
	logs: [],
	status: "IDLE",
	selectedEntry: null,
};

const historySlice = createSlice({
	name: "history",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getHistoryByDate.pending, (state: HistorySlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getHistoryByDate.fulfilled,
				(state: HistorySlice, action: PayloadAction<WorkoutHistory[]>) => {
					state.status = "FULFILLED";
					state.logs = action.payload;
				}
			);

		// By range
		builder
			.addCase(getHistoryByRange.pending, (state: HistorySlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getHistoryByRange.fulfilled,
				(state: HistorySlice, action: PayloadAction<WorkoutHistory[]>) => {
					state.status = "FULFILLED";
					state.logs = action.payload;
				}
			);

		// History Details
		builder
			.addCase(getHistoryDetails.pending, (state: HistorySlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getHistoryDetails.fulfilled,
				(state: HistorySlice, action: PayloadAction<HistoryDetailsBody>) => {
					state.status = "FULFILLED";
					state.selectedEntry = {
						record: action.payload.entry,
						workoutPlan: action.payload.workoutPlan,
						planHistory: action.payload.history,
					};
				}
			);
	},
});

export const selectIsLoadingHistory = (state: RootState): boolean => {
	return state.history.status === "PENDING";
};
export const selectHistoryLogs = (state: RootState) => {
	return state.history.logs;
};
export const selectHistoryEntry = (state: RootState) => {
	return state.history.selectedEntry as SelectedHistoryEntry;
};

export default historySlice.reducer;
