export interface Pointer {
  x: number
  y: number
  timeStamp: number
  velocity?: number
}

export const getMousePointer = (
  evt: MouseEvent | MouseWheelEvent
): Pointer => ({
  x: evt.pageX,
  y: evt.pageY,
  timeStamp: evt.timeStamp
})

export const getTouchPointer = (evt: TouchEvent): Pointer => ({
  x: evt.touches[0].pageX,
  y: evt.touches[0].pageY,
  timeStamp: evt.timeStamp
})

export const getMouseWheel = (evt: WheelEvent): number => -evt.deltaY

export const delta = (a: Pointer, b: Pointer): Pointer => ({
  x: b.x - a.x,
  y: b.y - a.y,
  timeStamp: b.timeStamp - a.timeStamp,
  velocity: Math.hypot(b.x - a.x, b.y - a.y) / (b.timeStamp - a.timeStamp)
})

interface CanvasPosition {
  x: number
  y: number
  scale: number
}

export const getPointerOnCanvas = (
  pointer: Pointer,
  canvasPosition: CanvasPosition
) => {
  const pointerOnWrapper = {
    x: pointer.x - canvasPosition.x,
    y: pointer.y - canvasPosition.y
  }

  const pointerOnContent = {
    x: pointerOnWrapper.x / canvasPosition.scale,
    y: pointerOnWrapper.y / canvasPosition.scale
  }

  return pointerOnContent
}

export const calcDragEvent = (
  event: MouseEvent,
  lastEvent: Pointer,
  position: CanvasPosition
): CanvasPosition => {
  const pointer = getMousePointer(event)
  const d = delta(lastEvent, pointer)
  const { scale, x, y } = position;

  return {
    x: (d.x / scale) + x,
    y: (d.y / scale) + y,
    scale
  }
}

export const calcZoomEvent = (position: CanvasPosition, event: MouseWheelEvent): CanvasPosition => {
  const { scale, x, y } = position
  const dScale = (scale * getMouseWheel(event)) / 1800
  const newScale = scale + dScale
  const cursor = getMousePointer(event)
  const initialPosition = getPointerOnCanvas(cursor, { x, y, scale })
  const newCursorPosition = getPointerOnCanvas(cursor, {
    x,
    y,
    scale: newScale
  })

  return {
    x: x + (newCursorPosition.x - initialPosition.x) * newScale,
    y: y + (newCursorPosition.y - initialPosition.y) * newScale,
    scale: newScale
  }
}
