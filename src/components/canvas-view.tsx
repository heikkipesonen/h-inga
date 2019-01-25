import * as React from 'react'
import { Canvas } from "./canvas"
import { FlatRender } from './canvas/objects/flat-render'

import { data } from '../mock'

export class CanvasView extends React.Component {

  public render() {
    return (
      <Canvas>
        {(state) => (
          <FlatRender bounds={state.bounds} src={data.objects} />
        )}
      </Canvas>
    )
  }
}