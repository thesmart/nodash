import { getTag } from './getTag.ts'
import { mapTag } from "./consts.ts"
import { isObjectLike } from './isObjectLike.ts'

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 */
export function isMap(value: unknown): boolean {
  return isObjectLike(value) && getTag(value) == mapTag;
}
