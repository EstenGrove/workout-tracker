import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { MedLogEntry } from "./types";
import { logMedication } from "./operations";

export interface MedicationsSlice {
	status: TStatus;
	meds: Array<object>;
	logs: MedLogEntry[];
	summary: object | null;
}

const initialState: MedicationsSlice = {
	status: "IDLE",
	meds: [],
	logs: [],
	summary: null,
};

const medicationsSlice = createSlice({
	name: "medications",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(logMedication.pending, (state: MedicationsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				logMedication.fulfilled,
				(state, action: PayloadAction<{ newLog: MedLogEntry }>) => {
					state.status = "FULFILLED";
					state.logs = [action.payload.newLog, ...state.logs];
				}
			);
	},
});

export default medicationsSlice.reducer;
