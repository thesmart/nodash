import { isArrayLikeObject } from "./isArrayLikeObject.ts"
import { assertEquals, assertStrictEquals } from "../test_deps.ts"

Deno.test('should return `true` for array-like objects, false for array-like values', function() {
  const values = [arguments, [1, 2, 3], { '0': 'a', 'length': 1 }];
  const expected = values.map((a) => true)
  const actual = values.map(isArrayLikeObject);
  assertEquals(actual, expected);
  assertStrictEquals(isArrayLikeObject('a'), false);
});

Deno.test('should return `false` for non-arrays', function() {
  assertEquals(isArrayLikeObject(true), false);
  assertEquals(isArrayLikeObject(new Date), false);
  assertEquals(isArrayLikeObject(new Error), false);
  assertEquals(isArrayLikeObject(() => {}), false);
  assertEquals(isArrayLikeObject(async () => {}), false);
  assertEquals(isArrayLikeObject({ 'a': 1 }), false);
  assertEquals(isArrayLikeObject(1), false);
  assertEquals(isArrayLikeObject(/x/), false);
  assertEquals(isArrayLikeObject(Symbol("x")), false);
})
