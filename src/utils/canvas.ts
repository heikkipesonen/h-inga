import { CanvasObject, Position } from '../types/object'
import { State as CanvasState } from '../components/canvas/canvas'
import { Bounds } from './bounds';


export const getCanvasBounds = (s: CanvasState) => new Bounds(
  s.x,
  s.y,
  s.x + s.width,
  s.y + s.height
).scale(s.scale)

export const getAbsolute = ({children, ...root}: CanvasObject) => {
  if (!children) {
    return root
  }

  return {
    ...root,
    children: children.map((c) => {
      return {
        ...c,
        x: root.x + c.x,
        y: root.y + c.y
      }
    })
  }
}

type FlatRender = Record<string, CanvasObject>

export const flatten = (
  src: CanvasObject[],
  p: Position = { x: 0, y: 0 }
): FlatRender =>
  src.reduce((model, o) => {
    const { x, y } = p

    const offsetPosition: Position = {
      x: x + o.x,
      y: y + o.y
    }

    const children = o.children && flatten(o.children, offsetPosition)

    model[o.id] = {
      ...o,
      ...offsetPosition
    }

    return {
      ...model,
      ...children
    }
  }, {})

export const getVisible = (v: FlatRender, b: Bounds) =>
  Object.keys(v).filter((key) => {
    const o = v[key]
    return b.contains({x: o.x, y: o.y })
  }).map((k) => v[k])