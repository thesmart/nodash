import { words } from "./words.ts";
import { toString } from "../lang/toString.ts";

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @export
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperFirst
 * @example
 *
 * upperCase('--foo-bar')
 * // => 'FOO BAR'
 *
 * upperCase('fooBar')
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__')
 * // => 'FOO BAR'
 */
export function upperCase(string: string): string {
  return words(toString(string).replace(/['\u2019]/g, "")).reduce(
    (result, word, index) => (
      result + (index ? " " : "") + word.toUpperCase()
    ),
    "",
  );
}
