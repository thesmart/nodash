import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isObject } from "./isObject.ts";

Deno.test("should return `true` for objects", function () {
  assertStrictEquals(isObject(arguments), true);
  assertStrictEquals(isObject([1, 2, 3]), true);
  assertStrictEquals(isObject(Object(false)), true);
  assertStrictEquals(isObject(new Date()), true);
  assertStrictEquals(isObject(new Error()), true);
  assertStrictEquals(isObject({ "a": 1 }), true);
  assertStrictEquals(isObject(Object(0)), true);
  assertStrictEquals(isObject(/x/), true);
  assertStrictEquals(isObject(Object("a")), true);
  assertStrictEquals(isObject(Object(Symbol("x"))), true);
});

Deno.test("should return `false` for non-objects", function () {
  // @ts-ignore: it's a test where type is non-important
  const values = falsey.concat([true, 1, "a", Symbol("x")]);
  const expected = values.map(() => false);
  const actual = values.map(isObject);
  assertEquals(actual, expected);
});
