import { MsgVote } from '../../proto/cosmos/gov/tx.js';
export function createMsgVote(proposalId, option, sender) {
    const voteMessage = new MsgVote({
        proposalId: BigInt(proposalId),
        voter: sender,
        option,
    });
    return {
        message: voteMessage,
        path: MsgVote.typeName,
    };
}
//# sourceMappingURL=msgVote.js.map