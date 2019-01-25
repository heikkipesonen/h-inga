import * as React from 'react'
import { CanvasObject } from 'src/types/object';

import { Circle } from './circle'
import { SimpleLine } from './simple-line'

export const getRenderObject = (o: CanvasObject) => {
  switch (o.kind) {
    case "Circle":
      return (
        <Circle
          key={`object_${o.id}`}
          x={o.x}
          y={o.y}
          r={o.r}
          style={{
            fill: "rgba(255, 0, 0, 0.3)",
            stroke: "#d00",
            strokeWidth: "1px"
          }}
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
    <SimpleLine
      key={`child_${c.id}`}
      x={o.x}
      y={o.y}
      x2={c.x + o.x}
      y2={c.y + o.y}
      style={{
        stroke: '#d00',
        strokeWidth: '1px'
      }}
    />
  ))