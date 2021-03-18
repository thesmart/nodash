import { isSet } from "./isSet.ts";
import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";

Deno.test("should return `true` for sets", function () {
  assertStrictEquals(isSet(new Set()), true);
});

Deno.test("should return `false` for non-sets", function () {
  const expected = falsey.map(() => false);
  const actual = falsey.map(isSet);
  assertEquals(actual, expected);

  assertStrictEquals(isSet(arguments), false);
  assertStrictEquals(isSet([1, 2, 3]), false);
  assertStrictEquals(isSet(true), false);
  assertStrictEquals(isSet(new Date()), false);
  assertStrictEquals(isSet(new Error()), false);
  assertStrictEquals(isSet({ "a": 1 }), false);
  assertStrictEquals(isSet(1), false);
  assertStrictEquals(isSet(/x/), false);
  assertStrictEquals(isSet("a"), false);
  assertStrictEquals(isSet(Symbol("x")), false);
  assertStrictEquals(isSet(new WeakSet()), false);
});
