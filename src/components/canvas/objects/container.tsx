import * as React from 'react'

interface Props {
  x?: number
  y?: number
  children: React.ReactNode
}

export const Container = ({ x, y, children }: Props) => (
  <g transform={`translate(${x}, ${y})`}>
    { children }
  </g>
)