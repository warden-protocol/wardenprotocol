import { MsgCancelRevenue } from '../../proto/evmos/revenue/tx.js';
export function createMsgCancelRevenue(contractAddress, deployerAddress) {
    const msg = new MsgCancelRevenue({
        contractAddress,
        deployerAddress,
    });
    return {
        message: msg,
        path: MsgCancelRevenue.typeName,
    };
}
//# sourceMappingURL=msgCancelRevenue.js.map