import { Project } from './types/project'
import { CanvasObject, FlatMap } from './types/object';
import { some, none } from 'fp-ts/lib/Option';

const gId = () => `${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}-${Math.random().toString(32).slice(2)}`

const sign = () => Math.random() * 10 <= 5 ? -1 : 1

const generateItem = (spacing: number = 500): CanvasObject => ({
  id: gId(),
  kind: 'Circle',
  r: Math.max(Math.round(Math.random() * 50), 10),
  x: sign() * Math.random() * spacing,
  y: sign() * Math.random() * spacing,
  children: none,
  parent: none,
  style: none
})

const generateItems = (count: number = 10, spacing: number = 500): FlatMap =>
  Array(Math.round(count)).fill(false).map(() => generateItem(spacing))
    .reduce((r, o) => {
      return {
        ...r,
        [o.id]: o
     }
   }, {})

const generate = (): FlatMap => {
  const l = generateItems(10, 5000)
  return Object.keys(l).reduce((r, k) => {
    const c = generateItems(5, 300)
    Object.keys(c).forEach(ck => {
      c[ck].x = c[ck].x + l[k].x
      c[ck].y = c[ck].y + l[k].y
      c[ck].parent = some(l[k].id)
    })

    return {
      ...r,
      [k]: {
        ...l[k],
        children: some(Object.keys(c))
      },
      ...c
    }
  }, {})
}

export const data: Project = {
  id: 'sklasdfs-asdfwer-awerwerwer',
  name: 'kissa',
  objects: generate()
}