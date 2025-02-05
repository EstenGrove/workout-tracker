import { MedLogEntry } from "../features/meds/types";
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
		return response as AsyncResponse<{ newLog: MedLogEntry }>;
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
}

const prepareMedLog = (values: MedLogVals): MedLogBody => {
	const { userID, loggedAt, medID, dose } = values;
	const takenTime = applyTimeStrToDate(loggedAt, new Date());
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

export { saveMedicationLog, prepareMedLog };
