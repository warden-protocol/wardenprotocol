import { Coin } from '../../proto/cosmos/base/coin.js';
import { MsgSend } from '../../proto/cosmos/bank/tx.js';
export function createMsgSend(fromAddress, toAddress, amount, denom) {
    const value = new Coin({
        denom,
        amount,
    });
    const message = new MsgSend({
        fromAddress,
        toAddress,
        amount: [value],
    });
    return {
        message,
        path: MsgSend.typeName,
    };
}
//# sourceMappingURL=msgSend.js.map