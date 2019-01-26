import * as React from 'react'
import styled from 'styled-components';

const ToolbarContainer = styled.div`
  width: 64px;
  background-color: #4c4c4c;
  display: flex;
  flex-direction: column;
`

export class Toolbar extends React.PureComponent {
  public render() {
    return (
      <ToolbarContainer>
        kissa
      </ToolbarContainer>
    )
  }
}