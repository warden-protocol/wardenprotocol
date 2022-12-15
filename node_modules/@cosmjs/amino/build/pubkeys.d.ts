export interface Pubkey {
    readonly type: string;
    readonly value: any;
}
export interface Ed25519Pubkey extends SinglePubkey {
    readonly type: "tendermint/PubKeyEd25519";
    readonly value: string;
}
export declare function isEd25519Pubkey(pubkey: Pubkey): pubkey is Ed25519Pubkey;
export interface Secp256k1Pubkey extends SinglePubkey {
    readonly type: "tendermint/PubKeySecp256k1";
    readonly value: string;
}
export declare function isSecp256k1Pubkey(pubkey: Pubkey): pubkey is Secp256k1Pubkey;
export declare const pubkeyType: {
    /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/ed25519/ed25519.go#L22 */
    secp256k1: "tendermint/PubKeySecp256k1";
    /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/secp256k1/secp256k1.go#L23 */
    ed25519: "tendermint/PubKeyEd25519";
    /** @see https://github.com/tendermint/tendermint/blob/v0.33.0/crypto/sr25519/codec.go#L12 */
    sr25519: "tendermint/PubKeySr25519";
    multisigThreshold: "tendermint/PubKeyMultisigThreshold";
};
/**
 * A pubkey which contains the data directly without further nesting.
 *
 * You can think of this as a non-multisig pubkey.
 */
export interface SinglePubkey extends Pubkey {
    readonly type: string;
    /**
     * The base64 encoding of the Amino binary encoded pubkey.
     *
     * Note: if type is Secp256k1, this must contain a 33 bytes compressed pubkey.
     */
    readonly value: string;
}
export declare function isSinglePubkey(pubkey: Pubkey): pubkey is SinglePubkey;
export interface MultisigThresholdPubkey extends Pubkey {
    readonly type: "tendermint/PubKeyMultisigThreshold";
    readonly value: {
        /** A string-encoded integer */
        readonly threshold: string;
        readonly pubkeys: readonly SinglePubkey[];
    };
}
export declare function isMultisigThresholdPubkey(pubkey: Pubkey): pubkey is MultisigThresholdPubkey;
