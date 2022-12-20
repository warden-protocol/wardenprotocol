import { StdSignature } from "./signature";
import { StdSignDoc } from "./signdoc";
export declare type Algo = "secp256k1" | "ed25519" | "sr25519";
export interface AccountData {
    /** A printable address (typically bech32 encoded) */
    readonly address: string;
    readonly algo: Algo;
    readonly pubkey: Uint8Array;
}
export interface AminoSignResponse {
    /**
     * The sign doc that was signed.
     * This may be different from the input signDoc when the signer modifies it as part of the signing process.
     */
    readonly signed: StdSignDoc;
    readonly signature: StdSignature;
}
export interface OfflineAminoSigner {
    /**
     * Get AccountData array from wallet. Rejects if not enabled.
     */
    readonly getAccounts: () => Promise<readonly AccountData[]>;
    /**
     * Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
     *
     * The signer implementation may offer the user the ability to override parts of the signDoc. It must
     * return the doc that was signed in the response.
     *
     * @param signerAddress The address of the account that should sign the transaction
     * @param signDoc The content that should be signed
     */
    readonly signAmino: (signerAddress: string, signDoc: StdSignDoc) => Promise<AminoSignResponse>;
}
