import * as React from 'react'
import { Draggable } from './draggable'
import { Position } from "../../../types/object"
import { Style } from 'src/types/object';

interface Props {
  x: number
  y: number
  r: number
  scale: number
  style?: Style,
  onChange?: (event: Position) => void
}

export const Circle = ({ x, y, r, scale, onChange, style = {} }: Props) => (
  <Draggable scale={scale} x={x} y={y} onChange={onChange} {...style}>
    <circle r={r} x={x} y={y} />
  </Draggable>
);
