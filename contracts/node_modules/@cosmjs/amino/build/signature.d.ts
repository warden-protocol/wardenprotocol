import { Pubkey } from "./pubkeys";
export interface StdSignature {
    readonly pub_key: Pubkey;
    readonly signature: string;
}
/**
 * Takes a binary pubkey and signature to create a signature object
 *
 * @param pubkey a compressed secp256k1 public key
 * @param signature a 64 byte fixed length representation of secp256k1 signature components r and s
 */
export declare function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array): StdSignature;
export declare function decodeSignature(signature: StdSignature): {
    readonly pubkey: Uint8Array;
    readonly signature: Uint8Array;
};
