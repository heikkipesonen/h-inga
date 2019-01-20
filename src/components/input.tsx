import * as React from 'react'
import styled from 'styled-components'

interface Props {
  onChange: (value: string) => void,
  value: string,
  type?: 'text' | 'email' | 'password',
  className?: string

  placeholder?: string
}

const onChangeListener = (cb: (value: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    cb(e.target.value)

const InputElement = ({
  onChange,
  value,
  type = "text",
  className,
  placeholder
}: Props) => (
  <div className={className}>
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChangeListener(onChange)}
      value={value}
    />
  </div>
)

export const Input = styled(InputElement)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  input {
    outline: none;
    border: none;
    border-radius: 0;
    background-color: transparent;
    width: auto;
    border-bottom: 1px solid #d00;
    font-size: 1rem;
    font-weight: 200;

    ::-webkit-input-placeholder {
      color: #777;
    }
  }

`