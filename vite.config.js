import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://kreditsu-api.test",
        changeOrigin: true,
      },
      "/sanctum": {
        target: "http://kreditsu-api.test",
        changeOrigin: true,
      },
    },
  },
});
