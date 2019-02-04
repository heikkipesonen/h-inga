import { some, none, Option } from "fp-ts/lib/Option";

export type ValueType = string | number | null | undefined

export type Validator = (v: ValueType) => Option<ValueType>

export const required = (v: ValueType) => {
  switch (v) {
    case null:
    case '':
    case undefined:
      return none
    default:
      return some(v)
  }
}

export const isString = (v:  ValueType) => typeof v === 'string' ? some(v) : none

export const minLength = (l: number) =>
  (v: ValueType) =>
    isString(v)
      .map((c) => c.length >= l ? some(v) : none)

export const maxLength = (l: number) =>
  (v: ValueType) =>
    isString(v)
      .map((c) => c.length <= l ? some(v) : none)

export const validate = (validations: Validator[]) =>
  (value: ValueType) =>
    validations.map(v => v(value))