import * as React from 'react'

interface Props {
  x?: number
  y?: number
  ref?: (r: SVGElement | null) => void
  children: React.ReactNode
  onMouseDown?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void
}

export const Container = ({ x, y, children, ...props }: Props) => (
  <g transform={`translate(${x}, ${y})`} {...props}>
    { children }
  </g>
)