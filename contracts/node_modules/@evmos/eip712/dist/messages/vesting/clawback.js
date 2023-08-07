export const MSG_CLAWBACK_TYPES = {
    MsgValue: [
        { name: 'funder_address', type: 'string' },
        { name: 'account_address', type: 'string' },
        { name: 'dest_address', type: 'string' },
    ],
};
export function createMsgClawback(funder_address, account_address, dest_address) {
    return {
        type: 'evmos/MsgClawback',
        value: {
            funder_address,
            account_address,
            dest_address,
        },
    };
}
//# sourceMappingURL=clawback.js.map