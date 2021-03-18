import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isRegExp } from "./isRegExp.ts";

Deno.test("should return `true` for regexes", function () {
  assertStrictEquals(isRegExp(/x/), true);
  assertStrictEquals(isRegExp(RegExp("x")), true);
});

Deno.test("should return `false` for non-regexes", function () {
  const expected = falsey.map(() => false);
  const actual = falsey.map(isRegExp);
  assertEquals(actual, expected);

  assertStrictEquals(isRegExp(arguments), false);
  assertStrictEquals(isRegExp([1, 2, 3]), false);
  assertStrictEquals(isRegExp(true), false);
  assertStrictEquals(isRegExp(new Date()), false);
  assertStrictEquals(isRegExp(new Error()), false);
  assertStrictEquals(isRegExp({ "a": 1 }), false);
  assertStrictEquals(isRegExp(1), false);
  assertStrictEquals(isRegExp("a"), false);
  assertStrictEquals(isRegExp(Symbol("x")), false);
});
