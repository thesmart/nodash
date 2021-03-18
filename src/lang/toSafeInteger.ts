import { toInteger } from "./toInteger.ts";
import { MAX_SAFE_INTEGER } from "./consts.ts";

/**
 * Converts `value` to a safe integer. A safe integer can be compared and
 * represented correctly.
 *
 * @export
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toSafeInteger(3.2)
 * // => 3
 *
 * toSafeInteger(Number.MIN_VALUE)
 * // => 0
 *
 * toSafeInteger(Infinity)
 * // => 9007199254740991
 *
 * toSafeInteger('3.2')
 * // => 3
 */
export function toSafeInteger(value: unknown): number {
  if (!value) {
    return value === 0 ? value : 0;
  }
  const integer = toInteger(value);
  if (integer < -MAX_SAFE_INTEGER) {
    return -MAX_SAFE_INTEGER;
  }
  if (integer > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER;
  }
  return integer;
}
