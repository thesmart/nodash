# nodash

A minimal port of [lodash](https://lodash.com/) / underscore for the Deno
JavaScript runtime.

This port is based on lodash version `4.17.9-es`. It attempts to be as close as
possible to the base lodash implementation.

There are parts of lodash that are excluded due to being superfluous in modern
JavaScript. There are other parts that have not been ported simply due to time
constraints.

Project goals:

- can import individual functions without a `_` symbol (hence: "nodash")
- fully typed for use in TypeScript and passes Deno linter
- mostly complete port of lodash tests

Project status:

- [x] Partial **Lang** port of all "is" functions (e.g. `isString`, `isEmpty`,
  etc.)
- [x] Partial **Lang** port of "to" functions:
  - [x] `toFinite`
  - [x] `toInteger`
  - [x] `toNumber`
  - [x] `toSafeInteger`
  - [x] `toString`
- [x] **Function**
  - [x] `debounce`
  - [x] `throttle`
- [ ] **Object**
  - [x] `get`
  - [x] `has`
  - [ ] `set`
  - [ ] `unset`
- [x] **String**
  - [x] `deburr`
  - [x] `camelCase`
  - [x] `capitalize`
  - [x] `kebabCase`
  - [x] `lowerCase`
  - [x] `snakeCase`
  - [x] `startCase`
  - [x] `upperCase`
  - [x] `words`

## Installation

For the bold:

```js
import {
  isEmpty,
  isNull,
  isUndefined,
} from "https://raw.githubusercontent.com/thesmart/nodash/main/mod.ts";
```

For the familiar:

```js
import * as _ from "https://raw.githubusercontent.com/thesmart/nodash/main/mod.ts";
```

## Contributions

Contributions are welcome. For additional ports, please:

1. open an issue w/ proposal
2. open a PR w/ code contribution (linked to issue)
3. include tests
4. run `deno lint` and `deno fmt`

✨💎✨
