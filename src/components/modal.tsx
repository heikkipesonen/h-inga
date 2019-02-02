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
  z-index: 9000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  .modal--backdrop {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,0.3);
  }

  .modal--container {
    position: relative;
    width: 600px;
    height: 600px;
    max-width: 80vw;
    max-height: 80vh;
    box-shadow: 0px 0px 80px -20px rgba(0,0,0,1);
    background-color: white;
    overflow-y: auto;
  }

  .modal--body {
    padding: 24px;
  }
`
export class Modal extends React.PureComponent<Props> {

  private handleReject = () => {
    const { controls } = this.props
    controls.reject(null)
  }

  private handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    e.stopPropagation()

  public render() {
    const { controls, children } = this.props

    return controls.state.open && (
      <ModalContainer>
        <div className="modal--backdrop" onClick={this.handleReject} />
        <div className="modal--container">
          <div className="modal--body" onClick={this.handleClick}>
            {children}
          </div>
        </div>
      </ModalContainer>
    )
  }
}