import { getTag } from './getTag.ts'
import { isObjectLike } from "./isObjectLike.ts"
import { symbolTag } from "./consts.ts"

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
export function isSymbol(value: unknown): boolean {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && getTag(value) == symbolTag)
}
