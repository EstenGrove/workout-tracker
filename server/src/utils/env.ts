import "dotenv/config";

const API_SETTINGS = {
	host: process.env.API_HOST,
	port: process.env.API_PORT,
};

const logInfo = () => {
	const { host, port } = API_SETTINGS;
	const green = "\x1b[32m";
	const blue = "\x1b[34m";
	const reset = "\x1b[0m";

	console.log("\n");
	console.log(
		`✅ ${green}Server is running on http://localhost:${port}${reset}`
	);
	console.log(` - API: ${blue}http://${host}:${port}/api/v1 ${reset}`);
	console.log("\n");
};

export { logInfo };
