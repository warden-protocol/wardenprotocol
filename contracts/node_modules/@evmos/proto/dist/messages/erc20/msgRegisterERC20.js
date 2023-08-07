import { RegisterERC20Proposal } from '../../proto/evmos/erc20/erc20.js';
export function createMsgRegisterERC20(title, description, erc20addresses) {
    const msg = new RegisterERC20Proposal({
        title,
        description,
        erc20addresses,
    });
    return {
        message: msg,
        path: RegisterERC20Proposal.typeName,
    };
}
//# sourceMappingURL=msgRegisterERC20.js.map