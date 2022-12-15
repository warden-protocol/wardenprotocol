/** Internal interface to ensure all integer types can be used equally */
interface Integer {
    readonly toNumber: () => number;
    readonly toString: () => string;
}
interface WithByteConverters {
    readonly toBytesBigEndian: () => Uint8Array;
    readonly toBytesLittleEndian: () => Uint8Array;
}
export declare class Uint32 implements Integer, WithByteConverters {
    /** @deprecated use Uint32.fromBytes */
    static fromBigEndianBytes(bytes: ArrayLike<number>): Uint32;
    /**
     * Creates a Uint32 from a fixed length byte array.
     *
     * @param bytes a list of exactly 4 bytes
     * @param endianess defaults to big endian
     */
    static fromBytes(bytes: ArrayLike<number>, endianess?: "be" | "le"): Uint32;
    static fromString(str: string): Uint32;
    protected readonly data: number;
    constructor(input: number);
    toBytesBigEndian(): Uint8Array;
    toBytesLittleEndian(): Uint8Array;
    toNumber(): number;
    toString(): string;
}
export declare class Int53 implements Integer {
    static fromString(str: string): Int53;
    protected readonly data: number;
    constructor(input: number);
    toNumber(): number;
    toString(): string;
}
export declare class Uint53 implements Integer {
    static fromString(str: string): Uint53;
    protected readonly data: Int53;
    constructor(input: number);
    toNumber(): number;
    toString(): string;
}
export declare class Uint64 implements Integer, WithByteConverters {
    /** @deprecated use Uint64.fromBytes */
    static fromBytesBigEndian(bytes: ArrayLike<number>): Uint64;
    /**
     * Creates a Uint64 from a fixed length byte array.
     *
     * @param bytes a list of exactly 8 bytes
     * @param endianess defaults to big endian
     */
    static fromBytes(bytes: ArrayLike<number>, endianess?: "be" | "le"): Uint64;
    static fromString(str: string): Uint64;
    static fromNumber(input: number): Uint64;
    private readonly data;
    private constructor();
    toBytesBigEndian(): Uint8Array;
    toBytesLittleEndian(): Uint8Array;
    toString(): string;
    toNumber(): number;
}
export {};
