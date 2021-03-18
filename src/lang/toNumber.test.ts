import { assertEquals, assertStrictEquals } from "../test_deps.ts";
import { MAX_INTEGER, MAX_SAFE_INTEGER } from "./consts.ts";
import { toNumber } from "./toNumber.ts";

Deno.test("should convert values to numbers", function () {
  assertStrictEquals(toNumber(-5.6), -5.6);
  assertStrictEquals(toNumber("5.6"), 5.6);
  assertStrictEquals(isNaN(toNumber(undefined)), true);
  assertStrictEquals(isNaN(toNumber(NaN)), true);
  assertStrictEquals(toNumber(Infinity), Infinity);
  assertStrictEquals(toNumber(-Infinity), -Infinity);
  assertStrictEquals(toNumber("1e+308"), 1e+308);
  assertStrictEquals(toNumber("1E308"), 1E308);
  assertStrictEquals(toNumber("5E-324"), 5E-324);
  assertStrictEquals(isNaN(toNumber(Symbol("5"))), true);
});

Deno.test("should support `value` of `-0`", function () {
  assertStrictEquals(1 / toNumber(-0), -Infinity);
});

Deno.test("should convert binary/octal strings to numbers", function () {
  const expected = [42, 5349, 1715004];
  let values = ["0b101010", "0o12345", "0x1a2b3c"];
  let actual = values.map((v) => toNumber(v));
  assertEquals(actual, expected);

  values = [" 0b101010 ", " 0o12345 ", " 0x1a2b3c "];
  actual = values.map((v) => toNumber(v));
  assertEquals(actual, expected);
});

Deno.test("should convert invalid binary/octal strings to NaN", function () {
  const values = ["0b", "0o", "0x", "0b1010102", "0o123458", "0x1a2b3x"];
  const actual = values.map((v) => toNumber(v));
  assertEquals(actual, [NaN, NaN, NaN, NaN, NaN, NaN]);
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
    NaN,
    0,
    1,
    NaN,
    NaN,
    2.2,
    1.1,
    1.1,
    NaN,
    NaN,
    5349,
    5349,
    42,
    42,
  ];

  const actual = values.map(toNumber);
  assertEquals(actual, expected);
});
