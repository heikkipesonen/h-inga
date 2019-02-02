import * as React from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  type?: string
}

export const Button = styled(({children, type = 'button',...p}: Props) => (
  <button type={type} {...p}>
    { children }
  </button>
))`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 16px;
`