import * as React from 'react'
import { Draggable } from './draggable'
import { Position } from "../../../types/object"
import { Style } from 'src/types/object';

interface Props {
    x: number
    y: number
    style?: Style
    onChange: (event: Position) => void
}

export const Vertex = ({ x, y, onChange, style = {} } : Props) => (
  <Draggable x={x} y={y} onChange={onChange} {...style}>
    <rect x={-8} y={-8} width={16} height={16} />
  </Draggable>
);
