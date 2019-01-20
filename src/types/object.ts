
export interface Style {
  fill?: string
  stroke?: string
  strokeWidth?: string | number
  opacity?: number
}

export interface Position {
  x: number
  y: number
}

export interface BaseObject {
  id: string
  x: number
  y: number
  children?: CanvasObject[]
  style?: Style
}

export interface Circle extends BaseObject {
  kind: 'Circle',
  r: number
}

export interface Line extends BaseObject {
  kind: 'Line',
  x2: number,
  y2: number
}

export interface Vertex extends BaseObject {
  kind: 'Vertex'
}

export type CanvasObject = Vertex | Circle | Line