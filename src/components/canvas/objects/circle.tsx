import * as React from 'react'
import { Style } from 'src/types/object';

interface Props {
  x: number
  y: number
  r: number
  style?: Style,
}

export const Circle = React.memo(({x, y, r, style }: Props) => (
    <circle r={r} cx={x} cy={y} {...style} />
));
