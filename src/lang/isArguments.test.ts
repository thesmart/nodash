import { assertStrictEquals } from "../test_deps.ts"
import { isArguments } from "./isArguments.ts"
import { falsey } from "../test_deps.ts"

const args = (function(...args: number[]) { return arguments; }(1, 2, 3));
Deno.test('should return `true` for `arguments` objects', function() {
  assertStrictEquals(isArguments(args), true);
});

Deno.test('should return `false` for non `arguments` objects', function() {
  falsey.map((f) => isArguments(f)).forEach((f) => {
    assertStrictEquals(f, false);
  })
  assertStrictEquals(isArguments([1, 2, 3]), false);
  assertStrictEquals(isArguments(true), false);
  assertStrictEquals(isArguments(new Date), false);
  assertStrictEquals(isArguments(new Error), false);
  assertStrictEquals(isArguments(1), false);
  assertStrictEquals(isArguments(/x/), false);
  assertStrictEquals(isArguments("a"), false);
  assertStrictEquals(isArguments(Symbol("x")), false);
});
