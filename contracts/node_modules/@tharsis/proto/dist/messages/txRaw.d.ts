import * as tx from '../proto/cosmos/tx/v1beta1/tx';
export declare function bytesToTxRaw(bytes: Uint8Array): tx.cosmos.tx.v1beta1.TxRaw;
export declare function bytesToTxBody(bytes: Uint8Array): tx.cosmos.tx.v1beta1.TxBody;
export declare function bytesToAuthInfo(bytes: Uint8Array): tx.cosmos.tx.v1beta1.AuthInfo;
export declare function createTxRaw(bodyBytes: Uint8Array, authInfoBytes: Uint8Array, signatures: Uint8Array[]): {
    message: tx.cosmos.tx.v1beta1.TxRaw;
    path: string;
};
//# sourceMappingURL=txRaw.d.ts.map