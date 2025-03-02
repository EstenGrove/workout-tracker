import { Hono, type Context } from "hono";
import { workoutService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import {
	normalizeHistory,
	normalizeStreakDay,
	normalizeTotalMins,
	normalizeWorkouts,
	normalizeWorkoutSummary,
} from "../utils/data.ts";
import type {
	LogWorkoutBody,
	WeekSummaryResp,
	WorkoutDB,
} from "../services/WorkoutService.ts";
import { logWorkout } from "../utils/workouts.ts";
import type {
	Activity,
	WorkoutHistoryClient,
	WorkoutHistoryDB,
} from "../services/types.ts";

const app = new Hono();

interface LogWorkoutVals {
	userID: string;
	newLog: LogWorkoutBody;
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

	const rawWorkouts = (await workoutService.getAllWorkouts()) as WorkoutDB[];
	const userWorkouts = normalizeWorkouts(rawWorkouts);

	// user workouts
	const response = getResponseOk({
		userWorkouts,
	});

	return ctx.json(response);
});
app.get("/getOpenWorkouts", async (ctx: Context) => {
	const { userID } = ctx.req.query();

	// open workouts
});
app.post("/logWorkout", async (ctx: Context) => {
	const body = await ctx.req.json<LogWorkoutVals>();
	const { userID, newLog } = body;
	console.log("body", body);
	console.log("newLog", newLog);
	console.log("activityType", newLog.activityType);

	const newHistory = (await logWorkout(userID, {
		...newLog,
		workoutID: newLog.workoutID,
	})) as WorkoutHistoryDB;

	console.log("newHistory", newHistory);

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
app.get("/getWorkoutDetails", async (ctx: Context) => {
	const { userID, workoutID: id } = ctx.req.query();
	const workoutID = Number(id);

	const response = getResponseOk({
		workout: null,
		details: null,
	});

	return ctx.json(response);
});
app.get("/getWorkoutSummaryByDate", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();

	const data = (await workoutService.getWorkoutSummary(
		userID,
		startDate
	)) as WeekSummaryResp;
	console.log("data", data);

	if (data instanceof Error) {
		const errResp = getResponseError(data, {
			weeklyStreak: [],
			summary: null,
		});
		return ctx.json(errResp);
	}

	const summary = normalizeWorkoutSummary({
		total_mins: data.total_mins[0],
		total_calories: data.total_calories[0],
		total_workouts: data.total_workouts[0],
		weekly_streak: data.weekly_streak,
	});
	const response = getResponseOk(summary);

	return ctx.json(response);
});

export default app;
