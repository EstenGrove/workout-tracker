import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { Medication, MedLogEntry, SelectedMed, SummaryForDate } from "./types";
import {
	getMedLogsByRange,
	getMedSummariesByDate,
	getMedSummaryByDate,
	getSelectedMed,
	getUserMeds,
	logMedication,
} from "./operations";
import { MedSummaryByDate, SelectedMedResp } from "../../utils/utils_meds";
import { DateRange, formatDate } from "../../utils/utils_dates";
import { RootState } from "../../store/store";

interface MedicationsSlice {
	status: TStatus;
	meds: Medication[];
	logs: MedLogEntry[];
	selectedMed: SelectedMed | null;
	summaryForDate: SummaryForDate;
}

const initialState: MedicationsSlice = {
	status: "IDLE",
	meds: [],
	logs: [],
	summaryForDate: {
		date: formatDate(new Date().toString(), "long"),
		summaries: [],
		logs: [], // logs for selected date
	},
	selectedMed: null,
};

const medicationsSlice = createSlice({
	name: "medications",
	initialState: initialState,
	reducers: {
		setSelectedMed(
			state: MedicationsSlice,
			action: PayloadAction<SelectedMed>
		) {
			state.selectedMed = action.payload;
		},
		resetSelectedMed(state: MedicationsSlice) {
			state.selectedMed = null;
		},
		resetMedLogs(state: MedicationsSlice) {
			state.logs = [];
		},
	},
	extraReducers(builder) {
		// Fetch all user meds
		builder
			.addCase(getUserMeds.pending, (state: MedicationsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getUserMeds.fulfilled,
				(state: MedicationsSlice, action: PayloadAction<Medication[]>) => {
					state.status = "FULFILLED";
					state.meds = action.payload;
				}
			);

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

		// Get Daily Summary
		builder
			.addCase(getMedSummaryByDate.pending, (state: MedicationsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getMedSummaryByDate.fulfilled,
				(state: MedicationsSlice, action: PayloadAction<MedSummaryByDate>) => {
					const { date, summaries, logs } = action.payload;
					state.status = "FULFILLED";
					state.summaryForDate = {
						date,
						summaries,
						logs,
					};
				}
			);
		// Returns ALL summaries for the Medications Page
		builder
			.addCase(getMedSummariesByDate.pending, (state: MedicationsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getMedSummariesByDate.fulfilled,
				(state: MedicationsSlice, action: PayloadAction<MedSummaryByDate>) => {
					const { date, summaries, logs } = action.payload;
					state.status = "FULFILLED";
					state.summaryForDate = {
						date,
						summaries,
						logs,
					};
				}
			);

		// Fetch logs for a given range
		builder
			.addCase(getMedLogsByRange.pending, (state: MedicationsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getMedLogsByRange.fulfilled,
				(
					state: MedicationsSlice,
					action: PayloadAction<{ logs: MedLogEntry[]; range: DateRange }>
				) => {
					state.status = "FULFILLED";
					state.logs = action.payload.logs;
				}
			);

		// Fetch selected med details
		builder
			.addCase(getSelectedMed.pending, (state: MedicationsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getSelectedMed.fulfilled,
				(state: MedicationsSlice, action: PayloadAction<SelectedMedResp>) => {
					state.status = "FULFILLED";
					state.selectedMed = action.payload;
				}
			);
	},
});

export const selectSummaryByMedID = (state: RootState, scheduleID: number) => {
	const summary = state.medications.summaryForDate.summaries.find(
		(x) => x.scheduleID === scheduleID
	);

	return summary;
};
export const selectIsMedLoading = (state: RootState) => {
	return state.medications.status === "PENDING";
};
export const selectMedSummary = (state: RootState) => {
	return state.medications.summaryForDate as SummaryForDate;
};
export const selectAllMedLogs = (state: RootState) => {
	return state.medications.logs;
};
export const selectAllMeds = (state: RootState) => {
	return state.medications.meds;
};
export const selectSelectedMed = (state: RootState) => {
	return state.medications.selectedMed;
};

export default medicationsSlice.reducer;
