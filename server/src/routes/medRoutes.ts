import { Hono, type Context } from "hono";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import type {
	LogMedBody,
	MedLogEntryDB,
} from "../services/MedicationsService.ts";
import { medicationsService } from "../services/index.ts";
import { normalizeMedLog } from "../utils/data.ts";

const app = new Hono();

app.post("/logMedication", async (ctx: Context) => {
	const body = await ctx.req.json<LogMedBody>();

	const logRecord = (await medicationsService.logMedication(
		body
	)) as MedLogEntryDB;

	if (logRecord instanceof Error) {
		const errResp = getResponseError(logRecord, {
			newLog: null,
		});

		return ctx.json(errResp);
	}
	const log = normalizeMedLog(logRecord);
	const response = getResponseOk({
		newLog: log,
	});

	return ctx.json(response);
});

export default app;
