import * as React from "react"
import { uid } from 'src/utils/helpers';
import styled from 'styled-components';
import { Omit } from 'src/types/helpers';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;

  label {
    font-size: 1rem;
    font-weight: 400;
  }

  .input--message {
    position: absolute;
    bottom: 0; left: 0; right: 0;
  }

  .input-group--title {
    margin-bottom: 0.5rem;
  }
`

interface LabelProps {
  label: string
  id: string
}
interface MessageProps {
  message?: string
}

interface Props extends Omit<LabelProps, 'id'>, MessageProps {
  children: React.ReactNode
}

const InputLabel = React.memo(({ id, label }: LabelProps) => (
  <label htmlFor={id} className="input--label">
    {label}
  </label>
))

export const InputMessage = React.memo(({ message }: MessageProps) =>
  message ? (<div className="input--message">
    {message}
  </div>) : null
)

export class InputContainer extends React.PureComponent<Props> {
  private readonly id = uid()

  public render() {
    const { label, message, children } = this.props
    return (
      <Container>
        <InputLabel id={this.id} label={label} />
        {children}
        <InputMessage message={message} />
      </Container>
    )
  }
}


export interface InputGroupProps {
  title: string
  children: React.ReactNode
  message?: string
}

export class InputGroup extends React.PureComponent<InputGroupProps> {
  public render() {
    const { children, title, message } = this.props

    return (
      <Container>
        <div className="input-group--title">
          { title }
        </div>
        {children}
        <InputMessage message={message} />
      </Container>
    )
  }
}