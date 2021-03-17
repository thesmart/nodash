/** Used to match property names within property paths. */
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g

/** Used to match backslashes in property paths. */
const reEscapeChar = /\\(\\)?/g

/**
 * Converts `string` to a property path array.
 *
 * @param {string} str The string to convert.
 * @returns {Array} Returns the property path array.
 */
export function stringToPath(str: string): string[] {
  const result: string[] = []
  if (str.charCodeAt(0) === 46 /* . */) {
    result.push('')
  }
  const matches = str.matchAll(rePropName)
  for (const match of matches) {
    const [token, number, quote, subString] = match
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || token))
  }
  return result
}
