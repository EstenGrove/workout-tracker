import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkoutHistory } from "./types";
import { getHistoryByDate, getHistoryByRange } from "./operations";
import { TStatus } from "../types";
import { RootState } from "../../store/store";

interface HistorySlice {
	logs: WorkoutHistory[];
	status: TStatus;
}

const initialState: HistorySlice = {
	logs: [],
	status: "IDLE",
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
	},
});

export const selectIsLoadingHistory = (state: RootState): boolean => {
	return state.history.status === "PENDING";
};
export const selectHistoryLogs = (state: RootState) => {
	return state.history.logs;
};

export default historySlice.reducer;
