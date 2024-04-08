/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { CodeInfo, ContractCodeHistoryEntry, ContractInfo, Model, Params } from "./types";
export const protobufPackage = "cosmwasm.wasm.v1";
function createBaseGenesisState() {
    return { params: undefined, codes: [], contracts: [], sequences: [] };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.codes) {
            Code.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.contracts) {
            Contract.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.sequences) {
            Sequence.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.params = Params.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.codes.push(Code.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.contracts.push(Contract.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.sequences.push(Sequence.decode(reader, reader.uint32()));
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
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
            codes: Array.isArray(object?.codes) ? object.codes.map((e) => Code.fromJSON(e)) : [],
            contracts: Array.isArray(object?.contracts) ? object.contracts.map((e) => Contract.fromJSON(e)) : [],
            sequences: Array.isArray(object?.sequences) ? object.sequences.map((e) => Sequence.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        if (message.codes?.length) {
            obj.codes = message.codes.map((e) => Code.toJSON(e));
        }
        if (message.contracts?.length) {
            obj.contracts = message.contracts.map((e) => Contract.toJSON(e));
        }
        if (message.sequences?.length) {
            obj.sequences = message.sequences.map((e) => Sequence.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        message.codes = object.codes?.map((e) => Code.fromPartial(e)) || [];
        message.contracts = object.contracts?.map((e) => Contract.fromPartial(e)) || [];
        message.sequences = object.sequences?.map((e) => Sequence.fromPartial(e)) || [];
        return message;
    },
};
function createBaseCode() {
    return { codeId: 0, codeInfo: undefined, codeBytes: new Uint8Array(0), pinned: false };
}
export const Code = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.codeId !== 0) {
            writer.uint32(8).uint64(message.codeId);
        }
        if (message.codeInfo !== undefined) {
            CodeInfo.encode(message.codeInfo, writer.uint32(18).fork()).ldelim();
        }
        if (message.codeBytes.length !== 0) {
            writer.uint32(26).bytes(message.codeBytes);
        }
        if (message.pinned === true) {
            writer.uint32(32).bool(message.pinned);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCode();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.codeInfo = CodeInfo.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.codeBytes = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.pinned = reader.bool();
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
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            codeInfo: isSet(object.codeInfo) ? CodeInfo.fromJSON(object.codeInfo) : undefined,
            codeBytes: isSet(object.codeBytes) ? bytesFromBase64(object.codeBytes) : new Uint8Array(0),
            pinned: isSet(object.pinned) ? Boolean(object.pinned) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.codeId !== 0) {
            obj.codeId = Math.round(message.codeId);
        }
        if (message.codeInfo !== undefined) {
            obj.codeInfo = CodeInfo.toJSON(message.codeInfo);
        }
        if (message.codeBytes.length !== 0) {
            obj.codeBytes = base64FromBytes(message.codeBytes);
        }
        if (message.pinned === true) {
            obj.pinned = message.pinned;
        }
        return obj;
    },
    create(base) {
        return Code.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCode();
        message.codeId = object.codeId ?? 0;
        message.codeInfo = (object.codeInfo !== undefined && object.codeInfo !== null)
            ? CodeInfo.fromPartial(object.codeInfo)
            : undefined;
        message.codeBytes = object.codeBytes ?? new Uint8Array(0);
        message.pinned = object.pinned ?? false;
        return message;
    },
};
function createBaseContract() {
    return { contractAddress: "", contractInfo: undefined, contractState: [], contractCodeHistory: [] };
}
export const Contract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.contractAddress !== "") {
            writer.uint32(10).string(message.contractAddress);
        }
        if (message.contractInfo !== undefined) {
            ContractInfo.encode(message.contractInfo, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.contractState) {
            Model.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.contractCodeHistory) {
            ContractCodeHistoryEntry.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.contractAddress = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.contractInfo = ContractInfo.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.contractState.push(Model.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.contractCodeHistory.push(ContractCodeHistoryEntry.decode(reader, reader.uint32()));
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
            contractAddress: isSet(object.contractAddress) ? String(object.contractAddress) : "",
            contractInfo: isSet(object.contractInfo) ? ContractInfo.fromJSON(object.contractInfo) : undefined,
            contractState: Array.isArray(object?.contractState)
                ? object.contractState.map((e) => Model.fromJSON(e))
                : [],
            contractCodeHistory: Array.isArray(object?.contractCodeHistory)
                ? object.contractCodeHistory.map((e) => ContractCodeHistoryEntry.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.contractAddress !== "") {
            obj.contractAddress = message.contractAddress;
        }
        if (message.contractInfo !== undefined) {
            obj.contractInfo = ContractInfo.toJSON(message.contractInfo);
        }
        if (message.contractState?.length) {
            obj.contractState = message.contractState.map((e) => Model.toJSON(e));
        }
        if (message.contractCodeHistory?.length) {
            obj.contractCodeHistory = message.contractCodeHistory.map((e) => ContractCodeHistoryEntry.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return Contract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseContract();
        message.contractAddress = object.contractAddress ?? "";
        message.contractInfo = (object.contractInfo !== undefined && object.contractInfo !== null)
            ? ContractInfo.fromPartial(object.contractInfo)
            : undefined;
        message.contractState = object.contractState?.map((e) => Model.fromPartial(e)) || [];
        message.contractCodeHistory = object.contractCodeHistory?.map((e) => ContractCodeHistoryEntry.fromPartial(e)) || [];
        return message;
    },
};
function createBaseSequence() {
    return { idKey: new Uint8Array(0), value: 0 };
}
export const Sequence = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.idKey.length !== 0) {
            writer.uint32(10).bytes(message.idKey);
        }
        if (message.value !== 0) {
            writer.uint32(16).uint64(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSequence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.idKey = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.value = longToNumber(reader.uint64());
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
            idKey: isSet(object.idKey) ? bytesFromBase64(object.idKey) : new Uint8Array(0),
            value: isSet(object.value) ? Number(object.value) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.idKey.length !== 0) {
            obj.idKey = base64FromBytes(message.idKey);
        }
        if (message.value !== 0) {
            obj.value = Math.round(message.value);
        }
        return obj;
    },
    create(base) {
        return Sequence.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSequence();
        message.idKey = object.idKey ?? new Uint8Array(0);
        message.value = object.value ?? 0;
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
