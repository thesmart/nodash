# nodash

A partial port of [`lodash`](https://lodash.com/) and test suit to TypeScript 
for the Deno JavaScript runtime.

**Project goals:**
- mostly identicle port of `lodash` implementation (line-by-line)
- mostly identicle port of `lodash` test suite (line-by-line)
- port only the parts of `lodash` that are most useful for use in Deno
- fully typed for use in TypeScript and passes Deno linter
- can import individual functions (`_` symbol is optional, i.e. "nodash")
- each release tag of `nodash` will reference a `lodash` release tag

## Usage

For the bold:

```js
import {
  isEmpty,
  isNull,
  isUndefined,
} from "https://deno.land/x/nodash/src/mod.ts";
```

For the familiar:

```js
import * as _ from "https://deno.land/x/nodash/src/mod.ts";
```

## Project status:

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

## Contributions

Contributions are welcome. For additional ports, please:

1. open an issue w/ proposal
2. open a PR w/ code contribution (linked to issue)
3. include all relevant tests from lodash (ported)
4. pass `deno lint` and run `deno fmt`

✨💎✨
