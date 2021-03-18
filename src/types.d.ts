export interface ObjectLiteral {
  [key: string]: unknown;
}

export interface HasLength {
  length: number;
}

export interface HasSize {
  size: number;
}

export interface HasConstructor<T = unknown> {
  new (): T;
}

interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}

interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}

// deno-lint-ignore no-explicit-any
export type IteratorResult<T, TReturn = any> =
  | IteratorYieldResult<T>
  | IteratorReturnResult<TReturn>;

// deno-lint-ignore no-explicit-any
export interface Iterator<T, TReturn = any, TNext = undefined> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  // deno-lint-ignore no-explicit-any
  throw?(e?: any): IteratorResult<T, TReturn>;
}

export interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}
