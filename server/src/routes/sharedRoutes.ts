import { Hono, type Context } from "hono";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeSharedData } from "../utils/data.ts";
import { getSharedData, type SharedDataDB } from "../utils/shared.ts";

const app = new Hono();

app.get("/getSharedAppData", async (ctx: Context) => {
	const { userID } = ctx.req.query();

	const sharedRaw = (await getSharedData(userID)) as SharedDataDB;
	const sharedData = normalizeSharedData(sharedRaw);
	// const grouped =

	const response = getResponseOk(sharedData);

	return ctx.json(response);
});

export default app;
