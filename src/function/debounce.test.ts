import { debounce } from "./debounce.ts";
import {
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
} from "../test_deps.ts";
import { delay } from "../test_deps.ts";

/**
 * **Note** - If you see `AssertionError: Test case is leaking async
 *  ops.`, be sure to call `debounced.cancel()`
 */

Deno.test("should debounce a function", async () => {
  let callCount = 0;

  const debounced = debounce(function (string: string) {
    ++callCount;
    return string;
  }, 32);

  await new Promise<void>((resolve) => {
    const results = [debounced("a"), debounced("b"), debounced("c")];
    assertEquals(results, [undefined, undefined, undefined]);
    assertStrictEquals(callCount, 0);

    setTimeout(function () {
      assertStrictEquals(callCount, 1);

      const results = [debounced("d"), debounced("e"), debounced("f")];
      assertEquals(results, ["c", "c", "c"]);
      assertStrictEquals(callCount, 1);
    }, 128);

    setTimeout(function () {
      assertStrictEquals(callCount, 2);
      resolve();
    }, 256);
  });

  debounced.cancel();
});

Deno.test("subsequent debounced calls return the last `func` result", async () => {
  const debounced = debounce((s: string) => s, 32);
  debounced("a");

  await new Promise<void>((resolve) => {
    setTimeout(function () {
      assertNotEquals(debounced("b"), "b");
    }, 64);

    setTimeout(function () {
      assertNotEquals(debounced("c"), "c");
      resolve();
    }, 128);
  });

  debounced.cancel();
});

Deno.test("should not immediately call `func` when `wait` is `0`", async () => {
  let callCount = 0;
  const debounced = debounce(function () {
    ++callCount;
  }, 0);

  await new Promise<void>((resolve) => {
    debounced();
    debounced();
    assertStrictEquals(callCount, 0);

    setTimeout(function () {
      assertStrictEquals(callCount, 1);
      resolve();
    }, 5);
  });

  debounced.cancel();
});

Deno.test("should apply default options", async () => {
  let callCount = 0;
  const debounced = debounce(
    function () {
      callCount++;
    },
    32,
    {},
  );

  await new Promise<void>((resolve) => {
    debounced();
    assertStrictEquals(callCount, 0);

    setTimeout(function () {
      assertStrictEquals(callCount, 1);
      resolve();
    }, 64);
  });

  debounced.cancel();
});

Deno.test("should support a `leading` option", async () => {
  const callCounts = [0, 0];

  const withLeading = debounce(
    function () {
      callCounts[0]++;
    },
    32,
    { "leading": true },
  );

  const withLeadingAndTrailing = debounce(
    function () {
      callCounts[1]++;
    },
    32,
    { "leading": true },
  );

  await new Promise<void>((resolve) => {
    withLeading();
    assertStrictEquals(callCounts[0], 1);

    withLeadingAndTrailing();
    withLeadingAndTrailing();
    assertStrictEquals(callCounts[1], 1);

    setTimeout(function () {
      assertEquals(callCounts, [1, 2]);

      withLeading();
      assertStrictEquals(callCounts[0], 2);

      resolve();
    }, 64);
  });

  withLeading.cancel();
  withLeadingAndTrailing.cancel();
});

Deno.test("subsequent leading debounced calls return the last `func` result", async () => {
  const debounced = debounce((s: string) => s, 32, {
    "leading": true,
    "trailing": false,
  });
  const results = [debounced("a"), debounced("b")];

  assertEquals(results, ["a", "a"]);

  await new Promise<void>((resolve) => {
    setTimeout(function () {
      const results = [debounced("c"), debounced("d")];
      assertEquals(results, ["c", "c"]);
      resolve();
    }, 64);
  });

  debounced.cancel();
});

Deno.test("should support a `trailing` option", async () => {
  let withCount = 0;
  let withoutCount = 0;

  const withTrailing = debounce(
    function () {
      withCount++;
    },
    32,
    { "trailing": true },
  );

  const withoutTrailing = debounce(
    function () {
      withoutCount++;
    },
    32,
    { "trailing": false },
  );

  await new Promise<void>((resolve) => {
    withTrailing();
    assertStrictEquals(withCount, 0);

    withoutTrailing();
    assertStrictEquals(withoutCount, 0);

    setTimeout(function () {
      assertStrictEquals(withCount, 1);
      assertStrictEquals(withoutCount, 0);
      resolve();
    }, 64);
  });

  withTrailing.cancel();
  withoutTrailing.cancel();
});

Deno.test("should support a `maxWait` option", async () => {
  let callCount = 0;

  const debounced = debounce(
    function () {
      ++callCount;
    },
    32,
    { "maxWait": 64 },
  );

  await new Promise<void>((resolve) => {
    debounced();
    debounced();
    assertStrictEquals(callCount, 0);

    setTimeout(function () {
      assertStrictEquals(callCount, 1);
      debounced();
      debounced();
      assertStrictEquals(callCount, 1);
    }, 128);

    setTimeout(function () {
      assertStrictEquals(callCount, 2);
      resolve();
    }, 256);
  });

  debounced.cancel();
});

Deno.test("should support `maxWait` in a tight loop", async () => {
  const limit = 1000;
  let withCount = 0;
  let withoutCount = 0;

  const withMaxWait = debounce(
    function () {
      withCount++;
    },
    64,
    { "maxWait": 128 },
  );

  const withoutMaxWait = debounce(function () {
    withoutCount++;
  }, 96);

  const start = Date.now();

  await new Promise<void>((resolve) => {
    // @ts-ignore: it's a test where type is non-important
    while ((Date.now() - start) < limit) {
      withMaxWait();
      withoutMaxWait();
    }
    const actual = [Boolean(withoutCount), Boolean(withCount)];
    setTimeout(function () {
      assertEquals(actual, [false, true]);
      resolve();
    }, 1);
  });

  withMaxWait.cancel();
  withoutMaxWait.cancel();
  // @TODO: file a bug. This works around a bug in Deno's async counters
  await delay(100);
});

Deno.test("should queue a trailing call for subsequent debounced calls after `maxWait`", async () => {
  let callCount = 0;

  const debounced = debounce(
    function () {
      ++callCount;
    },
    200,
    { "maxWait": 200 },
  );

  debounced();

  await new Promise<void>((resolve) => {
    setTimeout(debounced, 190);
    setTimeout(debounced, 200);
    setTimeout(debounced, 210);

    setTimeout(function () {
      assertStrictEquals(callCount, 2);
      resolve();
    }, 500);
  });

  debounced.cancel();
});

Deno.test("should cancel `maxDelayed` when `delayed` is invoked", async () => {
  let callCount = 0;

  const debounced = debounce(
    function () {
      callCount++;
    },
    32,
    { "maxWait": 64 },
  );

  await new Promise<void>((resolve) => {
    debounced();

    setTimeout(function () {
      debounced();
      assertStrictEquals(callCount, 1);
    }, 128);

    setTimeout(function () {
      assertStrictEquals(callCount, 2);
      resolve();
    }, 192);
  });

  debounced.cancel();
});

Deno.test("should invoke the trailing call with the correct arguments and `this` binding", async () => {
  // deno-lint-ignore no-explicit-any
  let actual: any[];
  let callCount = 0;
  const object = {};

  const debounced = debounce(
    // deno-lint-ignore no-explicit-any
    function (this: any, value) {
      actual = [this];
      Array.prototype.push.call(actual, ...arguments);
      return ++callCount != 2;
    },
    32,
    { leading: true, maxWait: 64 },
  );

  await new Promise<void>((resolve) => {
    while (true) {
      if (!debounced.call(object, "a")) {
        break;
      }
    }
    setTimeout(function () {
      assertStrictEquals(callCount, 2);
      assertEquals(actual, [object, "a"]);
      resolve();
    }, 64);
  });

  debounced.cancel();
});
