import { Hono } from "hono"

export const hono = new Hono()

hono
  .basePath("/api")
  .get("/", (c) => {
    return c.json({ msg: "hello!!" })
  })
  .get("/random", (c) => {
    return c.json({ msg: Math.random() })
  })
