import * as React from 'react'

import { data } from './mock'
import { FlatMap } from 'src/types/object';
import { Project } from 'src/types/project';

import { Button } from 'src/components/button'
// import { CanvasView } from 'src/components/canvas/canvas-view'
// import { Toolbar } from 'src/components/toolbar'
// import { CreateObjectModal } from './views/create-object-modal'
// import { ModalController } from './components/modal-controller'

import styled from 'styled-components';
import {
  Form,
  FormInput,
  FormCheckbox,
  FormRadio,
  FormCheckboxGroup
} from 'src/components/form'
import * as Layout from "src/components/layout"

interface State {
  project: Project,
  layers: FlatMap[]
}

const ViewContainer = styled.div`
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  display: flex;
  flex-direction: row;
  height: 100%;

  .canvas-wrapper {
    position: relative;
    flex: 1;
  }
`

interface FormType {
  name: string
  description: string
  radioGroup: 'kakka' | 'kissa' | 'juna'
  checkbox: boolean,
  checkbox2: boolean,
  checkboxGroup: [boolean, boolean, boolean, boolean]
}

const formModel: FormType = {
  name: '',
  description: '',
  radioGroup: 'juna',
  checkbox: false,
  checkbox2: true,
  checkboxGroup: [false, false, true, true]
}

export class App extends React.PureComponent<{}, State> {

  public state: State = {
    project: data,
    layers: []
  }

  // private handleUpdate = (objects: FlatMap) => {
  //   this.setState((state) => ({
  //     project: {
  //       ...state.project,
  //       objects
  //     }
  //   }))
  // }
  public render() {
    return (
      <ViewContainer>
        <Layout.Column>
          <Form model={formModel}>
            {form => (
              <>
                <FormInput name="name" label="name" form={form} />
                <FormInput
                  name="description"
                  label="description"
                  form={form}
                />
                <FormCheckbox name="checkbox" label="pylly" form={form} />
                <FormCheckbox name="checkbox2" label="pylly" form={form} />
                <FormCheckboxGroup
                  name="checkboxGroup"
                  label="kissa"
                  form={form}
                  options={[
                    {
                      label: "asdf"
                    },
                    {
                      label: "asdf"
                    },
                    {
                      label: "asdf"
                    },
                    {
                      label: "asdf"
                    }
                  ]}
                />
                <FormRadio
                  name="name"
                  label="radioGroup"
                  form={form}
                  options={[
                    {
                      label: "asdf",
                      value: "kakka"
                    },
                    {
                      label: "sdfsdfasdf",
                      value: "juna"
                    },
                    {
                      label: "oioifdo",
                      value: "kissa"
                    }
                  ]}
                />
                <Layout.Row>
                  <Button onClick={form.submit}>submit</Button>
                  <Button onClick={form.reset}>reset</Button>
                </Layout.Row>
              </>
            )}
          </Form>
        </Layout.Column>
        {/* <Toolbar>
          <ModalController>
            {(controls) => (
              <>
                <Button onClick={controls.open}>kissa</Button>
                <CreateObjectModal modal={controls} />
              </>
            )}
          </ModalController>
        </Toolbar>
        <div className="canvas-wrapper">
          <CanvasView src={data.objects} />
        </div> */}
      </ViewContainer>
    )
  }
}
