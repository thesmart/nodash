import { assertStrictEquals, booleans, errors, numbers, } from "../test_deps.ts"
import * as consts from "./consts.ts"
import { getTag } from "./getTag.ts"

const args = (function(...args: number[]) { return arguments; }(1, 2, 3))
class Foo {}

Deno.test('all types should return their tag', function() {
  assertStrictEquals(getTag(args), consts.argsTag)
  assertStrictEquals(getTag([]), consts.arrayTag)
  assertStrictEquals(getTag(async function() {}), consts.asyncTag)
  for(const b of booleans) {
    assertStrictEquals(getTag(b), consts.boolTag)
  }
  assertStrictEquals(getTag(new Date()), consts.dateTag)
  for(const e of errors) {
    assertStrictEquals(getTag(e), consts.errorTag)
  }
  assertStrictEquals(getTag(function() {}), consts.funcTag)
  assertStrictEquals(getTag(new Map()), consts.mapTag)
  for(const n of numbers) {
    assertStrictEquals(getTag(n), consts.numberTag)
  }
  assertStrictEquals(getTag(null), consts.nullTag)
  assertStrictEquals(getTag({}), consts.objectTag)
  assertStrictEquals(getTag(new Foo()), consts.objectTag)
  assertStrictEquals(getTag(/foobar/), consts.regexpTag)
  assertStrictEquals(getTag(new RegExp('')), consts.regexpTag)
  assertStrictEquals(getTag(new Promise<void>(() => {})), consts.promiseTag)
  assertStrictEquals(getTag(new Set()), consts.setTag)
  assertStrictEquals(getTag(""), consts.stringTag)
  assertStrictEquals(getTag(Symbol("x")), consts.symbolTag);
  assertStrictEquals(getTag(undefined), consts.undefinedTag);
  assertStrictEquals(getTag(new ArrayBuffer(1)), consts.arrayBufferTag);
  assertStrictEquals(getTag(new DataView(new ArrayBuffer(1))), consts.dataViewTag);
  assertStrictEquals(getTag(new Float32Array()), consts.float32Tag);
  assertStrictEquals(getTag(new Float64Array()), consts.float64Tag);
  assertStrictEquals(getTag(new Int8Array()), consts.int8Tag);
  assertStrictEquals(getTag(new Int16Array()), consts.int16Tag);
  assertStrictEquals(getTag(new Int32Array()), consts.int32Tag);
  assertStrictEquals(getTag(new Uint8Array()), consts.uint8Tag);
  assertStrictEquals(getTag(new Uint8ClampedArray()), consts.uint8ClampedTag);
  assertStrictEquals(getTag(new Uint16Array()), consts.uint16Tag);
  assertStrictEquals(getTag(new Uint32Array()), consts.uint32Tag);
});
