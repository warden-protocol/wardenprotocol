export const MSG_SUBMIT_PROPOSAL_TYPES = {
    MsgValue: [
        { name: 'content', type: 'any' },
        { name: 'proposer', type: 'string' },
        { name: 'initial_deposit', type: 'TypeDeposit[]' },
    ],
    TypeDeposit: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
    ],
};
export function createMsgSubmitProposal(content, initialDepositDenom, initialDepositAmount, proposer) {
    return {
        type: 'cosmos-sdk/MsgSubmitProposal',
        value: {
            content,
            initial_deposit: [
                {
                    amount: initialDepositAmount,
                    denom: initialDepositDenom,
                },
            ],
            proposer,
        },
    };
}
//# sourceMappingURL=submitProposal.js.map