import { Uint32 } from "@cosmjs/math";
export interface Slip10Result {
    readonly chainCode: Uint8Array;
    readonly privkey: Uint8Array;
}
/**
 * Raw values must match the curve string in SLIP-0010 master key generation
 *
 * @see https://github.com/satoshilabs/slips/blob/master/slip-0010.md#master-key-generation
 */
export declare enum Slip10Curve {
    Secp256k1 = "Bitcoin seed",
    Ed25519 = "ed25519 seed"
}
/**
 * Reverse mapping of Slip10Curve
 */
export declare function slip10CurveFromString(curveString: string): Slip10Curve;
export declare class Slip10RawIndex extends Uint32 {
    static hardened(hardenedIndex: number): Slip10RawIndex;
    static normal(normalIndex: number): Slip10RawIndex;
    isHardened(): boolean;
}
/**
 * An array of raw SLIP10 indices.
 *
 * This can be constructed via string parsing:
 *
 * ```ts
 * import { stringToPath } from "@cosmjs/crypto";
 *
 * const path = stringToPath("m/0'/1/2'/2/1000000000");
 * ```
 *
 * or manually:
 *
 * ```ts
 * import { HdPath, Slip10RawIndex } from "@cosmjs/crypto";
 *
 * // m/0'/1/2'/2/1000000000
 * const path: HdPath = [
 *   Slip10RawIndex.hardened(0),
 *   Slip10RawIndex.normal(1),
 *   Slip10RawIndex.hardened(2),
 *   Slip10RawIndex.normal(2),
 *   Slip10RawIndex.normal(1000000000),
 * ];
 * ```
 */
export declare type HdPath = readonly Slip10RawIndex[];
export declare class Slip10 {
    static derivePath(curve: Slip10Curve, seed: Uint8Array, path: HdPath): Slip10Result;
    private static master;
    private static child;
    /**
     * Implementation of ser_P(point(k_par)) from BIP-0032
     *
     * @see https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
     */
    private static serializedPoint;
    private static childImpl;
    private static isZero;
    private static isGteN;
    private static n;
}
export declare function pathToString(path: HdPath): string;
export declare function stringToPath(input: string): HdPath;
