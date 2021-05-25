# abortable-timeout

abortable timeout promise via abortsignals

# Installation

```sh
npm i --save abortable-timeout
```

# Usage

#### Supports both ESM and CommonJS

```js
// esm
import timeout from 'abortable-timeout`
// commonjs
const timeout = require('abortable-timeout').default
```

#### Example

```js
import timeout from 'abortable-timeout`

const controller = new AbortController()
const signal = controller.signal

try {
  await timeout(1000, signal)
} catch(err) {
  if (err.name === 'AbortError') {
    console.warn('aborted')
    return
  }
  throw err
}

controller.abort()
```

# License

MIT
