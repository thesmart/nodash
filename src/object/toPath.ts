import { stringToPath } from "./_stringToPath.ts"
import { isArrayLikeObject } from "../lang/isArrayLikeObject.ts"
import { isSymbol } from "../lang/isSymbol.ts"
import { toString } from "../lang/toString.ts"

/**
 * Converts `value` to a property path array.
 *
 * @since 4.0.0
 * @category Util
 * @param {*} path The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
export function toPath(path: string | string[]): Array<string> {
  if (isArrayLikeObject(path)) {
    return Array.from(path, (pathKey) => {
      return toString(pathKey);
    })
  }
  return stringToPath(toString(path))
}
