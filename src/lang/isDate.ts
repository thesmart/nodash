import { getTag } from './getTag.ts'
import { isObjectLike } from './isObjectLike.ts'
import { dateTag } from "./consts.ts"

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
export function isDate(value: unknown): boolean {
  return isObjectLike(value) && getTag(value) == dateTag;
}
