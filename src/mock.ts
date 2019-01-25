import { Project } from './types/project'
import { CanvasObject } from './types/object';

const gId = () => `${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}`

const sign = () => Math.random() * 10 <= 5 ? -1 : 1

const generateItem = (spacing: number = 500): CanvasObject => ({
  id: gId(),
  kind: 'Circle',
  r: Math.max(Math.round(Math.random() * 50), 10),
  x: sign() * Math.random() * spacing,
  y: sign() * Math.random() * spacing,
})

const generateItems = (count: number = 10, spacing: number = 500) =>
  Array(Math.round(count)).fill(false).map(() => generateItem(spacing))

const generate = () =>
  generateItems(10, 10000).map(i => ({
    ...i,
    children: generateItems(10, 1000).map(ic => ({
      ...ic,
      children: generateItems(5, 500).map(icc => ({
        ...icc,
        children: generateItems(5, 100)
      }))
    }))
  }))

export const data: Project = {
  id: 'sklasdfs-asdfwer-awerwerwer',
  name: 'kissa',
  objects: generate()
}