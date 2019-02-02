import * as React from "react"
import styled from "styled-components"

export interface Props {
  name: string
  value: boolean
  label?: string

  onChange: (key: string, value: boolean) => void
  className?: string
  onFocus?: () => void
  onBlur?: () => void
}

export class CheckboxElement extends React.PureComponent<Props> {
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onChange(
      this.props.name,
      e.target.checked
    )

  public render() {
    const { name, value, label, className, ...p } = this.props

    return (
      <div className={className}>
        <label>
          <input
            name={name}
            type="checkbox"
            checked={!!value}
            {...p}
            onChange={this.handleChange}
          />
          <div className="tick">
            &#10003;
          </div>
          {label}
        </label>
      </div>
    )
  }
}

export const Checkbox = styled(CheckboxElement)`
  position: relative;
  padding-left: 42px;
  min-height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .tick {
    position: absolute;
    top: 0; left: 0;
    width: 32px;
    height: 32px;
    background-color: #444;
    display: inline-block;
    color: transparent;
  }


  input {
    position: absolute;
    top: 0; left: 0;
    opacity: 0;
  }

  input:checked + .tick {
    color: white;
    background-color: #d00;
    line-height: 32px;
    text-align: center;
    font-size: 1.5rem;
  }
`
