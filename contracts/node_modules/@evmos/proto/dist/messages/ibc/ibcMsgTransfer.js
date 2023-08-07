import { Coin } from '../../proto/cosmos/base/coin.js';
import { Height } from '../../proto/cosmos-ibc/ibc/core/client.js';
import { MsgTransfer } from '../../proto/cosmos-ibc/ibc/applications/tx.js';
export function createIBCMsgTransfer(sourcePort, sourceChannel, amount, denom, sender, receiver, revisionNumber, revisionHeight, timeoutTimestamp, memo) {
    const token = new Coin({
        denom,
        amount,
    });
    const timeoutHeight = new Height({
        revisionNumber: BigInt(revisionNumber),
        revisionHeight: BigInt(revisionHeight),
    });
    const ibcMessage = new MsgTransfer({
        sourcePort,
        sourceChannel,
        token,
        sender,
        receiver,
        timeoutHeight,
        timeoutTimestamp: BigInt(parseInt(timeoutTimestamp, 10)),
        memo: memo !== null && memo !== void 0 ? memo : '',
    });
    return {
        message: ibcMessage,
        path: MsgTransfer.typeName,
    };
}
//# sourceMappingURL=ibcMsgTransfer.js.map