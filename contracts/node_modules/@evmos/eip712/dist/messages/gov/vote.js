export const MSG_VOTE_TYPES = {
    MsgValue: [
        { name: 'proposal_id', type: 'uint64' },
        { name: 'voter', type: 'string' },
        { name: 'option', type: 'int32' },
    ],
};
export function createMsgVote(proposalId, option, sender) {
    return {
        type: 'cosmos-sdk/MsgVote',
        value: {
            proposal_id: proposalId,
            voter: sender,
            option,
        },
    };
}
//# sourceMappingURL=vote.js.map