/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Any } from "../../../google/protobuf/any";
import { AccessConfig } from "./types";
export const protobufPackage = "cosmwasm.wasm.v1";
function createBaseStoreCodeAuthorization() {
    return { grants: [] };
}
export const StoreCodeAuthorization = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.grants) {
            CodeGrant.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStoreCodeAuthorization();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.grants.push(CodeGrant.decode(reader, reader.uint32()));
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
        return { grants: Array.isArray(object?.grants) ? object.grants.map((e) => CodeGrant.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.grants?.length) {
            obj.grants = message.grants.map((e) => CodeGrant.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return StoreCodeAuthorization.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseStoreCodeAuthorization();
        message.grants = object.grants?.map((e) => CodeGrant.fromPartial(e)) || [];
        return message;
    },
};
function createBaseContractExecutionAuthorization() {
    return { grants: [] };
}
export const ContractExecutionAuthorization = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.grants) {
            ContractGrant.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContractExecutionAuthorization();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.grants.push(ContractGrant.decode(reader, reader.uint32()));
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
        return { grants: Array.isArray(object?.grants) ? object.grants.map((e) => ContractGrant.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.grants?.length) {
            obj.grants = message.grants.map((e) => ContractGrant.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ContractExecutionAuthorization.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseContractExecutionAuthorization();
        message.grants = object.grants?.map((e) => ContractGrant.fromPartial(e)) || [];
        return message;
    },
};
function createBaseContractMigrationAuthorization() {
    return { grants: [] };
}
export const ContractMigrationAuthorization = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.grants) {
            ContractGrant.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContractMigrationAuthorization();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.grants.push(ContractGrant.decode(reader, reader.uint32()));
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
        return { grants: Array.isArray(object?.grants) ? object.grants.map((e) => ContractGrant.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.grants?.length) {
            obj.grants = message.grants.map((e) => ContractGrant.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ContractMigrationAuthorization.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseContractMigrationAuthorization();
        message.grants = object.grants?.map((e) => ContractGrant.fromPartial(e)) || [];
        return message;
    },
};
function createBaseCodeGrant() {
    return { codeHash: new Uint8Array(0), instantiatePermission: undefined };
}
export const CodeGrant = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.codeHash.length !== 0) {
            writer.uint32(10).bytes(message.codeHash);
        }
        if (message.instantiatePermission !== undefined) {
            AccessConfig.encode(message.instantiatePermission, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCodeGrant();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.codeHash = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
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
            codeHash: isSet(object.codeHash) ? bytesFromBase64(object.codeHash) : new Uint8Array(0),
            instantiatePermission: isSet(object.instantiatePermission)
                ? AccessConfig.fromJSON(object.instantiatePermission)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.codeHash.length !== 0) {
            obj.codeHash = base64FromBytes(message.codeHash);
        }
        if (message.instantiatePermission !== undefined) {
            obj.instantiatePermission = AccessConfig.toJSON(message.instantiatePermission);
        }
        return obj;
    },
    create(base) {
        return CodeGrant.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCodeGrant();
        message.codeHash = object.codeHash ?? new Uint8Array(0);
        message.instantiatePermission =
            (object.instantiatePermission !== undefined && object.instantiatePermission !== null)
                ? AccessConfig.fromPartial(object.instantiatePermission)
                : undefined;
        return message;
    },
};
function createBaseContractGrant() {
    return { contract: "", limit: undefined, filter: undefined };
}
export const ContractGrant = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.contract !== "") {
            writer.uint32(10).string(message.contract);
        }
        if (message.limit !== undefined) {
            Any.encode(message.limit, writer.uint32(18).fork()).ldelim();
        }
        if (message.filter !== undefined) {
            Any.encode(message.filter, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContractGrant();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.contract = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.limit = Any.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.filter = Any.decode(reader, reader.uint32());
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
            contract: isSet(object.contract) ? String(object.contract) : "",
            limit: isSet(object.limit) ? Any.fromJSON(object.limit) : undefined,
            filter: isSet(object.filter) ? Any.fromJSON(object.filter) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.contract !== "") {
            obj.contract = message.contract;
        }
        if (message.limit !== undefined) {
            obj.limit = Any.toJSON(message.limit);
        }
        if (message.filter !== undefined) {
            obj.filter = Any.toJSON(message.filter);
        }
        return obj;
    },
    create(base) {
        return ContractGrant.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseContractGrant();
        message.contract = object.contract ?? "";
        message.limit = (object.limit !== undefined && object.limit !== null) ? Any.fromPartial(object.limit) : undefined;
        message.filter = (object.filter !== undefined && object.filter !== null)
            ? Any.fromPartial(object.filter)
            : undefined;
        return message;
    },
};
function createBaseMaxCallsLimit() {
    return { remaining: 0 };
}
export const MaxCallsLimit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.remaining !== 0) {
            writer.uint32(8).uint64(message.remaining);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMaxCallsLimit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.remaining = longToNumber(reader.uint64());
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
        return { remaining: isSet(object.remaining) ? Number(object.remaining) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.remaining !== 0) {
            obj.remaining = Math.round(message.remaining);
        }
        return obj;
    },
    create(base) {
        return MaxCallsLimit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMaxCallsLimit();
        message.remaining = object.remaining ?? 0;
        return message;
    },
};
function createBaseMaxFundsLimit() {
    return { amounts: [] };
}
export const MaxFundsLimit = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.amounts) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMaxFundsLimit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.amounts.push(Coin.decode(reader, reader.uint32()));
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
        return { amounts: Array.isArray(object?.amounts) ? object.amounts.map((e) => Coin.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.amounts?.length) {
            obj.amounts = message.amounts.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MaxFundsLimit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMaxFundsLimit();
        message.amounts = object.amounts?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseCombinedLimit() {
    return { callsRemaining: 0, amounts: [] };
}
export const CombinedLimit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.callsRemaining !== 0) {
            writer.uint32(8).uint64(message.callsRemaining);
        }
        for (const v of message.amounts) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCombinedLimit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.callsRemaining = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.amounts.push(Coin.decode(reader, reader.uint32()));
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
            callsRemaining: isSet(object.callsRemaining) ? Number(object.callsRemaining) : 0,
            amounts: Array.isArray(object?.amounts) ? object.amounts.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.callsRemaining !== 0) {
            obj.callsRemaining = Math.round(message.callsRemaining);
        }
        if (message.amounts?.length) {
            obj.amounts = message.amounts.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return CombinedLimit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCombinedLimit();
        message.callsRemaining = object.callsRemaining ?? 0;
        message.amounts = object.amounts?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseAllowAllMessagesFilter() {
    return {};
}
export const AllowAllMessagesFilter = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAllowAllMessagesFilter();
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
        return AllowAllMessagesFilter.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseAllowAllMessagesFilter();
        return message;
    },
};
function createBaseAcceptedMessageKeysFilter() {
    return { keys: [] };
}
export const AcceptedMessageKeysFilter = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.keys) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAcceptedMessageKeysFilter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.keys.push(reader.string());
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
        return { keys: Array.isArray(object?.keys) ? object.keys.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.keys?.length) {
            obj.keys = message.keys;
        }
        return obj;
    },
    create(base) {
        return AcceptedMessageKeysFilter.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAcceptedMessageKeysFilter();
        message.keys = object.keys?.map((e) => e) || [];
        return message;
    },
};
function createBaseAcceptedMessagesFilter() {
    return { messages: [] };
}
export const AcceptedMessagesFilter = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.messages) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAcceptedMessagesFilter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.messages.push(reader.bytes());
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
        return { messages: Array.isArray(object?.messages) ? object.messages.map((e) => bytesFromBase64(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages?.length) {
            obj.messages = message.messages.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return AcceptedMessagesFilter.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAcceptedMessagesFilter();
        message.messages = object.messages?.map((e) => e) || [];
        return message;
    },
};
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
