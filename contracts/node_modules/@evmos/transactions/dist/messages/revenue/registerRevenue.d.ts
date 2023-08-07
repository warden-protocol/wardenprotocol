import { TxContext } from '../base.js';
export interface MsgRegisterRevenueParams {
    contractAddress: string;
    deployerAddress: string;
    withdrawerAddress: string;
    nonces: number[];
}
export declare const createTxMsgRegisterRevenue: (context: TxContext, params: MsgRegisterRevenueParams) => import("../common.js").TxPayload;
//# sourceMappingURL=registerRevenue.d.ts.map