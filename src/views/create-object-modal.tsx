import * as React from 'react'
import { WrappedModalControlsProp } from 'src/components/modal-controller';
import { Modal } from 'src/components/modal'
import { Form, FormInput } from 'src/components/form/form'
import { Title } from 'src/components/title'
import { Button } from 'src/components/button'

interface State {
  name: string
  description: string
}

export class CreateObjectModal extends React.PureComponent<
  WrappedModalControlsProp,
  State
> {
  public state: State = {
    name: '',
    description: ''
  }

  public create = () => this.props.modal.open()

  private handleSubmit = (k: State) =>
    this.props.modal.resolve(k)

  public render() {
    return (
      <Modal controls={this.props.modal}>
        <Title size={2}>Create object</Title>
        <Form model={this.state} onSubmit={this.handleSubmit}>
          {form => (
            <>
              <FormInput label="name" name="name" form={form} />
              <FormInput label="description" name="description" form={form} />

              <Button onClick={form.submit}>kissa</Button>
              <Button onClick={form.reset}>koira</Button>
            </>
          )}
        </Form>
      </Modal>
    )
  }
}
