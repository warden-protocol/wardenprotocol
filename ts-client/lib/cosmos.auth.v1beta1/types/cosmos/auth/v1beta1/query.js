/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { BaseAccount, Params } from "./auth";
export const protobufPackage = "cosmos.auth.v1beta1";
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
function createBaseQueryAccountsResponse() {
    return { accounts: [], pagination: undefined };
}
export const QueryAccountsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.accounts) {
            Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.accounts.push(Any.decode(reader, reader.uint32()));
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
            accounts: Array.isArray(object?.accounts) ? object.accounts.map((e) => Any.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.accounts?.length) {
            obj.accounts = message.accounts.map((e) => Any.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryAccountsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAccountsResponse();
        message.accounts = object.accounts?.map((e) => Any.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
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
function createBaseQueryAccountResponse() {
    return { account: undefined };
}
export const QueryAccountResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.account !== undefined) {
            Any.encode(message.account, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.account = Any.decode(reader, reader.uint32());
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
        return { account: isSet(object.account) ? Any.fromJSON(object.account) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.account !== undefined) {
            obj.account = Any.toJSON(message.account);
        }
        return obj;
    },
    create(base) {
        return QueryAccountResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAccountResponse();
        message.account = (object.account !== undefined && object.account !== null)
            ? Any.fromPartial(object.account)
            : undefined;
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
function createBaseQueryModuleAccountsRequest() {
    return {};
}
export const QueryModuleAccountsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryModuleAccountsRequest();
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
        return QueryModuleAccountsRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryModuleAccountsRequest();
        return message;
    },
};
function createBaseQueryModuleAccountsResponse() {
    return { accounts: [] };
}
export const QueryModuleAccountsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.accounts) {
            Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryModuleAccountsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.accounts.push(Any.decode(reader, reader.uint32()));
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
        return { accounts: Array.isArray(object?.accounts) ? object.accounts.map((e) => Any.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.accounts?.length) {
            obj.accounts = message.accounts.map((e) => Any.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryModuleAccountsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryModuleAccountsResponse();
        message.accounts = object.accounts?.map((e) => Any.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryModuleAccountByNameRequest() {
    return { name: "" };
}
export const QueryModuleAccountByNameRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryModuleAccountByNameRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.name = reader.string();
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
        return { name: isSet(object.name) ? String(object.name) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.name !== "") {
            obj.name = message.name;
        }
        return obj;
    },
    create(base) {
        return QueryModuleAccountByNameRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryModuleAccountByNameRequest();
        message.name = object.name ?? "";
        return message;
    },
};
function createBaseQueryModuleAccountByNameResponse() {
    return { account: undefined };
}
export const QueryModuleAccountByNameResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.account !== undefined) {
            Any.encode(message.account, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryModuleAccountByNameResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.account = Any.decode(reader, reader.uint32());
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
        return { account: isSet(object.account) ? Any.fromJSON(object.account) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.account !== undefined) {
            obj.account = Any.toJSON(message.account);
        }
        return obj;
    },
    create(base) {
        return QueryModuleAccountByNameResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryModuleAccountByNameResponse();
        message.account = (object.account !== undefined && object.account !== null)
            ? Any.fromPartial(object.account)
            : undefined;
        return message;
    },
};
function createBaseBech32PrefixRequest() {
    return {};
}
export const Bech32PrefixRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBech32PrefixRequest();
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
        return Bech32PrefixRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseBech32PrefixRequest();
        return message;
    },
};
function createBaseBech32PrefixResponse() {
    return { bech32Prefix: "" };
}
export const Bech32PrefixResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bech32Prefix !== "") {
            writer.uint32(10).string(message.bech32Prefix);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBech32PrefixResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bech32Prefix = reader.string();
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
        return { bech32Prefix: isSet(object.bech32Prefix) ? String(object.bech32Prefix) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.bech32Prefix !== "") {
            obj.bech32Prefix = message.bech32Prefix;
        }
        return obj;
    },
    create(base) {
        return Bech32PrefixResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBech32PrefixResponse();
        message.bech32Prefix = object.bech32Prefix ?? "";
        return message;
    },
};
function createBaseAddressBytesToStringRequest() {
    return { addressBytes: new Uint8Array(0) };
}
export const AddressBytesToStringRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.addressBytes.length !== 0) {
            writer.uint32(10).bytes(message.addressBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressBytesToStringRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.addressBytes = reader.bytes();
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
        return { addressBytes: isSet(object.addressBytes) ? bytesFromBase64(object.addressBytes) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.addressBytes.length !== 0) {
            obj.addressBytes = base64FromBytes(message.addressBytes);
        }
        return obj;
    },
    create(base) {
        return AddressBytesToStringRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAddressBytesToStringRequest();
        message.addressBytes = object.addressBytes ?? new Uint8Array(0);
        return message;
    },
};
function createBaseAddressBytesToStringResponse() {
    return { addressString: "" };
}
export const AddressBytesToStringResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.addressString !== "") {
            writer.uint32(10).string(message.addressString);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressBytesToStringResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.addressString = reader.string();
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
        return { addressString: isSet(object.addressString) ? String(object.addressString) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.addressString !== "") {
            obj.addressString = message.addressString;
        }
        return obj;
    },
    create(base) {
        return AddressBytesToStringResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAddressBytesToStringResponse();
        message.addressString = object.addressString ?? "";
        return message;
    },
};
function createBaseAddressStringToBytesRequest() {
    return { addressString: "" };
}
export const AddressStringToBytesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.addressString !== "") {
            writer.uint32(10).string(message.addressString);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressStringToBytesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.addressString = reader.string();
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
        return { addressString: isSet(object.addressString) ? String(object.addressString) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.addressString !== "") {
            obj.addressString = message.addressString;
        }
        return obj;
    },
    create(base) {
        return AddressStringToBytesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAddressStringToBytesRequest();
        message.addressString = object.addressString ?? "";
        return message;
    },
};
function createBaseAddressStringToBytesResponse() {
    return { addressBytes: new Uint8Array(0) };
}
export const AddressStringToBytesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.addressBytes.length !== 0) {
            writer.uint32(10).bytes(message.addressBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressStringToBytesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.addressBytes = reader.bytes();
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
        return { addressBytes: isSet(object.addressBytes) ? bytesFromBase64(object.addressBytes) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.addressBytes.length !== 0) {
            obj.addressBytes = base64FromBytes(message.addressBytes);
        }
        return obj;
    },
    create(base) {
        return AddressStringToBytesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAddressStringToBytesResponse();
        message.addressBytes = object.addressBytes ?? new Uint8Array(0);
        return message;
    },
};
function createBaseQueryAccountAddressByIDRequest() {
    return { id: 0, accountId: 0 };
}
export const QueryAccountAddressByIDRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).int64(message.id);
        }
        if (message.accountId !== 0) {
            writer.uint32(16).uint64(message.accountId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountAddressByIDRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.accountId = longToNumber(reader.uint64());
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
            id: isSet(object.id) ? Number(object.id) : 0,
            accountId: isSet(object.accountId) ? Number(object.accountId) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.accountId !== 0) {
            obj.accountId = Math.round(message.accountId);
        }
        return obj;
    },
    create(base) {
        return QueryAccountAddressByIDRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAccountAddressByIDRequest();
        message.id = object.id ?? 0;
        message.accountId = object.accountId ?? 0;
        return message;
    },
};
function createBaseQueryAccountAddressByIDResponse() {
    return { accountAddress: "" };
}
export const QueryAccountAddressByIDResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.accountAddress !== "") {
            writer.uint32(10).string(message.accountAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountAddressByIDResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.accountAddress = reader.string();
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
        return { accountAddress: isSet(object.accountAddress) ? String(object.accountAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.accountAddress !== "") {
            obj.accountAddress = message.accountAddress;
        }
        return obj;
    },
    create(base) {
        return QueryAccountAddressByIDResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAccountAddressByIDResponse();
        message.accountAddress = object.accountAddress ?? "";
        return message;
    },
};
function createBaseQueryAccountInfoRequest() {
    return { address: "" };
}
export const QueryAccountInfoRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountInfoRequest();
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
        return QueryAccountInfoRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAccountInfoRequest();
        message.address = object.address ?? "";
        return message;
    },
};
function createBaseQueryAccountInfoResponse() {
    return { info: undefined };
}
export const QueryAccountInfoResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.info !== undefined) {
            BaseAccount.encode(message.info, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.info = BaseAccount.decode(reader, reader.uint32());
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
        return { info: isSet(object.info) ? BaseAccount.fromJSON(object.info) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.info !== undefined) {
            obj.info = BaseAccount.toJSON(message.info);
        }
        return obj;
    },
    create(base) {
        return QueryAccountInfoResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAccountInfoResponse();
        message.info = (object.info !== undefined && object.info !== null)
            ? BaseAccount.fromPartial(object.info)
            : undefined;
        return message;
    },
};
export const QueryServiceName = "cosmos.auth.v1beta1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.Accounts = this.Accounts.bind(this);
        this.Account = this.Account.bind(this);
        this.AccountAddressByID = this.AccountAddressByID.bind(this);
        this.Params = this.Params.bind(this);
        this.ModuleAccounts = this.ModuleAccounts.bind(this);
        this.ModuleAccountByName = this.ModuleAccountByName.bind(this);
        this.Bech32Prefix = this.Bech32Prefix.bind(this);
        this.AddressBytesToString = this.AddressBytesToString.bind(this);
        this.AddressStringToBytes = this.AddressStringToBytes.bind(this);
        this.AccountInfo = this.AccountInfo.bind(this);
    }
    Accounts(request) {
        const data = QueryAccountsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Accounts", data);
        return promise.then((data) => QueryAccountsResponse.decode(_m0.Reader.create(data)));
    }
    Account(request) {
        const data = QueryAccountRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Account", data);
        return promise.then((data) => QueryAccountResponse.decode(_m0.Reader.create(data)));
    }
    AccountAddressByID(request) {
        const data = QueryAccountAddressByIDRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AccountAddressByID", data);
        return promise.then((data) => QueryAccountAddressByIDResponse.decode(_m0.Reader.create(data)));
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
    }
    ModuleAccounts(request) {
        const data = QueryModuleAccountsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ModuleAccounts", data);
        return promise.then((data) => QueryModuleAccountsResponse.decode(_m0.Reader.create(data)));
    }
    ModuleAccountByName(request) {
        const data = QueryModuleAccountByNameRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ModuleAccountByName", data);
        return promise.then((data) => QueryModuleAccountByNameResponse.decode(_m0.Reader.create(data)));
    }
    Bech32Prefix(request) {
        const data = Bech32PrefixRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Bech32Prefix", data);
        return promise.then((data) => Bech32PrefixResponse.decode(_m0.Reader.create(data)));
    }
    AddressBytesToString(request) {
        const data = AddressBytesToStringRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AddressBytesToString", data);
        return promise.then((data) => AddressBytesToStringResponse.decode(_m0.Reader.create(data)));
    }
    AddressStringToBytes(request) {
        const data = AddressStringToBytesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AddressStringToBytes", data);
        return promise.then((data) => AddressStringToBytesResponse.decode(_m0.Reader.create(data)));
    }
    AccountInfo(request) {
        const data = QueryAccountInfoRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AccountInfo", data);
        return promise.then((data) => QueryAccountInfoResponse.decode(_m0.Reader.create(data)));
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
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = tsProtoGlobalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin.join(""));
    }
}
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
