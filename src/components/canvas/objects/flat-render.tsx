// import * as React from 'react'
// import { Option, none, some, fromNullable } from 'fp-ts/lib/Option';

// import { CanvasObject, FlatMap, Position } from 'src/types/object';
// import { getVisible } from 'src/utils/canvas';
// import { Bounds } from 'src/utils/bounds';
// import { RenderCanvasObject, renderChildLines, RenderObjectTree } from './render-objects';
// import { getMousePointer, Pointer } from '../pointer';
// import { getObjectFamilyIds } from 'src/utils/object';

// interface Props {
//   src: FlatMap
//   bounds: Bounds
//   onChange: (src: FlatMap) => void
//   onMouseDown: (o: CanvasObject) => void
// }
// interface State {
//   src: FlatMap,
//   selected: Option<CanvasObject>
//   e: Option<Pointer>
// }

// export const extractObject = (src: FlatMap, o: CanvasObject): FlatMap => {
//   const ids = getObjectFamilyIds(o)
//   return Object.keys(src)
//     .filter(k => ids.indexOf(k) === -1)
//     .reduce((r, k) => {
//       r[k] = src[k]
//       return r
//     }, {})
// }


// export class Layer extends React.PureComponent<Props, State> {

//   public state: State = {
//     src: { ...this.props.src },
//     selected: none,
//     e: none
//   }

//   public componentWillReceiveProps = (nextProps: Props) => {
//     if (this.props.src !== nextProps.src) {
//       this.setState(() => ({
//         src: {
//           ...nextProps.src
//         }
//       }))
//     }
//   }

//   private getCanvasObject = (id: string) => fromNullable(this.props.src[id])

//   private handleMouseDown = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
//     e.stopPropagation()
//     e.preventDefault()
//     const target = e.target as SVGElement
//     const id = target.getAttribute('data-id')!

//     this.getCanvasObject(id).map((o) => this.props.onMouseDown(o))
//   }

//   public handleDragEnd = (e: Position) => {
//     const m = this.state.src

//     this.state.selected.map(s => getObjectFamilyIds(s)).map(ids => {
//       const l = ids.map(id => this.props.src[id])
//       l.forEach(o => {
//         m[o.id] = {
//           ...o,
//           x: o.x = o.x + e.x,
//           y: o.y = o.y + e.y
//         }
//       })
//     })

//     this.setState(() => ({
//       src: m,
//       selected: none,
//       e: none
//     }), () => {
//       this.props.onChange(this.state.src)
//     })
//   }

//   public render() {
//     const { bounds } = this.props
//     const { src, selected, e } = this.state
//     const v = getVisible(src, bounds)

//     return (
//       <>
//         {v.map((o) => (
//           <React.Fragment key={o.id} >
//             {renderChildLines(this.props.src, o)}
//             <RenderCanvasObject
//               model={o}
//               onMouseDown={this.handleMouseDown}
//               style={{
//                 fill: "rgba(0, 0, 0, 0.3)",
//                 stroke: "rgba(0, 0, 0, 0.5)",
//                 strokeWidth: "1px"
//               }}
//             />
//           </React.Fragment>
//         ))}
//         {selected.map<React.ReactNode | null>(s => (
//           <RenderObjectTree
//             e={e.toNullable()!}
//             src={this.props.src}
//             o={s}
//             onDragEnd={this.handleDragEnd}
//           />
//         )).getOrElse(null)}
//       </>
//     )
//   }
// }
