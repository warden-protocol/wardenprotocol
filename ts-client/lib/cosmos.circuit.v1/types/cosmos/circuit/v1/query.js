/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { GenesisAccountPermissions, Permissions } from "./types";
export const protobufPackage = "cosmos.circuit.v1";
function createBaseQueryAccountRequest() {
    return { address: "" };
}
export const QueryAccountRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountRequest();
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
        return QueryAccountRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAccountRequest();
        message.address = object.address ?? "";
        return message;
    },
};
function createBaseAccountResponse() {
    return { permission: undefined };
}
export const AccountResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.permission !== undefined) {
            Permissions.encode(message.permission, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.permission = Permissions.decode(reader, reader.uint32());
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
        return { permission: isSet(object.permission) ? Permissions.fromJSON(object.permission) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.permission !== undefined) {
            obj.permission = Permissions.toJSON(message.permission);
        }
        return obj;
    },
    create(base) {
        return AccountResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAccountResponse();
        message.permission = (object.permission !== undefined && object.permission !== null)
            ? Permissions.fromPartial(object.permission)
            : undefined;
        return message;
    },
};
function createBaseQueryAccountsRequest() {
    return { pagination: undefined };
}
export const QueryAccountsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountsRequest();
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
        return QueryAccountsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAccountsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseAccountsResponse() {
    return { accounts: [], pagination: undefined };
}
export const AccountsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.accounts) {
            GenesisAccountPermissions.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccountsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.accounts.push(GenesisAccountPermissions.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            accounts: Array.isArray(object?.accounts)
                ? object.accounts.map((e) => GenesisAccountPermissions.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.accounts?.length) {
            obj.accounts = message.accounts.map((e) => GenesisAccountPermissions.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return AccountsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAccountsResponse();
        message.accounts = object.accounts?.map((e) => GenesisAccountPermissions.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryDisabledListRequest() {
    return {};
}
export const QueryDisabledListRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDisabledListRequest();
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
        return QueryDisabledListRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryDisabledListRequest();
        return message;
    },
};
function createBaseDisabledListResponse() {
    return { disabledList: [] };
}
export const DisabledListResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.disabledList) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDisabledListResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.disabledList.push(reader.string());
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
        return { disabledList: Array.isArray(object?.disabledList) ? object.disabledList.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.disabledList?.length) {
            obj.disabledList = message.disabledList;
        }
        return obj;
    },
    create(base) {
        return DisabledListResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDisabledListResponse();
        message.disabledList = object.disabledList?.map((e) => e) || [];
        return message;
    },
};
export const QueryServiceName = "cosmos.circuit.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.Account = this.Account.bind(this);
        this.Accounts = this.Accounts.bind(this);
        this.DisabledList = this.DisabledList.bind(this);
    }
    Account(request) {
        const data = QueryAccountRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Account", data);
        return promise.then((data) => AccountResponse.decode(_m0.Reader.create(data)));
    }
    Accounts(request) {
        const data = QueryAccountsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Accounts", data);
        return promise.then((data) => AccountsResponse.decode(_m0.Reader.create(data)));
    }
    DisabledList(request) {
        const data = QueryDisabledListRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DisabledList", data);
        return promise.then((data) => DisabledListResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
