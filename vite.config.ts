import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        devtools: resolve(DIR_NAME, "devtools.html"),
        panel: resolve(DIR_NAME, "panel.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(DIR_NAME, "src"),
    },
  },
});
