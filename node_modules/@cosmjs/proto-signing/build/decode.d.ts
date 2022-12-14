import { AuthInfo, TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";
export interface DecodedTxRaw {
    readonly authInfo: AuthInfo;
    readonly body: TxBody;
    readonly signatures: readonly Uint8Array[];
}
/**
 * Takes a serialized TxRaw (the bytes stored in Tendermint) and decodes it into something usable.
 */
export declare function decodeTxRaw(tx: Uint8Array): DecodedTxRaw;
