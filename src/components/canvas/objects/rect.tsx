import * as React from 'react'
import { Style } from 'src/types/object';

interface Props {
  x: number
  y: number
  width: number
  height: number
  style: Style
}

export const Rect = ({ x, y, width, height, style }: Props) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    {...style}
  />
)