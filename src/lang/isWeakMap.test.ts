import { isWeakMap } from "./isWeakMap.ts"
import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts"

Deno.test('should return `true` for weak maps', function() {
  assertStrictEquals(isWeakMap(new WeakMap()), true);
});

Deno.test('should return `false` for non-weak maps', function() {
  const expected = falsey.map(() => false)
  const actual = falsey.map(isWeakMap)
  assertEquals(actual, expected)

  assertStrictEquals(isWeakMap(arguments), false);
  assertStrictEquals(isWeakMap([1, 2, 3]), false);
  assertStrictEquals(isWeakMap(true), false);
  assertStrictEquals(isWeakMap(new Date), false);
  assertStrictEquals(isWeakMap(new Error), false);
  assertStrictEquals(isWeakMap({ 'a': 1 }), false);
  assertStrictEquals(isWeakMap(1), false);
  assertStrictEquals(isWeakMap(/x/), false);
  assertStrictEquals(isWeakMap('a'), false);
  assertStrictEquals(isWeakMap(Symbol("x")), false);
  assertStrictEquals(isWeakMap(new Map()), false);
});
