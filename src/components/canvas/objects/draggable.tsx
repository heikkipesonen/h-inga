import * as React from 'react'
import {
    Pointer,
    getMousePointer,
    delta,
} from "../pointer";
import { addEventListener } from '../listener'
import { Position } from "../../../types/object"

interface Props {
    children: React.ReactNode
    scale: number
    x: number
    y: number
    onChange?: (event: Position) => void
}

interface State {
    onDrag: boolean
    lastEvent: Pointer | null
}

export class Draggable extends React.Component<Props, State> {

    public state = {
        onDrag: false,
        lastEvent: null
    }

    public ref: HTMLElement | null = null
    private unbinders: Array<() => void> = []

    public onDragStart = (event: MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()

        const position = getMousePointer(event)

        this.setState({
            lastEvent: position,
            onDrag: true
        })
    }

    public onDrag = (event: MouseEvent) => {
        const { lastEvent, onDrag } = this.state
        const { onChange } = this.props;

        if (onDrag && lastEvent) {
            const position = getMousePointer(event)
            const d = delta(lastEvent, position)
            const { scale, x, y } = this.props;

            const nextPosition = {
                x: (d.x / scale) + x,
                y: (d.y / scale) + y,
            }

            this.setState({
                lastEvent: position
            })

            if (onChange) {
                onChange(nextPosition)
            }
        }
    }

    public onDragEnd = (event: MouseEvent) => {
        this.setState({
            lastEvent: null,
            onDrag: false
        })
    }

    public setContainer = (el: any) => {
        const { onDragStart, onDrag, onDragEnd } = this;
        if (el) {
            this.ref = el
            this.unbinders = [
                addEventListener(el, 'mousedown', onDragStart),
                addEventListener(window, 'mousemove', onDrag),
                addEventListener(window, 'mouseup', onDragEnd)
            ]
        }
    }

    public getSvgTransform = (): string => {
        const { x, y } = this.props
        return `translate(${x}, ${y})`
    }

    public componentWillUnmount () {
        this.unbinders.forEach((unbind) => unbind())
    }

    public render() {
        const { children } = this.props
        const { setContainer } = this
        const canvasPosition = this.getSvgTransform();

        return (
            <g ref={setContainer} transform={canvasPosition}>
                {children}
            </g>
        );
    }
}
