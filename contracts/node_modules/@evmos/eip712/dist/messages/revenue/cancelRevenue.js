export const MSG_CANCEL_REVENUE_TYPES = {
    MsgValue: [
        { name: 'contract_address', type: 'string' },
        { name: 'deployer_address', type: 'string' },
    ],
};
export function createMsgCancelRevenue(contract_address, deployer_address) {
    return {
        type: 'evmos/MsgCancelRevenue',
        value: {
            contract_address,
            deployer_address,
        },
    };
}
//# sourceMappingURL=cancelRevenue.js.map