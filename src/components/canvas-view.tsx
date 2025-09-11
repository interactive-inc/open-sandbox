import { useEffect, useRef } from "react"

type Props = {
  onDraw: (context: CanvasRenderingContext2D, time: DOMHighResTimeStamp) => void
}

export function CanvasView(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const frameRef = useRef(Number.NaN)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const context = canvas.getContext("2d")
    if (context === null) return
    const loop = (time: DOMHighResTimeStamp) => {
      props.onDraw(context, time)
      frameRef.current = window.requestAnimationFrame(loop)
    }
    frameRef.current = window.requestAnimationFrame(loop)
    return () => {
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [props.onDraw])

  return (
    <canvas
      ref={canvasRef}
      height={"100%"}
      width={"100%"}
      style={{
        imageRendering: "pixelated",
      }}
    />
  )
}
