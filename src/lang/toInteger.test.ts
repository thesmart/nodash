import { assertEquals, assertStrictEquals } from "../test_deps.ts";
import { MAX_INTEGER, MAX_SAFE_INTEGER } from "./consts.ts";
import { toInteger } from "./toInteger.ts";

Deno.test("should convert values to integers", function () {
  assertStrictEquals(toInteger(-5.6), -5);
  assertStrictEquals(toInteger("5.6"), 5);
  assertStrictEquals(toInteger(undefined), 0);
  assertStrictEquals(toInteger(NaN), 0);
  assertStrictEquals(toInteger(Infinity), MAX_INTEGER);
  assertStrictEquals(toInteger(-Infinity), -MAX_INTEGER);
  assertStrictEquals(toInteger(MAX_INTEGER), MAX_INTEGER);
  assertStrictEquals(toInteger(MAX_SAFE_INTEGER), MAX_SAFE_INTEGER);
  assertStrictEquals(toInteger("1e+308"), 1e+308);
  assertStrictEquals(toInteger("1E308"), 1E308);
  assertStrictEquals(toInteger("5E-324"), 0);
  assertStrictEquals(toInteger("-1e+308"), -1e+308);
  assertStrictEquals(toInteger("-1E308"), -1E308);
  assertStrictEquals(toInteger("-5E-324"), 0);
});

Deno.test("should support `value` of `-0`", function () {
  assertStrictEquals(1 / toInteger(-0), -Infinity);
});

Deno.test("should convert binary/octal strings to numbers", function () {
  const expected = [42, 5349, 1715004];
  let values = ["0b101010", "0o12345", "0x1a2b3c"];
  let actual = values.map((v) => toInteger(v));
  assertEquals(actual, expected);

  values = [" 0b101010 ", " 0o12345 ", " 0x1a2b3c "];
  actual = values.map((v) => toInteger(v));
  assertEquals(actual, expected);
});

Deno.test("should convert invalid binary/octal strings to 0", function () {
  const values = ["0b", "0o", "0x", "0b1010102", "0o123458", "0x1a2b3x"];
  const actual = values.map((v) => toInteger(v));
  assertEquals(actual, [0, 0, 0, 0, 0, 0]);
});

Deno.test("should coerce objects to numbers", function () {
  // deno-lint-ignore no-explicit-any
  const values: any[] = [
    {},
    [],
    [1],
    [1, 2],
    { "valueOf": "1.1" },
    { "valueOf": "1.1", "toString": (() => "2.2") },
    { "valueOf": (() => "1.1"), "toString": "2.2" },
    { "valueOf": (() => "1.1"), "toString": (() => "2.2") },
    { "valueOf": (() => "-0x1a2b3c") },
    { "toString": (() => "-0x1a2b3c") },
    { "valueOf": (() => "0o12345") },
    { "toString": (() => "0o12345") },
    { "valueOf": (() => "0b101010") },
    { "toString": (() => "0b101010") },
  ];

  const expected = [
    0,
    0,
    1,
    0,
    0,
    2,
    1,
    1,
    0,
    0,
    5349,
    5349,
    42,
    42,
  ];

  const actual = values.map(toInteger);
  assertEquals(actual, expected);
});
