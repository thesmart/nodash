import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isObjectLike } from "./isObjectLike.ts";

Deno.test("should return `true` for objects", function () {
  assertStrictEquals(isObjectLike(arguments), true);
  assertStrictEquals(isObjectLike([1, 2, 3]), true);
  assertStrictEquals(isObjectLike(Object(false)), true);
  assertStrictEquals(isObjectLike(new Date()), true);
  assertStrictEquals(isObjectLike(new Error()), true);
  assertStrictEquals(isObjectLike({ "a": 1 }), true);
  assertStrictEquals(isObjectLike(Object(0)), true);
  assertStrictEquals(isObjectLike(/x/), true);
  assertStrictEquals(isObjectLike(Object("a")), true);
  assertStrictEquals(isObjectLike(Object(Symbol("x"))), true);
});

Deno.test("should return `false` for non-objects", function () {
  // @ts-ignore: it's a test where type is non-important
  const values = falsey.concat([true, 1, "a", Symbol("x")]);
  const expected = values.map(() => false);
  const actual = values.map(isObjectLike);
  assertEquals(actual, expected);
});
