import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts"
import { isString } from "./isString.ts"

Deno.test('should return `true` for strings', function() {
  assertStrictEquals(isString('a'), true);
  assertStrictEquals(isString(Object('a')), true);
});

Deno.test('should return `false` for non-strings', function() {
  const expected = falsey.map((v) => v === "")
  const actual = falsey.map(isString)
  assertEquals(actual, expected)

  assertStrictEquals(isString(arguments), false);
  assertStrictEquals(isString([1, 2, 3]), false);
  assertStrictEquals(isString(true), false);
  assertStrictEquals(isString(new Date), false);
  assertStrictEquals(isString(new Error), false);
  assertStrictEquals(isString({ '0': 1, 'length': 1 }), false);
  assertStrictEquals(isString(1), false);
  assertStrictEquals(isString(/x/), false);
  assertStrictEquals(isString(Symbol("x")), false);
});
