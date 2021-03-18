import type { ObjectLiteral } from "../types.d.ts";
import { stringToPath } from "./_stringToPath.ts";
import { isArray } from "../lang/isArray.ts";
import { isArguments } from "../lang/isArguments.ts";

/**
 * Checks if `path` is a direct property of `object`.
 *
 * **Note:** This is modified from lodash, path may not be an array.
 *
 * @export
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 */
export function has(
  object: ObjectLiteral | ArrayLike<unknown>,
  path: string,
): boolean {
  if (object == null) return false;
  const pathArr = stringToPath(path as string);

  // deno-lint-ignore no-explicit-any
  let ptr: any = object;
  let index = 0;
  const length = pathArr.length;
  let hit = true;
  while (hit && ptr != null && index < length) {
    hit = Object.prototype.hasOwnProperty.call(ptr, pathArr[index]);
    if (!hit) {
      if ((isArray(ptr) || isArguments(ptr)) && ptr[pathArr[index]] == null) {
        // special case for sparse arrays
        hit = true;
      } else {
        break;
      }
    }
    ptr = ptr[pathArr[index++]];
  }

  return !!index && index == length && hit;
}
