# nodash

A partial port of [`lodash`](https://lodash.com/) and test suit to TypeScript
for the Deno JavaScript runtime.

**Project goals:**

- have the most identical port of `lodash` implementation (line-by-line)
- have the most identical test suite (line-by-line) of `lodash`
- not a complete `lodash` port: only the parts needed in ECMA 6
- fully typed in TypeScript and passes `deno lint`
- can import individual functions (`_` symbol is optional, i.e. "nodash")
- each release tag of `nodash` will reference a `lodash` release tag

**Changes from Lodash**

- many public functions have been excluded if an equivalent ECMA 6 feature
  exists
- `get`, `has`, etc. no longer take `path: Array<string|symbol>`, only
  `path: string`
- private function `_caseFirst` has a different signature

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

✨💎✨ Contributions are welcome. ✨💎✨

For additional ports, please:

1. open an issue w/ proposal
2. open a PR w/ code contribution (linked to issue)
3. include all relevant tests from lodash (ported)
4. pass `deno lint` and run `deno fmt`

## nodash-cli

To update the `mod.ts` file:

```shell
# scans all ./src/**/*.ts files for exported functions w/ @export jsdoc tags
./nodash-cli --update-mod
```
