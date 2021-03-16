import { assertEquals, assertStrictEquals, empties } from "../test_deps.ts"
import { isEmpty } from "./isEmpty.ts"
import { MAX_SAFE_INTEGER } from "./consts.ts"

Deno.test('should return `true` for empty values', function() {
  const expected = empties.map(() => true)
  const actual = empties.map(isEmpty);
  assertEquals(actual, expected);

  assertStrictEquals(isEmpty(true), true);
  assertStrictEquals(isEmpty(1), true);
  assertStrictEquals(isEmpty(NaN), true);
  assertStrictEquals(isEmpty(/x/), true);
  assertStrictEquals(isEmpty(Symbol("x")), true);
  assertStrictEquals(isEmpty(undefined), true);
});

Deno.test('should return `false` for non-empty values', function() {
  assertStrictEquals(isEmpty([0]), false);
  assertStrictEquals(isEmpty({ 'a': 0 }), false);
  assertStrictEquals(isEmpty('a'), false);
});

Deno.test('should work with an object that has a `length` property', function() {
  assertStrictEquals(isEmpty({ 'length': 0 }), false);
});

Deno.test('should work with `arguments` objects', function() {
  assertStrictEquals(isEmpty(arguments), true);
});

Deno.test('should work with prototype objects', function() {
  class Foo {}
  assertStrictEquals(isEmpty(Foo.prototype), true);

  // @ts-ignore: it's a test where type is non-important
  Foo.prototype.a = 1;
  assertStrictEquals(isEmpty(Foo.prototype), false);
});

Deno.test('should work with maps', function() {
  const map = new Map();
  assertStrictEquals(isEmpty(map), true);
  map.set('a', 1);
  assertStrictEquals(isEmpty(map), false);
  map.clear();
});

Deno.test('should work with sets', function() {
  const set = new Set();
  assertStrictEquals(isEmpty(set), true);
  set.add(1);
  assertStrictEquals(isEmpty(set), false);
  set.clear();
});

Deno.test('should not treat objects with negative lengths as array-like', function() {
  function Foo() {}
  Foo.prototype.length = -1;

  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(isEmpty(new Foo()), true);
});

Deno.test('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', function() {
  function Foo() {}
  Foo.prototype.length = MAX_SAFE_INTEGER + 1;

  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(isEmpty(new Foo), true);
});

Deno.test('should not treat objects with non-number lengths as array-like', function() {
  assertStrictEquals(isEmpty({ 'length': '0' }), false);
});
