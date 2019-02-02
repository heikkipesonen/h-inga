import * as React from 'react'
import { FlatMap, CanvasObject, Style, Position } from 'src/types/object';
import { fromNullable } from 'fp-ts/lib/Option';
import { RenderCanvasObject, renderChildLines } from './objects/render-canvas-object';

export interface Props {
  x: number
  y: number
  src: FlatMap
  style: Style
  interactive?: boolean
  onDrag?: (p: Position) => void
  onDragEnd?: () => void
  onItemClick?: (o: CanvasObject) => void
  onItemMouseDown?: (o: CanvasObject) => void
}

export interface State {
  x: number
  y: number
}

interface LayerObjectsProps {
  src: FlatMap
  style: Style
  onMouseDown: (e: any) => void
  onClick: (e: any) => void
}

const LayerObjects = React.memo(({ src, style }: LayerObjectsProps) => (
  <>
  {Object.keys(src).map(k => (
    <React.Fragment key={src[k].id}>
      {renderChildLines(src, src[k])}
      <RenderCanvasObject model={src[k]} style={style} />
    </React.Fragment>
  ))}
  </>
))

export class Layer extends React.PureComponent<Props> {

  public state: State = {
    x: this.props.x,
    y: this.props.y
  }

  private getCanvasObject = (id: string) => fromNullable(this.props.src[id])

  private handleMouseDown = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const { onItemMouseDown } = this.props

    fromNullable(onItemMouseDown).map(c => {
      const t = e.target as SVGElement
      const id = t.getAttribute('data-id')!
      this.getCanvasObject(id).map(c)
    })
  }

  private handleClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const { onItemClick } = this.props

    fromNullable(onItemClick).map(c => {
      const t = e.target as SVGElement
      const id = t.getAttribute('data-id')!
      this.getCanvasObject(id).map(c)
    })
  }

  public render() {
    const { style, src } = this.props

    console.log('en traktor')

    return (
      <LayerObjects
        src={src}
        style={style}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
      />
    )
  }
}