import * as React from 'react'

import { CanvasObject, Style, ObjectEventListeners, FlatMap } from 'src/types/object';
import * as Objects from "./index"

export interface RenderCanvasObjectProps extends ObjectEventListeners {
  model: CanvasObject,
  style: Style
}

export const RenderCanvasObject = React.memo(({ model, ...props }: RenderCanvasObjectProps) => {
  switch (model.kind) {
    case "Circle":
      return (
        <Objects.Circle
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
    case "Rect":
      return (
        <Objects.Rect
          id={model.id}
          key={`object_${model.id}`}
          x={model.x}
          y={model.y}
          width={model.witdth}
          height={model.height}
          {...props}
        />
      )
    default:
      const _: never = model
      return _
  }
}
)

export const renderChildLines = (src: FlatMap, o: CanvasObject) => {
  return o.children.map<JSX.Element[] | null>(children => (
    children.map(c => (
    src[c] && <Objects.SimpleLine
      key={`child_${c}`}
      x={o.x}
      y={o.y}
      x2={src[c].x}
      y2={src[c].y}
      style={{
        stroke: "#d00",
        strokeWidth: "1px"
      }}
      />
    ))
  )).getOrElse(null)
}
