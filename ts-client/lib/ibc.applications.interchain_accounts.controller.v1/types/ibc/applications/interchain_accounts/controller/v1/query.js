/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Params } from "./controller";
export const protobufPackage = "ibc.applications.interchain_accounts.controller.v1";
function createBaseQueryInterchainAccountRequest() {
    return { owner: "", connectionId: "" };
}
export const QueryInterchainAccountRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.connectionId !== "") {
            writer.uint32(18).string(message.connectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryInterchainAccountRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.owner = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.connectionId = reader.string();
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
            owner: isSet(object.owner) ? String(object.owner) : "",
            connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.owner !== "") {
            obj.owner = message.owner;
        }
        if (message.connectionId !== "") {
            obj.connectionId = message.connectionId;
        }
        return obj;
    },
    create(base) {
        return QueryInterchainAccountRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryInterchainAccountRequest();
        message.owner = object.owner ?? "";
        message.connectionId = object.connectionId ?? "";
        return message;
    },
};
function createBaseQueryInterchainAccountResponse() {
    return { address: "" };
}
export const QueryInterchainAccountResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryInterchainAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
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
        return { address: isSet(object.address) ? String(object.address) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        return obj;
    },
    create(base) {
        return QueryInterchainAccountResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryInterchainAccountResponse();
        message.address = object.address ?? "";
        return message;
    },
};
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
export const QueryServiceName = "ibc.applications.interchain_accounts.controller.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.InterchainAccount = this.InterchainAccount.bind(this);
        this.Params = this.Params.bind(this);
    }
    InterchainAccount(request) {
        const data = QueryInterchainAccountRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "InterchainAccount", data);
        return promise.then((data) => QueryInterchainAccountResponse.decode(_m0.Reader.create(data)));
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
