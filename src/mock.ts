import { Project } from './types/project'
import { CanvasObject } from './types/object';


const gId = () => `${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}`

const generateItem = (spacing: number = 500): CanvasObject => ({
  id: gId(),
  kind: 'Circle',
  r: Math.max(Math.round(Math.random() * 10), 5),
  x: Math.random() * spacing,
  y: Math.random() * spacing,
})

const generateItems = (count: number = 10, spacing: number = 500) =>
  Array(Math.round(Math.random() * count)).fill(false).map(() => generateItem(spacing))

const generate = () =>
  generateItems(100, 1000).map((i) => ({
    ...i,
    children: generateItems(10, 100).map((si) => ({
      ...si,
      children: generateItems(10, 100)
    }))
  }))

export const data: Project = {
  id: 'sklasdfs-asdfwer-awerwerwer',
  name: 'kissa',
  objects: generate()
}