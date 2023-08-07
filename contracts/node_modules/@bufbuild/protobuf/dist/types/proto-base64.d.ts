export declare const protoBase64: {
    /**
     * Decodes a base64 string to a byte array.
     *
     * - ignores white-space, including line breaks and tabs
     * - allows inner padding (can decode concatenated base64 strings)
     * - does not require padding
     * - understands base64url encoding:
     *   "-" instead of "+",
     *   "_" instead of "/",
     *   no padding
     */
    readonly dec: (base64Str: string) => Uint8Array;
    /**
     * Encode a byte array to a base64 string.
     */
    readonly enc: (bytes: Uint8Array) => string;
};
