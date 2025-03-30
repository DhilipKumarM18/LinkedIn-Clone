import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, 
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/_tests_/setupTests.js",
    transformMode: {
      web: [/.[jt]sx?$/],
    },
  },
});
