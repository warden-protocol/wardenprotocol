# Installation
> `npm install --save @types/text-encoding`

# Summary
This package contains type definitions for text-encoding (https://github.com/inexorabletash/text-encoding).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/text-encoding.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/text-encoding/index.d.ts)
````ts
// Type definitions for text-encoding
// Project: https://github.com/inexorabletash/text-encoding
// Definitions by: Pine Mizune <https://github.com/pine>
//                 Mohsen Azimi <https://github.com/mohsen1>
//                 Thomas Nicollet <https://github.com/nwmqpa>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare namespace TextEncoding {
    interface TextEncoderOptions {
        NONSTANDARD_allowLegacyEncoding?: boolean | undefined;
    }
    interface TextEncoderStatic {
        (utfLabel?: string, options?: TextEncoderOptions): TextEncoder;
        new (utfLabel?: string, options?: TextEncoderOptions): TextEncoder;
    }

    export var TextEncoder: {
        new (utfLabel?: string, options?: TextEncoderOptions): TextEncoder;
        (utfLabel?: string, options?: TextEncoderOptions): TextEncoder;
        encoding: string;
    };

    export var TextDecoder: {
        (label?: string, options?: TextDecoderOptions): TextDecoder;
        new (label?: string, options?: TextDecoderOptions): TextDecoder;
        encoding: string;
    };
}

interface TextEncodeOptions {
    stream?: boolean | undefined;
}

interface TextDecoderOptions {
    stream?: boolean | undefined;
}

interface TextEncoder {
    readonly encoding: string;
    encode(input?: string, options?: TextEncodeOptions): Uint8Array;
}

interface TextDecoder {
    readonly encoding: string;
    decode(input?: Uint8Array, options?: TextDecoderOptions): string;
}

declare module "text-encoding" {
    export = TextEncoding;
}

````

### Additional Details
 * Last updated: Fri, 02 Jul 2021 21:32:19 GMT
 * Dependencies: none
 * Global values: `TextEncoding`

# Credits
These definitions were written by [Pine Mizune](https://github.com/pine), [Mohsen Azimi](https://github.com/mohsen1), and [Thomas Nicollet](https://github.com/nwmqpa).
