import { MsgRegisterRevenue } from '../../proto/evmos/revenue/tx.js';
export function createMsgRegisterRevenue(contractAddress, deployerAddress, withdrawerAddress, nonces) {
    const noncesBigInt = nonces.map((n) => BigInt(n));
    const msg = new MsgRegisterRevenue({
        contractAddress,
        deployerAddress,
        withdrawerAddress,
        nonces: noncesBigInt,
    });
    return {
        message: msg,
        path: MsgRegisterRevenue.typeName,
    };
}
//# sourceMappingURL=msgRegisterRevenue.js.map