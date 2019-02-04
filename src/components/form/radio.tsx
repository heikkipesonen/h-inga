import * as React from "react"
import styled from "styled-components"

export interface Props<K, T> {
  name: K
  value: T
  checked: boolean
  label?: string

  onChange: (key: K, checked: T) => void
  className?: string
  onFocus?: () => void
  onBlur?: () => void
}

export class RadioElement<K, T> extends React.PureComponent<Props<K ,T>> {
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onChange(
      this.props.name,
      this.props.value
    )

  public render() {
    const { name, checked, label, className, value, ...p } = this.props

    return (
      <div className={className}>
        <label>
          <input
            name={name as any}
            type="radio"
            checked={checked}
            {...p}
            onChange={this.handleChange}
          />
          <div className="tick" />
          {label}
        </label>
      </div>
    )
  }
}

export const Radio = styled(RadioElement)`
  position: relative;
  padding-left: 42px;
  min-height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .tick {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #aaa;
    display: inline-block;
    color: transparent;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  input:checked + .tick {
    &:after {
      content: "";
      position: absolute;
      top: 6px; left: 6px; right: 6px; bottom: 6px;
      border-radius: 50%;
      background-color: #444;
    }
  }
`
