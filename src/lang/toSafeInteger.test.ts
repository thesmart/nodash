import { assertEquals, assertStrictEquals } from "../test_deps.ts"
import { MAX_SAFE_INTEGER } from "./consts.ts"
import { toSafeInteger } from "./toSafeInteger.ts"

Deno.test('should convert values to safe integers', function() {
  assertStrictEquals(toSafeInteger(-5.6), -5);
  assertStrictEquals(toSafeInteger('5.6'), 5);
  assertStrictEquals(toSafeInteger(undefined), 0);
  assertStrictEquals(toSafeInteger(NaN), 0);
  assertStrictEquals(toSafeInteger(Infinity), MAX_SAFE_INTEGER);
  assertStrictEquals(toSafeInteger(-Infinity), -MAX_SAFE_INTEGER);
  assertStrictEquals(toSafeInteger('1e+308'), MAX_SAFE_INTEGER)
  assertStrictEquals(toSafeInteger('1E308'), MAX_SAFE_INTEGER)
  assertStrictEquals(toSafeInteger('5E-324'), 0)
  assertStrictEquals(toSafeInteger('-1e+308'), -MAX_SAFE_INTEGER)
  assertStrictEquals(toSafeInteger('-1E308'), -MAX_SAFE_INTEGER)
  assertStrictEquals(toSafeInteger('-5E-324'), 0)
});

Deno.test('should support `value` of `-0`', function() {
  assertStrictEquals(1 / toSafeInteger(-0), -Infinity);
});

Deno.test('should convert binary/octal strings to numbers', function() {
  const expected = [42, 5349, 1715004]
  let values = ['0b101010', '0o12345', '0x1a2b3c']
  let actual = values.map((v) => toSafeInteger(v))
  assertEquals(actual, expected)

  values = [' 0b101010 ', ' 0o12345 ', ' 0x1a2b3c ']
  actual = values.map((v) => toSafeInteger(v))
  assertEquals(actual, expected)
})

Deno.test('should convert invalid binary/octal strings to 0', function() {
  const values = ['0b', '0o', '0x', '0b1010102', '0o123458', '0x1a2b3x']
  let actual = values.map((v) => toSafeInteger(v))
  assertEquals(actual, [0, 0, 0, 0, 0, 0]);
})

Deno.test('should coerce objects to numbers', function() {
  // deno-lint-ignore no-explicit-any
  const values: any[] = [
    {},
    [],
    [1],
    [1, 2],
    { 'valueOf': '1.1' },
    { 'valueOf': '1.1', 'toString': (() => '2.2') },
    { 'valueOf': (() => '1.1'), 'toString': '2.2' },
    { 'valueOf': (() => '1.1'), 'toString': (() => '2.2') },
    { 'valueOf': (() => '-0x1a2b3c') },
    { 'toString': (() => '-0x1a2b3c') },
    { 'valueOf': (() => '0o12345') },
    { 'toString': (() => '0o12345') },
    { 'valueOf': (() => '0b101010') },
    { 'toString': (() => '0b101010') }
  ];

  const expected = [
    0,    0,    1, 0,
    0,    2,    1, 1,
    0,    0,
    5349, 5349,
    42,   42
  ];

  const actual = values.map(toSafeInteger)
  assertEquals(actual, expected)
})
