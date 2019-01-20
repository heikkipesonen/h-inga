export interface Pointer {
    x: number
    y: number
    timeStamp: number
    velocity?: number
}

export const getMousePointer = (evt: MouseEvent | MouseWheelEvent ): Pointer => ({
    x: evt.pageX,
    y: evt.pageY,
    timeStamp: evt.timeStamp
})

export const getTouchPointer = (evt: TouchEvent): Pointer => ({
    x: evt.touches[0].pageX,
    y: evt.touches[0].pageY,
    timeStamp: evt.timeStamp
});

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

export const getPointerOnCanvas = (pointer: Pointer, canvasPosition: CanvasPosition) => {
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