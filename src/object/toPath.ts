import { stringToPath } from "./_stringToPath.ts";
import { isArrayLikeObject } from "../lang/isArrayLikeObject.ts";
import { isSymbol } from "../lang/isSymbol.ts";
import { toString } from "../lang/toString.ts";

/**
 * Converts `value` to a property path array.
 *
 * ** Note ** - In lodash, this is not private. Made private here b/c `get`, `has`, etc. no longer take `Array<string|symbol>`.
 *
 * @private
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
export function toPath(
  path: string | symbol | ArrayLike<string | symbol>,
): Array<string | symbol> {
  if (isArrayLikeObject(path)) {
    return Array.from(path as ArrayLike<string | symbol>, (pathKey) => {
      return isSymbol(pathKey) ? pathKey : toString(pathKey);
    });
  }
  return isSymbol(path) ? [path as symbol] : stringToPath(toString(path));
}
