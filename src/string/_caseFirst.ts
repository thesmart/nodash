import { hasUnicodeWord, stringToArray } from "./words.ts"
import { toString } from "../lang/toString.ts"

/**
 * Converts the first character of `string` to upper case or lower case.
 *
 * @private
 * @param {string} value
 * @param {string} methodName The name of the `String` case method to use.
 */
export function caseFirst(value: string, methodName: "toLowerCase" | "toUpperCase") {
  value = toString(value);

  const strSymbols = hasUnicodeWord(value)
    ? stringToArray(value)
    : undefined;

  const chr = strSymbols
    ? strSymbols[0]
    : value.charAt(0);

  const trailing = strSymbols
    ? Array.prototype.slice.call(strSymbols, 1).join('')
    : value.slice(1);

  return chr[methodName]() + trailing;
}
