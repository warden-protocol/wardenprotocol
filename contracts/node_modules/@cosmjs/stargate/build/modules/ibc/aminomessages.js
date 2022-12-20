"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIbcAminoConverters = exports.isAminoMsgTransfer = void 0;
const long_1 = __importDefault(require("long"));
function isAminoMsgTransfer(msg) {
    return msg.type === "cosmos-sdk/MsgTransfer";
}
exports.isAminoMsgTransfer = isAminoMsgTransfer;
function omitDefault(input) {
    if (typeof input === "string") {
        return input === "" ? undefined : input;
    }
    if (typeof input === "number") {
        return input === 0 ? undefined : input;
    }
    if (long_1.default.isLong(input)) {
        return input.isZero() ? undefined : input;
    }
    throw new Error(`Got unsupported type '${typeof input}'`);
}
function createIbcAminoConverters() {
    return {
        "/ibc.applications.transfer.v1.MsgTransfer": {
            aminoType: "cosmos-sdk/MsgTransfer",
            toAmino: ({ sourcePort, sourceChannel, token, sender, receiver, timeoutHeight, timeoutTimestamp, }) => {
                var _a, _b, _c;
                return ({
                    source_port: sourcePort,
                    source_channel: sourceChannel,
                    token: token,
                    sender: sender,
                    receiver: receiver,
                    timeout_height: timeoutHeight
                        ? {
                            revision_height: (_a = omitDefault(timeoutHeight.revisionHeight)) === null || _a === void 0 ? void 0 : _a.toString(),
                            revision_number: (_b = omitDefault(timeoutHeight.revisionNumber)) === null || _b === void 0 ? void 0 : _b.toString(),
                        }
                        : {},
                    timeout_timestamp: (_c = omitDefault(timeoutTimestamp)) === null || _c === void 0 ? void 0 : _c.toString(),
                });
            },
            fromAmino: ({ source_port, source_channel, token, sender, receiver, timeout_height, timeout_timestamp, }) => ({
                sourcePort: source_port,
                sourceChannel: source_channel,
                token: token,
                sender: sender,
                receiver: receiver,
                timeoutHeight: timeout_height
                    ? {
                        revisionHeight: long_1.default.fromString(timeout_height.revision_height || "0", true),
                        revisionNumber: long_1.default.fromString(timeout_height.revision_number || "0", true),
                    }
                    : undefined,
                timeoutTimestamp: long_1.default.fromString(timeout_timestamp || "0", true),
            }),
        },
    };
}
exports.createIbcAminoConverters = createIbcAminoConverters;
//# sourceMappingURL=aminomessages.js.map