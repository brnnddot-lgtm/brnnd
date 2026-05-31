import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { imagetools } from "vite-imagetools";
import cloudflare from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), imagetools(), cloudflare()],
  build: {
    target: "es2020",
  },
  server: {
    strictPort: true,
  },
});
