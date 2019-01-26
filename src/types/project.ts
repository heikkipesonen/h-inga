import { FlatMap } from './object'

export interface Project {
  id: string,
  name: string,
  objects: FlatMap
}
