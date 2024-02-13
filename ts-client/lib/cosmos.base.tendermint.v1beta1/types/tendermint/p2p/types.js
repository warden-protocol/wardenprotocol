/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "tendermint.p2p";
function createBaseNetAddress() {
    return { id: "", ip: "", port: 0 };
}
export const NetAddress = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.ip !== "") {
            writer.uint32(18).string(message.ip);
        }
        if (message.port !== 0) {
            writer.uint32(24).uint32(message.port);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseNetAddress();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.ip = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.port = reader.uint32();
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
            id: isSet(object.id) ? String(object.id) : "",
            ip: isSet(object.ip) ? String(object.ip) : "",
            port: isSet(object.port) ? Number(object.port) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== "") {
            obj.id = message.id;
        }
        if (message.ip !== "") {
            obj.ip = message.ip;
        }
        if (message.port !== 0) {
            obj.port = Math.round(message.port);
        }
        return obj;
    },
    create(base) {
        return NetAddress.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseNetAddress();
        message.id = object.id ?? "";
        message.ip = object.ip ?? "";
        message.port = object.port ?? 0;
        return message;
    },
};
function createBaseProtocolVersion() {
    return { p2p: 0, block: 0, app: 0 };
}
export const ProtocolVersion = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.p2p !== 0) {
            writer.uint32(8).uint64(message.p2p);
        }
        if (message.block !== 0) {
            writer.uint32(16).uint64(message.block);
        }
        if (message.app !== 0) {
            writer.uint32(24).uint64(message.app);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProtocolVersion();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.p2p = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.block = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.app = longToNumber(reader.uint64());
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
            p2p: isSet(object.p2p) ? Number(object.p2p) : 0,
            block: isSet(object.block) ? Number(object.block) : 0,
            app: isSet(object.app) ? Number(object.app) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.p2p !== 0) {
            obj.p2p = Math.round(message.p2p);
        }
        if (message.block !== 0) {
            obj.block = Math.round(message.block);
        }
        if (message.app !== 0) {
            obj.app = Math.round(message.app);
        }
        return obj;
    },
    create(base) {
        return ProtocolVersion.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseProtocolVersion();
        message.p2p = object.p2p ?? 0;
        message.block = object.block ?? 0;
        message.app = object.app ?? 0;
        return message;
    },
};
function createBaseDefaultNodeInfo() {
    return {
        protocolVersion: undefined,
        defaultNodeId: "",
        listenAddr: "",
        network: "",
        version: "",
        channels: new Uint8Array(0),
        moniker: "",
        other: undefined,
    };
}
export const DefaultNodeInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.protocolVersion !== undefined) {
            ProtocolVersion.encode(message.protocolVersion, writer.uint32(10).fork()).ldelim();
        }
        if (message.defaultNodeId !== "") {
            writer.uint32(18).string(message.defaultNodeId);
        }
        if (message.listenAddr !== "") {
            writer.uint32(26).string(message.listenAddr);
        }
        if (message.network !== "") {
            writer.uint32(34).string(message.network);
        }
        if (message.version !== "") {
            writer.uint32(42).string(message.version);
        }
        if (message.channels.length !== 0) {
            writer.uint32(50).bytes(message.channels);
        }
        if (message.moniker !== "") {
            writer.uint32(58).string(message.moniker);
        }
        if (message.other !== undefined) {
            DefaultNodeInfoOther.encode(message.other, writer.uint32(66).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDefaultNodeInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.protocolVersion = ProtocolVersion.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.defaultNodeId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.listenAddr = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.network = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.version = reader.string();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.channels = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.moniker = reader.string();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.other = DefaultNodeInfoOther.decode(reader, reader.uint32());
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
            protocolVersion: isSet(object.protocolVersion) ? ProtocolVersion.fromJSON(object.protocolVersion) : undefined,
            defaultNodeId: isSet(object.defaultNodeId) ? String(object.defaultNodeId) : "",
            listenAddr: isSet(object.listenAddr) ? String(object.listenAddr) : "",
            network: isSet(object.network) ? String(object.network) : "",
            version: isSet(object.version) ? String(object.version) : "",
            channels: isSet(object.channels) ? bytesFromBase64(object.channels) : new Uint8Array(0),
            moniker: isSet(object.moniker) ? String(object.moniker) : "",
            other: isSet(object.other) ? DefaultNodeInfoOther.fromJSON(object.other) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.protocolVersion !== undefined) {
            obj.protocolVersion = ProtocolVersion.toJSON(message.protocolVersion);
        }
        if (message.defaultNodeId !== "") {
            obj.defaultNodeId = message.defaultNodeId;
        }
        if (message.listenAddr !== "") {
            obj.listenAddr = message.listenAddr;
        }
        if (message.network !== "") {
            obj.network = message.network;
        }
        if (message.version !== "") {
            obj.version = message.version;
        }
        if (message.channels.length !== 0) {
            obj.channels = base64FromBytes(message.channels);
        }
        if (message.moniker !== "") {
            obj.moniker = message.moniker;
        }
        if (message.other !== undefined) {
            obj.other = DefaultNodeInfoOther.toJSON(message.other);
        }
        return obj;
    },
    create(base) {
        return DefaultNodeInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDefaultNodeInfo();
        message.protocolVersion = (object.protocolVersion !== undefined && object.protocolVersion !== null)
            ? ProtocolVersion.fromPartial(object.protocolVersion)
            : undefined;
        message.defaultNodeId = object.defaultNodeId ?? "";
        message.listenAddr = object.listenAddr ?? "";
        message.network = object.network ?? "";
        message.version = object.version ?? "";
        message.channels = object.channels ?? new Uint8Array(0);
        message.moniker = object.moniker ?? "";
        message.other = (object.other !== undefined && object.other !== null)
            ? DefaultNodeInfoOther.fromPartial(object.other)
            : undefined;
        return message;
    },
};
function createBaseDefaultNodeInfoOther() {
    return { txIndex: "", rpcAddress: "" };
}
export const DefaultNodeInfoOther = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.txIndex !== "") {
            writer.uint32(10).string(message.txIndex);
        }
        if (message.rpcAddress !== "") {
            writer.uint32(18).string(message.rpcAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDefaultNodeInfoOther();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txIndex = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.rpcAddress = reader.string();
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
            txIndex: isSet(object.txIndex) ? String(object.txIndex) : "",
            rpcAddress: isSet(object.rpcAddress) ? String(object.rpcAddress) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.txIndex !== "") {
            obj.txIndex = message.txIndex;
        }
        if (message.rpcAddress !== "") {
            obj.rpcAddress = message.rpcAddress;
        }
        return obj;
    },
    create(base) {
        return DefaultNodeInfoOther.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDefaultNodeInfoOther();
        message.txIndex = object.txIndex ?? "";
        message.rpcAddress = object.rpcAddress ?? "";
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
