import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchMedLogsByRange,
	fetchMedSummariesByDate,
	fetchMedSummaryByDate,
	fetchSelectedMed,
	fetchUserMeds,
	MedLogBody,
	MedLogOptions,
	MedSummaryByDate,
	saveMedicationLog,
	SelectedMedParams,
	SelectedMedResp,
} from "../../utils/utils_meds";
import { AwaitedResponse } from "../types";
import { Medication, MedLogEntry } from "./types";
import { DateRange } from "../../utils/utils_dates";

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

export interface UserMedsParams {
	userID: string;
}

const getUserMeds = createAsyncThunk(
	"meds/getUserMeds",
	async (params: UserMedsParams) => {
		const { userID } = params;
		const response = (await fetchUserMeds(userID)) as AwaitedResponse<{
			meds: Medication[];
		}>;
		const data = response.Data;

		return data.meds as Medication[];
	}
);
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
const getMedLogsByRange = createAsyncThunk(
	"meds/getMedLogsByRange",
	async (params: MedLogOptions) => {
		const { userID, medID, startDate, endDate } = params;
		const response = (await fetchMedLogsByRange(userID, {
			medID,
			startDate,
			endDate,
		})) as AwaitedResponse<{ logs: MedLogEntry[]; range: DateRange }>;
		const data = response.Data;

		return data as { logs: MedLogEntry[]; range: DateRange };
	}
);
const getSelectedMed = createAsyncThunk(
	"meds/getSelectedMed",
	async (params: SelectedMedParams) => {
		const { userID, range, medID, scheduleID } = params;
		const response = (await fetchSelectedMed(userID, {
			range,
			medID,
			scheduleID,
		})) as AwaitedResponse<SelectedMedResp>;
		const data = response.Data;

		return data as SelectedMedResp;
	}
);

export {
	logMedication,
	getUserMeds,
	getMedSummaryByDate,
	getMedSummariesByDate,
	getMedLogsByRange,
	getSelectedMed,
};
