import * as React from 'react'

import { Form } from './form'
import { Input } from './input'
import { Checkbox } from './checkbox'
import { Radio } from './radio'
import { InputContainer, Container, InputMessage, InputGroup } from './input-container'
import { KeysOfTypeWithValueType, ValueOf } from "src/types/helpers"

interface InputProps<T> {
  label: string
  form: Form<T>
  name: KeysOfTypeWithValueType<T, string, string>
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

interface CheckboxProps<T, K> {
  label: string
  form: Form<T>
  name: K
}

export class FormCheckbox
  <T, K extends KeysOfTypeWithValueType<T, string, boolean>>
  extends React.Component<CheckboxProps<T, K>> {

  private handleChange = (k: any, value: any) =>
    this.props.form.updateKey(k, value)

  private getValue = () =>
    !!this.props.form.getValue(this.props.name)

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

interface CheckboxGroupOption {
  label: string
}

interface CheckboxGroupProps<T, K> {
  label: string
  form: Form<T>
  name: K
  options: CheckboxGroupOption[]
}

export class FormCheckboxGroup
  <T, K extends KeysOfTypeWithValueType<T, string, boolean[]>>
  extends React.Component<CheckboxGroupProps<T, K>> {

  private handleChange = (index: number) => (key: K, value: boolean) => {
    const { name, form } = this.props

    // this fokken thing...
    const inputValue = form.getValue(key) as any as boolean[]
    form.updateKey(
      name,
      // and this...
      inputValue.map((v, i) => i === index ? value : v) as any
    )
  }

  private getValue = (index: number) =>
    !!this.props.form.getValue(this.props.name)[index]

  public render() {
    const { label, name, options } = this.props

    return (
      <InputGroup title={label}>
        {options.map((o, index) => (
          <Checkbox
            key={index}
            name={name}
            label={o.label}
            value={this.getValue(index)}
            onChange={this.handleChange(index)}
          />
        ))}
        <InputMessage />
      </InputGroup>
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

export class FormRadio
  <T, K extends KeysOfTypeWithValueType<T, string, string>>
  extends React.Component<RadioProps<T, K>> {

  public render() {
    const { form, name, label, options } = this.props
    return (
      <InputGroup title={label}>
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
      </InputGroup>
    )
  }
}