
import * as React from 'react'
import { CanvasObject } from 'src/types/object';
import { flatten } from 'src/utils/canvas';

export const createGroupFrom = (o: CanvasObject) => {
  return flatten([o])
}

export const lift = () => (
  <g>
    kissa
  </g>
)