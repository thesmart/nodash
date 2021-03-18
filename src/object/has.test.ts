import { assertEquals, assertStrictEquals } from "../test_deps.ts";
import { has } from "./has.ts";

Deno.test("should check for own properties", () => {
  const object = { "a": 1 };
  assertStrictEquals(has(object, "a"), true);
  assertStrictEquals(has(object, Object("a")), true);
});

Deno.test("should not use the `hasOwnProperty` method of `object`", () => {
  const object = { "hasOwnProperty": null, "a": 1 };
  assertStrictEquals(has(object, "a"), true);
  assertStrictEquals(has(object, Object("a")), true);
});

Deno.test("should support deep paths", () => {
  const object = { "a": { "b": 2 } };
  assertStrictEquals(has(object, "a.b"), true);
  assertStrictEquals(has(object, "a.a"), false);
});

Deno.test("should work with `arguments` objects", () => {
  (function (a: string, b: string) {
    assertStrictEquals(has(arguments, "0"), true);
    assertStrictEquals(has(arguments, "1"), true);
  })("foo", "bar");
});

Deno.test("should preserve the sign of `0`", () => {
  const object = { "-0": "a", "0": "b" };
  assertStrictEquals(has(object, "-0"), true);
  assertStrictEquals(has(object, Object("-0")), true);
  assertStrictEquals(has(object, "0"), true);
  assertStrictEquals(has(object, Object("0")), true);
});

Deno.test("should return `true` for indexes of sparse values with deep paths", () => {
  const object = { "a": [, null, null] };
  delete object["a"][1];
  assertStrictEquals(has(object, "a[0]"), true);
  assertStrictEquals(has(object, "a[1]"), true);
  assertStrictEquals(has(object, "a[2]"), true);
  assertStrictEquals(has(Array(1), "0"), true);
});

Deno.test("should return `false` for inherited properties", () => {
  function Foo() {}
  Foo.prototype.a = 1;
  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(has(new Foo(), "a"), false);
});

Deno.test("should return `false` for nullish subjects", () => {
  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(has(null, "a"), false);
  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(has(undefined, "a"), false);
});

Deno.test("should return `false` over sparse values of deep paths", () => {
  const object = { "a": [, null, null] };
  delete object["a"][1];
  assertStrictEquals(has(object, "a[0][0]"), false);
  assertStrictEquals(has(object, "a[1][0]"), false);
  assertStrictEquals(has(object, "a[2][0]"), false);
});
