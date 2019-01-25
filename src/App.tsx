import * as React from 'react';
import './App.css';

import { CanvasView } from "./components/canvas-view"

export class App extends React.Component {
  public render() {
    return (
      <CanvasView />
    )
  }
}
