import { assertEquals, assertStrictEquals } from "../test_deps.ts";

export function testCaseMethods(func: (s: string) => string) {
  const methodName = func.name;
  const caseName = methodName.replace(/Case$/, "");

  const strings = [
    "foo bar",
    "Foo bar",
    "foo Bar",
    "Foo Bar",
    "FOO BAR",
    "fooBar",
    "--foo-bar--",
    "__foo_bar__",
  ];

  const converted = (function () {
    switch (caseName) {
      case "camel":
        return "fooBar";
      case "kebab":
        return "foo-bar";
      case "lower":
        return "foo bar";
      case "snake":
        return "foo_bar";
      case "start":
        return "Foo Bar";
      case "upper":
        return "FOO BAR";
    }
  }());

  Deno.test(`${methodName} should convert \`string\` to ${caseName} case`, function () {
    const actual = strings.map((string) => {
      const expected = (caseName == "start" && string == "FOO BAR")
        ? string
        : converted;
      return func(string) === expected;
    });

    assertEquals(actual, strings.map(() => true));
  });

  Deno.test(`${methodName} should handle double-converting strings`, function () {
    const actual = strings.map((string) => {
      const expected = (caseName == "start" && string == "FOO BAR")
        ? string
        : converted;
      return func(func(string)) === expected;
    });

    assertEquals(actual, strings.map(() => true));
  });

  Deno.test(`${methodName} should remove contraction apostrophes`, function () {
    const postfixes = ["d", "ll", "m", "re", "s", "t", "ve"];

    ["'", "\u2019"].forEach((apos) => {
      const actual = postfixes.map((postfix) => {
        return func("a b" + apos + postfix + " c");
      });

      const expected = postfixes.map((postfix) => {
        switch (caseName) {
          case "camel":
            return "aB" + postfix + "C";
          case "kebab":
            return "a-b" + postfix + "-c";
          case "lower":
            return "a b" + postfix + " c";
          case "snake":
            return "a_b" + postfix + "_c";
          case "start":
            return "A B" + postfix + " C";
          case "upper":
            return "A B" + postfix.toUpperCase() + " C";
        }
      });

      assertEquals(actual, expected);
    });
  });

  Deno.test(`${methodName} should remove Latin mathematical operators`, function () {
    const actual = ["\xd7", "\xf7"].map(func);
    assertEquals(actual, ["", ""]);
  });

  Deno.test(`${methodName} should coerce \`string\` to a string`, function () {
    const string = "foo bar";
    assertStrictEquals(func(Object(string)), converted);
    // @ts-ignore: it's a test where type is non-important
    assertStrictEquals(
      // @ts-ignore: it's a test where type is non-important
      func({ toString: () => string }),
      converted,
    );
  });
}
