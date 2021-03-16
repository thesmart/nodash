import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts"
import { toString } from "./toString.ts"

Deno.test('should treat nullish values as empty strings', function() {
  const values = [, null, undefined]
  const expected = values.map((v) => "")
  const actual = values.map(toString)
  assertEquals(actual, expected)
});

Deno.test('should preserve the sign of `0`', function() {
  const values = [-0, Object(-0), 0, Object(0)]
  const expected = ['-0', '-0', '0', '0']
  const actual = values.map(toString)
  assertEquals(actual, expected)
});

Deno.test('should preserve the sign of `0` in an array', function() {
  const values = [-0, Object(-0), 0, Object(0)]
  assertStrictEquals(toString(values), '-0,-0,0,0');
});

Deno.test('should handle symbols', function() {
  assertStrictEquals(toString(Symbol("x")), 'Symbol(x)');
});

Deno.test('should handle an array of symbols', function() {
  assertStrictEquals(toString([Symbol("x")]), 'Symbol(x)');
});
