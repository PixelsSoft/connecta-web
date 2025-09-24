import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/connect24",
  base: "/",
  resolve: {
    alias: {
      'react-i18next': '/src/i18n-shim.js',
    },
  },
});
