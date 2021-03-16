import { getTag } from './getTag.ts'
import { isArray } from "./isArray.ts"
import { isObjectLike } from "./isObjectLike.ts"
import { stringTag } from "./consts.ts"

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 */
export function isString(value: unknown): boolean {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && getTag(value) == stringTag)
}
