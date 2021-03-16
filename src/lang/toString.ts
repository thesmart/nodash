import { isSymbol } from './isSymbol.ts'
import { toNumber } from "./toNumber.ts"
import { isNumber } from "./isNumber.ts"

/** Used as references for various `Number` constants. */
export const INFINITY = 1 / 0

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 */
export function toString(value: unknown): string {
  if (value == null) {
    return ''
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map((other) => other == null ? other : toString(other))}`
  }
  if (isSymbol(value)) {
    return (value as symbol).toString()
  }
  const result = String(value)
  return (result == '0' && (1 / (value as number)) == -INFINITY) ? '-0' : result
}
