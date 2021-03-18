# nodash

A partial port of [lodash](https://lodash.com/) and test suit to TypeScript 
for the Deno JavaScript runtime.

Excluded are the parts of lodash that seem superfluous in modern
JavaScript and/or not of the "Deno way". The included parts are nearly
identicle to the lodash implementation, including the lodash test suite.

This port is based on lodash version `4.17.9-es`. It attempts to be as close as
possible (line-by-line) to the lodash implementation, but updated for Deno.
This means all included lodash functions can be imported individually and
include full TypeScript bindings.

Project goals:

- can import individual functions, using `_` symbol is optional (hence: "nodash")
- fully typed for use in TypeScript and passes Deno linter
- mostly identicle port of lodash implementation
- mostly identicle port of lodash test suite

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
} from "https://deno.land/x/nodash/mod.ts";
```

For the familiar:

```js
import * as _ from "https://deno.land/x/nodash/mod.ts";
```

## Contributions

Contributions are welcome. For additional ports, please:

1. open an issue w/ proposal
2. open a PR w/ code contribution (linked to issue)
3. include all relevant tests from lodash (ported)
4. pass `deno lint` and run `deno fmt`

✨💎✨
