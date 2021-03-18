import { isWeakSet } from "./isWeakSet.ts";
import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";

Deno.test("should return `true` for weak sets", function () {
  assertStrictEquals(isWeakSet(new WeakSet()), true);
});

Deno.test("should return `false` for non-weak sets", function () {
  const expected = falsey.map(() => false);
  const actual = falsey.map(isWeakSet);
  assertEquals(actual, expected);

  assertStrictEquals(isWeakSet(arguments), false);
  assertStrictEquals(isWeakSet([1, 2, 3]), false);
  assertStrictEquals(isWeakSet(true), false);
  assertStrictEquals(isWeakSet(new Date()), false);
  assertStrictEquals(isWeakSet(new Error()), false);
  assertStrictEquals(isWeakSet({ "a": 1 }), false);
  assertStrictEquals(isWeakSet(1), false);
  assertStrictEquals(isWeakSet(/x/), false);
  assertStrictEquals(isWeakSet("a"), false);
  assertStrictEquals(isWeakSet(Symbol("x")), false);
  assertStrictEquals(isWeakSet(new Set()), false);
});
