export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Subtract<T, K> = Omit<T, keyof K>


export type TypedValuesOf<T, U = string> = Extract<T[keyof T], U>

export type KeysOfType<T, KeyType> = Extract<keyof T, KeyType>

export type KeysWithValueType<T, ValueType> = {
  [K in keyof T]: T[K] extends ValueType
    ? K : never
  }[keyof T]

export type KeysOfTypeWithValueType<T, KeyType, ValueType> = {
  [K in keyof T]: T[K] extends ValueType
    ? K extends KeyType ? K : never  : never
  }[keyof T]

export type ValueOf<T, K extends keyof T> = T[K]