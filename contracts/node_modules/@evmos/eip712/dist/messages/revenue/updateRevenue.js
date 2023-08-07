export const MSG_UPDATE_REVENUE_TYPES = {
    MsgValue: [
        { name: 'contract_address', type: 'string' },
        { name: 'deployer_address', type: 'string' },
        { name: 'withdrawer_address', type: 'string' },
    ],
};
export function createMsgUpdateRevenue(contract_address, deployer_address, withdrawer_address) {
    return {
        type: 'evmos/MsgUpdateRevenue',
        value: {
            contract_address,
            deployer_address,
            withdrawer_address,
        },
    };
}
//# sourceMappingURL=updateRevenue.js.map