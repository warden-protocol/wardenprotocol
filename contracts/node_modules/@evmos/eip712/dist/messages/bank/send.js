export const MSG_SEND_TYPES = {
    MsgValue: [
        { name: 'from_address', type: 'string' },
        { name: 'to_address', type: 'string' },
        { name: 'amount', type: 'TypeAmount[]' },
    ],
    TypeAmount: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
    ],
};
export function createMsgSend(amount, denom, fromAddress, toAddress) {
    return {
        type: 'cosmos-sdk/MsgSend',
        value: {
            amount: [
                {
                    amount,
                    denom,
                },
            ],
            from_address: fromAddress,
            to_address: toAddress,
        },
    };
}
//# sourceMappingURL=send.js.map