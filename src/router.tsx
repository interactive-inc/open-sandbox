import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { CustomErrorComponent } from "./components/custom-error-component"
import { NotFoundComponent } from "./components/not-found-component"
import { routeTree } from "./route-tree.gen"

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: CustomErrorComponent,
    defaultNotFoundComponent: () => <NotFoundComponent />,
    scrollRestoration: true,
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
