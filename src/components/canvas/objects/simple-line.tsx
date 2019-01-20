import * as React from 'react'
import { Style } from "src/types/object"

interface Props {
  x: number
  y: number
  x2: number
  y2: number
  style?: Style
}

export const SimpleLine = ({ x, y, x2, y2, style }: Props) => (
  <line
    x1={x}
    y1={y}
    x2={x2}
    y2={y2}
    {...style}
  />
)