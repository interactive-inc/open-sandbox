import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/error")({
  component: Home,
})

function Home() {
  if (Math.random() < 0.95) {
    throw new Error("Random error occurred!")
  }

  return <div />
}
