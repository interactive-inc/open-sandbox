import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export function NotFoundComponent() {
  return (
    <div className="space-y-2 p-2">
      <p>The page you are looking for does not exist.</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => window.history.back()}>{"Go back"}</Button>
        <Link to="/">
          <Button>{"Home"}</Button>
        </Link>
      </div>
    </div>
  )
}
