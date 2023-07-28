import { TxContext } from '../base.js';
export interface MsgUndelegateParams {
    validatorAddress: string;
    amount: string;
    denom: string;
}
export declare const createTxMsgUndelegate: (context: TxContext, params: MsgUndelegateParams) => import("../common.js").TxPayload;
//# sourceMappingURL=undelegate.d.ts.map