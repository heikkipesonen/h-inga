import * as React from 'react'
import { Option , some, none } from 'fp-ts/lib/Option'
import { Subtract } from 'src/types/helpers';
interface Props {
  children: (controls: ModalControls) => React.ReactNode
}

interface State {
  open: boolean,
}

export interface ModalControls {
  open: () => Promise<any>
  resolve: (p: any) => void
  reject: (p: any) => void
  state: State
}

export class ModalController extends React.PureComponent<Props, State>{

  public state = {
    open: false
  }

  private resolve: Option<(p: any) => void> = none
  private reject: Option<(p: any) => void> = none

  private open = () => new Promise((resolve, reject) => {
    this.setState(() => ({ open: true}))
    this.resolve = some(resolve)
    this.reject = some(reject)
  }).then((data: any) => {
    this.setState(() => ({ open: false }))
    this.resolve = none
    this.reject = none
    return data
  }, (data) => {
    this.setState(() => ({ open: false }))
    this.resolve = none
    this.reject = none
    return Promise.reject(data)
    })

  private resolveModal = (p: any) =>
    this.resolve.map(c => c(p))

  private rejectModal  = (p: any) =>
    this.reject.map(c => c(p))

  public render() {
    const { children } = this.props
    const { open, state } = this
    return (
      <>
        {children({
          open,
          resolve: this.resolveModal,
          reject: this.rejectModal,
          state
        })}
      </>
      )
  }
}

export interface WrappedModalControlsProp {
  modal: ModalControls
}

export const WithModalController = <P extends WrappedModalControlsProp>(Component: React.ComponentType<P>) =>
  class WithController extends React.PureComponent<Subtract<P, WrappedModalControlsProp>> {
    public render() {
      const props = this.props as P
      return (
        <ModalController>
          {controls => (
            <Component
              {...props}
              modal={controls}
            />
          )}
        </ModalController>
      )
    }
  }
