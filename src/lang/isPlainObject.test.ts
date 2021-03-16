import { assertEquals, assertExists, assertStrictEquals, falsey } from "../test_deps.ts"
import { isPlainObject } from "./isPlainObject.ts"

Deno.test('should detect plain objects', function() {
  // @ts-ignore: it's a test where type is non-important
  function Foo(a) {
    // @ts-ignore: it's a test where type is non-important
    this.a = 1
  }

  assertStrictEquals(isPlainObject({}), true)
  assertStrictEquals(isPlainObject({ 'a': 1 }), true)
  assertStrictEquals(isPlainObject({ 'constructor': Foo }), true)
  assertStrictEquals(isPlainObject([1, 2, 3]), false)
  // @ts-ignore: it's a test where type is non-important
  assertStrictEquals(isPlainObject(new Foo(1)), false)
})

Deno.test('should return `true` for objects with a `[[Prototype]]` of `null`', function() {
  const object = Object.create(null)
  assertStrictEquals(isPlainObject(object), true)

  object.constructor = Object.prototype.constructor
  assertStrictEquals(isPlainObject(object), true)
})

Deno.test('should return `true` for objects with a `valueOf` property', function() {
  assertStrictEquals(isPlainObject({ 'valueOf': 0 }), true)
})

Deno.test('should return `false` for objects with a custom `[[Prototype]]`', function() {
  const object = Object.create({ 'a': 1 })
  assertStrictEquals(isPlainObject(object), false)
})

Deno.test('should return `false` for non-Object objects', function() {
  assertStrictEquals(isPlainObject(arguments), false)
  assertStrictEquals(isPlainObject(Error), false)
  assertStrictEquals(isPlainObject(Math), false)
})

Deno.test('should return `false` for non-objects', function() {
  const expected = falsey.map(() => false)
  const actual = falsey.map(isPlainObject)
  assertEquals(actual, expected)

  assertStrictEquals(isPlainObject(true), false)
  assertStrictEquals(isPlainObject('a'), false)
  assertStrictEquals(isPlainObject(Symbol("x")), false)
})

Deno.test('should return `false` for objects with a read-only `Symbol.toStringTag` property', function() {
  if (Symbol && Symbol.toStringTag) {
    const object = {}
    Object.defineProperty(object, Symbol.toStringTag, {
      'configurable': true,
      'enumerable': false,
      'writable': false,
      'value': 'X'
    })

    assertEquals(isPlainObject(object), false)
  }
})
