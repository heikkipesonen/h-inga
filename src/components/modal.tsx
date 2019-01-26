import * as React from 'react'
import styled from 'styled-components'
import { ModalControls } from './modal-controller'

interface Props {
  controls: ModalControls,
  children: React.ReactNode,
}

export const ModalContainer = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;

  .modal--backdrop {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,0.3);
  }

  .modal--container {
    position: absolute;
    top: 0; left: auto; right: 0; bottom: 0;
    width: 600px;
    max-width: 80vw;
    height: 100vh;
    box-shadow: 0px 0px 50px -20px rgba(0,0,0,0.5);
    background-color: white;
  }

  .modal--body {

  }
`
export class Modal extends React.PureComponent<Props> {

  private handleReject() {
    const { controls } = this.props
    controls.reject.map(r => r())
  }

  public render() {
    const { controls, children } = this.props

    return controls.state.open && (
      <ModalContainer>
        <div className="modal--backdrop" onClick={this.handleReject} />
        <div className="modal--container">
          <div className="modal-body">
            {children}
          </div>
        </div>
      </ModalContainer>
    )
  }
}