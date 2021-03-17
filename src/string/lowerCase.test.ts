import { testCaseMethods } from "./_caseMethodsTests.ts"
import { lowerCase } from "./lowerCase.ts"
import { assertStrictEquals } from "../test_deps.ts"

testCaseMethods(lowerCase)

Deno.test('should lowercase as space-separated words', function() {
  assertStrictEquals(lowerCase('--Foo-Bar--'), 'foo bar');
  assertStrictEquals(lowerCase('fooBar'), 'foo bar');
  assertStrictEquals(lowerCase('__FOO_BAR__'), 'foo bar');
});
