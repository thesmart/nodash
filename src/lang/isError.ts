import { getTag } from "./getTag.ts";
import { isObjectLike } from "./isObjectLike.ts";
import { domExcTag, errorTag } from "./consts.ts";

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @export
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 */
export function isError(value: unknown) {
  if (value instanceof Error) {
    return true;
  }

  if (!isObjectLike(value)) {
    return false;
  }

  const tag = getTag(value);
  return tag == errorTag || tag == domExcTag;
}
