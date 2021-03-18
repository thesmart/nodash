import { throttle } from "./throttle.ts"
import { assertEquals, assertNotStrictEquals, assertStrictEquals, delay } from "../test_deps.ts"

/**
 * **Note** - If you see `AssertionError: Test case is leaking async
 *  ops.`, be sure to call `throttled.cancel()`
 */

Deno.test('should throttle a function', async () => {
  let callCount = 0;
  const throttled = throttle(function() { callCount++; }, 32);

  throttled();
  throttled();
  throttled();

  let lastCount = callCount;
  assertEquals(callCount > 0, true);

  await delay(64)
  assertEquals(callCount > lastCount, true);
  throttled.cancel();
});

Deno.test('subsequent calls should return the result of the first call', async () => {
  // deno-lint-ignore no-explicit-any
  const throttled = throttle((x: any) => x, 32)
  let results = [throttled('a'), throttled('b')];

  assertEquals(results, ['a', 'a']);

  await delay(64)
  results = [throttled('c'), throttled('d')];
  assertNotStrictEquals(results[0], 'a');
  assertNotStrictEquals(results[0], undefined);

  assertNotStrictEquals(results[1], 'd');
  assertNotStrictEquals(results[1], undefined);
  throttled.cancel();
});

Deno.test('should not trigger a trailing call when invoked once', async () => {
  var callCount = 0,
      throttled = throttle(function() { callCount++; }, 32);

  throttled();
  assertStrictEquals(callCount, 1);

  await delay(64)
  assertStrictEquals(callCount, 1);
  throttled.cancel();
});

[...Array(2)].forEach(function(_, index) {
  Deno.test('should trigger a call when invoked repeatedly' + (index ? ' and `leading` is `false`' : ''), async () => {
    let callCount = 0
    const limit = 1000
    const options = index ? { 'leading': false } : {}
    const throttled = throttle(function() { callCount++; }, 32, options);

    const start = Date.now();
    while ((Date.now() - start) < limit) {
      throttled();
    }
    const actual = callCount > 1;
    await delay(1)
    assertStrictEquals(actual, true);
    throttled.cancel();

    // @TODO: file a bug. This works around a bug in Deno's async counters
    await delay(100)
  });
});

Deno.test('should trigger a second throttled call as soon as possible', async () => {
  let callCount = 0;

  const throttled = throttle(function() {
    callCount++;
  }, 128, { 'leading': false });

  throttled();

  await delay(192)
  assertStrictEquals(callCount, 1);
  throttled();

  await delay(62)
  assertStrictEquals(callCount, 1);

  await delay(130)
  assertStrictEquals(callCount, 2);

  throttled.cancel()
});

Deno.test('should apply default options', async () => {
  let callCount = 0
  const throttled = throttle(function() { callCount++; }, 32, {});

  throttled();
  throttled();
  assertStrictEquals(callCount, 1);

  await delay(128)
  assertStrictEquals(callCount, 2);

  throttled.cancel()
});

Deno.test('should support a `leading` option', function() {
  // deno-lint-ignore no-explicit-any
  const identity = (x: any) => x
  const withLeading = throttle(identity, 32, { 'leading': true });
  assertStrictEquals(withLeading('a'), 'a');

  const withoutLeading = throttle(identity, 32, { 'leading': false });
  assertStrictEquals(withoutLeading('a'), undefined);

  withLeading.cancel()
  withoutLeading.cancel()
});

Deno.test('should support a `trailing` option', async () => {
  let withCount = 0,
      withoutCount = 0;

  const withTrailing = throttle(function(value) {
    withCount++;
    return value;
  }, 64, { 'trailing': true });

  const withoutTrailing = throttle(function(value) {
    withoutCount++;
    return value;
  }, 64, { 'trailing': false });

  assertStrictEquals(withTrailing('a'), 'a');
  assertStrictEquals(withTrailing('b'), 'a');

  assertStrictEquals(withoutTrailing('a'), 'a');
  assertStrictEquals(withoutTrailing('b'), 'a');

  await delay(256)
  assertStrictEquals(withCount, 2);
  assertStrictEquals(withoutCount, 1);

  withTrailing.cancel()
  withoutTrailing.cancel()
});

Deno.test('should not update `lastCalled`, at the end of the timeout, when `trailing` is `false`', async () => {
  let callCount = 0;

  const throttled = throttle(function() {
    callCount++;
  }, 64, { 'trailing': false });

  throttled();
  throttled();

  await delay(96)
  throttled();
  throttled();

  await delay(96)
  assertStrictEquals(callCount > 1, true);

  throttled.cancel()
});
