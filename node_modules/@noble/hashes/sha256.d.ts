import { SHA2 } from './_sha2.js';
declare class SHA256 extends SHA2<SHA256> {
    private A;
    private B;
    private C;
    private D;
    private E;
    private F;
    private G;
    private H;
    constructor();
    protected get(): [number, number, number, number, number, number, number, number];
    protected set(A: number, B: number, C: number, D: number, E: number, F: number, G: number, H: number): void;
    protected process(view: DataView, offset: number): void;
    protected roundClean(): void;
    destroy(): void;
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */
export declare const sha256: {
    (message: import("./utils.js").Input): Uint8Array;
    outputLen: number;
    blockLen: number;
    create(): import("./utils.js").Hash<SHA256>;
};
export {};
