import {
  assertEquals,
  assertNotStrictEquals,
  assertStrictEquals,
} from "../test_deps.ts";
import { toPath } from "./toPath.ts";
import { isSymbol } from "../lang/isSymbol.ts";

Deno.test("should convert a string to a path", () => {
  assertEquals(toPath("a.b.c"), ["a", "b", "c"]);
  assertEquals(toPath("a[0].b.c"), ["a", "0", "b", "c"]);
});

Deno.test("should coerce array elements to strings", () => {
  let array = ["a", "b", "c"];
  for (const value of [array, array.map(Object)]) {
    const path = toPath(value);
    assertEquals(path, array);
    assertNotStrictEquals(path, array);
  }
});

Deno.test("should return new path array", () => {
  assertNotStrictEquals(toPath("a.b.c"), toPath("a.b.c"));
});

Deno.test("should not coerce symbols to strings", () => {
  let symbol = Symbol("a");
  let object = Object(symbol);
  for (const value of [symbol, object, [symbol], [object]]) {
    const actual = toPath(value);
    assertEquals(
      isSymbol(actual[0]),
      true,
      `symbol was not preserved: ${Deno.inspect(value)}`,
    );
  }
});

Deno.test("should handle complex paths", () => {
  const actual = toPath("a[-1.23][\"[\\\"b\\\"]\"].c['[\\'d\\']'][\ne\n][f].g");
  assertEquals(actual, [
    "a",
    "-1.23",
    '["b"]',
    "c",
    "['d']",
    "\ne\n",
    "f",
    "g",
  ]);
});

Deno.test("should handle consecutive empty brackets and dots", () => {
  let expected = ["", "a"];
  assertEquals(toPath(".a"), expected);
  assertEquals(toPath("[].a"), expected);

  expected = ["", "", "a"];
  assertEquals(toPath("..a"), expected);
  assertEquals(toPath("[][].a"), expected);

  expected = ["a", "", "b"];
  assertEquals(toPath("a..b"), expected);
  assertEquals(toPath("a[].b"), expected);

  expected = ["a", "", "", "b"];
  assertEquals(toPath("a...b"), expected);
  assertEquals(toPath("a[][].b"), expected);

  expected = ["a", ""];
  assertEquals(toPath("a."), expected);
  assertEquals(toPath("a[]"), expected);

  expected = ["a", "", ""];
  assertEquals(toPath("a.."), expected);
  assertEquals(toPath("a[][]"), expected);
});
