import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  plugins: [
    tanstackStart({
      spa: { enabled: true },
      target: "cloudflare-module",
      tsr: { generatedRouteTree: "src/route-tree.gen.ts" },
    }),
    tailwindcss(),
  ],
})
