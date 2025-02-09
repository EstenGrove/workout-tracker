import { Hono, type Context } from "hono";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import type { LogMedBody } from "../services/MedicationsService.ts";
import { medicationsService } from "../services/index.ts";
import {
	normalizeDaysLeft,
	normalizeMedInfo,
	normalizeMedLog,
	normalizePillSummary,
} from "../utils/data.ts";
import type {
	DaysLeftDB,
	MedInfoDB,
	MedLogEntryClient,
	MedLogEntryDB,
	PillSummaryClient,
	PillSummaryDB,
} from "../services/types.ts";

const app = new Hono();

// Log a dose of medication being taken or skipped
app.post("/logMedication", async (ctx: Context) => {
	const body = await ctx.req.json<LogMedBody>();
	console.log("body", body);

	const logRecord = (await medicationsService.logMedication(
		body
	)) as MedLogEntryDB;

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

export default app;
