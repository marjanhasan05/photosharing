import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  clearScreen: false,
  plugins: [
    react(),
    svgr(),
    {
      name: "force-exit",
      closeBundle() {
        console.log("Build complete. Forcing exit...");
        setTimeout(() => process.exit(0), 100);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    reportCompressedSize: false,
  },
});
