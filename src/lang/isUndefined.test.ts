import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isUndefined } from "./isUndefined.ts";

Deno.test("should return `true` for `undefined` values", function () {
  assertStrictEquals(isUndefined(), true);
  assertStrictEquals(isUndefined(undefined), true);
});

Deno.test("should return `false` for non `undefined` values", function () {
  const expected = falsey.map((v) => v === undefined);
  const actual = falsey.map(isUndefined);
  assertEquals(actual, expected);

  assertStrictEquals(isUndefined(arguments), false);
  assertStrictEquals(isUndefined([1, 2, 3]), false);
  assertStrictEquals(isUndefined(true), false);
  assertStrictEquals(isUndefined(new Date()), false);
  assertStrictEquals(isUndefined(new Error()), false);
  assertStrictEquals(isUndefined({ "0": 1, "length": 1 }), false);
  assertStrictEquals(isUndefined(1), false);
  assertStrictEquals(isUndefined(/x/), false);
  assertStrictEquals(isUndefined(Symbol("x")), false);
});
