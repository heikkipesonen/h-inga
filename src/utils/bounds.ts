import { Position } from 'src/types/object';

export class Bounds {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public x2: number = 0,
    public y2: number = 0,
  ) {}

  get width() {
    return this.x2 - this.x
  }

  set width(value) {
    this.x2 = value + this.x
  }

  get height() {
    return this.y2 - this.y
  }

  set height(value) {
    this.y2 = value + this.y
  }

  public extend = ({ x, y }: Position) => {
    this.x = Math.min(this.x, x)
    this.y = Math.min(this.y, y)
    this.x2 = Math.max(this.x2, x)
    this.y2 = Math.max(this.y2, y)

    return this
  }

  public contains = ({ x, y }: Position) =>
    x >= this.x && x <= this.x2 && y >= this.y && y <= this.y2

  public scale = (factor: number) => {
    this.width = this.width / factor
    this.height = this.height / factor
    return this
  }}
