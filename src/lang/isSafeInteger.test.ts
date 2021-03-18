import { isSafeInteger } from "./isSafeInteger.ts";
import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { MAX_INTEGER, MAX_SAFE_INTEGER } from "./consts.ts";

Deno.test("should return `true` for integer values", function () {
  const values = [-1, 0, 1, MAX_SAFE_INTEGER];
  const expected = values.map(() => true);
  const actual = values.map(isSafeInteger);
  assertEquals(actual, expected);
});

Deno.test("should return `false` for non-integer number values", function () {
  const values = [NaN, Infinity, -Infinity, Object(1), 3.14];
  const expected = values.map(() => false);
  const actual = values.map(isSafeInteger);
  assertEquals(actual, expected);
});

Deno.test("should return `false` for non-numeric values", function () {
  const expected = falsey.map((v) => v === 0);
  const actual = falsey.map(isSafeInteger);
  assertEquals(actual, expected);

  assertStrictEquals(isSafeInteger(MAX_SAFE_INTEGER + 1), false);
  assertStrictEquals(isSafeInteger(MAX_INTEGER), false);
  assertStrictEquals(isSafeInteger(arguments), false);
  assertStrictEquals(isSafeInteger([1, 2, 3]), false);
  assertStrictEquals(isSafeInteger(true), false);
  assertStrictEquals(isSafeInteger(new Date()), false);
  assertStrictEquals(isSafeInteger(new Error()), false);
  assertStrictEquals(isSafeInteger({ "a": 1 }), false);
  assertStrictEquals(isSafeInteger(/x/), false);
  assertStrictEquals(isSafeInteger("a"), false);
  assertStrictEquals(isSafeInteger(Symbol("x")), false);
});
