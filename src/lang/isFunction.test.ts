import { isFunction } from "./isFunction.ts"
import { arrayViews, assertEquals, assertStrictEquals, falsey } from "../test_deps.ts"
import { isError } from "./isError.ts"

Deno.test('should return `true` for functions', function() {
  assertStrictEquals(isFunction(function() {}), true);
  assertStrictEquals(isFunction(Array.prototype.slice), true);
});

Deno.test('should return `true` for async functions', function() {
  assertStrictEquals(isFunction(async () => {}), true);
});

Deno.test('should return `true` for generator functions', function() {
  assertStrictEquals(isFunction(Function('return function*(){}')), true);
});

Deno.test('should return `true` for the `Proxy` constructor', function() {
  if (Proxy) {
    assertStrictEquals(isFunction(Proxy), true);
  }
});

Deno.test('should return `true` for array view constructors', function() {
  const expected = arrayViews.map(() => true)
  const actual = arrayViews.map(isFunction);
  assertEquals(actual, expected);
});

Deno.test('should return `false` for non-functions', function() {
  const expected = falsey.map(() => false)
  const actual = falsey.map(isFunction);
  assertEquals(actual, expected);

  assertStrictEquals(isFunction(arguments), false);
  assertStrictEquals(isFunction([1, 2, 3]), false);
  assertStrictEquals(isFunction(true), false);
  assertStrictEquals(isFunction(new Date), false);
  assertStrictEquals(isFunction(new Error), false);
  assertStrictEquals(isFunction({ 'a': 1 }), false);
  assertStrictEquals(isFunction(1), false);
  assertStrictEquals(isFunction(/x/), false);
  assertStrictEquals(isFunction('a'), false);
  assertStrictEquals(isFunction(Symbol("x")), false);
});
