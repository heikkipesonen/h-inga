import * as React from 'react'

interface Props {
  x: number,
  y: number,
  children: React.ReactNode
}

export const Group = ({ x, y, children }: Props) => (
  <g transform={`translate(${x}, ${y})`}>
    { children }
  </g>
)