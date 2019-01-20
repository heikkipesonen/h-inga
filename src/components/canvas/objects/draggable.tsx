import * as React from "react"
import { Pointer, getMousePointer, calcDragEvent } from "../pointer"
import { addEventListener } from "../listener"
import { Position } from "../../../types/object"

interface Props {
  children: React.ReactNode
  scale: number
  x: number
  y: number
  onChange?: (event: Position) => void
}

interface State {
  onDrag: boolean
  lastEvent: Pointer | null
}

export class Draggable extends React.Component<Props, State> {
  public state = {
    onDrag: false,
    lastEvent: null
  }

  public ref: HTMLElement | null = null
  private unbinders: Array<() => void> = []

  public onDragStart = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    const position = getMousePointer(event)

    this.setState(() => ({
      lastEvent: position,
      onDrag: true
    }))
  }

  public onDrag = (event: MouseEvent) => {
    const { lastEvent, onDrag } = this.state
    const { onChange } = this.props

    if (onDrag && lastEvent) {
      const { scale, x, y } = this.props
      const nextPosition = calcDragEvent(event, lastEvent, { x, y, scale })
      const position = getMousePointer(event)

      this.setState(() => ({
        lastEvent: position
      }))

      if (onChange) {
        onChange(nextPosition)
      }
    }
  }

  public onDragEnd = (event: MouseEvent) => {
    this.setState(() => ({
      lastEvent: null,
      onDrag: false
    }))
  }

  public setContainer = (el: any) => {
    const { onDragStart, onDrag, onDragEnd } = this
    if (el) {
      this.ref = el
      this.unbinders = [
        addEventListener(el, "mousedown", onDragStart),
        addEventListener(window, "mousemove", onDrag),
        addEventListener(window, "mouseup", onDragEnd)
      ]
    }
  }

  public componentWillUnmount() {
    this.unbinders.forEach(unbind => unbind())
  }

  public render() {
    const { children, x, y } = this.props
    const { setContainer } = this

    return <g ref={setContainer} transform={`translate(${x}, ${y})`}>
        {children}
      </g>
  }
}
