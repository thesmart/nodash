import { getTag } from "./getTag.ts";
import { isObjectLike } from "./isObjectLike.ts";
import { argsTag } from "./consts.ts";

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */
export function isArguments(value: unknown): boolean {
  return isObjectLike(value) && getTag(value) == argsTag;
}
