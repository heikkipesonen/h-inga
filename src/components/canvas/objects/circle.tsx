import * as React from 'react'
import { Draggable } from './draggable'
import { Position } from "../../../types/object"
import { Style } from 'src/types/object';

interface Props {
  x: number
  y: number
  r: number
  style?: Style,
  scale: number
  onChange?: (event: Position) => void
}

export const Circle = React.memo(({x, y, r, style, scale, onChange }: Props) => (
  <Draggable scale={scale} x={x} y={y} onChange={onChange}>
    <circle r={r} cx={0} cy={0} {...style} />
  </Draggable>
));
