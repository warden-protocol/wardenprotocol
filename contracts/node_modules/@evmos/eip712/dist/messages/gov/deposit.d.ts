export declare const MSG_DEPOSIT_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgDeposit(proposalId: number, depositor: string, deposit: {
    denom: string;
    amount: string;
}): {
    type: string;
    value: {
        proposal_id: number;
        depositor: string;
        deposit: {
            denom: string;
            amount: string;
        }[];
    };
};
//# sourceMappingURL=deposit.d.ts.map