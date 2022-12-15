"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgMultiSendResponse = exports.MsgMultiSend = exports.MsgSendResponse = exports.MsgSend = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const bank_1 = require("../../../cosmos/bank/v1beta1/bank");
exports.protobufPackage = "cosmos.bank.v1beta1";
const baseMsgSend = { fromAddress: "", toAddress: "" };
exports.MsgSend = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.fromAddress !== "") {
            writer.uint32(10).string(message.fromAddress);
        }
        if (message.toAddress !== "") {
            writer.uint32(18).string(message.toAddress);
        }
        for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSend);
        message.amount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.fromAddress = reader.string();
                    break;
                case 2:
                    message.toAddress = reader.string();
                    break;
                case 3:
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseMsgSend);
        message.fromAddress =
            object.fromAddress !== undefined && object.fromAddress !== null ? String(object.fromAddress) : "";
        message.toAddress =
            object.toAddress !== undefined && object.toAddress !== null ? String(object.toAddress) : "";
        message.amount = ((_a = object.amount) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.fromAddress !== undefined && (obj.fromAddress = message.fromAddress);
        message.toAddress !== undefined && (obj.toAddress = message.toAddress);
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.amount = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseMsgSend);
        message.fromAddress = (_a = object.fromAddress) !== null && _a !== void 0 ? _a : "";
        message.toAddress = (_b = object.toAddress) !== null && _b !== void 0 ? _b : "";
        message.amount = ((_c = object.amount) === null || _c === void 0 ? void 0 : _c.map((e) => coin_1.Coin.fromPartial(e))) || [];
        return message;
    },
};
const baseMsgSendResponse = {};
exports.MsgSendResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSendResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgSendResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgSendResponse);
        return message;
    },
};
const baseMsgMultiSend = {};
exports.MsgMultiSend = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.inputs) {
            bank_1.Input.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.outputs) {
            bank_1.Output.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgMultiSend);
        message.inputs = [];
        message.outputs = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.inputs.push(bank_1.Input.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.outputs.push(bank_1.Output.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgMultiSend);
        message.inputs = ((_a = object.inputs) !== null && _a !== void 0 ? _a : []).map((e) => bank_1.Input.fromJSON(e));
        message.outputs = ((_b = object.outputs) !== null && _b !== void 0 ? _b : []).map((e) => bank_1.Output.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.inputs) {
            obj.inputs = message.inputs.map((e) => (e ? bank_1.Input.toJSON(e) : undefined));
        }
        else {
            obj.inputs = [];
        }
        if (message.outputs) {
            obj.outputs = message.outputs.map((e) => (e ? bank_1.Output.toJSON(e) : undefined));
        }
        else {
            obj.outputs = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgMultiSend);
        message.inputs = ((_a = object.inputs) === null || _a === void 0 ? void 0 : _a.map((e) => bank_1.Input.fromPartial(e))) || [];
        message.outputs = ((_b = object.outputs) === null || _b === void 0 ? void 0 : _b.map((e) => bank_1.Output.fromPartial(e))) || [];
        return message;
    },
};
const baseMsgMultiSendResponse = {};
exports.MsgMultiSendResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgMultiSendResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgMultiSendResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgMultiSendResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Send = this.Send.bind(this);
        this.MultiSend = this.MultiSend.bind(this);
    }
    Send(request) {
        const data = exports.MsgSend.encode(request).finish();
        const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "Send", data);
        return promise.then((data) => exports.MsgSendResponse.decode(new minimal_1.default.Reader(data)));
    }
    MultiSend(request) {
        const data = exports.MsgMultiSend.encode(request).finish();
        const promise = this.rpc.request("cosmos.bank.v1beta1.Msg", "MultiSend", data);
        return promise.then((data) => exports.MsgMultiSendResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=tx.js.map