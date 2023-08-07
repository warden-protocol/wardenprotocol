import { TxContext } from '../base.js';
export interface MsgClawbackParams {
    funderAddress: string;
    accountAddress: string;
    destAddress?: string;
}
export declare const createTxMsgClawback: (context: TxContext, params: MsgClawbackParams) => import("../common.js").TxPayload;
//# sourceMappingURL=clawback.d.ts.map