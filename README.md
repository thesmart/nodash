# nodash
A minimal port of [lodash](https://lodash.com/) / underscore for the Deno JavaScript runtime.

This port is based on lodash version `4.17.9-es`. It attempts to be as close as possible to the base lodash 
implementation. 

There are parts of lodash that are excluded due to being superfluous in modern JavaScript.
 There are other parts that have not been ported simply due to time constraints.

Project goals:
 * can import individual functions without a `_` symbol (hence: "nodash")
 * fully typed for use in TypeScript and passes Deno linter
 * mostly complete port of lodash tests

Project status:
 - [x] Complete `lang` port of all "is" functions (e.g. `isString`, `isEmpty`, etc.)
 - [x] Partial `lang` port of "to" functions:
   - `toFinite`, `toInteger`, `toNumber`, `toSafeInteger`, `toString`
 - [ ] Function `debounce` and `throttle`
 - [ ] Object `get`, `has`, `set`, `unset`
 - [ ] String `camelCase`, `capitalize`, `kebabCase`, and `snakeCase`

## Installation

For the bold:
```js
import { isEmpty, isNull, isUndefined } from "https://raw.githubusercontent.com/thesmart/nodash/main/mod.ts"
```

For the familiar:
```js
import * as _ from "https://raw.githubusercontent.com/thesmart/nodash/main/mod.ts"
```

## Contributions

Contributions are welcome. For additional ports, please:

 1. open an issue w/ proposal
 1. open a PR w/ code contribution (linked to issue)
 1. include tests
 1. run `deno lint` and `deno fmt`

✨💎✨