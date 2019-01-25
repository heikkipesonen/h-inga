import * as React from "react"
import { mount } from "enzyme"
import { Draggable } from "./draggable"

describe("draggable", () => {
  describe("initialization", () => {
    let el

    beforeEach(() => {
      el = mount(
        <Draggable x={1} y={1} scale={1} onChange={jest.fn()}>
          <circle cx="0" cy="0" r="10" />
        </Draggable>
      )
    })

    it("should mount", () => {
      expect(el.find("g")).toHaveLength(1)
    })

    it("renders children", () => {
      expect(el.contains(<circle cx="0" cy="0" r="10" />)).toEqual(true)
    })

    it("adds listeners", () => {
      expect(el.instance().unbinders).toHaveLength(3)
    })
  })

  describe("actions", () => {
    it("changes state when mouse is pressed", () => {
      const el = mount(
        <Draggable x={1} y={1} scale={1} onChange={jest.fn()}>
          <circle cx="0" cy="0" r="10" />
        </Draggable>
      )
      const e = new MouseEvent("mousedown")
      e.pageX = 10
      e.pageY = 10

      const instance = el.instance()
      instance.ref.dispatchEvent(e)

      const { state } = el.instance()

      expect(state.onDrag).toBe(true)
      expect(state.lastEvent.x).toEqual(10)
      expect(state.lastEvent.y).toEqual(10)

      window.dispatchEvent(new MouseEvent("mouseup"))

      const endState = el.instance().state

      expect(endState.onDrag).toBe(false)
      expect(endState.lastEvent).toEqual(null)
    })

    it("should follow mouse on drag", () => {
      const onChange = jest.fn()
      const el = mount(
        <Draggable x={1} y={1} scale={1} onChange={onChange}>
          <circle cx="0" cy="0" r="10" />
        </Draggable>
      )

      const mouseDownEvent = new MouseEvent("mousedown")
      mouseDownEvent.pageX = 0
      mouseDownEvent.pageY = 0

      const instance = el.instance()
      instance.ref.dispatchEvent(mouseDownEvent)

      const mouseMoveEvent = new MouseEvent("mousemove")
      mouseMoveEvent.pageX = 100
      mouseMoveEvent.pageY = 100

      window.dispatchEvent(mouseMoveEvent)

      expect(onChange).toHaveBeenCalledWith({
        x: 101,
        y: 101,
        scale: 1
      })
    })
  })
})
