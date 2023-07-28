import { TxContext } from '../base.js';
export interface MsgSetWithdrawAddressParams {
    delegatorAddress: string;
    withdrawAddress: string;
}
export declare const createTxMsgSetWithdrawAddress: (context: TxContext, params: MsgSetWithdrawAddressParams) => import("../common.js").TxPayload;
//# sourceMappingURL=setWithdrawAddress.d.ts.map