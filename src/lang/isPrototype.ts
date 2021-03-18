import type { HasConstructor } from "../types.d.ts";

/** Used for built-in method references. */
const objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @export
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
export function isPrototype(value: unknown): boolean {
  const Ctor = value && (value as HasConstructor).constructor;
  const proto = (typeof Ctor === "function" && Ctor.prototype) || objectProto;

  return value === proto;
}
