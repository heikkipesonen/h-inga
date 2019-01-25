import { Bounds } from './bounds'

describe('bounds', () => {

  it('should extend bounds', () => {
    const b = new Bounds()
      .extend({ x: 2, y: 2 })
      .extend({ x: -2, y: -2 })

    expect(b.height).toEqual(4)
    expect(b.width).toEqual(4)
  })

  it('calculate widths correctly', () => {
    const b = new Bounds(
      -100,
      -100,
      -50,
      -50
    )

    expect(b.height).toEqual(50)
    expect(b.width).toEqual(50)
  })

  it('calculate widths correctly', () => {
    const b = new Bounds(
      -100,
      -100,
      50,
      50
    )

    expect(b.height).toEqual(150)
    expect(b.width).toEqual(150)
  })

  it('should find if an object is within given bounds', () => {
    const b = new Bounds(0, 0, 4, 4)

    expect(
      b.contains({ x: -2, y: 0 })
    ).toEqual(false)

    expect(
      b.contains({ x: 0, y: 0 })
    ).toEqual(true)

    expect(
      b.contains({ x: 1, y: 1 })
    ).toEqual(true)

    expect(
      b.contains({ x: 0, y: 4 })
    ).toEqual(true)

    expect(
      b.contains({ x: 4, y: 0 })
    ).toEqual(true)

    expect(
      b.contains({ x: 4, y: 4 })
    ).toEqual(true)

    expect(
      b.contains({ x: 1, y: 5 })
    ).toEqual(false)
  })

  it('should correctly scale bounds', () => {
    const b = new Bounds(10, 10, 20, 20).scale(0.1)
    expect(b.width).toEqual(100)
    expect(b.height).toEqual(100)
    expect(b.x).toEqual(10)
    expect(b.y).toEqual(10)

    expect(b.contains({ x: 110, y: 110})).toEqual(true)
    expect(b.contains({ x: 110, y: 111})).toEqual(false)
  })
})
