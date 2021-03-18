import { words } from "./words.ts";
import { caseFirst } from "./_caseFirst.ts";

/**
 * Same as `titleCase()`, converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @export
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * startCase('--foo-bar--')
 * // => 'Foo Bar'
 *
 * startCase('fooBar')
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__')
 * // => 'FOO BAR'
 */
export function startCase(string: string): string {
  return words(`${string}`.replace(/['\u2019]/g, "")).reduce(
    (result, word, index) => (
      result + (index ? " " : "") + caseFirst(word, "toUpperCase")
    ),
    "",
  );
}
