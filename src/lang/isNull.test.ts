import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isNull } from "./isNull.ts";

Deno.test("should return `true` for `null` values", function () {
  assertStrictEquals(isNull(null), true);
});

Deno.test("should return `false` for non `null` values", function () {
  const expected = falsey.map((v) => v === null);
  const actual = falsey.map(isNull);
  assertEquals(actual, expected);

  assertStrictEquals(isNull(arguments), false);
  assertStrictEquals(isNull([1, 2, 3]), false);
  assertStrictEquals(isNull(true), false);
  assertStrictEquals(isNull(new Date()), false);
  assertStrictEquals(isNull(new Error()), false);
  assertStrictEquals(isNull({ "a": 1 }), false);
  assertStrictEquals(isNull(1), false);
  assertStrictEquals(isNull(/x/), false);
  assertStrictEquals(isNull("a"), false);
  assertStrictEquals(isNull(Symbol("x")), false);
});
