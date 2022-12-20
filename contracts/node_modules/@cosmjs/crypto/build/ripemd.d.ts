import { HashFunction } from "./hash";
export declare class Ripemd160 implements HashFunction {
    readonly blockSize: number;
    private readonly impl;
    constructor(firstData?: Uint8Array);
    update(data: Uint8Array): Ripemd160;
    digest(): Uint8Array;
}
/** Convenience function equivalent to `new Ripemd160(data).digest()` */
export declare function ripemd160(data: Uint8Array): Uint8Array;
