import * as React from 'react'

import { Form } from './form'
import { Input } from './input'
import { Checkbox } from './checkbox'
import { Radio } from './radio'
import { InputContainer, Container, InputMessage } from './input-container'
import { KeysOfType, KeysOfTypeWithValueType, ValueOf } from "src/types/helpers"

interface InputProps<T> {
  label: string
  form: Form<T>
  name: KeysOfType<T, string>
}

export class FormInput<T> extends React.PureComponent<InputProps<T>> {
  public render() {
    const { form, label, name } = this.props
    return (
      <InputContainer label={label}>
        <Input
          name={name}
          value={form.getValue(name)}
          onChange={form.updateKey}
        />
      </InputContainer>
    )
  }
}

interface CheckBoxProps<T> {
  label: string
  form: Form<T>
  name: KeysOfTypeWithValueType<T, string, boolean>
}

export class FormCheckbox<T> extends React.Component<CheckBoxProps<T>> {
  private handleChange = (k: any, value: any) =>
    this.props.form.updateKey(k, value)

  private getValue = () =>
    this.props.form.getValue(this.props.name)

  public render() {
    const { label, name } = this.props

    return (
      <Container>
        <Checkbox
          name={name}
          label={label}
          value={this.getValue()}
          onChange={this.handleChange}
        />
        <InputMessage />
      </Container>
    )
  }
}

interface RadioOption<T> {
  value: T
  label: string
}

interface RadioProps<T, K extends keyof T> {
  label: string
  form: Form<T>
  name: K
  options: Array<RadioOption<ValueOf<T, K>>>
}

export class FormRadio<T, K extends KeysOfTypeWithValueType<T, string, string>> extends React.Component<RadioProps<T, K>> {
  public render() {
    const { form, name, label, options } = this.props
    return (
      <Container>
        { label }
        {options.map(o => (
          <Radio
            key={`radio_${o.value}`}
            name={name}
            label={o.label}
            value={o.value}
            checked={form.getValue(name) === o.value}
            onChange={form.updateKey}
          />
        ))}
        <InputMessage />
      </Container>
    )
  }
}