import * as React from 'react'

interface Props {
  children: (controls: ModalStateControl) => React.ReactNode
}

interface State {
  open: boolean,
}

export interface ModalStateControl {
  open: () => Promise<any>
  resolve: () => void
  reject: () => void
  state: State
}

export class ModalController extends React.PureComponent<Props, State>{

  public state = {
    open: false
  }

  private resolve: any
  private reject: any

  private open = () => new Promise((resolve, reject) => {
    this.setState(() => ({ open: true}))
    this.resolve = resolve
    this.reject = reject
  }).then((data: any) => {
    this.setState(() => ({ open: false }))
    this.resolve = null
    this.reject = null
    return data
  }, (data) => {
    this.setState(() => ({ open: false }))
    this.resolve = null
    this.reject = null
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