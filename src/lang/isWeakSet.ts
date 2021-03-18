import { isObjectLike } from "./isObjectLike.ts";
import { getTag } from "./getTag.ts";
import { weakSetTag } from "./consts.ts";

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @export
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * _.isWeakSet(new WeakSet);
 * // => true
 *
 * _.isWeakSet(new Set);
 * // => false
 */
export function isWeakSet(value: unknown): boolean {
  return isObjectLike(value) && getTag(value) == weakSetTag;
}
