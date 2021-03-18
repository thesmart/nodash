import { assertEquals, assertStrictEquals, falsey } from "../test_deps.ts";
import { isPrototype } from "./isPrototype.ts";

Deno.test("should detect prototype objects", function () {
  assertStrictEquals(isPrototype({}), false);
  assertStrictEquals(isPrototype(Object.prototype), true);
  class Foo {}
  assertStrictEquals(isPrototype(Foo.prototype), true);
});
