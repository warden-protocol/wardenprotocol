import { Coin } from '../../proto/cosmos/base/coin.js';
import { MsgSubmitProposal } from '../../proto/cosmos/gov/tx.js';
export function createMsgSubmitProposal(content, initialDepositDenom, initialDepositAmount, proposer) {
    const initialDeposit = new Coin({
        denom: initialDepositDenom,
        amount: initialDepositAmount,
    });
    const msg = new MsgSubmitProposal({
        content,
        initialDeposit: [initialDeposit],
        proposer,
    });
    return {
        message: msg,
        path: MsgSubmitProposal.typeName,
    };
}
//# sourceMappingURL=msgSubmitProposal.js.map