import { INFINITY } from "./lang/consts.ts"
import { isFunction } from "./lang/isFunction.ts"

export {
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
  assertNotStrictEquals,
  assertExists,
  assertStringIncludes,
  assertArrayIncludes,
  assertMatch,
  assertNotMatch,
  assertObjectMatch,
  assertThrows,
  assertThrowsAsync
} from "https://x.nest.land/std@0.89.0/testing/asserts.ts";

export const booleans = [true, false];
export const numbers = [0, INFINITY, -INFINITY, NaN]
export const falsey = [, null, undefined, false, 0, NaN, ''];
export const empties = [[], {}].concat(falsey.slice(1));
export const errors = [
  new Error,
  new EvalError,
  new RangeError,
  new ReferenceError,
  new SyntaxError,
  new TypeError,
  new URIError
];
export const typedArrays: Function[] = [
  Float32Array,
  Float64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array
];
export const arrayViews = typedArrays.concat(DataView);
