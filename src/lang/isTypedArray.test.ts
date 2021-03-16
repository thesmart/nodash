import { assertEquals, assertStrictEquals, falsey, typedArrays } from "../test_deps.ts"
import { isTypedArray } from "./isTypedArray.ts"

Deno.test('should return `true` for typed arrays', function() {
  const expected = typedArrays.map(() => true)
  const actual = typedArrays.map((Ctor) => {
    // @ts-ignore: it's a test where type is non-important
    return new Ctor(new ArrayBuffer(8))
  })
  assertEquals(actual.map(isTypedArray), expected);
});

Deno.test('should return `false` for non typed arrays', function() {
  const expected = falsey.map(() => false)
  const actual = falsey.map(isTypedArray)
  assertEquals(actual, expected)

  assertStrictEquals(isTypedArray(true), false);
  assertStrictEquals(isTypedArray(new Date), false);
  assertStrictEquals(isTypedArray(new Error), false);
  assertStrictEquals(isTypedArray({ '0': 1, 'length': 1 }), false);
  assertStrictEquals(isTypedArray(1), false);
  assertStrictEquals(isTypedArray(/x/), false);
  assertStrictEquals(isTypedArray('a'), false);
  assertStrictEquals(isTypedArray(Symbol()), false);
});
