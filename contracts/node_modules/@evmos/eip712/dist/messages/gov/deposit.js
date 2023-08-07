export const MSG_DEPOSIT_TYPES = {
    MsgValue: [
        { name: 'proposal_id', type: 'uint64' },
        { name: 'depositor', type: 'string' },
        { name: 'deposit', type: 'Coin[]' },
    ],
};
export function createMsgDeposit(proposalId, depositor, deposit) {
    return {
        type: 'cosmos-sdk/MsgDeposit',
        value: {
            proposal_id: proposalId,
            depositor,
            deposit: [deposit],
        },
    };
}
//# sourceMappingURL=deposit.js.map