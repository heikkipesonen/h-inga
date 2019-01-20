import { CanvasObject, Position } from '../types/object'
import { State as CanvasState } from '../components/canvas/canvas'

export class Bounds {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public x2: number = 0,
    public y2: number = 0,
  ) { }

  get width() {
    return this.x2 - this.x
  }

  get height() {
    return this.y2 - this.y
  }

  public extend = ({ x, y }: Position) => {
    return new Bounds(
      Math.min(this.x, x),
      Math.min(this.y, y),
      Math.max(this.x2, x),
      Math.max(this.y2, y),
    )
  }

  public contains = ({ x, y }: Position) =>
    this.x >= x && this.x2 <= x && this.y >= y && this.y2 <= y

  public scale = (factor: number) =>
    new Bounds(
      this.x / factor,
      this.y / factor,
      this.x2 / factor,
      this.y2 / factor
    )
}

export const getCanvasBounds = (s: CanvasState) => new Bounds(
  s.x,
  s.y,
  s.x + s.width,
  s.y + s.height
).scale(s.scale)

export const getVisible = (b: Bounds) => (items: CanvasObject[]) =>
  items.filter(() => {
    return 1
  })

export const getBounds = (items: CanvasObject[]) => { }

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