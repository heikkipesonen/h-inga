import { CanvasObject } from './object'

export interface Project {
  id: string,
  name: string,
  objects: CanvasObject[]
}