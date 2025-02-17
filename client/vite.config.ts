import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

/**
 * Enables 'HTTPS' w/ target SSL files
 */
const httpsConfig = {
	plugins: [react(), basicSsl()],
	server: {
		cors: true,
		host: "192.168.0.203", // THIS WORKS ON DESKTOP
		port: 5173,
		https: {
			key: "../192.168.0.203-key.pem",
			cert: "../192.168.0.203.pem",
			// key: "../localhost-key.pem", // THIS WORKS ON DESKTOP
			// cert: "../localhost.pem", // THIS WORKS ON DESKTOP
		},
		watch: {
			usePolling: true,
		},
	},
};

// https://vite.dev/config/
// export default defineConfig(ENABLE_HTTPS ? httpsConfig : httpConfig);
export default defineConfig(httpsConfig);
