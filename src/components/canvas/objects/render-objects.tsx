import * as React from 'react'

import { CanvasObject, Style, Position, ObjectEventListeners } from 'src/types/object';
import { Circle } from "./circle"
import { SimpleLine } from "./simple-line"
import { Draggable } from './draggable';
import { Pointer } from '../pointer';
import { flatten } from 'src/utils/canvas';

export interface RenderCanvasObjectProps extends ObjectEventListeners {
  model: CanvasObject,
  style: Style
}

export const RenderCanvasObject = React.memo(({ model, ...props }: RenderCanvasObjectProps) => {
  switch (model.kind) {
    case "Circle":
      return (
        <Circle
          id={model.id}
          key={`object_${model.id}`}
          x={model.x}
          y={model.y}
          r={model.r}
          {...props}
        />
      )
    case "Line":
    case "Vertex":
      return null
    default:
      const _: never = model
      return _
  }
}
)

export const renderChildLines = (o: CanvasObject) =>
  o.children &&
  o.children.map(c => (
    <SimpleLine
      key={`child_${c.id}`}
      x={o.x}
      y={o.y}
      x2={c.x + o.x}
      y2={c.y + o.y}
      style={{
        stroke: "#d00",
        strokeWidth: "1px"
      }}
    />
  ))

export interface RenderGroupProps {
  src: CanvasObject
  e?: Pointer
  onDragEnd?: (s: GroupState) => void
}

export interface GroupState {
  x: number
  y: number
}


export class RenderGroup extends React.PureComponent<RenderGroupProps, GroupState> {
  public state: GroupState = {
    x: 0,
    y: 0,
  }

  private onDrag = ({ x, y }: Position) => {
    this.setState(() => ({
      x,
      y
    }))
  }

  private handleDragEnd = () =>
    this.props.onDragEnd ? this.props.onDragEnd(this.state) : null

  public render() {
    const { x, y } = this.state
    const map = flatten([this.props.src])

    const v = Object.keys(map).map((k) => map[k])

    return (
      <Draggable onDrag={this.props.e} x={x} y={y} onChange={this.onDrag} onDragEnd={this.handleDragEnd}>
        {v.map((o) => (
          <React.Fragment key={o.id} >
            {renderChildLines(o)}
            <RenderCanvasObject model={o} style={{
              fill: "rgba(255, 0, 0, 0.3)",
              stroke: "rgba(255, 0, 0, 0.5)",
              strokeWidth: "1px"
            }} />
          </React.Fragment>
        ))}
      </Draggable>
    )
  }
}