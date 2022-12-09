# @cosmjs/encoding

[![npm version](https://img.shields.io/npm/v/@cosmjs/encoding.svg)](https://www.npmjs.com/package/@cosmjs/encoding)

This package is an extension to the JavaScript standard library that is not
bound to blockchain products. It provides basic hex/base64/ascii encoding to
Uint8Array that doesn't rely on Buffer and also provides better error messages
on invalid input.

## Convert between bech32 and hex addresses

```
>> toBech32("tiov", fromHex("1234ABCD0000AA0000FFFF0000AA00001234ABCD"))
'tiov1zg62hngqqz4qqq8lluqqp2sqqqfrf27dzrrmea'
>> toHex(fromBech32("tiov1zg62hngqqz4qqq8lluqqp2sqqqfrf27dzrrmea").data)
'1234abcd0000aa0000ffff0000aa00001234abcd'
```

## License

This package is part of the cosmjs repository, licensed under the Apache License
2.0 (see [NOTICE](https://github.com/cosmos/cosmjs/blob/main/NOTICE) and
[LICENSE](https://github.com/cosmos/cosmjs/blob/main/LICENSE)).
