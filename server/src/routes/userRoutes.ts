import { Hono, type Context } from "hono";
import { userService } from "../services/index.ts";
import type { UserDB } from "../services/UserService.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeUser } from "../utils/data.ts";

const app = new Hono();

interface LoginParams {
	username: string;
	password: string;
}

app.post("/getUserByLogin", async (ctx: Context) => {
	const body = await ctx.req.json<LoginParams>();
	const { username, password } = body;
	console.log("body", body);

	const user = (await userService.getUserByLogin(username, password)) as UserDB;

	if (user instanceof Error) {
		const errResp = getResponseError(user, {
			user: null,
			session: null,
		});
		return ctx.json(errResp);
	}

	const clientUser = normalizeUser(user);
	const response = getResponseOk({
		user: clientUser,
		session: null,
	});

	return ctx.json(response);
});
app.post("/getUserByID", async (ctx: Context) => {
	const { userID } = ctx.req.query();

	const user = (await userService.getUserByID(userID)) as UserDB;

	if (user instanceof Error) {
		const errResp = getResponseError(user, {
			user: null,
			session: null,
		});
		return ctx.json(errResp);
	}

	const clientUser = normalizeUser(user);
	const response = getResponseOk({
		user: clientUser,
		session: null,
	});

	return ctx.json(response);
});

export default app;
