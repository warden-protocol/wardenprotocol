import { MultisigThresholdPubkey, SinglePubkey } from "./pubkeys";
/**
 * Compare arrays lexicographically.
 *
 * Returns value < 0 if `a < b`.
 * Returns value > 0 if `a > b`.
 * Returns 0 if `a === b`.
 */
export declare function compareArrays(a: Uint8Array, b: Uint8Array): number;
export declare function createMultisigThresholdPubkey(pubkeys: readonly SinglePubkey[], threshold: number, nosort?: boolean): MultisigThresholdPubkey;
