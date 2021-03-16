import { isObjectLike } from "./isObjectLike.ts"
import { getTag } from "./getTag.ts"
import { weakMapTag } from "./consts.ts"

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * _.isWeakMap(new WeakMap);
 * // => true
 *
 * _.isWeakMap(new Map);
 * // => false
 */
export function isWeakMap(value: unknown): boolean {
  return isObjectLike(value) && getTag(value) == weakMapTag
}
