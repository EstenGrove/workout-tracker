import { Hono, type Context } from "hono";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import type { LogMedBody } from "../services/MedicationsService.ts";
import { medicationsService } from "../services/index.ts";
import {
	normalizeDaysLeft,
	normalizeMed,
	normalizeMedInfo,
	normalizeMedLog,
	normalizePillSummary,
} from "../utils/data.ts";
import type {
	DaysLeftDB,
	MedInfoDB,
	MedLogEntryClient,
	MedLogEntryDB,
	MedScheduleDB,
	PillSummaryClient,
	PillSummaryDB,
} from "../services/types.ts";
import { formatDate } from "../utils/dates.ts";

const app = new Hono();

// Log a dose of medication being taken or skipped
app.post("/logMedication", async (ctx: Context) => {
	const body = await ctx.req.json<LogMedBody>();
	const { userID, medID, loggedAt } = body;
	const targetDate = formatDate(loggedAt, "db");
	const activeSchedule = (await medicationsService.getActiveScheduleByDate(
		userID,
		medID,
		targetDate
	)) as MedScheduleDB;

	const logRecord = (await medicationsService.logMedication({
		...body,
		scheduleID: activeSchedule.schedule_id,
	})) as MedLogEntryDB;

	if (logRecord instanceof Error) {
		const errResp = getResponseError(logRecord, {
			newLog: null,
		});

		return ctx.json(errResp);
	}
	const log: MedLogEntryClient = normalizeMedLog(logRecord);
	const response = getResponseOk({
		newLog: log,
	});

	return ctx.json(response);
});
// User meds (custom)
app.get("/getUserMeds", async (ctx: Context) => {
	const { userID } = ctx.req.query();

	const medsList = (await medicationsService.getUserMeds(
		userID
	)) as MedInfoDB[];

	if (medsList instanceof Error) {
		const errResp = getResponseError(medsList, {
			meds: [],
		});
		return ctx.json(errResp);
	}

	const userMeds = medsList.map(normalizeMedInfo);
	const response = getResponseOk({
		meds: userMeds,
	});

	return ctx.json(response);
});
// Gets a calculated groups of values for a given medication schedule
app.get("/getPillSummary", async (ctx: Context) => {
	const { userID, scheduleID: id, targetDate } = ctx.req.query();
	const scheduleID: number = Number(id);

	const [rawSummary, remainingDays] = await Promise.all([
		medicationsService.getPillSummaryByDate(userID, {
			scheduleID,
			targetDate,
		}),
		medicationsService.getDaysLeft(userID, scheduleID),
	]);

	if (rawSummary instanceof Error) {
		const errResp = getResponseError(rawSummary, {
			summary: null,
		});

		return ctx.json(errResp);
	}

	const scheduleInfo = normalizeDaysLeft(remainingDays as DaysLeftDB);
	const pillSummary = normalizePillSummary(rawSummary as PillSummaryDB);
	const response = getResponseOk({
		summary: pillSummary,
		schedule: scheduleInfo,
	});

	return ctx.json(response);
});
app.get("/getMedSummaryByDate", async (ctx: Context) => {
	const { userID, scheduleID, targetDate } = ctx.req.query();

	return ctx.json({
		message: "cool",
	});
});
// Fetches summary data for 'Medications' page
app.get("/getMedSummariesByDate", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();

	const medSummaries = (await medicationsService.getAllPillSummariesByDate(
		userID,
		targetDate
	)) as PillSummaryDB[];
	const medLogs = (await medicationsService.getAllLogsForDate(
		userID,
		targetDate
	)) as MedLogEntryDB[];

	if (medSummaries instanceof Error) {
		const errResp = getResponseError(medSummaries, {
			date: targetDate,
			summaries: [],
			logs: [],
		});
		return ctx.json(errResp);
	}
	if (medLogs instanceof Error) {
		const errResp = getResponseError(medLogs, {
			date: targetDate,
			summaries: [],
			logs: [],
		});
		return ctx.json(errResp);
	}

	const pillSummaries: PillSummaryClient[] =
		medSummaries.map(normalizePillSummary);
	const logsForDate: MedLogEntryClient[] = medLogs.map(normalizeMedLog);

	const response = getResponseOk({
		date: targetDate,
		summaries: pillSummaries,
		logs: logsForDate,
	});
	return ctx.json(response);
});
app.get("/getMedDetails", async (ctx: Context) => {
	const { userID, medID: id } = ctx.req.query();
	const medID = Number(id);

	const rawMed = await medicationsService.getMedicationByID(medID);

	if (rawMed instanceof Error) {
		const errResp = getResponseError(rawMed, {
			med: null,
			logs: [],
			schedules: {
				active: null,
				all: [],
			},
		});
		return ctx.json(errResp);
	}

	const medication = normalizeMed(rawMed);
	const response = getResponseOk({
		med: medication,
		logs: [],
		schedules: {
			active: null,
			all: [],
		},
	});

	return ctx.json(response);
});
app.get("/getSelectedMed", async (ctx: Context) => {
	//
	//
});
app.get("/getMedLogsByRange", async (ctx: Context) => {
	const { userID, medID, startDate, endDate } = ctx.req.query();

	const rawLogs = (await medicationsService.getLogsForMedByRange(userID, {
		medID: Number(medID),
		startDate,
		endDate,
	})) as MedLogEntryDB[];

	if (rawLogs instanceof Error) {
		const errResp = getResponseError(rawLogs, {
			startDate,
			endDate,
			logs: [],
		});
		return ctx.json(errResp);
	}

	const logs = rawLogs.map(normalizeMedLog);

	const response = getResponseOk({
		startDate,
		endDate,
		logs: logs,
	});

	return ctx.json(response);
});

export default app;
