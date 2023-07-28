export const MSG_CONVERT_COIN_TYPES = {
    MsgValue: [
        { name: 'coin', type: 'TypeCoin' },
        { name: 'receiver', type: 'string' },
        { name: 'sender', type: 'string' },
    ],
    TypeCoin: [
        { name: 'denom', type: 'string' },
        { name: 'amount', type: 'string' },
    ],
};
export function createMsgConvertCoin(denom, amount, receiver, sender) {
    return {
        type: 'evmos/MsgConvertCoin',
        value: {
            coin: {
                denom,
                amount,
            },
            receiver,
            sender,
        },
    };
}
//# sourceMappingURL=convertCoin.js.map