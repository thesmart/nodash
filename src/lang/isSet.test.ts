import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isSet } from "./isSet.ts";

const set = new Set();

Deno.test("should return `true` for sets", function () {
  if (Set) {
    assertStrictEquals(isSet(set), true);
  }
});

Deno.test("should return `false` for non-sets", function () {
  const expected = falsey.map(() => false);
  const actual = falsey.map(function (value, index) {
    return index ? isSet(value) : isSet(undefined);
  });

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
