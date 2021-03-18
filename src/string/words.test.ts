import { deburredLetters } from "./deburr.ts";
import { assertEquals } from "../test_deps.ts";
import { words } from "./words.ts";

Deno.test("should match words containing Latin Unicode letters", function () {
  var expected = Object.keys(deburredLetters).map((letter) => [letter]);
  var actual = Object.keys(deburredLetters).map((letter) => words(letter));
  assertEquals(actual, expected);
});

Deno.test("should support a `pattern`", function () {
  assertEquals(words("abcd", /ab|cd/g), ["ab", "cd"]);
  assertEquals(Array.from(words("abcd", "ab|cd")), ["ab"]);
});

Deno.test("should work with compound words", function () {
  assertEquals(words("12ft"), ["12", "ft"]);
  assertEquals(words("aeiouAreVowels"), ["aeiou", "Are", "Vowels"]);
  assertEquals(words("enable 6h format"), ["enable", "6", "h", "format"]);
  assertEquals(words("enable 24H format"), ["enable", "24", "H", "format"]);
  assertEquals(words("isISO8601"), ["is", "ISO", "8601"]);
  assertEquals(words("LETTERSAeiouAreVowels"), [
    "LETTERS",
    "Aeiou",
    "Are",
    "Vowels",
  ]);
  assertEquals(words("tooLegit2Quit"), ["too", "Legit", "2", "Quit"]);
  assertEquals(words("walk500Miles"), ["walk", "500", "Miles"]);
  assertEquals(words("xhr2Request"), ["xhr", "2", "Request"]);
  assertEquals(words("XMLHttp"), ["XML", "Http"]);
  assertEquals(words("XmlHTTP"), ["Xml", "HTTP"]);
  assertEquals(words("XmlHttp"), ["Xml", "Http"]);
});

Deno.test("should work with compound words containing diacritical marks", function () {
  assertEquals(words("LETTERSÆiouAreVowels"), [
    "LETTERS",
    "Æiou",
    "Are",
    "Vowels",
  ]);
  assertEquals(words("æiouAreVowels"), ["æiou", "Are", "Vowels"]);
  assertEquals(words("æiou2Consonants"), ["æiou", "2", "Consonants"]);
});

Deno.test("should not treat contractions as separate words", function () {
  var postfixes = ["d", "ll", "m", "re", "s", "t", "ve"];

  ["'", "\u2019"].forEach(function (apos) {
    [...Array(2)].forEach(function (_, index) {
      var actual = postfixes.map(function (postfix) {
        var string = "a b" + apos + postfix + " c";
        return words(string[index ? "toUpperCase" : "toLowerCase"]());
      });

      var expected = postfixes.map(function (postfix) {
        var words = ["a", "b" + apos + postfix, "c"];
        return words.map(function (word) {
          return word[index ? "toUpperCase" : "toLowerCase"]();
        });
      });

      assertEquals(actual, expected);
    });
  });
});

Deno.test("should not treat ordinal numbers as separate words", function () {
  var ordinals = ["1st", "2nd", "3rd", "4th"];

  [...Array(2)].forEach(function (_, index) {
    var expected = ordinals.map(function (ordinal) {
      return [ordinal[index ? "toUpperCase" : "toLowerCase"]()];
    });

    var actual = expected.map(function (expectedWords) {
      return words(expectedWords[0]);
    });

    assertEquals(actual, expected);
  });
});

Deno.test("should not treat mathematical operators as words", function () {
  const operators = ["\xac", "\xb1", "\xd7", "\xf7"];
  const expected = operators.map(() => []);
  const actual = operators.map(words);
  assertEquals(actual, expected);
});

Deno.test("should not treat punctuation as words", function () {
  var marks = [
    "\u2012",
    "\u2013",
    "\u2014",
    "\u2015",
    "\u2024",
    "\u2025",
    "\u2026",
    "\u205d",
    "\u205e",
  ];

  const expected = marks.map(() => []);
  const actual = marks.map(words);
  assertEquals(actual, expected);
});

Deno.test("should prevent ReDoS", function () {
  const largeWordLen = 50000,
    largeWord = "A".repeat(largeWordLen),
    maxMs = 1000,
    startTime = Date.now();

  assertEquals(words(largeWord + "ÆiouAreVowels"), [
    largeWord,
    "Æiou",
    "Are",
    "Vowels",
  ]);

  const endTime = Date.now(),
    timeSpent = endTime - startTime;

  assertEquals(timeSpent < maxMs, true, "operation took " + timeSpent + "ms");
});
