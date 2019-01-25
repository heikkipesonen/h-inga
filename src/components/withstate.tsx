import { PureComponent, ReactNode } from "react"

export type setStateType<T> = (update: (state: Partial<T>) => void) => void
export type setStateKeyType<T> = <K extends keyof T>(key: K) => (value: T[K]) => void

export interface RenderPropTypes<T> {
  state: T
  setState: setStateType<T>
  setStateKey: setStateKeyType<T>
}

interface PropTypes<T> {
  state: T
  onChange?: (state: T) => void
  children?: (prop: RenderPropTypes<T>) => ReactNode
}

export class WithState<T> extends PureComponent<PropTypes<T>, T> {
  constructor(props: PropTypes<T>) {
    super(props)
    this.state = props.state
  }

  public componentWillReceiveProps(newProps: PropTypes<T>) {
    if (newProps.state !== this.state) {
      this.setState(newProps.state)
    }
  }

  public updateState = (updateState: (state: Partial<T>) => void) =>
    this.setState(updateState)

  public updateKey = <K extends keyof T>(key: K) => (value: T[K]) =>
    this.setState((state: T) => ({
      ...state,
      [key]: value
    }))

  public componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state)
    }
  }

  public render() {
    const { children } = this.props
    const { state, updateState, updateKey } = this

    return children && children({
      setState: updateState,
      setStateKey: updateKey,
      state
    })
  }
}
