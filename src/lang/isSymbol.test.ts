import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isSymbol } from "./isSymbol.ts";

Deno.test("should return `true` for symbols", function () {
  assertStrictEquals(isSymbol(Symbol()), true);
  assertStrictEquals(isSymbol(Object(Symbol("x"))), true);
});

Deno.test("should return `false` for non-symbols", function () {
  const expected = falsey.map(() => false);
  const actual = falsey.map(isSymbol);
  assertEquals(actual, expected);

  assertStrictEquals(isSymbol(arguments), false);
  assertStrictEquals(isSymbol([1, 2, 3]), false);
  assertStrictEquals(isSymbol(true), false);
  assertStrictEquals(isSymbol(new Date()), false);
  assertStrictEquals(isSymbol(new Error()), false);
  assertStrictEquals(isSymbol({ "0": 1, "length": 1 }), false);
  assertStrictEquals(isSymbol(1), false);
  assertStrictEquals(isSymbol(/x/), false);
});
