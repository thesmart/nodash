import { hasUnicodeWord, stringToArray } from "./words.ts"
import { toString } from "../lang/toString.ts"

/**
 * Converts the first character of `string` to upper case or lower case.
 *
 * @private
 * @param {string} string
 * @param {string} methodName The name of the `String` case method to use.
 */
export function caseFirst(string: string, methodName: "toLowerCase" | "toUpperCase") {
  string = toString(string);

  const strSymbols = hasUnicodeWord(string)
    ? stringToArray(string)
    : undefined;

  const chr = strSymbols
    ? strSymbols[0]
    : string.charAt(0);

  const trailing = strSymbols
    ? Array.prototype.slice.call(strSymbols, 1).join('')
    : string.slice(1);

  return chr[methodName]() + trailing;
}
