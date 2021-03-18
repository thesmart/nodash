import { deburr, deburredLetters } from "./deburr.ts";
import { assertEquals, comboMarks } from "../test_deps.ts";

Deno.test("should convert Latin Unicode letters to basic Latin", function () {
  const actual = Object.keys(deburredLetters).map(deburr);
  assertEquals(actual, Object.values(deburredLetters));
});

Deno.test("should not deburr Latin mathematical operators", function () {
  const operators = ["\xd7", "\xf7"];
  const actual = operators.map(deburr);
  assertEquals(actual, operators);
});

Deno.test("should deburr combining diacritical marks", function () {
  const expected = comboMarks.map(() => "ei");
  const actual = comboMarks.map((chr) => deburr("e" + chr + "i"));
  assertEquals(actual, expected);
});
