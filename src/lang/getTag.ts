import { nullTag, undefinedTag } from "./consts.ts"

/**
 * Gets the `toStringTag` of `value`.
 *
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
export function getTag(value: unknown): string {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag
  }
  return Object.prototype.toString.call(value);
}
