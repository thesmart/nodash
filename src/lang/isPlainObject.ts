import { getTag } from "./getTag.ts";
import { objectTag } from "./consts.ts";
import { isObjectLike } from "./isObjectLike.ts";

/** Used to infer the `Object` constructor. */
const objectCtorString = Function.prototype.toString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * isPlainObject(new Foo)
 * // => false
 *
 * isPlainObject([1, 2, 3])
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * isPlainObject(Object.create(null))
 * // => true
 */
export function isPlainObject(value: unknown): boolean {
  if (!isObjectLike(value) || getTag(value) != objectTag) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") &&
    proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor &&
    Function.prototype.toString.call(Ctor) == objectCtorString;
}
