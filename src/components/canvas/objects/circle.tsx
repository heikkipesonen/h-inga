import * as React from 'react'
import { Style, ObjectEventListeners } from 'src/types/object';
import classNames from 'classnames'

interface Props extends ObjectEventListeners {
  id: string
  x: number
  y: number
  r: number
  className?: string
  style?: Style
}

export const Circle = React.memo(({id, x, y, r, style, className, ...props }: Props) => (
  <circle
    data-id={id}
    r={r}
    cx={x}
    cy={y}
    {...style}
    className={classNames('c-circle', className)}
    {...props}
  />
));
