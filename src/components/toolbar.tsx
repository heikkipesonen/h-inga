import * as React from 'react'
import styled from 'styled-components';

const ToolbarContainer = styled.div`
  width: 64px;
  background-color: #4c4c4c;
  display: flex;
  flex-direction: column;
`

interface Props {
  children: React.ReactNode
}

export class Toolbar extends React.PureComponent<Props> {
  public render() {
    return (
      <ToolbarContainer>
        { this.props.children }
      </ToolbarContainer>
    )
  }
}