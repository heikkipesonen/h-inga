import * as React from 'react'
import styled from "styled-components";
import {
  Pointer,
  getMousePointer,
  getMouseWheel,
  delta,
  getPointerOnCanvas
} from "./pointer";
import { addEventListener } from './listener'

interface Props {
  children: (state: State) => React.ReactNode
}

interface State {
  x: number
  y: number
  scale: number
  onDrag: boolean
  lastEvent: Pointer | null
}

const CanvasContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ddd;
    overflow: hidden;
`

export class Canvas extends React.PureComponent<Props, State> {

  public state = {
    x: 0,
    y: 0,
    scale: 1,
    onDrag: false,
    lastEvent: null
  }

  private unbinders: Array<() => void> = []

  public onDragStart = (event: MouseEvent) => {
    const position = getMousePointer(event)

    this.setState({
      lastEvent: position,
      onDrag: true
    })
  }

  public onDrag = (event: MouseEvent) => {
    const { lastEvent, onDrag } = this.state
    if (onDrag && lastEvent) {
      const position = getMousePointer(event)
      const d = delta(lastEvent, position);
      const { state: { x, y } } = this;

      const nextPosition = {
        x: d.x + x,
        y: d.y + y,
      }

      this.setState({
        ...nextPosition,
        lastEvent: position
      })
    }
  }

  public onDragEnd = (event: MouseEvent) => {
    this.setState({
      lastEvent: null,
      onDrag: false
    })
  }

  public zoom = (event: MouseWheelEvent) => {
    const { scale, x, y } = this.state
    const dScale = scale * getMouseWheel(event) / 1800
    const newScale = scale + dScale
    const cursor = getMousePointer(event)
    const initialPosition = getPointerOnCanvas(cursor, { x, y, scale })
    const newCursorPosition = getPointerOnCanvas(cursor, { x, y, scale: newScale })

    const newCanvasPosition = {
      x: x + (newCursorPosition.x - initialPosition.x) * newScale,
      y: y + (newCursorPosition.y - initialPosition.y) * newScale,
      scale: newScale
    }

    this.setState(newCanvasPosition)
  }

  public setContainer = (el: any) => {
    const { onDragStart, onDrag, onDragEnd, zoom } = this;
    if (el) {
      this.unbinders = [
        addEventListener(el, 'mousedown', onDragStart),
        addEventListener(window, 'mousemove', onDrag),
        addEventListener(window, 'mouseup', onDragEnd),
        addEventListener(window, 'mousewheel', zoom)
      ]
    }
  }

  public componentWillUnmount() {
    this.unbinders.forEach((unbind) => unbind())
  }

  public getSvgTransform = (): string => {
    const { state: { x, y, scale } } = this
    return `translate(${x}, ${y}) scale(${scale}, ${scale})`
  }

  public render() {
    const { children } = this.props
    const { setContainer, state } = this
    const canvasPosition = this.getSvgTransform();

    return (
      <CanvasContainer>
        <svg style={{ width: "100%", height: "100%" }} ref={setContainer}>
          <g transform={canvasPosition}>
            {children(state)}
          </g>
        </svg>
      </CanvasContainer>
    );
  }
}