import { TxContext } from '../base.js';
export interface MsgSubmitProposalParams {
    content: any;
    denom: string;
    amount: string;
    proposer: string;
}
export declare const createTxMsgSubmitProposal: (context: TxContext, params: MsgSubmitProposalParams) => import("../common.js").TxPayload;
//# sourceMappingURL=submitProposal.d.ts.map