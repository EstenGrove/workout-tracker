import "dotenv/config";

const enableHTTPS = true;

const API_SETTINGS = {
	host: enableHTTPS ? process.env.API_HOST : process.env.API_HTTP_HOST,
	port: process.env.API_PORT,
	prefix: "http://",
};

const logInfo = (enableHTTPS: boolean = false) => {
	const { host, port, prefix } = API_SETTINGS;
	const green = "\x1b[32m";
	const blue = "\x1b[34m";
	const reset = "\x1b[0m";

	if (enableHTTPS) {
		console.log("\n");
		console.log("HOST:", host);
		console.log(
			`✅ ${green}Server is running on https://localhost:${port}${reset}`
		);
		console.log(` - API: ${blue}https://${host}:${port}/api/v1 ${reset}`);
		console.log("\n");
	} else {
		console.log("\n");
		console.log("HOST:", host);
		console.log(
			`✅ ${green}Server is running on ${prefix}localhost:${port}${reset}`
		);
		console.log(` - API: ${blue}${prefix}${host}:${port}/api/v1 ${reset}`);
		console.log("\n");
	}
};

export { logInfo };
