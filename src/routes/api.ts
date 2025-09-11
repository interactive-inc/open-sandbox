import { createServerFileRoute } from "@tanstack/react-start/server"
import { hono } from "@/lib/hono"

export const ServerRoute = createServerFileRoute("/api").methods({
  GET(props) {
    return hono.fetch(props.request)
  },
  POST(props) {
    return hono.fetch(props.request)
  },
  DELETE(props) {
    return hono.fetch(props.request)
  },
  PUT(props) {
    return hono.fetch(props.request)
  },
})
