"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBankAminoConverters = exports.isAminoMsgMultiSend = exports.isAminoMsgSend = void 0;
function isAminoMsgSend(msg) {
    return msg.type === "cosmos-sdk/MsgSend";
}
exports.isAminoMsgSend = isAminoMsgSend;
function isAminoMsgMultiSend(msg) {
    return msg.type === "cosmos-sdk/MsgMultiSend";
}
exports.isAminoMsgMultiSend = isAminoMsgMultiSend;
function createBankAminoConverters() {
    return {
        "/cosmos.bank.v1beta1.MsgSend": {
            aminoType: "cosmos-sdk/MsgSend",
            toAmino: ({ fromAddress, toAddress, amount }) => ({
                from_address: fromAddress,
                to_address: toAddress,
                amount: [...amount],
            }),
            fromAmino: ({ from_address, to_address, amount }) => ({
                fromAddress: from_address,
                toAddress: to_address,
                amount: [...amount],
            }),
        },
        "/cosmos.bank.v1beta1.MsgMultiSend": {
            aminoType: "cosmos-sdk/MsgMultiSend",
            toAmino: ({ inputs, outputs }) => ({
                inputs: inputs.map((input) => ({
                    address: input.address,
                    coins: [...input.coins],
                })),
                outputs: outputs.map((output) => ({
                    address: output.address,
                    coins: [...output.coins],
                })),
            }),
            fromAmino: ({ inputs, outputs }) => ({
                inputs: inputs.map((input) => ({
                    address: input.address,
                    coins: [...input.coins],
                })),
                outputs: outputs.map((output) => ({
                    address: output.address,
                    coins: [...output.coins],
                })),
            }),
        },
    };
}
exports.createBankAminoConverters = createBankAminoConverters;
//# sourceMappingURL=aminomessages.js.map