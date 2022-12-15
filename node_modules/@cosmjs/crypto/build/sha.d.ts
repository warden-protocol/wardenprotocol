import { HashFunction } from "./hash";
export declare class Sha256 implements HashFunction {
    readonly blockSize: number;
    private readonly impl;
    constructor(firstData?: Uint8Array);
    update(data: Uint8Array): Sha256;
    digest(): Uint8Array;
}
/** Convenience function equivalent to `new Sha256(data).digest()` */
export declare function sha256(data: Uint8Array): Uint8Array;
export declare class Sha512 implements HashFunction {
    readonly blockSize: number;
    private readonly impl;
    constructor(firstData?: Uint8Array);
    update(data: Uint8Array): Sha512;
    digest(): Uint8Array;
}
/** Convenience function equivalent to `new Sha512(data).digest()` */
export declare function sha512(data: Uint8Array): Uint8Array;
