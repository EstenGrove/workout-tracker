import { Hono, type Context } from "hono";
import { dashboardService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeDashboardSummary } from "../utils/data.ts";
import type { DashboardSummaryDB } from "../services/types.ts";

const app = new Hono();

app.get("/getDashboardSummary", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();

	const rawSummary = (await dashboardService.getDashboardSummary(
		userID,
		targetDate
	)) as DashboardSummaryDB;

	console.log("rawSummary", rawSummary);
	if (rawSummary instanceof Error) {
		const errResp = getResponseError(rawSummary);
		return ctx.json(errResp);
	}

	const summary = normalizeDashboardSummary(rawSummary);
	console.log("summary", summary);

	const response = getResponseOk({
		...summary,
	});

	return ctx.json(response);
});

export default app;
