import { TxRaw, TxBody, AuthInfo } from '../../proto/cosmos/transactions/tx.js';
export function bytesToTxRaw(bytes) {
    return TxRaw.fromBinary(bytes);
}
export function bytesToTxBody(bytes) {
    return TxBody.fromBinary(bytes);
}
export function bytesToAuthInfo(bytes) {
    return AuthInfo.fromBinary(bytes);
}
export function createTxRaw(bodyBytes, authInfoBytes, signatures) {
    const message = new TxRaw({
        bodyBytes,
        authInfoBytes,
        signatures,
    });
    return {
        message,
        path: TxRaw.typeName,
    };
}
//# sourceMappingURL=txRaw.js.map