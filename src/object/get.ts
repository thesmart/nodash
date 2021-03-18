import type { ObjectLiteral } from "../types.d.ts";
import { stringToPath } from "./_stringToPath.ts";
import { isUndefined } from "../lang/isUndefined.ts";

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * **Note:** This is modified from lodash, path may not be an array.
 *
 * @export
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
export function get<R>(
  object: ObjectLiteral | ArrayLike<unknown>,
  path: string,
  defaultValue?: R,
): typeof defaultValue {
  if (object == null) return defaultValue;
  const pathArr = stringToPath(path as string);

  // deno-lint-ignore no-explicit-any
  let ptr: any = object;
  let index = 0;
  const length = pathArr.length;
  while (ptr != null && index < length) {
    ptr = ptr[pathArr[index++]];
  }

  if (index && index == length) {
    return isUndefined(ptr) ? defaultValue : ptr;
  }
  return defaultValue;
}
