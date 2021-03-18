import { isObjectLike } from "./isObjectLike.ts";
import { getTag } from "./getTag.ts";
import { regexpTag } from "./consts.ts";

/**
 * Is value a RegExp instance?
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 */
export function isRegExp(value: unknown): boolean {
  return isObjectLike(value) && getTag(value) == regexpTag;
}
