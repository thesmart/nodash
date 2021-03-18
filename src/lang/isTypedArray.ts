import { getTag } from "./getTag.ts";
import { isObjectLike } from "./isObjectLike.ts";
import { isLength } from "./isLength.ts";
import * as tags from "./consts.ts";
import type { HasLength } from "../types.d.ts";

/** Used to identify `toStringTag` values of typed arrays. */
const typedArrayTags: { [key: string]: boolean } = {};
typedArrayTags[tags.float32Tag] = typedArrayTags[tags.float64Tag] =
  typedArrayTags[tags.int8Tag] = typedArrayTags[tags.int16Tag] =
    typedArrayTags[tags.int32Tag] = typedArrayTags[tags.uint8Tag] =
      typedArrayTags[tags.uint8ClampedTag] = typedArrayTags[tags.uint16Tag] =
        typedArrayTags[tags.uint32Tag] = true;
typedArrayTags[tags.argsTag] = typedArrayTags[tags.arrayTag] =
  typedArrayTags[tags.arrayBufferTag] = typedArrayTags[tags.boolTag] =
    typedArrayTags[tags.dataViewTag] = typedArrayTags[tags.dateTag] =
      typedArrayTags[tags.errorTag] = typedArrayTags[tags.funcTag] =
        typedArrayTags[tags.mapTag] = typedArrayTags[tags.numberTag] =
          typedArrayTags[tags.objectTag] = typedArrayTags[tags.regexpTag] =
            typedArrayTags[tags.setTag] = typedArrayTags[tags.stringTag] =
              typedArrayTags[tags.weakMapTag] = false;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @export
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * isTypedArray(new Uint8Array)
 * // => true
 *
 * isTypedArray([])
 * // => false
 */
export function isTypedArray(value: unknown): boolean {
  return isObjectLike(value) &&
    isLength((value as HasLength).length) &&
    !!typedArrayTags[getTag(value)];
}
