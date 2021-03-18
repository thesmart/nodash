import { assertStrictEquals } from "../test_deps.ts";
import { snakeCase } from "./snakeCase.ts";

Deno.test("should work with numbers", function () {
  assertStrictEquals(snakeCase("12 feet"), "12_feet");
  assertStrictEquals(snakeCase("enable 6h format"), "enable_6_h_format");
  assertStrictEquals(snakeCase("enable 24H format"), "enable_24_h_format");
  assertStrictEquals(snakeCase("too legit 2 quit"), "too_legit_2_quit");
  assertStrictEquals(snakeCase("walk 500 miles"), "walk_500_miles");
  assertStrictEquals(snakeCase("xhr2 request"), "xhr_2_request");
});
