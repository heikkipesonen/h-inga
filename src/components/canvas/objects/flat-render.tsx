import * as React from 'react'

import { CanvasObject } from 'src/types/object';
import { getRenderObject, renderChildLines } from './render-object';
import { getVisible, flatten } from 'src/utils/canvas';
import { Bounds } from 'src/utils/bounds';

interface Props {
  src: CanvasObject[],
  bounds: Bounds
}

export class FlatRender extends React.PureComponent<Props> {

  public render() {
    const { src, bounds } = this.props
    const v = getVisible(flatten(src), bounds)
    console.log(v)
    console.log('jag vill render')
    return (
      <>
        {v.map((o) => (
          <React.Fragment key={o.id} >
            {getRenderObject(o)}
            {renderChildLines(o)}
          </React.Fragment>
        ))}
      </>
      )
    }
  }
