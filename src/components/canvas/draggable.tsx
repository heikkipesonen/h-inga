import * as React from "react"
import { some, none } from 'fp-ts/lib/Option'

import { Pointer, getMousePointer, calcDragEvent, calcZoomEvent } from "./pointer"
import { addEventListener } from "./listener"
import { Position } from "./../../types/object"
import { globalState } from './global-state'
import { Container } from './objects/container'

interface Props {
  children: React.ReactNode
  x: number
  y: number
  onChange: (event: Position) => void
  onDragEnd?: () => void
  onDrag?: Pointer
  scalable?: boolean
  disabled?: boolean
  interactive?: boolean
}

interface State {
  onDrag: boolean
  lastEvent: Pointer | null
}

export class Draggable extends React.PureComponent<Props, State> {
  public state: State = {
    onDrag: !!this.props.onDrag,
    lastEvent: this.props.onDrag || null
  }

  public ref: HTMLElement | null = null
  private unbinders: Array<() => void> = []

  private isInteractive = () => this.props.interactive ? some(true) : none

  public onDragStart = (event: React.MouseEvent<SVGElement, MouseEvent>) =>
    this.isInteractive().map(() => {
      event.stopPropagation()
      event.preventDefault()

      const position = getMousePointer(event)

      this.setState(() => ({
        lastEvent: position,
        onDrag: true
      }))

    })

  public onDrag = (event: MouseEvent) =>
    this.isInteractive().map(() => {
      const { lastEvent, onDrag } = this.state
      const { onChange } = this.props
      if (onDrag && lastEvent) {
        event.stopImmediatePropagation()
        event.stopPropagation()
        event.preventDefault()

        const { scale } = globalState
        const { x, y } = this.props
        const nextPosition = calcDragEvent(event, lastEvent, { x, y, scale })
        const position = getMousePointer(event)

        this.setState(() => ({
          lastEvent: position
        }))

        onChange(nextPosition)
      }
    })

  public zoom = (event: MouseWheelEvent) => {
    if (!this.props.interactive || !this.props.scalable) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const { scale } = globalState
    const { x, y, onChange } = this.props
    const nextPosition = calcZoomEvent({ scale, x, y }, event)
    onChange(nextPosition)
  }

  public onDragEnd = (event: MouseEvent) => {
    if (this.props.interactive) {
      this.setState(() => ({
        lastEvent: null,
        onDrag: false
      }), () => this.props.onDragEnd ? this.props.onDragEnd() : null)
    }
  }

  public setContainer = (el: any) => {
    const { onDrag, onDragEnd, zoom } = this
    if (el) {
      this.ref = el
      this.unbinders = [
        addEventListener(window, "mousemove", onDrag),
        addEventListener(window, "mouseup", onDragEnd),
        addEventListener(el, "mousewheel", zoom),
        addEventListener(el, "wheel", zoom)
      ]
    }
  }

  public componentWillUnmount() {
    this.unbinders.forEach(u => u())
  }

  public render() {
    const { children, x, y } = this.props
    const { setContainer } = this
    return (
      <Container x={x} y={y} ref={setContainer} onMouseDown={this.onDragStart}>
        { children }
      </Container>
    )
  }
}
