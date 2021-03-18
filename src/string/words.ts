import { toString } from "../lang/toString.ts";
import { isNumber } from "../lang/isNumber.ts";

/** Used to match words composed of alphanumeric characters. */
export const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to detect strings that need a more robust regexp to match words. */
export const hasUnicodeWord = RegExp.prototype.test.bind(
  /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
);

/** Used to compose unicode character classes. */
const rsAstralRange = "\\ud800-\\udfff";
const rsComboMarksRange = "\\u0300-\\u036f";
const reComboHalfMarksRange = "\\ufe20-\\ufe2f";
const rsComboSymbolsRange = "\\u20d0-\\u20ff";
const rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
const rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange +
  rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
const rsDingbatRange = "\\u2700-\\u27bf";
const rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
const rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
const rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
const rsPunctuationRange = "\\u2000-\\u206f";
const rsSpaceRange =
  " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
const rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
const rsVarRange = "\\ufe0e\\ufe0f";
const rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange +
  rsSpaceRange;

/** Used to compose unicode capture groups. */
const rsAstral = "[" + rsAstralRange + "]";
const rsApos = "['\u2019]";
const rsBreak = `[${rsBreakRange}]`;
const rsCombo = `[${rsComboRange}]`;
const rsDigit = "\\d";
const rsDingbat = `[${rsDingbatRange}]`;
const rsLower = `[${rsLowerRange}]`;
const rsMisc = `[^${rsAstralRange}${rsBreakRange + rsDigit + rsDingbatRange +
  rsLowerRange + rsUpperRange}]`;
const rsFitz = "\\ud83c[\\udffb-\\udfff]";
const rsModifier = `(?:${rsCombo}|${rsFitz})`;
const rsNonAstral = `[^${rsAstralRange}]`;
const rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
const rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
const rsUpper = `[${rsUpperRange}]`;
const rsZWJ = "\\u200d";

/** Used to compose unicode regexes. */
const rsMiscLower = `(?:${rsLower}|${rsMisc})`;
const rsMiscUpper = `(?:${rsUpper}|${rsMisc})`;
const rsOptContrLower = `(?:${rsApos}(?:d|ll|m|re|s|t|ve))?`;
const rsOptContrUpper = `(?:${rsApos}(?:D|LL|M|RE|S|T|VE))?`;
const reOptMod = `${rsModifier}?`;
const rsOptVar = `[${rsVarRange}]?`;
const rsOptJoin = `(?:${rsZWJ}(?:${
  [rsNonAstral, rsRegional, rsSurrPair].join("|")
})${rsOptVar + reOptMod})*`;
const rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
const rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
const rsSeq = rsOptVar + reOptMod + rsOptJoin;
const rsEmoji = `(?:${[rsDingbat, rsRegional, rsSurrPair].join("|")})${rsSeq}`;
const rsSymbol = "(?:" +
  [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join(
    "|",
  ) + ")";

const reUnicodeWords = RegExp(
  [
    `${rsUpper}?${rsLower}+${rsOptContrLower}(?=${
      [rsBreak, rsUpper, "$"].join("|")
    })`,
    `${rsMiscUpper}+${rsOptContrUpper}(?=${
      [rsBreak, rsUpper + rsMiscLower, "$"].join("|")
    })`,
    `${rsUpper}?${rsMiscLower}+${rsOptContrLower}`,
    `${rsUpper}+${rsOptContrUpper}`,
    rsOrdUpper,
    rsOrdLower,
    `${rsDigit}+`,
    rsEmoji,
  ].join("|"),
  "g",
);

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
const reHasUnicode = RegExp(
  "[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]",
);

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
export function hasUnicode(string: string): boolean {
  return reHasUnicode.test(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
export function unicodeToArray(string: string): string[] {
  return string.match(reUnicode) || [];
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string: string): string[] {
  return string.split("");
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @param {string} string The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
export function unicodeWords(string: string): string[] | null {
  return string.match(reUnicodeWords);
}

/**
 * Splits a Ascii `string` into an array of its words.
 *
 * @param {string} string The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
export function asciiWords(string: string): string[] | null {
  return string.match(reAsciiWord);
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
export function stringToArray(string: string): string[] | null {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}

/**
 * Splits `string` into an array of its words.
 *
 * **Note** - Change for lodash: added `index`
 *  signature to support `Array.map`, `Array.forEach` etc.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
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
export function words(string: string, pattern?: RegExp | string): string[];
export function words(string: string, index?: number): string[]; // for `map` and `forEach`
export function words(
  string: string,
  patternOrIndex?: RegExp | string | number,
): string[] {
  string = toString(string);
  const pattern = isNumber(patternOrIndex) ? undefined : patternOrIndex;
  if (pattern === undefined) {
    const result = hasUnicodeWord(string)
      ? unicodeWords(string)
      : asciiWords(string);
    return result || [];
  }
  return string.match(pattern as RegExp | string) || [];
}
