import { assertEquals, falsey } from "../test_deps.ts"
import { isBoolean } from "./isBoolean.ts"

Deno.test('should return `true` for booleans', function() {
  assertEquals(isBoolean(true), true);
  assertEquals(isBoolean(false), true);
  assertEquals(isBoolean(Object(true)), true);
  assertEquals(isBoolean(Object(false)), true);
});

Deno.test('should return `false` for non-booleans', function() {
  const expected = falsey.map((a) => a === false)
  const actual = falsey.map(isBoolean);
  assertEquals(actual, expected);

  assertEquals(isBoolean(arguments), false);
  assertEquals(isBoolean(new Date), false);
  assertEquals(isBoolean(new Error), false);
  assertEquals(isBoolean(() => {}), false);
  assertEquals(isBoolean(async () => {}), false);
  assertEquals(isBoolean({ 'a': 1 }), false);
  assertEquals(isBoolean(1), false);
  assertEquals(isBoolean(/x/), false);
  assertEquals(isBoolean(Symbol("x")), false);
})
