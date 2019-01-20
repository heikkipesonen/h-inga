import { CanvasObject, Position } from '../types/object'

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
}

export const getBounds = (items: CanvasObject[]) => {}