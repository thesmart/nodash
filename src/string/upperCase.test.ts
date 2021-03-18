import { testCaseMethods } from "./_caseMethodsTests.ts";
import { upperCase } from "./upperCase.ts";
import { assertStrictEquals } from "../test_deps.ts";

testCaseMethods(upperCase);

Deno.test("should uppercase as space-separated words", function () {
  assertStrictEquals(upperCase("--foo-bar--"), "FOO BAR");
  assertStrictEquals(upperCase("fooBar"), "FOO BAR");
  assertStrictEquals(upperCase("__foo_bar__"), "FOO BAR");
});
