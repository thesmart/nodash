import { getTag } from "./getTag.ts";
import { isArguments } from "./isArguments.ts";
import { isArrayLike } from "./isArrayLike.ts";
import { isPrototype } from "./isPrototype.ts";
import { isTypedArray } from "./isTypedArray.ts";
import type { HasLength, HasSize, Iterable } from "../types.d.ts";
import { mapTag, setTag } from "./consts.ts";

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @export
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null)
 * // => true
 *
 * isEmpty(true)
 * // => true
 *
 * isEmpty(1)
 * // => true
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty({ 'a': 1 })
 * // => false
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }
  if (
    isArrayLike(value) &&
    (Array.isArray(value) || typeof value === "string" ||
      isTypedArray(value) || isArguments(value))
  ) {
    return !(value as HasLength).length;
  }
  const tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !(value as HasSize).size;
  }
  if (isPrototype(value)) {
    return !Object.keys(value as Record<string, unknown>).length;
  }
  for (const key in (value as Iterable<unknown>)) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}
