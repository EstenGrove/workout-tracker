import { Hono, type Context } from "hono";
import { workoutService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeHistory, normalizeWorkouts } from "../utils/data.ts";
import type { WorkoutDB } from "../services/WorkoutService.ts";
import { logWorkout } from "../utils/workouts.ts";
import type {
	Activity,
	WorkoutHistoryClient,
	WorkoutHistoryDB,
} from "../services/types.ts";

const app = new Hono();

interface LogWorkoutVals {
	userID: string;
	activityType: Activity;
	workoutID: number;
	workoutDate: string;
	startTime: string;
	endTime: string;
	recordedEffort: string;
	recordedMins: number;
	recordedWeight: number;
	recordedReps: number;
	recordedSets: number;
	recordedSteps: number;
	recordedMiles: number;
}

app.get("/getRecentWorkouts", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();
	const recents = (await workoutService.getRecentWorkoutsByDate(userID, {
		startDate,
		endDate,
	})) as WorkoutHistoryDB[];

	if (recents instanceof Error) {
		const errResp = getResponseError(recents, {
			recentWorkouts: [],
		});
		return ctx.json(errResp);
	}

	const recentWorkouts = recents.map(normalizeHistory);
	const response = getResponseOk({
		recentWorkouts: recentWorkouts,
	});
	return ctx.json(response);
});
app.get("/getWorkouts", async (ctx: Context) => {
	const { userID } = ctx.req.query();

	// workouts
	const rawWorkouts = (await workoutService.getAllWorkouts()) as WorkoutDB[];

	if (rawWorkouts instanceof Error) {
		const errResp = getResponseError(rawWorkouts, {
			workouts: [],
		});
		return ctx.json(errResp);
	}

	const workouts = normalizeWorkouts(rawWorkouts);
	const response = getResponseOk({
		workouts: workouts,
	});

	return ctx.json(response);
});
app.get("/getUserWorkouts", async (ctx: Context) => {
	const { userID } = ctx.req.query();

	// user workouts
});
app.get("/getOpenWorkouts", async (ctx: Context) => {
	const { userID } = ctx.req.query();

	// open workouts
});
app.post("/logWorkout", async (ctx: Context) => {
	const body = await ctx.req.json<LogWorkoutVals>();
	const { userID } = body;

	const newHistory = (await logWorkout(userID, body)) as WorkoutHistoryDB;

	if (newHistory instanceof Error) {
		const errResp = getResponseError(newHistory, {
			history: [],
		});
		return ctx.json(errResp);
	}

	const historyRecord: WorkoutHistoryClient = normalizeHistory(newHistory);

	const response = getResponseOk({
		history: historyRecord,
	});

	return ctx.json(response);
});

export default app;
