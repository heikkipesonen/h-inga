import * as React from 'react'
import classNames from 'classnames'

import { Style, ObjectEventListeners } from 'src/types/object';

interface Props extends ObjectEventListeners{
  id: string
  x: number
  y: number
  width: number
  height: number
  className?: string
  style?: Style
}

export const Rect = ({ id, x, y, width, height, style, className }: Props) => (
  <rect
    data-id={id}
    className={classNames('c-rect', className)}
    x={x}
    y={y}
    width={width}
    height={height}
    {...style}
  />
)