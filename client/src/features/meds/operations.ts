import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchMedSummariesByDate,
	fetchMedSummaryByDate,
	MedLogBody,
	MedSummaryByDate,
	saveMedicationLog,
} from "../../utils/utils_meds";
import { AwaitedResponse } from "../types";
import { MedLogEntry } from "./types";

interface MedLogParams {
	userID: string;
	medLog: MedLogBody;
}

const logMedication = createAsyncThunk(
	"medications/logMedication",
	async (params: MedLogParams) => {
		const { userID, medLog } = params;
		const response = (await saveMedicationLog(
			userID,
			medLog
		)) as AwaitedResponse<{ newLog: MedLogEntry }>;
		const data = response.Data;
		return data as { newLog: MedLogEntry };
	}
);

export interface MedSummaryParams {
	userID: string;
	scheduleID: number;
	targetDate: string;
}

const getMedSummaryByDate = createAsyncThunk(
	"medications/getMedSummaryByDate",
	async (params: MedSummaryParams) => {
		const { userID } = params;
		const response = (await fetchMedSummaryByDate(
			userID,
			params
		)) as AwaitedResponse<MedSummaryByDate>;
		const data = response.Data;

		return data as MedSummaryByDate;
	}
);
const getMedSummariesByDate = createAsyncThunk(
	"medications/getMedSummariesByDate",
	async (params: { userID: string; targetDate: string }) => {
		const { userID, targetDate } = params;
		const response = (await fetchMedSummariesByDate(
			userID,
			targetDate
		)) as AwaitedResponse<MedSummaryByDate>;
		const data = response.Data;

		return data as MedSummaryByDate;
	}
);

export { logMedication, getMedSummaryByDate, getMedSummariesByDate };
