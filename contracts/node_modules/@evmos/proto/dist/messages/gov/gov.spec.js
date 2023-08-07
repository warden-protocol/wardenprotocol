import { createMsgVote } from './msgVote';
import { createMsgDeposit } from './msgDeposit';
import { createMsgSubmitProposal } from './msgSubmitProposal';
import { createAnyMessage } from '../common';
import { MsgVote, MsgSubmitProposal, MsgDeposit, } from '../../proto/cosmos/gov/tx';
import { from, denom } from '../../proto/tests/utils';
import { JSONOptions } from '../../proto/tests/common';
describe('test Gov Module message generation', () => {
    it('correctly wraps MsgVote', () => {
        const proposalId = 60;
        const vote = 1;
        const msg = createMsgVote(proposalId, vote, from);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            proposal_id: proposalId.toString(),
            voter: from,
            option: vote,
        });
        expect(msg.path).toStrictEqual(MsgVote.typeName);
    });
    it('correctly wraps MsgDeposit', () => {
        const amount = '1000';
        const proposalId = 40;
        const msg = createMsgDeposit(proposalId, from, { denom, amount });
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            proposal_id: proposalId.toString(),
            depositor: from,
            amount: [
                {
                    amount,
                    denom,
                },
            ],
        });
        expect(msg.path).toStrictEqual(MsgDeposit.typeName);
    });
    it('correctly wraps MsgSubmitProposal', () => {
        const proposalId = 60;
        const vote = 1;
        const amount = '1000';
        const msgVote = createMsgVote(proposalId, vote, from);
        const msgVoteAny = createAnyMessage(msgVote);
        const msg = createMsgSubmitProposal(msgVoteAny, denom, amount, from);
        expect(msg.message.toJson(JSONOptions)).toStrictEqual({
            content: {
                '@type': `/${MsgVote.typeName}`,
                option: vote,
                proposal_id: proposalId.toString(),
                voter: from,
            },
            initial_deposit: [
                {
                    denom,
                    amount,
                },
            ],
            proposer: from,
        });
        expect(msg.path).toStrictEqual(MsgSubmitProposal.typeName);
    });
});
//# sourceMappingURL=gov.spec.js.map