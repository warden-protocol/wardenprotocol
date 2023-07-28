export declare const MSG_SUBMIT_PROPOSAL_TYPES: {
    MsgValue: {
        name: string;
        type: string;
    }[];
    TypeDeposit: {
        name: string;
        type: string;
    }[];
};
export declare function createMsgSubmitProposal(content: any, initialDepositDenom: string, initialDepositAmount: string, proposer: string): {
    type: string;
    value: {
        content: any;
        initial_deposit: {
            amount: string;
            denom: string;
        }[];
        proposer: string;
    };
};
//# sourceMappingURL=submitProposal.d.ts.map