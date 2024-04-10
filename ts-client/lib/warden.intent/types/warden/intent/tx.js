/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "./params";
export const protobufPackage = "warden.intent";
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
function createBaseMsgApproveAction() {
    return { creator: "", actionType: "", actionId: 0 };
}
export const MsgApproveAction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.actionType !== "") {
            writer.uint32(18).string(message.actionType);
        }
        if (message.actionId !== 0) {
            writer.uint32(24).uint64(message.actionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgApproveAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.actionType = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.actionId = longToNumber(reader.uint64());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            actionType: isSet(object.actionType) ? String(object.actionType) : "",
            actionId: isSet(object.actionId) ? Number(object.actionId) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.actionType !== "") {
            obj.actionType = message.actionType;
        }
        if (message.actionId !== 0) {
            obj.actionId = Math.round(message.actionId);
        }
        return obj;
    },
    create(base) {
        return MsgApproveAction.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgApproveAction();
        message.creator = object.creator ?? "";
        message.actionType = object.actionType ?? "";
        message.actionId = object.actionId ?? 0;
        return message;
    },
};
function createBaseMsgApproveActionResponse() {
    return { status: "" };
}
export const MsgApproveActionResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.status !== "") {
            writer.uint32(10).string(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgApproveActionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.status = reader.string();
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
        return { status: isSet(object.status) ? String(object.status) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.status !== "") {
            obj.status = message.status;
        }
        return obj;
    },
    create(base) {
        return MsgApproveActionResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgApproveActionResponse();
        message.status = object.status ?? "";
        return message;
    },
};
function createBaseMsgNewIntent() {
    return { creator: "", name: "", definition: "" };
}
export const MsgNewIntent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.definition !== "") {
            writer.uint32(26).string(message.definition);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewIntent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.definition = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            name: isSet(object.name) ? String(object.name) : "",
            definition: isSet(object.definition) ? String(object.definition) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.definition !== "") {
            obj.definition = message.definition;
        }
        return obj;
    },
    create(base) {
        return MsgNewIntent.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewIntent();
        message.creator = object.creator ?? "";
        message.name = object.name ?? "";
        message.definition = object.definition ?? "";
        return message;
    },
};
function createBaseMsgNewIntentResponse() {
    return { id: 0 };
}
export const MsgNewIntentResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewIntentResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
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
        return { id: isSet(object.id) ? Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        return obj;
    },
    create(base) {
        return MsgNewIntentResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewIntentResponse();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseMsgUpdateIntent() {
    return { creator: "", id: 0, name: "", definition: "" };
}
export const MsgUpdateIntent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint64(message.id);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.definition !== "") {
            writer.uint32(34).string(message.definition);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateIntent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.definition = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            id: isSet(object.id) ? Number(object.id) : 0,
            name: isSet(object.name) ? String(object.name) : "",
            definition: isSet(object.definition) ? String(object.definition) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.definition !== "") {
            obj.definition = message.definition;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateIntent.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateIntent();
        message.creator = object.creator ?? "";
        message.id = object.id ?? 0;
        message.name = object.name ?? "";
        message.definition = object.definition ?? "";
        return message;
    },
};
function createBaseMsgUpdateIntentResponse() {
    return {};
}
export const MsgUpdateIntentResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateIntentResponse();
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
        return MsgUpdateIntentResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateIntentResponse();
        return message;
    },
};
function createBaseMsgRevokeAction() {
    return { creator: "", actionType: "", actionId: 0 };
}
export const MsgRevokeAction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.actionType !== "") {
            writer.uint32(18).string(message.actionType);
        }
        if (message.actionId !== 0) {
            writer.uint32(24).uint64(message.actionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRevokeAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.actionType = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.actionId = longToNumber(reader.uint64());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            actionType: isSet(object.actionType) ? String(object.actionType) : "",
            actionId: isSet(object.actionId) ? Number(object.actionId) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.actionType !== "") {
            obj.actionType = message.actionType;
        }
        if (message.actionId !== 0) {
            obj.actionId = Math.round(message.actionId);
        }
        return obj;
    },
    create(base) {
        return MsgRevokeAction.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgRevokeAction();
        message.creator = object.creator ?? "";
        message.actionType = object.actionType ?? "";
        message.actionId = object.actionId ?? 0;
        return message;
    },
};
function createBaseMsgRevokeActionResponse() {
    return {};
}
export const MsgRevokeActionResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRevokeActionResponse();
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
        return MsgRevokeActionResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgRevokeActionResponse();
        return message;
    },
};
export const MsgServiceName = "warden.intent.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.UpdateParams = this.UpdateParams.bind(this);
        this.ApproveAction = this.ApproveAction.bind(this);
        this.NewIntent = this.NewIntent.bind(this);
        this.UpdateIntent = this.UpdateIntent.bind(this);
        this.RevokeAction = this.RevokeAction.bind(this);
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
    ApproveAction(request) {
        const data = MsgApproveAction.encode(request).finish();
        const promise = this.rpc.request(this.service, "ApproveAction", data);
        return promise.then((data) => MsgApproveActionResponse.decode(_m0.Reader.create(data)));
    }
    NewIntent(request) {
        const data = MsgNewIntent.encode(request).finish();
        const promise = this.rpc.request(this.service, "NewIntent", data);
        return promise.then((data) => MsgNewIntentResponse.decode(_m0.Reader.create(data)));
    }
    UpdateIntent(request) {
        const data = MsgUpdateIntent.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateIntent", data);
        return promise.then((data) => MsgUpdateIntentResponse.decode(_m0.Reader.create(data)));
    }
    RevokeAction(request) {
        const data = MsgRevokeAction.encode(request).finish();
        const promise = this.rpc.request(this.service, "RevokeAction", data);
        return promise.then((data) => MsgRevokeActionResponse.decode(_m0.Reader.create(data)));
    }
}
const tsProtoGlobalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
