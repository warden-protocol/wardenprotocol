import { HashFunction } from "./hash";
export declare class Hmac<H extends HashFunction> implements HashFunction {
    readonly blockSize: number;
    private readonly messageHasher;
    private readonly oKeyPad;
    private readonly iKeyPad;
    private readonly hash;
    constructor(hashFunctionConstructor: new () => H, originalKey: Uint8Array);
    update(data: Uint8Array): Hmac<H>;
    digest(): Uint8Array;
}
