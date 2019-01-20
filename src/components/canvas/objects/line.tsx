import *  as React from 'react'
import { Vertex } from './vertex'
import { Position } from "../../../types/object"

interface LineOnChangeEvent {
    x1: number
    y1: number
    x2: number
    y2: number
}

export interface Props {
    x1: number
    y1: number
    x2: number
    y2: number
    scale: number
    onChange: (event: LineOnChangeEvent) => void
}

class Line extends React.PureComponent<Props> {

    public moveStartVertex = (event: Position) => {
        const { onChange, ...props } = this.props

        onChange({
            x1: event.x,
            y1: event.y,
            x2: props.x2,
            y2: props.y2,
        })
    }

    public moveEndVertex = (event: Position) => {
        const { onChange, ...props } = this.props

        onChange({
            x1: props.x1,
            y1: props.y1,
            x2: event.x,
            y2: event.y,
        })
    }

    public render () {
        const { x1, y1, x2, y2, scale } = this.props
        const { moveEndVertex, moveStartVertex } = this;

        return (
            <g className="line-group">
                <Vertex x={x1} y={y1} scale={scale} onChange={moveStartVertex} />
                <line x1={x1} y1={y1} x2={x2} y2={y2} />
                <Vertex x={x2} y={y2} scale={scale} onChange={moveEndVertex} />
            </g>
        )
    }
}

export default Line