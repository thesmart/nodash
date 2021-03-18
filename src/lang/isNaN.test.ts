import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isNaN } from "./isNaN.ts";

Deno.test("should return `true` for NaNs", function () {
  assertStrictEquals(isNaN(NaN), true);
  assertStrictEquals(isNaN(Object(NaN)), true);
});

Deno.test("should return `false` for non-NaNs", function () {
  const expected = falsey.map((v) => v !== v);
  const actual = falsey.map(isNaN);
  assertEquals(actual, expected);

  assertStrictEquals(isNaN(arguments), false);
  assertStrictEquals(isNaN([1, 2, 3]), false);
  assertStrictEquals(isNaN(true), false);
  assertStrictEquals(isNaN(new Date()), false);
  assertStrictEquals(isNaN(new Error()), false);
  assertStrictEquals(isNaN({ "a": 1 }), false);
  assertStrictEquals(isNaN(1), false);
  assertStrictEquals(isNaN(Object(1)), false);
  assertStrictEquals(isNaN(/x/), false);
  assertStrictEquals(isNaN("a"), false);
  assertStrictEquals(isNaN(Symbol("x")), false);
});
