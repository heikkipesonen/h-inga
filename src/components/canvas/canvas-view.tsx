import * as React from 'react'
import { FlatMap, CanvasObject, Position } from 'src/types/object';
import { excludeObjectFamily } from 'src/utils/object';

import { Canvas } from './canvas'
import { Layer } from './layer'

interface Props {
  src: FlatMap
}

interface State {
  src: FlatMap,
  layers: FlatMap[]
}

export class CanvasView extends React.PureComponent<Props, State> {

  public state: State = {
    src: this.props.src,
    layers: [this.props.src]
  }

  private handleItemMouseDown = (o: CanvasObject) => {
    // const layerModel = pickObjectFamily(this.state.src, o)

    this.setState(state => ({
      src: excludeObjectFamily(state.src, o)
    }))
  }

  private handleCanvasClick = (p: Position) => {
    console.log(p)
  }

  public render() {

    const { layers } = this.state

    const style = {
      fill: "rgba(0, 0, 0, 0.3)",
      stroke: "rgba(0, 0, 0, 0.5)",
      strokeWidth: "1px"
    }

    return (
      <Canvas onClick={this.handleCanvasClick}>
        {() => (
          <>
            {layers.map((l, index) => (
              <Layer
                key={index}
                x={0}
                y={0}
                src={l}
                style={style}
                onItemMouseDown={this.handleItemMouseDown}
              />
            ))}
          </>
        )}
      </Canvas>

    )
  }
}