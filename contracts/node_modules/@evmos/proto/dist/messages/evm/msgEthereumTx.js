import { MsgEthereumTx, LegacyTx, AccessListTx, DynamicFeeTx, } from '../../proto/ethermint/evm/tx.js';
export function bytesToMsgEthereumTx(bytes) {
    return MsgEthereumTx.fromBinary(bytes);
}
export function bytesToLegacyTx(bytes) {
    return LegacyTx.fromBinary(bytes);
}
export function bytesToAccessListTx(bytes) {
    return AccessListTx.fromBinary(bytes);
}
export function bytesToDynamicFeeTx(bytes) {
    return DynamicFeeTx.fromBinary(bytes);
}
//# sourceMappingURL=msgEthereumTx.js.map