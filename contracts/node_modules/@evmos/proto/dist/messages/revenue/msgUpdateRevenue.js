import { MsgUpdateRevenue } from '../../proto/evmos/revenue/tx.js';
export function createMsgUpdateRevenue(contractAddress, deployerAddress, withdrawerAddress) {
    const msg = new MsgUpdateRevenue({
        contractAddress,
        deployerAddress,
        withdrawerAddress,
    });
    return {
        message: msg,
        path: MsgUpdateRevenue.typeName,
    };
}
//# sourceMappingURL=msgUpdateRevenue.js.map