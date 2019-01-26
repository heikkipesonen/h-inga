
export interface Style {
  fill?: string
  stroke?: string
  strokeWidth?: string | number
  opacity?: number
}

export interface Position {
  x: number
  y: number
  scale?: number
}

export interface BaseObject {
  id: string
  x: number
  y: number
  children?: CanvasObject[]
  style?: Style,
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

export interface ObjectEventListeners {
  onClick?: (e: React.MouseEvent<SVGElement>) => void
  onMouseDown?: (e: React.MouseEvent<SVGElement>) => void
  onMouseUp?: (e: React.MouseEvent<SVGElement>) => void
}

export type CanvasObject = Vertex | Circle | Line

export type FlatMap = Record<string, CanvasObject>