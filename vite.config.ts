import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "",
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    allowedHosts: ["all", "lomentlike-frowzily-brande.ngrok-free.dev"],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: [],
    },
  },
});
