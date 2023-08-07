import { MsgClawback } from '../../proto/evmos/vesting/tx.js';
export function createMsgClawback(funderAddress, accountAddress, destAddress) {
    const msg = new MsgClawback({
        funderAddress,
        accountAddress,
        destAddress,
    });
    return {
        message: msg,
        path: MsgClawback.typeName,
    };
}
//# sourceMappingURL=msgClawback.js.map