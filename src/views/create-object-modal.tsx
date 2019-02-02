import * as React from 'react'
import { WrappedModalControlsProp } from 'src/components/modal-controller';
import { Modal } from 'src/components/modal'
import { Form, FormInput, FormCheckbox, FormRadio } from 'src/components/form'
import * as Layout from 'src/components/layout'
import { Title } from 'src/components/title'
import { Button } from 'src/components/button'

interface State {
  name: string
  description: string
  pylly: 'kakka' | 'kissa' | 'juna'
  majava: string
}

export class CreateObjectModal extends React.PureComponent<
  WrappedModalControlsProp,
  State
> {
  public state: State = {
    name: '',
    description: '',
    pylly: 'juna',
    majava: ''
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
              <FormInput name="name" label="name" form={form} />
              <FormInput name="description" label="description" form={form} />

              <FormCheckbox name="majava" label="pylly" form={form} />

              <FormRadio
                name="pylly"
                label="pylly"
                form={form}
                options={[
                  {
                    label: 'asdf',
                    value: 'kakka'
                  },
                  {
                    label: 'sdfsdfasdf',
                    value: 'juna'
                  },
                  {
                    label: 'oioifdo',
                    value: 'kissa'
                  }
                ]}
              />

              <Layout.Row>
                <Button onClick={form.submit}>kissa</Button>
                <Button onClick={form.reset}>koira</Button>
              </Layout.Row>
            </>
          )}
        </Form>
      </Modal>
    )
  }
}
