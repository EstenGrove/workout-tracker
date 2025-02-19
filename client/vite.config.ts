import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

const host = "192.168.0.44";
// const host = "192.168.0.203";

/**
 * Enables 'HTTPS' w/ target SSL files
 */
const httpsConfig = {
	plugins: [react(), basicSsl()],
	server: {
		cors: true,
		host: host, // THIS WORKS ON DESKTOP
		port: 5173,
		https: {
			// key: "../192.168.0.44-key.pem",
			// cert: "../192.168.0.44.pem",
			key: "../localhost-key.pem", // THIS WORKS ON DESKTOP
			cert: "../localhost.pem", // THIS WORKS ON DESKTOP
		},
		watch: {
			usePolling: true,
		},
	},
};

// https://vite.dev/config/
// export default defineConfig(ENABLE_HTTPS ? httpsConfig : httpConfig);
export default defineConfig(httpsConfig);
