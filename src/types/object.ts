import { Option } from 'fp-ts/lib/Option'

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
  children: Option<string[]>
  parent: Option<string>
  style: Option<Style>
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
export interface Rect extends BaseObject {
  kind: 'Rect',
  witdth: number,
  height: number
}

export interface Vertex extends BaseObject {
  kind: 'Vertex'
}

export interface ObjectEventListeners {
  onClick?: (e: React.MouseEvent<SVGElement, MouseEvent> ) => void
  onMouseDown?: (e: React.MouseEvent<SVGElement, MouseEvent> ) => void
  onMouseUp?: (e: React.MouseEvent<SVGElement, MouseEvent> ) => void
}

export type CanvasObject = Vertex | Circle | Line | Rect

export type FlatMap = Record<string, CanvasObject>