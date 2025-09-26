import { createRouter } from "@tanstack/react-router"
import { CustomErrorComponent } from "@/components/custom-error-component"
import { NotFoundComponent } from "@/components/not-found-component"
import { routeTree } from "./route-tree.gen"

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: CustomErrorComponent,
    defaultNotFoundComponent: () => <NotFoundComponent />,
    scrollRestoration: true,
  })
  return router
}
