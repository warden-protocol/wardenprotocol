import { TxContext } from '../base.js';
export interface MsgUpdateRevenueParams {
    contractAddress: string;
    deployerAddress: string;
    withdrawerAddress: string;
}
export declare const createTxMsgUpdateRevenue: (context: TxContext, params: MsgUpdateRevenueParams) => import("../common.js").TxPayload;
//# sourceMappingURL=updateRevenue.d.ts.map