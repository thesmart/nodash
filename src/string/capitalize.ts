import { caseFirst } from "./_caseFirst.ts";
import { toString } from "../lang/toString.ts";

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * capitalize('FRED')
 * // => 'Fred'
 */
export const capitalize = (string: string = "") =>
  caseFirst(toString(string).toLowerCase(), "toUpperCase");
