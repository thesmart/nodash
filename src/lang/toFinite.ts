import { toNumber } from "./toNumber.ts";
import { INFINITY, MAX_INTEGER } from "./consts.ts";

/**
 * Converts `value` to a finite number.
 *
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
export function toFinite(value: unknown): number {
  if (!value) {
    return value === 0 ? value : 0;
  }
  const num = toNumber(value);
  if (num === INFINITY || num === -INFINITY) {
    const sign = (num < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return num === num ? num : 0;
}
