import { startCase } from "./startCase.ts";

/**
 * Same as `startCase()`, converts `string` to
 * [title case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @export
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the title cased string.
 * @example
 *
 * titleCase('--foo-bar--')
 * // => 'Foo Bar'
 *
 * titleCase('fooBar')
 * // => 'Foo Bar'
 *
 * titleCase('__FOO_BAR__')
 * // => 'FOO BAR'
 */
export function titleCase(string: string): string {
  return startCase(string);
}
