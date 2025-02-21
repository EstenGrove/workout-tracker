import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

const enableHttps = true;

const HOST = "192.168.0.44";
const PORT = 5173;

const httpConfig = {
	plugins: [react()],
};

/**
 * Enables 'HTTPS' w/ target SSL files
 */
const httpsConfig = {
	plugins: [react(), basicSsl()],
	server: {
		cors: true, // Allows requests from anywhere
		host: HOST, // THIS WORKS ON DESKTOP
		port: PORT,
		https: {
			key: "../localhost-key.pem", // THIS WORKS ON DESKTOP
			cert: "../localhost.pem", // THIS WORKS ON DESKTOP
		},
		watch: {
			usePolling: true,
		},
		hmr: {
			host: HOST,
			protocol: "wss",
		},
	},
};

// https://vite.dev/config/
const config = enableHttps ? httpsConfig : httpConfig;
export default defineConfig(config);
