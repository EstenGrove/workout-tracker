import { createAsyncThunk } from "@reduxjs/toolkit";
import { MedLogBody, saveMedicationLog } from "../../utils/utils_meds";
import { AwaitedResponse } from "../types";
import { MedLogEntry } from "./types";

interface MedLogParams {
	userID: string;
	medLog: MedLogBody;
}

const logMedication = createAsyncThunk(
	"meds/logMedication",
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

export { logMedication };
