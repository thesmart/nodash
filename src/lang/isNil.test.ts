import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts"
import { isNil } from "./isNil.ts"

Deno.test('should return `true` for nullish values', function() {
  assertStrictEquals(isNil(null), true);
  assertStrictEquals(isNil(undefined), true);
  assertStrictEquals(isNil(undefined), true);
});

Deno.test('should return `false` for non-nullish values', function() {
  const expected = falsey.map((v) => v == null)
  const actual = falsey.map(isNil)
  assertEquals(actual, expected)

  assertStrictEquals(isNil(arguments), false);
  assertStrictEquals(isNil([1, 2, 3]), false);
  assertStrictEquals(isNil(true), false);
  assertStrictEquals(isNil(new Date), false);
  assertStrictEquals(isNil(new Error), false);
  assertStrictEquals(isNil({ 'a': 1 }), false);
  assertStrictEquals(isNil(1), false);
  assertStrictEquals(isNil(/x/), false);
  assertStrictEquals(isNil('a'), false);
  assertStrictEquals(isNil(Symbol("x")), false);
});
