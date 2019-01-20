import * as React from 'react'
import { CanvasObject } from '../../types/object'
import * as Objects from './objects'
import { Position } from '../../types/object'

interface ItemProps {
  scale: number
  model: CanvasObject,
  parent?: CanvasObject
  onChange?: (p: Position) => void
}

interface ItemState {
  x: number
  y: number
}

export class CanvasItem extends React.PureComponent<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props)
    this.state = {
      x: props.model.x,
      y: props.model.y,
    }
  }

  private handleChange = ({ x, y }: Position) => this.setState((state) => ({
    x: state.x + x,
    y: state.y + y
  }))

  private getRenderObject = (): React.ReactNode => {
    const { model } = this.props
    switch (model.kind) {
      case 'Circle':
        return (
          <Objects.Circle
            x={0}
            y={0}
            r={model.r}
            scale={this.props.scale}
            onChange={this.handleChange}
          />
        )
      case 'Line':
      case 'Vertex':
        return null
      default:
        const _: never = model
        return _
    }
  }

  private renderChildren = () => {
    const { model, scale } = this.props
    return model.children && model.children.map(o => (
      <CanvasItem
        key={o.id}
        model={o}
        scale={scale}
        parent={model}
      />)
    )
  }

  public render() {
    const { parent } = this.props
    const renderObject = this.getRenderObject()
    const { x, y } = this.state

    return (
      <Objects.Group x={x} y={y}>
        {renderObject}
        {this.renderChildren()}
        {parent && (
          <Objects.SimpleLine
            x={0}
            y={0}
            x2={-x}
            y2={-y}
            style={{
              strokeWidth: 2,
              stroke: "#d00"
            }}
          />
        )}
      </Objects.Group>
    )
  }
}
