import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { logInfo } from "./utils/env.ts";
import { allRoutes } from "./routes/index.ts";

const HOST = process.env.API_HOST;
const PORT = 3000;
const app = new Hono().basePath("/api/v1");

app.use(logger());
app.use(cors());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/user", allRoutes.user);
app.route("/workouts", allRoutes.workouts);

// Log env info:
logInfo();

serve({
	fetch: app.fetch,
	port: PORT,
	hostname: HOST,
});
