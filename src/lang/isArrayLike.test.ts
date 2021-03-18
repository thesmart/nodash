import { isArrayLike } from "./isArrayLike.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("should return `true` for array-like values", function () {
  const values = [arguments, [1, 2, 3], { "0": "a", "length": 1 }, "a"];
  const expected = values.map((a) => true);
  const actual = values.map(isArrayLike);
  assertEquals(actual, expected);
});

Deno.test("should return `false` for non-arrays", function () {
  assertEquals(isArrayLike(true), false);
  assertEquals(isArrayLike(new Date()), false);
  assertEquals(isArrayLike(new Error()), false);
  assertEquals(isArrayLike(() => {}), false);
  assertEquals(isArrayLike(async () => {}), false);
  assertEquals(isArrayLike({ "a": 1 }), false);
  assertEquals(isArrayLike(1), false);
  assertEquals(isArrayLike(/x/), false);
  assertEquals(isArrayLike(Symbol("x")), false);
});
