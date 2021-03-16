import { isInteger } from "./isInteger.ts"
import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts"
import { MAX_INTEGER, MAX_SAFE_INTEGER } from "./consts.ts"

Deno.test('should return `true` for integer values', function() {
  const values = [-1, 0, 1, MAX_SAFE_INTEGER, MAX_INTEGER];
  const expected = values.map(() => true)
  const actual = values.map(isInteger)
  assertEquals(actual, expected)
});

Deno.test('should return `false` for non-integer number values', function() {
  const values = [NaN, Infinity, -Infinity, Object(1), 3.14]
  const expected = values.map(() => false)
  const actual = values.map(isInteger)
  assertEquals(actual, expected)
});

Deno.test('should return `false` for non-numeric values', function() {
  const expected = falsey.map((v) => v === 0)
  const actual = falsey.map(isInteger);
  assertEquals(actual, expected);

  assertStrictEquals(isInteger(arguments), false);
  assertStrictEquals(isInteger([1, 2, 3]), false);
  assertStrictEquals(isInteger(true), false);
  assertStrictEquals(isInteger(new Date), false);
  assertStrictEquals(isInteger(new Error), false);
  assertStrictEquals(isInteger({ 'a': 1 }), false);
  assertStrictEquals(isInteger(/x/), false);
  assertStrictEquals(isInteger('a'), false);
  assertStrictEquals(isInteger(Symbol("x")), false);
});
