import * as React from 'react'
import { Canvas, CanvasItem } from "./canvas"

import { data } from '../mock'

export class CanvasView extends React.Component {

  public render() {
    return (
      <Canvas>
        {({ scale }) =>
          data.objects.map((object) => (
            <CanvasItem
              key={object.id}
              model={object}
              scale={scale}
            />
          ))
        }
      </Canvas>
    )
  }
}