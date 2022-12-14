export declare class Secp256k1Signature {
    /**
     * Takes the pair of integers (r, s) as 2x32 byte of binary data.
     *
     * Note: This is the format Cosmos SDK uses natively.
     *
     * @param data a 64 byte value containing integers r and s.
     */
    static fromFixedLength(data: Uint8Array): Secp256k1Signature;
    static fromDer(data: Uint8Array): Secp256k1Signature;
    private readonly data;
    constructor(r: Uint8Array, s: Uint8Array);
    r(length?: number): Uint8Array;
    s(length?: number): Uint8Array;
    toFixedLength(): Uint8Array;
    toDer(): Uint8Array;
}
/**
 * A Secp256k1Signature plus the recovery parameter
 */
export declare class ExtendedSecp256k1Signature extends Secp256k1Signature {
    /**
     * Decode extended signature from the simple fixed length encoding
     * described in toFixedLength().
     */
    static fromFixedLength(data: Uint8Array): ExtendedSecp256k1Signature;
    readonly recovery: number;
    constructor(r: Uint8Array, s: Uint8Array, recovery: number);
    /**
     * A simple custom encoding that encodes the extended signature as
     * r (32 bytes) | s (32 bytes) | recovery param (1 byte)
     * where | denotes concatenation of bonary data.
     */
    toFixedLength(): Uint8Array;
}
