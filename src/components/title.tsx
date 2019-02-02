import * as React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

interface Props {
  size: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

export const TitleElement = ({ size, className, children }: Props) =>
  React.createElement(`h${size}`, { className: classNames(`title-${size}`, className) }, children)

export const Title = styled(TitleElement)`
  font-weight: 200;
  margin-top: 1.5em;
  margin-bottom: 1em;

  &.title-1 {
    font-size: 3rem;
  }

  &.title-2 {
    font-size: 2rem;
  }

  &.title-3 {
    font-size: 1.7rem;
  }
`