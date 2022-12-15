import { ExtendedSecp256k1Signature, Secp256k1Signature } from "./secp256k1signature";
export interface Secp256k1Keypair {
    /** A 32 byte private key */
    readonly pubkey: Uint8Array;
    /**
     * A raw secp256k1 public key.
     *
     * The type itself does not give you any guarantee if this is
     * compressed or uncompressed. If you are unsure where the data
     * is coming from, use `Secp256k1.compressPubkey` or
     * `Secp256k1.uncompressPubkey` (both idempotent) before processing it.
     */
    readonly privkey: Uint8Array;
}
export declare class Secp256k1 {
    /**
     * Takes a 32 byte private key and returns a privkey/pubkey pair.
     *
     * The resulting pubkey is uncompressed. For the use in Cosmos it should
     * be compressed first using `Secp256k1.compressPubkey`.
     */
    static makeKeypair(privkey: Uint8Array): Promise<Secp256k1Keypair>;
    /**
     * Creates a signature that is
     * - deterministic (RFC 6979)
     * - lowS signature
     * - DER encoded
     */
    static createSignature(messageHash: Uint8Array, privkey: Uint8Array): Promise<ExtendedSecp256k1Signature>;
    static verifySignature(signature: Secp256k1Signature, messageHash: Uint8Array, pubkey: Uint8Array): Promise<boolean>;
    static recoverPubkey(signature: ExtendedSecp256k1Signature, messageHash: Uint8Array): Uint8Array;
    /**
     * Takes a compressed or uncompressed pubkey and return a compressed one.
     *
     * This function is idempotent.
     */
    static compressPubkey(pubkey: Uint8Array): Uint8Array;
    /**
     * Takes a compressed or uncompressed pubkey and returns an uncompressed one.
     *
     * This function is idempotent.
     */
    static uncompressPubkey(pubkey: Uint8Array): Uint8Array;
    static trimRecoveryByte(signature: Uint8Array): Uint8Array;
}
