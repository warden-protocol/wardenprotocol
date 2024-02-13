/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
import { Input, Output, Params, SendEnabled } from "./bank";
export const protobufPackage = "cosmos.bank.v1beta1";
function createBaseMsgSend() {
    return { fromAddress: "", toAddress: "", amount: [] };
}
export const MsgSend = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.fromAddress !== "") {
            writer.uint32(10).string(message.fromAddress);
        }
        if (message.toAddress !== "") {
            writer.uint32(18).string(message.toAddress);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSend();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.fromAddress = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.toAddress = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            fromAddress: isSet(object.fromAddress) ? String(object.fromAddress) : "",
            toAddress: isSet(object.toAddress) ? String(object.toAddress) : "",
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.fromAddress !== "") {
            obj.fromAddress = message.fromAddress;
        }
        if (message.toAddress !== "") {
            obj.toAddress = message.toAddress;
        }
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgSend.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSend();
        message.fromAddress = object.fromAddress ?? "";
        message.toAddress = object.toAddress ?? "";
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgSendResponse() {
    return {};
}
export const MsgSendResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgSendResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgSendResponse();
        return message;
    },
};
function createBaseMsgMultiSend() {
    return { inputs: [], outputs: [] };
}
export const MsgMultiSend = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.inputs) {
            Input.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.outputs) {
            Output.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMultiSend();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.inputs.push(Input.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.outputs.push(Output.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            inputs: Array.isArray(object?.inputs) ? object.inputs.map((e) => Input.fromJSON(e)) : [],
            outputs: Array.isArray(object?.outputs) ? object.outputs.map((e) => Output.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.inputs?.length) {
            obj.inputs = message.inputs.map((e) => Input.toJSON(e));
        }
        if (message.outputs?.length) {
            obj.outputs = message.outputs.map((e) => Output.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgMultiSend.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgMultiSend();
        message.inputs = object.inputs?.map((e) => Input.fromPartial(e)) || [];
        message.outputs = object.outputs?.map((e) => Output.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgMultiSendResponse() {
    return {};
}
export const MsgMultiSendResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMultiSendResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgMultiSendResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgMultiSendResponse();
        return message;
    },
};
function createBaseMsgUpdateParams() {
    return { authority: "", params: undefined };
}
export const MsgUpdateParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.params = Params.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            authority: isSet(object.authority) ? String(object.authority) : "",
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return MsgUpdateParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseMsgUpdateParamsResponse() {
    return {};
}
export const MsgUpdateParamsResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUpdateParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
};
function createBaseMsgSetSendEnabled() {
    return { authority: "", sendEnabled: [], useDefaultFor: [] };
}
export const MsgSetSendEnabled = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        for (const v of message.sendEnabled) {
            SendEnabled.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.useDefaultFor) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetSendEnabled();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.sendEnabled.push(SendEnabled.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.useDefaultFor.push(reader.string());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            authority: isSet(object.authority) ? String(object.authority) : "",
            sendEnabled: Array.isArray(object?.sendEnabled)
                ? object.sendEnabled.map((e) => SendEnabled.fromJSON(e))
                : [],
            useDefaultFor: Array.isArray(object?.useDefaultFor) ? object.useDefaultFor.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.sendEnabled?.length) {
            obj.sendEnabled = message.sendEnabled.map((e) => SendEnabled.toJSON(e));
        }
        if (message.useDefaultFor?.length) {
            obj.useDefaultFor = message.useDefaultFor;
        }
        return obj;
    },
    create(base) {
        return MsgSetSendEnabled.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSetSendEnabled();
        message.authority = object.authority ?? "";
        message.sendEnabled = object.sendEnabled?.map((e) => SendEnabled.fromPartial(e)) || [];
        message.useDefaultFor = object.useDefaultFor?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgSetSendEnabledResponse() {
    return {};
}
export const MsgSetSendEnabledResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetSendEnabledResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgSetSendEnabledResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgSetSendEnabledResponse();
        return message;
    },
};
export const MsgServiceName = "cosmos.bank.v1beta1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.Send = this.Send.bind(this);
        this.MultiSend = this.MultiSend.bind(this);
        this.UpdateParams = this.UpdateParams.bind(this);
        this.SetSendEnabled = this.SetSendEnabled.bind(this);
    }
    Send(request) {
        const data = MsgSend.encode(request).finish();
        const promise = this.rpc.request(this.service, "Send", data);
        return promise.then((data) => MsgSendResponse.decode(_m0.Reader.create(data)));
    }
    MultiSend(request) {
        const data = MsgMultiSend.encode(request).finish();
        const promise = this.rpc.request(this.service, "MultiSend", data);
        return promise.then((data) => MsgMultiSendResponse.decode(_m0.Reader.create(data)));
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
    SetSendEnabled(request) {
        const data = MsgSetSendEnabled.encode(request).finish();
        const promise = this.rpc.request(this.service, "SetSendEnabled", data);
        return promise.then((data) => MsgSetSendEnabledResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
