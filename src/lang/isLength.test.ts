import { isLength } from "./isLength.ts";
import { assertEquals } from "../test_deps.ts";
import { MAX_SAFE_INTEGER } from "./consts.ts";

Deno.test("should return `true` for lengths", function () {
  const values = [0, 3, MAX_SAFE_INTEGER];
  const expected = values.map(() => true);
  const actual = values.map(isLength);
  assertEquals(actual, expected);
});

Deno.test("should return `false` for non-lengths", function () {
  const values = [-1, "1", 1.1, MAX_SAFE_INTEGER + 1];
  const expected = values.map(() => false);
  const actual = values.map(isLength);
  assertEquals(actual, expected);
});
