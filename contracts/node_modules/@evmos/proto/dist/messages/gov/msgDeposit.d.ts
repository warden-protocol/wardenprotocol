import { MsgDeposit } from '../../proto/cosmos/gov/tx.js';
export declare function createMsgDeposit(proposalId: number, depositor: string, deposit: {
    denom: string;
    amount: string;
}): {
    path: string;
    message: MsgDeposit;
};
//# sourceMappingURL=msgDeposit.d.ts.map