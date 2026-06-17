/* global process */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  base: command === "build" && !process.env.VERCEL ? "/travelly/" : "/",
  plugins: [react()],
}));
