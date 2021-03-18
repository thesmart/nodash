import { words } from "./words.ts";
import { toString } from "../lang/toString.ts";

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @export
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @see camelCase, lowerCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * kebabCase('Foo Bar')
 * // => 'foo-bar'
 *
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 */
export function kebabCase(string: string): string {
  return words(toString(string).replace(/['\u2019]/g, "")).reduce(
    (result, word, index) => (
      result + (index ? "-" : "") + word.toLowerCase()
    ),
    "",
  );
}
