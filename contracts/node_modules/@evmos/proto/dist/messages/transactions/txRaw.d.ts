import { TxRaw, TxBody, AuthInfo } from '../../proto/cosmos/transactions/tx.js';
export declare function bytesToTxRaw(bytes: Uint8Array): TxRaw;
export declare function bytesToTxBody(bytes: Uint8Array): TxBody;
export declare function bytesToAuthInfo(bytes: Uint8Array): AuthInfo;
export declare function createTxRaw(bodyBytes: Uint8Array, authInfoBytes: Uint8Array, signatures: Uint8Array[]): {
    message: TxRaw;
    path: string;
};
//# sourceMappingURL=txRaw.d.ts.map