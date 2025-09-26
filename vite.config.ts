import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  plugins: [
    tanstackStart({
      spa: { enabled: true },
      // target: "cloudflare-module",
      router: { generatedRouteTree: "route-tree.gen.ts" },
    }),
    viteReact(),
    tailwindcss(),
  ],
})
