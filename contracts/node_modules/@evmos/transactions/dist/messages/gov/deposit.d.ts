import { TxContext } from '../base.js';
export interface MsgDepositParams {
    proposalId: number;
    deposit: {
        denom: string;
        amount: string;
    };
}
export declare const createTxMsgDeposit: (context: TxContext, params: MsgDepositParams) => import("../common.js").TxPayload;
//# sourceMappingURL=deposit.d.ts.map