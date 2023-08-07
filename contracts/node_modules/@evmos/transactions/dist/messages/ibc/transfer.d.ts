import { TxContext } from '../base.js';
export interface IBCMsgTransferParams {
    sourcePort: string;
    sourceChannel: string;
    amount: string;
    denom: string;
    receiver: string;
    revisionNumber: number;
    revisionHeight: number;
    timeoutTimestamp: string;
    memo?: string;
}
export declare const createTxIBCMsgTransfer: (context: TxContext, params: IBCMsgTransferParams) => import("../common.js").TxPayload;
//# sourceMappingURL=transfer.d.ts.map