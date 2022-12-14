import { OfflineAminoSigner, StdSignature } from "@cosmjs/amino";
import { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
export declare type Algo = "secp256k1" | "ed25519" | "sr25519";
export interface AccountData {
    /** A printable address (typically bech32 encoded) */
    readonly address: string;
    readonly algo: Algo;
    readonly pubkey: Uint8Array;
}
export interface DirectSignResponse {
    /**
     * The sign doc that was signed.
     * This may be different from the input signDoc when the signer modifies it as part of the signing process.
     */
    readonly signed: SignDoc;
    readonly signature: StdSignature;
}
export interface OfflineDirectSigner {
    readonly getAccounts: () => Promise<readonly AccountData[]>;
    readonly signDirect: (signerAddress: string, signDoc: SignDoc) => Promise<DirectSignResponse>;
}
export declare type OfflineSigner = OfflineAminoSigner | OfflineDirectSigner;
export declare function isOfflineDirectSigner(signer: OfflineSigner): signer is OfflineDirectSigner;
