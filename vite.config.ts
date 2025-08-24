import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      generatedRouteTree: "src/route-tree.gen.ts",
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
