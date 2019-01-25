import * as React from 'react'
import { CanvasObject } from 'src/types/object';

export const getRenderObject = (o: CanvasObject) => {
  switch (o.kind) {
    case "Circle":
      return (
        <circle
          key={`object_${o.id}`}
          cx={o.x}
          cy={o.y}
          r={o.r}
          fill="none"
          stroke="#d00"
          strokeWidth="1px"
        />
      )
    case 'Line':
    case 'Vertex':
      return null
    default:
      const _: never = o
      return _
  }
}

export const renderChildLines = (o: CanvasObject) =>
  o.children &&
  o.children.map(c => (
    <line
      key={`child_${c.id}`}
      x1={o.x}
      y1={o.y}
      x2={c.x + o.x}
      y2={c.y + o.y}
      stroke="#d00"
      strokeWidth="1px"
    />
  ))