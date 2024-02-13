/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
export const protobufPackage = "cosmos.crisis.v1beta1";
function createBaseMsgVerifyInvariant() {
    return { sender: "", invariantModuleName: "", invariantRoute: "" };
}
export const MsgVerifyInvariant = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.invariantModuleName !== "") {
            writer.uint32(18).string(message.invariantModuleName);
        }
        if (message.invariantRoute !== "") {
            writer.uint32(26).string(message.invariantRoute);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVerifyInvariant();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.invariantModuleName = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.invariantRoute = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            invariantModuleName: isSet(object.invariantModuleName) ? String(object.invariantModuleName) : "",
            invariantRoute: isSet(object.invariantRoute) ? String(object.invariantRoute) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.invariantModuleName !== "") {
            obj.invariantModuleName = message.invariantModuleName;
        }
        if (message.invariantRoute !== "") {
            obj.invariantRoute = message.invariantRoute;
        }
        return obj;
    },
    create(base) {
        return MsgVerifyInvariant.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgVerifyInvariant();
        message.sender = object.sender ?? "";
        message.invariantModuleName = object.invariantModuleName ?? "";
        message.invariantRoute = object.invariantRoute ?? "";
        return message;
    },
};
function createBaseMsgVerifyInvariantResponse() {
    return {};
}
export const MsgVerifyInvariantResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVerifyInvariantResponse();
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
        return MsgVerifyInvariantResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgVerifyInvariantResponse();
        return message;
    },
};
function createBaseMsgUpdateParams() {
    return { authority: "", constantFee: undefined };
}
export const MsgUpdateParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.constantFee !== undefined) {
            Coin.encode(message.constantFee, writer.uint32(18).fork()).ldelim();
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
                    message.constantFee = Coin.decode(reader, reader.uint32());
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
            constantFee: isSet(object.constantFee) ? Coin.fromJSON(object.constantFee) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.constantFee !== undefined) {
            obj.constantFee = Coin.toJSON(message.constantFee);
        }
        return obj;
    },
    create(base) {
        return MsgUpdateParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.constantFee = (object.constantFee !== undefined && object.constantFee !== null)
            ? Coin.fromPartial(object.constantFee)
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
export const MsgServiceName = "cosmos.crisis.v1beta1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.VerifyInvariant = this.VerifyInvariant.bind(this);
        this.UpdateParams = this.UpdateParams.bind(this);
    }
    VerifyInvariant(request) {
        const data = MsgVerifyInvariant.encode(request).finish();
        const promise = this.rpc.request(this.service, "VerifyInvariant", data);
        return promise.then((data) => MsgVerifyInvariantResponse.decode(_m0.Reader.create(data)));
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
