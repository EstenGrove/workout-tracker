import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { logInfo } from "./utils/env.ts";
import { allRoutes } from "./routes/index.ts";
import { readFileSync } from "node:fs";
import { createServer } from "node:https";

const ENABLE_HTTPS = true;

const HOST = process.env.API_HOST;
const PORT = 3000;
const app = new Hono().basePath("/api/v1");

// const clientHost = "https://192.168.0.44:5173";
const clientHost = `https://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`;

const corsSettings = {
	origin: [
		"https://192.168.0.203:5173",
		"https://localhost:5173",
		"http://192.168.0.203:5173",
	],
	allowHeaders: ["Access-Control-Allow-Origin", "Accept", "Content-Type"],
	exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
	allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PREFLIGHT"],
	credentials: false,
};

app.use(logger());

app.use(
	cors({
		origin: clientHost,
	})
);

app.get("/hello", (c) => {
	return c.text("Hello Hono!");
});

app.route("/user", allRoutes.user);
app.route("/meds", allRoutes.meds);
app.route("/shared", allRoutes.shared);
app.route("/workouts", allRoutes.workouts);

// Log env info:
logInfo(ENABLE_HTTPS);

if (ENABLE_HTTPS) {
	console.log("✅ [HTTPS-MODE] ✅ ");
	serve({
		fetch: app.fetch,
		port: PORT,
		hostname: HOST,
		createServer: createServer,
		serverOptions: {
			key: readFileSync("../192.168.0.44-key.pem"),
			cert: readFileSync("../192.168.0.44.pem"),
		},
	});
} else {
	serve({
		fetch: app.fetch,
		port: PORT,
		hostname: HOST,
	});
}
