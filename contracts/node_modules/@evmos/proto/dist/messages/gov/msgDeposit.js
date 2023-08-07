import { Coin } from '../../proto/cosmos/base/coin.js';
import { MsgDeposit } from '../../proto/cosmos/gov/tx.js';
export function createMsgDeposit(proposalId, depositor, deposit) {
    const depositAmount = new Coin(Object.assign({}, deposit));
    const depositMessage = new MsgDeposit({
        proposalId: BigInt(proposalId),
        depositor,
        amount: [depositAmount],
    });
    return {
        path: MsgDeposit.typeName,
        message: depositMessage,
    };
}
//# sourceMappingURL=msgDeposit.js.map