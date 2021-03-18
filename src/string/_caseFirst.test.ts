import { assertStrictEquals } from "../test_deps.ts";
import { caseFirst } from "./_caseFirst.ts";

Deno.test("should uppercase only the first character", function () {
  assertStrictEquals(caseFirst("fred", "toUpperCase"), "Fred");
  assertStrictEquals(caseFirst("Fred", "toUpperCase"), "Fred");
  assertStrictEquals(caseFirst("FRED", "toUpperCase"), "FRED");
  assertStrictEquals(caseFirst("fred", "toLowerCase"), "fred");
  assertStrictEquals(caseFirst("Fred", "toLowerCase"), "fred");
  assertStrictEquals(caseFirst("FRED", "toLowerCase"), "fRED");

  assertStrictEquals(caseFirst("Ʊred", "toLowerCase"), "ʊred");
  assertStrictEquals(caseFirst("Ⱥred", "toLowerCase"), "ⱥred");
  assertStrictEquals(caseFirst("ГRED", "toLowerCase"), "гRED");
});
