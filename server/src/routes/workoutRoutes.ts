import { Hono, type Context } from "hono";
import { workoutService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeWorkouts } from "../utils/data.ts";
import type { WorkoutDB } from "../services/WorkoutService.ts";

const app = new Hono();

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

export default app;
