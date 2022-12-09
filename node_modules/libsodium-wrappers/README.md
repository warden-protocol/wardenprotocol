# libsodium.js

## Overview

The [sodium](https://github.com/jedisct1/libsodium) crypto library
compiled to WebAssembly and pure JavaScript using
[Emscripten](https://github.com/kripken/emscripten), with
automatically generated wrappers to make it easy to use in web
applications.

The complete library weighs 188 KB (minified, gzipped, includes pure JS +
WebAssembly versions) and can run in a web browser as well as server-side.

### Compatibility

Supported browsers/JS engines:

* Chrome >= 16
* Edge >= 0.11
* Firefox >= 21
* Mobile Safari on iOS >= 8.0 (older versions produce incorrect results)
* NodeJS
* Opera >= 15
* Safari >= 6 (older versions produce incorrect results)

This is comparable to the WebCrypto API, which is compatible with a
similar number of browsers.

Signatures and other Edwards25519-based operations are compatible with
[WasmCrypto](https://github.com/jedisct1/wasm-crypto).

## Installation

The [dist](https://github.com/jedisct1/libsodium.js/tree/master/dist)
directory contains pre-built scripts. Copy the files from one of its
subdirectories to your application:

- [browsers](https://github.com/jedisct1/libsodium.js/tree/master/dist/browsers)
includes a single-file script that can be included in web pages.
It contains code for commonly used functions.
- [browsers-sumo](https://github.com/jedisct1/libsodium.js/tree/master/dist/browsers-sumo)
is a superset of the previous script, that contains all functions,
including rarely used ones and undocumented ones.
- [modules](https://github.com/jedisct1/libsodium.js/tree/master/dist/modules)
includes commonly used functions, and is designed to be loaded as a module.
`libsodium-wrappers` is the module your application should load, which
will in turn automatically load `libsodium` as a dependency.
- [modules-sumo](https://github.com/jedisct1/libsodium.js/tree/master/dist/modules-sumo)
contains sumo variants of the previous modules.

The modules are also available on npm:
- [libsodium-wrappers](https://www.npmjs.com/package/libsodium-wrappers)
- [libsodium-wrappers-sumo](https://www.npmjs.com/package/libsodium-wrappers-sumo)

If you prefer Bower:

```sh
bower install libsodium.js
```

### Usage (as a module)

Load the `libsodium-wrappers` module. The returned object contains a `.ready`
property: a promise that must be resolve before the sodium functions
can be used.

Example:

```js
const _sodium = require('libsodium-wrappers');
(async() => {
  await _sodium.ready;
  const sodium = _sodium;

  let key = sodium.crypto_secretstream_xchacha20poly1305_keygen();

  let res = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
  let [state_out, header] = [res.state, res.header];
  let c1 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
    sodium.from_string('message 1'), null,
    sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE);
  let c2 = sodium.crypto_secretstream_xchacha20poly1305_push(state_out,
    sodium.from_string('message 2'), null,
    sodium.crypto_secretstream_xchacha20poly1305_TAG_FINAL);

  let state_in = sodium.crypto_secretstream_xchacha20poly1305_init_pull(header, key);
  let r1 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, c1);
  let [m1, tag1] = [sodium.to_string(r1.message), r1.tag];
  let r2 = sodium.crypto_secretstream_xchacha20poly1305_pull(state_in, c2);
  let [m2, tag2] = [sodium.to_string(r2.message), r2.tag];

  console.log(m1);
  console.log(m2);
})();
```

### Usage (in a web browser, via a callback)

The `sodium.js` file includes both the core libsodium functions, as
well as the higher-level JavaScript wrappers. It can be loaded
asynchronusly.

A `sodium` object should be defined in the global namespace, with the
following property:

- `onload`: the function to call after the wrapper is initialized.

Example:

```html
<script>
    window.sodium = {
        onload: function (sodium) {
            let h = sodium.crypto_generichash(64, sodium.from_string('test'));
            console.log(sodium.to_hex(h));
        }
    };
</script>
<script src="sodium.js" async></script>
```

## Additional helpers

* `from_base64()`, `to_base64()` with an optional second parameter
whose value is one of: `base64_variants.ORIGINAL`, `base64_variants.ORIGINAL_NO_PADDING`,
`base64_variants.URLSAFE` or `base64_variants.URLSAFE_NO_PADDING`. Default is `base64_variants.URLSAFE_NO_PADDING`.
* `from_hex()`, `to_hex()`
* `from_string()`, `to_string()`
* `pad(<buffer>, <block size>)`, `unpad(<buffer>, <block size>)`
* `memcmp()` (constant-time check for equality, returns `true` or `false`)
* `compare()` (constant-time comparison. Values must have the same
size. Returns `-1`, `0` or `1`)
* `memzero()` (applies to `Uint8Array` objects)
* `increment()` (increments an arbitrary-long number stored as a
little-endian `Uint8Array` - typically to increment nonces)
* `add()` (adds two arbitrary-long numbers stored as little-endian
`Uint8Array` vectors)
* `is_zero()` (constant-time, checks `Uint8Array` objects for all zeros)

## API

The API exposed by the wrappers is identical to the one of the C
library, except that buffer lengths never need to be explicitly given.

Binary input buffers should be `Uint8Array` objects. However, if a string
is given instead, the wrappers will automatically convert the string
to an array containing a UTF-8 representation of the string.

Example:

```javascript
var key = sodium.randombytes_buf(sodium.crypto_shorthash_KEYBYTES),
    hash1 = sodium.crypto_shorthash(new Uint8Array([1, 2, 3, 4]), key),
    hash2 = sodium.crypto_shorthash('test', key);
```

If the output is a unique binary buffer, it is returned as a
`Uint8Array` object.

Example (secretbox):

```javascript
let key = sodium.from_hex('724b092810ec86d7e35c9d067702b31ef90bc43a7b598626749914d6a3e033ed');

function encrypt_and_prepend_nonce(message) {
    let nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
    return nonce.concat(sodium.crypto_secretbox_easy(message, nonce, key));
}

function decrypt_after_extracting_nonce(nonce_and_ciphertext) {
    if (nonce_and_ciphertext.length < sodium.crypto_secretbox_NONCEBYTES + sodium.crypto_secretbox_MACBYTES) {
        throw "Short message";
    }
    let nonce = nonce_and_ciphertext.slice(0, sodium.crypto_secretbox_NONCEBYTES),
        ciphertext = nonce_and_ciphertext.slice(sodium.crypto_secretbox_NONCEBYTES);
    return sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
}
```

In addition, the `from_hex`, `to_hex`, `from_string`, and `to_string`
functions are available to explicitly convert hexadecimal, and
arbitrary string representations from/to `Uint8Array` objects.

Functions returning more than one output buffer are returning them as
an object. For example, the `sodium.crypto_box_keypair()` function
returns the following object:
```javascript
{ keyType: 'curve25519', privateKey: (Uint8Array), publicKey: (Uint8Array) }
```

### Standard vs Sumo version

The standard version (in the `dist/browsers` and `dist/modules`
directories) contains the high-level functions, and is the recommended
one for most projects.

Alternatively, the "sumo" version, available in the
`dist/browsers-sumo` and `dist/modules-sumo` directories contains all
the symbols from the original library. This includes undocumented,
untested, deprecated, low-level and easy to misuse functions.

The `crypto_pwhash_*` function set is included in both versions.

The sumo version is slightly larger than the standard version, and
should be used only if you really need the extra symbols it provides.

### Compilation

If you want to compile the files yourself, the following dependencies
need to be installed on your system:

* Emscripten
* binaryen
* git
* NodeJS
* make

Running `make` will install the dev dependencies, clone libsodium,
build it, test it, build the wrapper, and create the modules and
minified distribution files.

## Authors

Built by Ahmad Ben Mrad, Frank Denis and Ryan Lester.

## License

This wrapper is distributed under the
[ISC License](https://en.wikipedia.org/wiki/ISC_license).
