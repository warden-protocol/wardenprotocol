/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../google/protobuf/any";
import { Action, actionStatusFromJSON, actionStatusToJSON } from "./action";
import { Intent } from "./intent";
import { Params } from "./params";
export const protobufPackage = "warden.intent";
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
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
        return QueryParamsRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryParamsRequest();
        return message;
    },
};
function createBaseQueryParamsResponse() {
    return { params: undefined };
}
export const QueryParamsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return QueryParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseQueryActionsRequest() {
    return { pagination: undefined };
}
export const QueryActionsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryActionsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryActionsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryActionsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryActionsResponse() {
    return { pagination: undefined, actions: [] };
}
export const QueryActionsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.actions) {
            Action.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryActionsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.actions.push(Action.decode(reader, reader.uint32()));
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
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
            actions: Array.isArray(object?.actions) ? object.actions.map((e) => Action.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.actions?.length) {
            obj.actions = message.actions.map((e) => Action.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryActionsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryActionsResponse();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
        return message;
    },
};
function createBaseIntentResponse() {
    return { intent: undefined, metadata: undefined };
}
export const IntentResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.intent !== undefined) {
            Intent.encode(message.intent, writer.uint32(10).fork()).ldelim();
        }
        if (message.metadata !== undefined) {
            Any.encode(message.metadata, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIntentResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.intent = Intent.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.metadata = Any.decode(reader, reader.uint32());
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
            intent: isSet(object.intent) ? Intent.fromJSON(object.intent) : undefined,
            metadata: isSet(object.metadata) ? Any.fromJSON(object.metadata) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.intent !== undefined) {
            obj.intent = Intent.toJSON(message.intent);
        }
        if (message.metadata !== undefined) {
            obj.metadata = Any.toJSON(message.metadata);
        }
        return obj;
    },
    create(base) {
        return IntentResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIntentResponse();
        message.intent = (object.intent !== undefined && object.intent !== null)
            ? Intent.fromPartial(object.intent)
            : undefined;
        message.metadata = (object.metadata !== undefined && object.metadata !== null)
            ? Any.fromPartial(object.metadata)
            : undefined;
        return message;
    },
};
function createBaseQueryIntentsRequest() {
    return { pagination: undefined };
}
export const QueryIntentsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIntentsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryIntentsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIntentsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryIntentsResponse() {
    return { pagination: undefined, intents: [] };
}
export const QueryIntentsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.intents) {
            IntentResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIntentsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.intents.push(IntentResponse.decode(reader, reader.uint32()));
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
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
            intents: Array.isArray(object?.intents) ? object.intents.map((e) => IntentResponse.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.intents?.length) {
            obj.intents = message.intents.map((e) => IntentResponse.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryIntentsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIntentsResponse();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.intents = object.intents?.map((e) => IntentResponse.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryIntentByIdRequest() {
    return { id: 0 };
}
export const QueryIntentByIdRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIntentByIdRequest();
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
        return QueryIntentByIdRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIntentByIdRequest();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseQueryIntentByIdResponse() {
    return { intent: undefined };
}
export const QueryIntentByIdResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.intent !== undefined) {
            IntentResponse.encode(message.intent, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIntentByIdResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.intent = IntentResponse.decode(reader, reader.uint32());
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
        return { intent: isSet(object.intent) ? IntentResponse.fromJSON(object.intent) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.intent !== undefined) {
            obj.intent = IntentResponse.toJSON(message.intent);
        }
        return obj;
    },
    create(base) {
        return QueryIntentByIdResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIntentByIdResponse();
        message.intent = (object.intent !== undefined && object.intent !== null)
            ? IntentResponse.fromPartial(object.intent)
            : undefined;
        return message;
    },
};
function createBaseQueryActionsByAddressRequest() {
    return { pagination: undefined, address: "", status: 0 };
}
export const QueryActionsByAddressRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.address !== "") {
            writer.uint32(18).string(message.address);
        }
        if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryActionsByAddressRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.status = reader.int32();
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
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
            address: isSet(object.address) ? String(object.address) : "",
            status: isSet(object.status) ? actionStatusFromJSON(object.status) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.status !== 0) {
            obj.status = actionStatusToJSON(message.status);
        }
        return obj;
    },
    create(base) {
        return QueryActionsByAddressRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryActionsByAddressRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.address = object.address ?? "";
        message.status = object.status ?? 0;
        return message;
    },
};
function createBaseQueryActionsByAddressResponse() {
    return { pagination: undefined, actions: [] };
}
export const QueryActionsByAddressResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.actions) {
            Action.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryActionsByAddressResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.actions.push(Action.decode(reader, reader.uint32()));
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
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
            actions: Array.isArray(object?.actions) ? object.actions.map((e) => Action.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.actions?.length) {
            obj.actions = message.actions.map((e) => Action.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryActionsByAddressResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryActionsByAddressResponse();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
        return message;
    },
};
export const QueryServiceName = "warden.intent.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.Params = this.Params.bind(this);
        this.Actions = this.Actions.bind(this);
        this.Intents = this.Intents.bind(this);
        this.IntentById = this.IntentById.bind(this);
        this.ActionsByAddress = this.ActionsByAddress.bind(this);
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
    }
    Actions(request) {
        const data = QueryActionsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Actions", data);
        return promise.then((data) => QueryActionsResponse.decode(_m0.Reader.create(data)));
    }
    Intents(request) {
        const data = QueryIntentsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Intents", data);
        return promise.then((data) => QueryIntentsResponse.decode(_m0.Reader.create(data)));
    }
    IntentById(request) {
        const data = QueryIntentByIdRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "IntentById", data);
        return promise.then((data) => QueryIntentByIdResponse.decode(_m0.Reader.create(data)));
    }
    ActionsByAddress(request) {
        const data = QueryActionsByAddressRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ActionsByAddress", data);
        return promise.then((data) => QueryActionsByAddressResponse.decode(_m0.Reader.create(data)));
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
