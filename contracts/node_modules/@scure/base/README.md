# scure-base

Secure, [audited](#security) and 0-dep implementation of bech32, base64, base58, base32 & base16.

Written in [functional style](#design-rationale), uses chaining, has unique tests which ensure correctness.

Matches following specs:

- Bech32, Bech32m: [BIP173](https://en.bitcoin.it/wiki/BIP_0173), [BIP350](https://en.bitcoin.it/wiki/BIP_0350)
- Base16, Base32, Base32Hex, Base64, Base64Url: [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648) (aka RFC 3548)
- [Base58](https://www.ietf.org/archive/id/draft-msporny-base58-03.txt), [Base58check](https://en.bitcoin.it/wiki/Base58Check_encoding), [Base32 Crockford](https://www.crockford.com/base32.html)

### This library belongs to *scure*

> **scure** — secure audited packages for every use case.

- Independent security audits
- All releases are signed with PGP keys
- Check out all libraries:
  [base](https://github.com/paulmillr/scure-base),
  [bip32](https://github.com/paulmillr/scure-bip32),
  [bip39](https://github.com/paulmillr/scure-bip39)

## Usage

> npm install @scure/base

Or

> yarn add @scure/base

```js
const { base16, base32, base64, base58 } = require('@scure/base');
// Flavors
const { base58xmr, base58xrp, base32hex, base32crockford, base64url } = require('@scure/base');

const data = Uint8Array.from([1, 2, 3]);
base64.decode(base64.encode(data));

// Everything has the same API except for bech32 and base58check
base32.encode(data);
base16.encode(data);
base32hex.encode(data);

// bech32
const { bech32, bech32m } = require('@scure/base');
const words = bech32.toWords(data);
const be = bech32.encode('prefix', words);
const { prefix, words } = bech32.decode(be);
bech32m.encode('prefix', words);

// base58check is special-case
// you need to pass sha256() function that returns Uint8Array
const { base58check } = require('@scure/base');
base58check(sha256).encode(data);

// Alternative API
const { str, bytes } = require('@scure/base');
const encoded = str('base64', data);
const data = bytes('base64', encoded);
```

## Design rationale

The code may feel unnecessarily complicated; but actually it's much easier to reason about.
Any encoding library consists of two functions:

```
encode(A) -> B
decode(B) -> A
  where X = decode(encode(X))
  # encode(decode(X)) can be !== X!
  # because decoding can normalize input

e.g.
base58checksum = {
  encode(): {
    // checksum
    // radix conversion
    // alphabet
  },
  decode(): {
    // alphabet
    // radix conversion
    // checksum
  }
}
```

But instead of creating two big functions for each specific case,
we create them from tiny composamble building blocks:

```
base58checksum = chain(checksum(), radix(), alphabet())
```

Which is the same as chain/pipe/sequence function in Functional Programming,
but significantly more useful since it enforces same order of execution of encode/decode.
Basically you only define encode (in declarative way) and get correct decode for free.
So, instead of reasoning about two big functions you need only reason about primitives and encode chain.
The design revealed obvious bug in older version of the lib,
where xmr version of base58 had errors in decode's block processing.

Besides base-encodings, we can reuse the same approach with any encode/decode function
(`bytes2number`, `bytes2u32`, etc).
For example, you can easily encode entropy to mnemonic (BIP-39):

```ts
export function getCoder(wordlist: string[]) {
  if (!Array.isArray(wordlist) || wordlist.length !== 2 ** 11 || typeof wordlist[0] !== 'string') {
    throw new Error('Worlist: expected array of 2048 strings');
  }
  return mbc.chain(mbu.checksum(1, checksum), mbu.radix2(11, true), mbu.alphabet(wordlist));
}
```

## base58 is O(n^2) and radixes

`Uint8Array` is represented as big-endian number:

```
[1, 2, 3, 4, 5] -> 1*(256**4) + 2*(256**3) 3*(256**2) + 4*(256**1) + 5*(256**0)
where 256 = 2**8 (8 bits per byte)
```

which is then converted to a number in another radix/base (16/32/58/64, etc).

However, generic conversion between bases has [quadratic O(n^2) time complexity](https://cs.stackexchange.com/q/21799).

Which means base58 has quadratic time complexity too. Use base58 only when you have small
constant sized input, because variable length sized input from user can cause DoS.

On the other hand, if both bases are power of same number (like `2**8 <-> 2**64`),
there is linear algorithm. For now we have implementation for power-of-two bases only (radix2).

## Security

The library has been audited by Cure53 on Jan 5, 2022. Check out the audit [PDF](./audit/2022-01-05-cure53-audit-nbl2.pdf) & [URL](https://cure53.de/pentest-report_hashing-libs.pdf). See [changes since audit](https://github.com/paulmillr/scure-base/compare/1.0.0..main).

1. The library was initially developed for [js-ethereum-cryptography](https://github.com/ethereum/js-ethereum-cryptography)
2. At commit [ae00e6d7](https://github.com/ethereum/js-ethereum-cryptography/commit/ae00e6d7d24fb3c76a1c7fe10039f6ecd120b77e), it
  was extracted to a separate package called `micro-base`
3. After the audit we've decided to use NPM namespace for security. Since `@micro` namespace was taken, we've renamed the package to `@scure/base`

## License

MIT (c) Paul Miller [(https://paulmillr.com)](https://paulmillr.com), see LICENSE file.
