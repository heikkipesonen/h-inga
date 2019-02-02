import * as React from 'react'
import styled from 'styled-components'

export interface Props<K, T> {
  id?: string
  name: K
  value: T
  onChange: (key: K, value: T) => void
  className?: string
  onFocus?: () => void
  onBlur?: () => void
}

export class Input<K, T> extends React.PureComponent<Props<K, T>>{
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onChange(
      this.props.name,
      e.target.value as any
    )

  public render() {
    const { id, name, value, className, ...p } = this.props

    return (
      <InputElement
        className={className}
        id={id}
        name={name as any}
        type="text"
        value={value as any}
        {...p}
        onChange={this.handleChange}
      />
    )
  }
}

export const InputElement = styled.input`
  outline: none;
  border: none;
  border-radius: 0;
  background-color: transparent;
  width: auto;
  border-bottom: 1px solid #444;
  font-size: 1rem;
  font-weight: 200;
  padding: 2px 0;
  line-height: 1.5;

  ::-webkit-input-placeholder {
    color: #777;
  }
`
