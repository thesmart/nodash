import { capitalize } from "./capitalize.ts"
import { assertStrictEquals } from "../test_deps.ts"

Deno.test('should capitalize the first character of a string', function() {
  assertStrictEquals(capitalize('fred'), 'Fred');
  assertStrictEquals(capitalize('Fred'), 'Fred');
  assertStrictEquals(capitalize(' fred'), ' fred');
});
