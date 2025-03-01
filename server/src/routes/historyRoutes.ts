import { Hono, type Context } from "hono";
import { historyService } from "../services/index.ts";
import type {
	WorkoutHistoryClient,
	WorkoutHistoryDB,
} from "../services/types.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeHistory } from "../utils/data.ts";

const app = new Hono();

interface HistoryEntry {
	historyID: number;
	workoutID: number;
	activityType: string; // Activity;
	workoutName: string;
	workoutDate: string;
	effort: string;
	tagColor: string;
	targetMins: number;
	recordedMins: number;
	recordedWeight: number;
	recordedReps: number;
	recordedSets: number;
	recordedSteps: number;
	recordedMiles: number;
	startTime: string;
	endTime: string;
}

app.get("/getWorkoutHistoryByDate", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();

	const records = (await historyService.getHistoryByDate(
		userID,
		targetDate
	)) as WorkoutHistoryDB[];

	if (records instanceof Error) {
		const errResp = getResponseError(records, {
			history: [],
		});
		return ctx.json(errResp);
	}

	const history = records.map(normalizeHistory) as WorkoutHistoryClient[];
	const response = getResponseOk({
		history: history,
	});

	return ctx.json(response);
});
app.get("/getWorkoutHistoryByRange", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();
	const range = { startDate, endDate };
	const records = (await historyService.getHistoryByRange(
		userID,
		range
	)) as WorkoutHistoryDB[];

	if (records instanceof Error) {
		const errResp = getResponseError(records, {
			history: [],
		});
		return ctx.json(errResp);
	}

	const history = records.map(normalizeHistory) as WorkoutHistoryClient[];
	const response = getResponseOk({
		history: history,
	});

	return ctx.json(response);
});

export default app;
