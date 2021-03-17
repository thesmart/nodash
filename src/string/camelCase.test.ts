import { assertStrictEquals } from "../test_deps.ts"
import { camelCase } from "./camelCase.ts"

Deno.test('should work with numbers', function() {
  assertStrictEquals(camelCase('12 feet'), '12Feet');
  assertStrictEquals(camelCase('enable 6h format'), 'enable6HFormat');
  assertStrictEquals(camelCase('enable 24H format'), 'enable24HFormat');
  assertStrictEquals(camelCase('too legit 2 quit'), 'tooLegit2Quit');
  assertStrictEquals(camelCase('walk 500 miles'), 'walk500Miles');
  assertStrictEquals(camelCase('xhr2 request'), 'xhr2Request');
});

Deno.test('should handle acronyms', function() {
  ['safe HTML', 'safeHTML'].forEach(function(string) {
    assertStrictEquals(camelCase(string), 'safeHtml');
  });

  ['escape HTML entities', 'escapeHTMLEntities'].forEach(function(string) {
    assertStrictEquals(camelCase(string), 'escapeHtmlEntities');
  });

  ['XMLHttpRequest', 'XmlHTTPRequest'].forEach(function(string) {
    assertStrictEquals(camelCase(string), 'xmlHttpRequest');
  });
});
