import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';
import fs from "fs";

const env = dotenv.parse(fs.readFileSync('./src/cred/umami.env'));

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/portfolio/",
	define: {
    'import.meta.env.VITE_UMAMI_WEBSITE_ID': JSON.stringify(env.VITE_UMAMI_WEBSITE_ID),
  },
});
