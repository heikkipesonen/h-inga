import * as React from 'react'
import { fromNullable } from 'fp-ts/lib/Option';

interface Props<T> {
  model: T,
  children: (form: Form<T>) => React.ReactNode
  onChange?: (s: T) => void
  onSubmit?: (s: T) => void
}

export class Form<T> extends React.PureComponent<Props<T>, T> {

  public state =this.props.model

  public getValue = (name: any) =>
    this.state[name]

  public componentDidUpdate = () =>
    fromNullable(this.props.onChange).map((c) => c(this.state))

  // TODO: type this
  // fucks up Forminput onChange if typed... (╯°□°）╯︵ ┻━┻
  public updateKey = <K extends keyof T>(key: keyof T, value: T[K]) =>
    this.setState((state: T) => ({
      ...state,
      [key]: value
    }))

  public submit = () =>
    fromNullable(this.props.onSubmit).map(c => c(this.state))

  public reset = () =>
    this.setState(() => ({
        ...this.props.model
    }))

  public render() {
    const { children } = this.props
    return (
      <form action="" noValidate={true}>
        { children(this) }
      </form>
    )
  }
}