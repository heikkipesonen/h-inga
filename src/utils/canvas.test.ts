// import { getVisible } from './canvas'
// import { State as CanvasState } from '../components/canvas/canvas'
// import { Bounds } from './bounds'
// import { CanvasObject } from 'src/types/object';


describe('canvas utils', () => {

  it('should find visible items for canvas', () => {
    // const p: CanvasState = {
    //   x: 0,
    //   y: 0,
    //   width: 1000,
    //   height: 1000,
    //   scale: 1,
    //   onDrag: false,
    //   lastEvent: null,
    //   bounds: new Bounds(0,0,1000,1000)
    // }

    // const viewModel: Record<string, CanvasObject> = {
    //   '1': {
    //     id: '1',
    //     x: 1,
    //     y: 1,
    //     r: 10,
    //     kind: 'Circle'
    //   },
    //   '2': {
    //     id: '2',
    //     x: 1000,
    //     y: 1000,
    //     r: 10,
    //     kind: 'Circle'
    //   },
    //   '3': {
    //     id: '3',
    //     x: -1000,
    //     y: -1000,
    //     r: 10,
    //     kind: 'Circle'
    //   }
    // }

    // expect(getVisible(viewModel, p).map(o => o.id)).toEqual(["1", "2"])

    // p.bounds.scale(0.1)
    // p.bounds.x = -1000
    // p.bounds.y = -1000

    // expect(getVisible(viewModel, p).map(o => o.id)).toEqual(["1", "2", "3"])
  })

})