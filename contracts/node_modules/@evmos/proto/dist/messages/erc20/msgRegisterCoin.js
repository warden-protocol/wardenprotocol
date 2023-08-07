import { RegisterCoinProposal } from '../../proto/evmos/erc20/erc20.js';
export function createMsgRegisterCoin(title, description, metadata) {
    const msg = new RegisterCoinProposal({
        title,
        description,
        metadata,
    });
    return {
        message: msg,
        path: RegisterCoinProposal.typeName,
    };
}
//# sourceMappingURL=msgRegisterCoin.js.map