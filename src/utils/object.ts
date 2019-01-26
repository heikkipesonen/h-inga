import { CanvasObject, FlatMap } from 'src/types/object'

export const pickObjectFamily = (src: FlatMap, o: CanvasObject): FlatMap => {
  return {
    [o.id]: o,
    ...o.children.map(c => c.reduce((r, id) => ({
      ...r,
      ...pickObjectFamily(src, src[id])
    }), {})).getOrElse({})
  }
}

export const getObjectFamilyIds = (o: CanvasObject) =>
  [o.id, ...o.children.getOrElse([])]

export const excludeObjectFamily = (src: FlatMap, o: CanvasObject): FlatMap => {
  const ids = getObjectFamilyIds(o)
  return Object.keys(src)
    .filter(k => ids.indexOf(k) === -1)
    .reduce((r, k) => {
      r[k] = src[k]
      return r
    }, {})
}