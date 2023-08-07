export const REGISTER_ERC20_TYPES = {
    ContentValue: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'erc20addresses', type: 'string[]' },
    ],
};
export function createRegisterERC20(title, description, erc20addresses) {
    return {
        type: 'erc20/RegisterERC20Proposal',
        value: {
            title,
            description,
            erc20addresses,
        },
    };
}
//# sourceMappingURL=registerERC20.js.map