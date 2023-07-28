import { TxContext } from '../base.js';
export interface MsgDelegateParams {
    validatorAddress: string;
    amount: string;
    denom: string;
}
export declare const createTxMsgDelegate: (context: TxContext, params: MsgDelegateParams) => import("../common.js").TxPayload;
//# sourceMappingURL=delegate.d.ts.map