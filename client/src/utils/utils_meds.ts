import { MedSummaryParams } from "../features/meds/operations";
import { MedLogEntry, PillSummary } from "../features/meds/types";
import { AsyncResponse } from "../features/types";
import { applyTimeStrToDate, prepareTimestamp } from "./utils_dates";
import { apiEndpoints, currentEnv } from "./utils_env";

export interface MedLogBody {
	userID: string;
	medID: number;
	amountTaken: number;
	action: "Taken" | "Skipped";
	loggedAt: Date | string;
}

// Records a single medication dose log
const saveMedicationLog = async (
	userID: string,
	medLog: MedLogBody
): AsyncResponse<{ newLog: MedLogEntry }> => {
	let url = currentEnv.base + apiEndpoints.meds.logMed;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify(medLog),
		});
		const response = await request.json();
		console.log("response", response);
		return response as AsyncResponse<{ newLog: MedLogEntry }>;
	} catch (error) {
		return error;
	}
};

export interface MedSummaryByDate {
	scheduleID: number;
	date: string;
	summaries: PillSummary[];
	logs: MedLogEntry[];
}
export interface MedSummariesByDate {
	date: string;
	summaries: PillSummary[];
	logs: MedLogEntry[];
}

// Fetches Pill Summary for a given date, defaults to today
const fetchMedSummaryByDate = async (
	userID: string,
	values: MedSummaryParams
): AsyncResponse<MedSummaryByDate> => {
	const { scheduleID, targetDate } = values;

	let url = currentEnv.base + apiEndpoints.meds.getSummaryByDate;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ scheduleID: String(scheduleID) });
	url += "&" + new URLSearchParams({ targetDate: targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response as AsyncResponse<MedSummaryByDate>;
	} catch (error) {
		return error;
	}
};
// Fetches Pill Summary for a given date, defaults to today
const fetchMedSummariesByDate = async (
	userID: string,
	targetDate: string
): AsyncResponse<MedSummaryByDate> => {
	let url = currentEnv.base + apiEndpoints.meds.getSummariesByDate;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ targetDate: targetDate });

	try {
		const request = await fetch(url, {
			method: "GET",
			headers: { Accept: "application/json" },
		});
		// const request = await fetch(url);
		const response = await request.json();

		return response as AsyncResponse<MedSummariesByDate>;
	} catch (error) {
		return error;
	}
};

const fetchUserMeds = async (userID: string) => {
	let url = currentEnv.base + apiEndpoints.meds.getUserMeds;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

interface MedLogVals {
	userID: string;
	medID: number;
	dose: number;
	action: "Taken" | "Skipped";
	loggedAt: string;
	loggedDate: Date | string;
}

const prepareMedLog = (values: MedLogVals): MedLogBody => {
	const { userID, loggedAt, medID, dose, loggedDate = new Date() } = values;
	const takenTime = applyTimeStrToDate(loggedAt, loggedDate);
	const takenAt = prepareTimestamp(takenTime);
	const medLog: MedLogBody = {
		userID: userID,
		medID: medID,
		amountTaken: dose,
		action: "Taken",
		loggedAt: takenAt,
	};

	return medLog;
};

const processPillSummary = (summary: PillSummary): PillSummary => {
	return {
		scheduleID: summary.scheduleID,
		daysLeft: Number(summary.daysLeft),
		totalPills: Number(summary.totalPills),
		pillsRemaining: Number(summary.pillsRemaining),
		pillsTaken: Number(summary.pillsTaken),
		pillsTakenToday: Number(summary.pillsTakenToday),
	};
};

export {
	// fetch
	saveMedicationLog,
	fetchMedSummaryByDate,
	fetchMedSummariesByDate,
	fetchUserMeds,
	// utils
	prepareMedLog,
	processPillSummary,
};
