import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { imagetools } from "vite-imagetools";
import { cloudflare } from "@cloudflare/vite-plugin";
import { nitro } from "nitro/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({ preset: "vercel" }),
    react(),
    tsconfigPaths(),
    imagetools(),
    cloudflare(),
  ],
  build: {
    target: "es2020",
  },
  server: {
    strictPort: true,
  },
});
