import { isDate } from "./isDate.ts";
import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";

Deno.test("should return `true` for dates", function () {
  assertStrictEquals(isDate(new Date()), true);
});

Deno.test("should return `false` for non-dates", function () {
  const expected = falsey.map(() => false);
  const actual = falsey.map(isDate);
  assertEquals(actual, expected);

  assertStrictEquals(isDate(arguments), false);
  assertStrictEquals(isDate([1, 2, 3]), false);
  assertStrictEquals(isDate(true), false);
  assertStrictEquals(isDate(new Error()), false);
  assertStrictEquals(isDate({ "a": 1 }), false);
  assertStrictEquals(isDate(1), false);
  assertStrictEquals(isDate(/x/), false);
  assertStrictEquals(isDate("a"), false);
  assertStrictEquals(isDate(Symbol("x")), false);
});
