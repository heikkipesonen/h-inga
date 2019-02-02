import * as React from 'react'
import styled from "styled-components";
import {
  Pointer,
  getMousePointer,
  calcDragEvent,
  calcZoomEvent,
  getPointerOnCanvas,
  delta,
} from "./pointer";
import { addEventListener } from './listener'
import { Bounds } from 'src/utils/bounds';
import { globalState } from './global-state';
import { fromNullable } from 'fp-ts/lib/Option';
import { Position } from 'src/types/object';

interface Props {
  onClick?: (p: Position) => void
  children: (state: State) => React.ReactNode
}

export interface State {
  x: number
  y: number
  width: number
  height: number
  scale: number
  onDrag: boolean
  lastEvent: Pointer | null
  firstEvent: Pointer | null
  bounds: Bounds
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

let timer: any = null
const debounce = (fn: (a: any) => any) => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(fn, 200)
}

export class Canvas extends React.Component<Props, State> {

  public state: State = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scale: 1,
    onDrag: false,
    lastEvent: null,
    firstEvent: null,
    bounds: new Bounds(0, 0, 0, 0)
  }

  private unbinders: Array<() => void> = []

  public handleClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (this.state.firstEvent && this.state.lastEvent) {
      const { dist } = delta(this.state.firstEvent!, this.state.lastEvent!)
      if (dist > 20) {
        return;
      }

      fromNullable(this.props.onClick).map(c => {
        const p = getPointerOnCanvas(getMousePointer(e), this.state)
        c({
          x: p.x,
          y: p.y
        })
      })
    }
  }

  public shouldComponentUpdate = (nextProps: Props, nextState: State) =>
    nextState.x !== this.state.x ||
    nextState.y !== this.state.y ||
    nextState.bounds !== this.state.bounds

  public componentDidUpdate() {
    globalState.scale = this.state.scale
  }

  private getBounds = () =>
    new Bounds(
      -this.state.x / this.state.scale,
      -this.state.y / this.state.scale,
      (this.state.width - this.state.x) / this.state.scale,
      (this.state.height - this.state.y) / this.state.scale
    )

  private setPosition = (x: number, y: number, scale?: number) =>
    this.setState((state) => ({
      x,
      y,
      scale: scale ? scale : state.scale
    }))

  public onDragStart = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const position = getMousePointer(event)

    this.setState(() => ({
      firstEvent: position,
      lastEvent: position,
      onDrag: true
    }))
  }

  public onDrag = (event: MouseEvent) => {
    const { lastEvent, onDrag } = this.state

    if (onDrag && lastEvent) {
      const { x, y } = this.state
      const nextPosition = calcDragEvent(event, lastEvent, { x, y, scale: 1 })

      this.setPosition(nextPosition.x, nextPosition.y)

      this.setState(() => ({
        lastEvent: getMousePointer(event)
      }))
    }
  }

  public onDragEnd = (event: MouseEvent) => {
    this.setState(() => ({
      onDrag: false,
      bounds: this.getBounds()
    }))
  }

  public zoom = (event: MouseWheelEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const { scale, x, y } = this.state
    const nextPosition = calcZoomEvent({ scale, x, y}, event)

    this.setPosition(
      nextPosition.x,
      nextPosition.y,
      nextPosition.scale,
    )

    debounce(() => {
      this.setState(() => ({
        bounds: this.getBounds()
      }))
    })
  }

  public setContainer = (el: any) => {
    const { onDrag, onDragEnd, zoom } = this;
    if (el) {
      this.setState(state => ({
        width: el.parentNode.offsetWidth,
        height: el.parentNode.offsetHeight,
        bounds: new Bounds(
          -state.x / state.scale,
          -state.y / state.scale,
          el.parentNode.offsetWidth / state.scale,
          el.parentNode.offsetHeight / state.scale
        )
      }))
      this.unbinders = [
        addEventListener(window, 'mousemove', onDrag),
        addEventListener(window, 'mouseup', onDragEnd),
        addEventListener(window, 'mousewheel', zoom),
        addEventListener(window, 'wheel', zoom)
      ]
    }
  }

  public componentWillUnmount() {
    this.unbinders.forEach((unbind) => unbind())
  }

  public render() {
    const { children } = this.props
    const { setContainer, state } = this

    return (
      <CanvasContainer>
        <svg style={{ width: "100%", height: "100%" }}
          onMouseDown={this.onDragStart}
          ref={setContainer}
          onClick={this.handleClick}
        >
          <g transform={`translate(${state.x}, ${state.y}) scale(${state.scale}, ${state.scale})`}>
            {children(state)}
          </g>
        </svg>
      </CanvasContainer>
    );
  }
}