import * as React from 'react'
import { Option , some, none } from 'fp-ts/lib/Option'
interface Props {
  children: (controls: ModalControls) => React.ReactNode
}

interface State {
  open: boolean,
}

export interface ModalControls {
  open: () => Promise<any>
  resolve: Option<() => void>
  reject: Option<() => void>
  state: State
}

export class ModalController extends React.PureComponent<Props, State>{

  public state = {
    open: false
  }

  private resolve: Option<() => any> = none
  private reject: Option<() => any> = none

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

  public render() {
    const { children } = this.props
    const { open, reject, resolve, state } = this
    return (
      <>
        {children({
          open,
          resolve,
          reject,
          state
        })}
      </>
      )
  }
}