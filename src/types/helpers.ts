export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Subtract<T, K> = Omit<T, keyof K>

export type StringKeysOf<T> = Extract<keyof T, string>

export type StringValueKeysOf<T, U = boolean> = { [K in keyof T]: T[K] extends U ? K extends string ? K : never : never }[keyof T]

export type ValueKeysOf<T, U = boolean> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]