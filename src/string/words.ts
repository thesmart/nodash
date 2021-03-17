import { toString } from '../lang/toString.ts'
import { isNumber } from "../lang/isNumber.ts"

/** Used to match words composed of alphanumeric characters. */
export const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g

/** Used to detect strings that need a more robust regexp to match words. */
export const reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/

/** Used to compose unicode character classes. */
export const rsAstralRange = '\\ud800-\\udfff',
  rsComboMarksRange = '\\u0300-\\u036f',
  reComboHalfMarksRange = '\\ufe20-\\ufe2f',
  rsComboSymbolsRange = '\\u20d0-\\u20ff',
  rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
  rsDingbatRange = '\\u2700-\\u27bf',
  rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
  rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
  rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
  rsPunctuationRange = '\\u2000-\\u206f',
  rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
  rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
  rsVarRange = '\\ufe0e\\ufe0f',
  rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange

/** Used to compose unicode capture groups. */
export const rsApos = "['\u2019]",
  rsBreak = `[${rsBreakRange}]`,
  rsCombo = `[${rsComboRange}]`,
  rsDigits = '\\d+',
  rsDingbat = `[${rsDingbatRange}]`,
  rsLower = `[${rsLowerRange}]`,
  rsMisc = `[^${rsAstralRange}${rsBreakRange}${rsDigits}${rsDingbatRange}${rsLowerRange}${rsUpperRange}]`,
  rsFitz = '\\ud83c[\\udffb-\\udfff]',
  rsModifier = `(?:${rsCombo}|${rsFitz})`,
  rsNonAstral = `[^${rsAstralRange}]`,
  rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  rsUpper = `[${rsUpperRange}]`,
  rsZWJ = '\\u200d'

/** Used to compose unicode regexes. */
export const rsMiscLower = `(?:${rsLower}|${rsMisc})`,
  rsMiscUpper = `(?:${rsUpper}|${rsMisc})`,
  rsOptContrLower = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`,
  rsOptContrUpper = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`,
  reOptMod = `${rsModifier}?`,
  rsOptVar = `[${rsVarRange}]?`,
  rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar}${reOptMod})*`,
  rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
  rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
  rsSeq = rsOptVar + reOptMod + rsOptJoin,
  rsEmoji = `(?:${[rsDingbat, rsRegional, rsSurrPair].join('|')})${rsSeq}`

/** Used to match complex or compound words. */
export const reUnicodeWord = RegExp([
  `${rsUpper}?${rsLower}+${rsOptContrLower}(?=${[rsBreak, rsUpper, '$'].join('|')})`,
  `${rsMiscUpper}+${rsOptContrUpper}(?=${[rsBreak, rsUpper + rsMiscLower, '$'].join('|')})`,
  `${rsUpper}?${rsMiscLower}+${rsOptContrLower}`,
  `${rsUpper}+${rsOptContrUpper}`,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g')

/**
 * Splits `string` into an array of its words.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [value=''] The string to inspect.
 * @param {RegExp|string|index} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
export function words(value: string, pattern?: RegExp | string): string[];
export function words(value: string, index?: number): string[]; // for `map` and `forEach`
export function words(value: string, patternOrIndex?: RegExp | string | number): string[] {
  value = toString(value)
  const pattern = isNumber(patternOrIndex) ? undefined : patternOrIndex
  if (pattern === undefined) {
    return reHasUnicodeWord.test(value) ? (value.match(reUnicodeWord) || []) : (value.match(reAsciiWord) || [])
  }
  const patternMatch = value.match(pattern as RegExp | string)
  return patternMatch ? patternMatch : []
}
