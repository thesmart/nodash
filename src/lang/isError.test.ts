import {
  assertEquals,
  assertStrictEquals,
  errors,
  falsey,
} from "../test_deps.ts";
import { isError } from "./isError.ts";
import { isBoolean } from "./isBoolean.ts";

Deno.test("should return `true` for error objects", function () {
  const expected = errors.map(() => true);
  const actual = errors.map(isError);
  assertEquals(actual, expected);
});

Deno.test("should return `true` for subclassed values", function () {
  class CustomError extends Error {}
  assertStrictEquals(isError(new CustomError("x")), true);
});

Deno.test("should return `false` for non error objects", function () {
  const expected = falsey.map(() => false);
  const actual = falsey.map(isError);
  assertEquals(actual, expected);

  assertStrictEquals(isError(arguments), false);
  assertStrictEquals(isError([1, 2, 3]), false);
  assertStrictEquals(isError(true), false);
  assertStrictEquals(isError(new Date()), false);
  assertStrictEquals(isError({ "a": 1 }), false);
  assertStrictEquals(isError(1), false);
  assertStrictEquals(isError(/x/), false);
  assertStrictEquals(isError("a"), false);
  assertStrictEquals(isError(Symbol("x")), false);
});

Deno.test("should return `false` for plain objects", function () {
  assertStrictEquals(isError({ "name": "Error", "message": "" }), false);
});
