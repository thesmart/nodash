import { assertStrictEquals } from "../test_deps.ts";
import { toFinite } from "./toFinite.ts";
import { MAX_INTEGER } from "./consts.ts";

Deno.test("should convert infinities to finite values", function () {
  assertStrictEquals(toFinite(3.2), 3.2);
  assertStrictEquals(toFinite(Number.MIN_VALUE), Number.MIN_VALUE);
  assertStrictEquals(toFinite(Infinity), MAX_INTEGER);
  assertStrictEquals(toFinite(-Infinity), -MAX_INTEGER);
  assertStrictEquals(toFinite("3.2"), 3.2);
});
