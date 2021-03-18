import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isNumber } from "./isNumber.ts";

Deno.test("should return `true` for numbers", function () {
  assertStrictEquals(isNumber(0), true);
  assertStrictEquals(isNumber(Object(0)), true);
  assertStrictEquals(isNumber(NaN), true);
});

Deno.test("should return `false` for non-numbers", function () {
  const expected = falsey.map((v) => typeof v === "number");
  const actual = falsey.map(isNumber);
  assertEquals(actual, expected);

  assertStrictEquals(isNumber(arguments), false);
  assertStrictEquals(isNumber([1, 2, 3]), false);
  assertStrictEquals(isNumber(true), false);
  assertStrictEquals(isNumber(new Date()), false);
  assertStrictEquals(isNumber(new Error()), false);
  assertStrictEquals(isNumber({ "a": 1 }), false);
  assertStrictEquals(isNumber(/x/), false);
  assertStrictEquals(isNumber("a"), false);
  assertStrictEquals(isNumber(Symbol("x")), false);
});
