/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { addressTypeFromJSON, addressTypeToJSON, Key, KeyRequest, keyRequestStatusFromJSON, keyRequestStatusToJSON, } from "./key";
import { Keychain } from "./keychain";
import { Params } from "./params";
import { SignRequest, signRequestStatusFromJSON, signRequestStatusToJSON } from "./signature";
import { Space } from "./space";
export const protobufPackage = "warden.warden.v1beta2";
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
function createBaseQuerySpacesRequest() {
    return { pagination: undefined };
}
export const QuerySpacesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpacesRequest();
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
        return QuerySpacesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySpacesRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQuerySpacesResponse() {
    return { pagination: undefined, spaces: [] };
}
export const QuerySpacesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.spaces) {
            Space.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpacesResponse();
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
                    message.spaces.push(Space.decode(reader, reader.uint32()));
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
            spaces: Array.isArray(object?.spaces) ? object.spaces.map((e) => Space.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.spaces?.length) {
            obj.spaces = message.spaces.map((e) => Space.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QuerySpacesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySpacesResponse();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.spaces = object.spaces?.map((e) => Space.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQuerySpacesByOwnerRequest() {
    return { pagination: undefined, owner: "" };
}
export const QuerySpacesByOwnerRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpacesByOwnerRequest();
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
                    message.owner = reader.string();
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
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.owner !== "") {
            obj.owner = message.owner;
        }
        return obj;
    },
    create(base) {
        return QuerySpacesByOwnerRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySpacesByOwnerRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.owner = object.owner ?? "";
        return message;
    },
};
function createBaseQueryKeychainsRequest() {
    return { pagination: undefined };
}
export const QueryKeychainsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeychainsRequest();
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
        return QueryKeychainsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeychainsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryKeychainsResponse() {
    return { pagination: undefined, keychains: [] };
}
export const QueryKeychainsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.keychains) {
            Keychain.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeychainsResponse();
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
                    message.keychains.push(Keychain.decode(reader, reader.uint32()));
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
            keychains: Array.isArray(object?.keychains) ? object.keychains.map((e) => Keychain.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.keychains?.length) {
            obj.keychains = message.keychains.map((e) => Keychain.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryKeychainsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeychainsResponse();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.keychains = object.keychains?.map((e) => Keychain.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQuerySpaceByIdRequest() {
    return { id: 0 };
}
export const QuerySpaceByIdRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpaceByIdRequest();
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
        return QuerySpaceByIdRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySpaceByIdRequest();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseQuerySpaceByIdResponse() {
    return { space: undefined };
}
export const QuerySpaceByIdResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.space !== undefined) {
            Space.encode(message.space, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySpaceByIdResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.space = Space.decode(reader, reader.uint32());
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
        return { space: isSet(object.space) ? Space.fromJSON(object.space) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.space !== undefined) {
            obj.space = Space.toJSON(message.space);
        }
        return obj;
    },
    create(base) {
        return QuerySpaceByIdResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySpaceByIdResponse();
        message.space = (object.space !== undefined && object.space !== null) ? Space.fromPartial(object.space) : undefined;
        return message;
    },
};
function createBaseQueryKeychainByIdRequest() {
    return { id: 0 };
}
export const QueryKeychainByIdRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeychainByIdRequest();
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
        return QueryKeychainByIdRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeychainByIdRequest();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseQueryKeychainByIdResponse() {
    return { keychain: undefined };
}
export const QueryKeychainByIdResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keychain !== undefined) {
            Keychain.encode(message.keychain, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeychainByIdResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.keychain = Keychain.decode(reader, reader.uint32());
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
        return { keychain: isSet(object.keychain) ? Keychain.fromJSON(object.keychain) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.keychain !== undefined) {
            obj.keychain = Keychain.toJSON(message.keychain);
        }
        return obj;
    },
    create(base) {
        return QueryKeychainByIdResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeychainByIdResponse();
        message.keychain = (object.keychain !== undefined && object.keychain !== null)
            ? Keychain.fromPartial(object.keychain)
            : undefined;
        return message;
    },
};
function createBaseQueryKeyRequestsRequest() {
    return { pagination: undefined, keychainId: 0, status: 0, spaceId: 0 };
}
export const QueryKeyRequestsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.keychainId !== 0) {
            writer.uint32(16).uint64(message.keychainId);
        }
        if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
        }
        if (message.spaceId !== 0) {
            writer.uint32(32).uint64(message.spaceId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeyRequestsRequest();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.keychainId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.spaceId = longToNumber(reader.uint64());
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
            keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
            status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : 0,
            spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.keychainId !== 0) {
            obj.keychainId = Math.round(message.keychainId);
        }
        if (message.status !== 0) {
            obj.status = keyRequestStatusToJSON(message.status);
        }
        if (message.spaceId !== 0) {
            obj.spaceId = Math.round(message.spaceId);
        }
        return obj;
    },
    create(base) {
        return QueryKeyRequestsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeyRequestsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.keychainId = object.keychainId ?? 0;
        message.status = object.status ?? 0;
        message.spaceId = object.spaceId ?? 0;
        return message;
    },
};
function createBaseQueryKeyRequestsResponse() {
    return { pagination: undefined, keyRequests: [] };
}
export const QueryKeyRequestsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.keyRequests) {
            KeyRequest.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeyRequestsResponse();
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
                    message.keyRequests.push(KeyRequest.decode(reader, reader.uint32()));
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
            keyRequests: Array.isArray(object?.keyRequests) ? object.keyRequests.map((e) => KeyRequest.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.keyRequests?.length) {
            obj.keyRequests = message.keyRequests.map((e) => KeyRequest.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryKeyRequestsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeyRequestsResponse();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.keyRequests = object.keyRequests?.map((e) => KeyRequest.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryKeyRequestByIdRequest() {
    return { id: 0 };
}
export const QueryKeyRequestByIdRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeyRequestByIdRequest();
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
        return QueryKeyRequestByIdRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeyRequestByIdRequest();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseQueryKeyRequestByIdResponse() {
    return { keyRequest: undefined };
}
export const QueryKeyRequestByIdResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyRequest !== undefined) {
            KeyRequest.encode(message.keyRequest, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeyRequestByIdResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.keyRequest = KeyRequest.decode(reader, reader.uint32());
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
        return { keyRequest: isSet(object.keyRequest) ? KeyRequest.fromJSON(object.keyRequest) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.keyRequest !== undefined) {
            obj.keyRequest = KeyRequest.toJSON(message.keyRequest);
        }
        return obj;
    },
    create(base) {
        return QueryKeyRequestByIdResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeyRequestByIdResponse();
        message.keyRequest = (object.keyRequest !== undefined && object.keyRequest !== null)
            ? KeyRequest.fromPartial(object.keyRequest)
            : undefined;
        return message;
    },
};
function createBaseQueryAllKeysRequest() {
    return { pagination: undefined, deriveAddresses: [] };
}
export const QueryAllKeysRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        writer.uint32(18).fork();
        for (const v of message.deriveAddresses) {
            writer.int32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllKeysRequest();
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
                    if (tag === 16) {
                        message.deriveAddresses.push(reader.int32());
                        continue;
                    }
                    if (tag === 18) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.deriveAddresses.push(reader.int32());
                        }
                        continue;
                    }
                    break;
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
            deriveAddresses: Array.isArray(object?.deriveAddresses)
                ? object.deriveAddresses.map((e) => addressTypeFromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.deriveAddresses?.length) {
            obj.deriveAddresses = message.deriveAddresses.map((e) => addressTypeToJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryAllKeysRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAllKeysRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.deriveAddresses = object.deriveAddresses?.map((e) => e) || [];
        return message;
    },
};
function createBaseQueryKeysResponse() {
    return { pagination: undefined, keys: [] };
}
export const QueryKeysResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.keys) {
            QueryKeyResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeysResponse();
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
                    message.keys.push(QueryKeyResponse.decode(reader, reader.uint32()));
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
            keys: Array.isArray(object?.keys) ? object.keys.map((e) => QueryKeyResponse.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.keys?.length) {
            obj.keys = message.keys.map((e) => QueryKeyResponse.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryKeysResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeysResponse();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.keys = object.keys?.map((e) => QueryKeyResponse.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryKeysBySpaceIdRequest() {
    return { pagination: undefined, spaceId: 0, deriveAddresses: [] };
}
export const QueryKeysBySpaceIdRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.spaceId !== 0) {
            writer.uint32(16).uint64(message.spaceId);
        }
        writer.uint32(26).fork();
        for (const v of message.deriveAddresses) {
            writer.int32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeysBySpaceIdRequest();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.spaceId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag === 24) {
                        message.deriveAddresses.push(reader.int32());
                        continue;
                    }
                    if (tag === 26) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.deriveAddresses.push(reader.int32());
                        }
                        continue;
                    }
                    break;
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
            spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
            deriveAddresses: Array.isArray(object?.deriveAddresses)
                ? object.deriveAddresses.map((e) => addressTypeFromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.spaceId !== 0) {
            obj.spaceId = Math.round(message.spaceId);
        }
        if (message.deriveAddresses?.length) {
            obj.deriveAddresses = message.deriveAddresses.map((e) => addressTypeToJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryKeysBySpaceIdRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeysBySpaceIdRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.spaceId = object.spaceId ?? 0;
        message.deriveAddresses = object.deriveAddresses?.map((e) => e) || [];
        return message;
    },
};
function createBaseQueryKeyByIdRequest() {
    return { id: 0, deriveAddresses: [] };
}
export const QueryKeyByIdRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        writer.uint32(18).fork();
        for (const v of message.deriveAddresses) {
            writer.int32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeyByIdRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag === 16) {
                        message.deriveAddresses.push(reader.int32());
                        continue;
                    }
                    if (tag === 18) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.deriveAddresses.push(reader.int32());
                        }
                        continue;
                    }
                    break;
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
            deriveAddresses: Array.isArray(object?.deriveAddresses)
                ? object.deriveAddresses.map((e) => addressTypeFromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.deriveAddresses?.length) {
            obj.deriveAddresses = message.deriveAddresses.map((e) => addressTypeToJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryKeyByIdRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeyByIdRequest();
        message.id = object.id ?? 0;
        message.deriveAddresses = object.deriveAddresses?.map((e) => e) || [];
        return message;
    },
};
function createBaseQueryKeyResponse() {
    return { key: undefined, addresses: [] };
}
export const QueryKeyResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key !== undefined) {
            Key.encode(message.key, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.addresses) {
            AddressResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryKeyResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.key = Key.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.addresses.push(AddressResponse.decode(reader, reader.uint32()));
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
            key: isSet(object.key) ? Key.fromJSON(object.key) : undefined,
            addresses: Array.isArray(object?.addresses) ? object.addresses.map((e) => AddressResponse.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.key !== undefined) {
            obj.key = Key.toJSON(message.key);
        }
        if (message.addresses?.length) {
            obj.addresses = message.addresses.map((e) => AddressResponse.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryKeyResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryKeyResponse();
        message.key = (object.key !== undefined && object.key !== null) ? Key.fromPartial(object.key) : undefined;
        message.addresses = object.addresses?.map((e) => AddressResponse.fromPartial(e)) || [];
        return message;
    },
};
function createBaseAddressResponse() {
    return { address: "", type: 0 };
}
export const AddressResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAddressResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.type = reader.int32();
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
            address: isSet(object.address) ? String(object.address) : "",
            type: isSet(object.type) ? addressTypeFromJSON(object.type) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.type !== 0) {
            obj.type = addressTypeToJSON(message.type);
        }
        return obj;
    },
    create(base) {
        return AddressResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAddressResponse();
        message.address = object.address ?? "";
        message.type = object.type ?? 0;
        return message;
    },
};
function createBaseQuerySignatureRequestsRequest() {
    return { pagination: undefined, keychainId: 0, status: 0 };
}
export const QuerySignatureRequestsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.keychainId !== 0) {
            writer.uint32(16).uint64(message.keychainId);
        }
        if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySignatureRequestsRequest();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.keychainId = longToNumber(reader.uint64());
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
            keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
            status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.keychainId !== 0) {
            obj.keychainId = Math.round(message.keychainId);
        }
        if (message.status !== 0) {
            obj.status = signRequestStatusToJSON(message.status);
        }
        return obj;
    },
    create(base) {
        return QuerySignatureRequestsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySignatureRequestsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.keychainId = object.keychainId ?? 0;
        message.status = object.status ?? 0;
        return message;
    },
};
function createBaseQuerySignatureRequestsResponse() {
    return { pagination: undefined, signRequests: [] };
}
export const QuerySignatureRequestsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.signRequests) {
            SignRequest.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySignatureRequestsResponse();
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
                    message.signRequests.push(SignRequest.decode(reader, reader.uint32()));
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
            signRequests: Array.isArray(object?.signRequests)
                ? object.signRequests.map((e) => SignRequest.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.signRequests?.length) {
            obj.signRequests = message.signRequests.map((e) => SignRequest.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QuerySignatureRequestsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySignatureRequestsResponse();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.signRequests = object.signRequests?.map((e) => SignRequest.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQuerySignatureRequestByIdRequest() {
    return { id: 0 };
}
export const QuerySignatureRequestByIdRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySignatureRequestByIdRequest();
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
        return QuerySignatureRequestByIdRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySignatureRequestByIdRequest();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseQuerySignatureRequestByIdResponse() {
    return { signRequest: undefined };
}
export const QuerySignatureRequestByIdResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.signRequest !== undefined) {
            SignRequest.encode(message.signRequest, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySignatureRequestByIdResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.signRequest = SignRequest.decode(reader, reader.uint32());
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
        return { signRequest: isSet(object.signRequest) ? SignRequest.fromJSON(object.signRequest) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.signRequest !== undefined) {
            obj.signRequest = SignRequest.toJSON(message.signRequest);
        }
        return obj;
    },
    create(base) {
        return QuerySignatureRequestByIdResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQuerySignatureRequestByIdResponse();
        message.signRequest = (object.signRequest !== undefined && object.signRequest !== null)
            ? SignRequest.fromPartial(object.signRequest)
            : undefined;
        return message;
    },
};
export const QueryServiceName = "warden.warden.v1beta2.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.Params = this.Params.bind(this);
        this.Spaces = this.Spaces.bind(this);
        this.SpacesByOwner = this.SpacesByOwner.bind(this);
        this.Keychains = this.Keychains.bind(this);
        this.SpaceById = this.SpaceById.bind(this);
        this.KeychainById = this.KeychainById.bind(this);
        this.KeyRequests = this.KeyRequests.bind(this);
        this.KeyRequestById = this.KeyRequestById.bind(this);
        this.AllKeys = this.AllKeys.bind(this);
        this.KeysBySpaceId = this.KeysBySpaceId.bind(this);
        this.KeyById = this.KeyById.bind(this);
        this.SignatureRequests = this.SignatureRequests.bind(this);
        this.SignatureRequestById = this.SignatureRequestById.bind(this);
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
    }
    Spaces(request) {
        const data = QuerySpacesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Spaces", data);
        return promise.then((data) => QuerySpacesResponse.decode(_m0.Reader.create(data)));
    }
    SpacesByOwner(request) {
        const data = QuerySpacesByOwnerRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "SpacesByOwner", data);
        return promise.then((data) => QuerySpacesResponse.decode(_m0.Reader.create(data)));
    }
    Keychains(request) {
        const data = QueryKeychainsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Keychains", data);
        return promise.then((data) => QueryKeychainsResponse.decode(_m0.Reader.create(data)));
    }
    SpaceById(request) {
        const data = QuerySpaceByIdRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "SpaceById", data);
        return promise.then((data) => QuerySpaceByIdResponse.decode(_m0.Reader.create(data)));
    }
    KeychainById(request) {
        const data = QueryKeychainByIdRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "KeychainById", data);
        return promise.then((data) => QueryKeychainByIdResponse.decode(_m0.Reader.create(data)));
    }
    KeyRequests(request) {
        const data = QueryKeyRequestsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "KeyRequests", data);
        return promise.then((data) => QueryKeyRequestsResponse.decode(_m0.Reader.create(data)));
    }
    KeyRequestById(request) {
        const data = QueryKeyRequestByIdRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "KeyRequestById", data);
        return promise.then((data) => QueryKeyRequestByIdResponse.decode(_m0.Reader.create(data)));
    }
    AllKeys(request) {
        const data = QueryAllKeysRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AllKeys", data);
        return promise.then((data) => QueryKeysResponse.decode(_m0.Reader.create(data)));
    }
    KeysBySpaceId(request) {
        const data = QueryKeysBySpaceIdRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "KeysBySpaceId", data);
        return promise.then((data) => QueryKeysResponse.decode(_m0.Reader.create(data)));
    }
    KeyById(request) {
        const data = QueryKeyByIdRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "KeyById", data);
        return promise.then((data) => QueryKeyResponse.decode(_m0.Reader.create(data)));
    }
    SignatureRequests(request) {
        const data = QuerySignatureRequestsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "SignatureRequests", data);
        return promise.then((data) => QuerySignatureRequestsResponse.decode(_m0.Reader.create(data)));
    }
    SignatureRequestById(request) {
        const data = QuerySignatureRequestByIdRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "SignatureRequestById", data);
        return promise.then((data) => QuerySignatureRequestByIdResponse.decode(_m0.Reader.create(data)));
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
