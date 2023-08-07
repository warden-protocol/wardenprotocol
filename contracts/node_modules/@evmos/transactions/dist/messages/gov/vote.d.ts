import { TxContext } from '../base.js';
export interface MsgVoteParams {
    proposalId: number;
    option: number;
}
export declare const createTxMsgVote: (context: TxContext, params: MsgVoteParams) => import("../common.js").TxPayload;
//# sourceMappingURL=vote.d.ts.map