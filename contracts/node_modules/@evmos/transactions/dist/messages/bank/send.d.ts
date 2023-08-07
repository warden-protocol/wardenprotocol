import { TxContext } from '../base.js';
export interface MsgSendParams {
    destinationAddress: string;
    amount: string;
    denom: string;
}
export declare const createTxMsgSend: (context: TxContext, params: MsgSendParams) => import("../common.js").TxPayload;
//# sourceMappingURL=send.d.ts.map