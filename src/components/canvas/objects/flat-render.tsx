import * as React from 'react'

import { CanvasObject, FlatMap } from 'src/types/object';
import { getVisible, flatten, getObjectFamilyIdList, applyPosition } from 'src/utils/canvas';
import { Bounds } from 'src/utils/bounds';
import { RenderCanvasObject, renderChildLines, RenderGroup, GroupState } from './render-objects';
import { Pointer, getMousePointer } from '../pointer';

interface Props {
  src: CanvasObject[],
  bounds: Bounds,
  onChange?: (src: CanvasObject[]) => void
}
interface State {
  src: CanvasObject[],
  map: FlatMap,
  layer: CanvasObject | null
  e: Pointer | null
}

export class FlatRender extends React.PureComponent<Props, State> {

  public state: State = {
    src: this.props.src,
    map: flatten(this.props.src),
    layer: null,
    e: null
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.src !== this.props.src) {
      this.setState(() => ({
        src: this.props.src,
        map: flatten(this.props.src)
      }))
    }
  }

  private getCanvasObject = (id: string) => this.state.map[id]!

  private handleMouseDown = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const pointer = getMousePointer(e as any)
    const target = e.target as SVGElement
    const id = target.getAttribute('data-id')!

    const o = this.getCanvasObject(id)
    const ids = getObjectFamilyIdList(o)
    console.log(ids)

    const map = {
      ...this.state.map
    }
    ids.forEach(i => delete map[i])

    this.setState(() => ({
      map,
      layer: o,
      e: pointer
    }))
  }

  private handleDragEnd = (p: GroupState) =>
    this.props.onChange && this.props.onChange([applyPosition(this.state.layer!, p)])


  public render() {
    const { bounds } = this.props
    const v = getVisible(this.state.map, bounds)
    const { layer, e } = this.state

    return (
      <>
        {v.map((o) => (
          <React.Fragment key={o.id} >
            {renderChildLines(o)}
            <RenderCanvasObject
              model={o}
              onMouseDown={this.handleMouseDown}
              style={{
                fill: "rgba(0, 0, 0, 0.3)",
                stroke: "rgba(0, 0, 0, 0.5)",
                strokeWidth: "1px"
              }}
            />
          </React.Fragment>
        ))}

        {layer && <RenderGroup src={layer} e={e || undefined} onDragEnd={this.handleDragEnd} />}
      </>
    )
  }
}
