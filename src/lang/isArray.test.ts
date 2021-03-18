import { assertStrictEquals, falsey } from "../test_deps.ts";
import { isArray } from "./isArray.ts";

Deno.test("should return `true` for arrays", function () {
  assertStrictEquals(isArray([1, 2, 3]), true);
});

Deno.test("should return `false` for non-arrays", function () {
  falsey.map((f) => isArray(f)).forEach((f) => {
    assertStrictEquals(f, false);
  });
  assertStrictEquals(isArray(true), false);
  assertStrictEquals(isArray(new Date()), false);
  assertStrictEquals(isArray(new Error()), false);
  assertStrictEquals(isArray({ "0": 1, "length": 1 }), false);
  assertStrictEquals(isArray(1), false);
  assertStrictEquals(isArray(/x/), false);
  assertStrictEquals(isArray("a"), false);
  assertStrictEquals(isArray(Symbol()), false);
});
