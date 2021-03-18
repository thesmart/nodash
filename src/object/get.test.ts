import { get } from "./get.ts";
import { assertEquals, assertStrictEquals, empties } from "../test_deps.ts";

Deno.test("should get string keyed property values", () => {
  const object = { "a": 1 };
  assertStrictEquals(get(object, "a"), 1);
  assertStrictEquals(get(object, Object("a")), 1);
});

Deno.test("should preserve the sign of `0`", () => {
  const object = { "-0": "a", "0": "b" };
  assertStrictEquals(get(object, "-0"), "a");
  assertStrictEquals(get(object, Object("-0")), "a");
  assertStrictEquals(get(object, "0"), "b");
  assertStrictEquals(get(object, Object("0")), "b");
});

Deno.test("should get deep property values", () => {
  const object = { "a": { "b": 2 } };
  assertStrictEquals(get(object, "a.b"), 2);
});

Deno.test("should not ignore empty brackets", () => {
  assertStrictEquals(get({ "": 1 }, "[]"), 1);
  assertStrictEquals(get({ "a": { "": 1 } }, "a[]"), 1);
});

Deno.test("should handle complex paths", () => {
  const object = {
    "a": {
      "-1.23": {
        '["b"]': { "c": { "['d']": { "\ne\n": { "f": { "g": 8 } } } } },
      },
    },
  };
  const path = "a[-1.23][\"[\\\"b\\\"]\"].c['[\\'d\\']'][\ne\n][f].g";
  assertStrictEquals(get(object, path), 8);
});

Deno.test("should return default when `object` is nullish", () => {
  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(get(null, "a"), undefined);
  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(get(undefined, "a"), undefined);
  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(get(1, "a.b", "foobar"), "foobar");
});

Deno.test("should return `undefined` if parts of `path` are missing", () => {
  const object = { "a": [, null] };
  assertStrictEquals(get(object, "a[1].b.c"), undefined);
});

Deno.test("should be able to return `null` values", () => {
  const object = { "a": [, null] };
  assertStrictEquals(get(object, "a[1]"), null);
});

Deno.test("should return the default value for `undefined` values", () => {
  const object = { "a": {} };
  const values = empties.concat(true, new Date(), 1, /x/, "a");
  const actual = values.map((v) => get(object, "a.b", v));
  assertEquals(actual, values);
});

Deno.test("should return the default value when `path` is empty", () => {
  assertEquals(get({}, "", "a"), "a");
});

Deno.test("should work with `arguments` objects", () => {
  (function (a: string, b: string) {
    assertStrictEquals(get(arguments, "0"), "foo");
    assertStrictEquals(get(arguments, "1"), "bar");
  })("foo", "bar");
});
