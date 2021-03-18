import { getTag } from "./getTag.ts";
import { isObjectLike } from "./isObjectLike.ts";
import { boolTag } from "./consts.ts";

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
export function isBoolean(value: unknown): boolean {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == boolTag);
}
