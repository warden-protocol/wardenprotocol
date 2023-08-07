import { TxContext } from '../base.js';
export interface MsgBeginRedelegateParams {
    validatorSrcAddress: string;
    validatorDstAddress: string;
    amount: string;
    denom: string;
}
export declare const createTxMsgBeginRedelegate: (context: TxContext, params: MsgBeginRedelegateParams) => import("../common.js").TxPayload;
//# sourceMappingURL=beginRedelegate.d.ts.map