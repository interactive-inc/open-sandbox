import { useEffect } from "react"

type KeyCallback = (key: string, event: KeyboardEvent) => void

export function useKeyboard(callback: KeyCallback, preventDefault = false) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (preventDefault) {
        event.preventDefault()
      }
      callback(event.key, event)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [callback, preventDefault])
}
