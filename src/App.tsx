import * as React from 'react'

import { data } from './mock'
import { FlatMap } from 'src/types/object';
import { Project } from 'src/types/project';

import { Toolbar } from 'src/components/toolbar'
import { Button } from 'src/components/button'
import { CanvasView } from 'src/components/canvas/canvas-view'

// import { Button } from './components/button'
import { CreateObjectModal } from './views/create-object-modal'
import { ModalController } from './components/modal-controller'

import styled from 'styled-components';

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
        <Toolbar>
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
        </div>
      </ViewContainer>
    )
  }
}
