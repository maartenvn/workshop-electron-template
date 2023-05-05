import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";

export default defineConfig({
  plugins: [
    // Vue Plugin
    vue(),
    // Electron Plugin
    electron({
      entry: "electron/main.js",
    }),
  ],
});
