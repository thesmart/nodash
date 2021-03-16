import { stringToPath } from "./_stringToPath.ts"
import { isArrayLike } from "../lang/isArrayLike.ts"
import { toKey } from "../lang/toKey.ts"
import { isSymbol } from "../lang/isSymbol.ts"
import { toString } from "../lang/toString.ts"
import { isString } from "../lang/isString.ts"

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
export function toPath(path: string | symbol | unknown[]): Array<string|symbol> {
  if (!isString(path) && isArrayLike(path)) {
    return Array.from(path as unknown[], (pathKey) => {
      return toKey(pathKey);
    }) as Array<string|symbol>;
  }
  return isSymbol(path) ? [path as symbol] : stringToPath(toString(path))
}
