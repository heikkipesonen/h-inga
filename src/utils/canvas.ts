import { CanvasObject, Position } from '../types/object'
import { State as CanvasState } from '../components/canvas/canvas'
import { Bounds } from './bounds';


export const getCanvasBounds = (s: CanvasState) => new Bounds(
  s.x,
  s.y,
  s.x + s.width,
  s.y + s.height
).scale(s.scale)

type FlatMap = Record<string, CanvasObject>

export const getVisible = (v: FlatMap, b: Bounds) =>
  Object.keys(v).filter((key) => {
    const o = v[key]
    return b.contains({x: o.x, y: o.y })
  }).map((k) => v[k])

export const applyPosition = (o: CanvasObject, p: Position): CanvasObject => {
  return {
    ...o,
    x: o.x + p.x,
    y: o.y + p.y
  }
}
