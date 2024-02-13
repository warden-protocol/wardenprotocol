/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ClientConsensusStates, IdentifiedClientState, Params } from "./client";
export const protobufPackage = "ibc.core.client.v1";
function createBaseGenesisState() {
    return {
        clients: [],
        clientsConsensus: [],
        clientsMetadata: [],
        params: undefined,
        createLocalhost: false,
        nextClientSequence: 0,
    };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.clients) {
            IdentifiedClientState.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.clientsConsensus) {
            ClientConsensusStates.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.clientsMetadata) {
            IdentifiedGenesisMetadata.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(34).fork()).ldelim();
        }
        if (message.createLocalhost === true) {
            writer.uint32(40).bool(message.createLocalhost);
        }
        if (message.nextClientSequence !== 0) {
            writer.uint32(48).uint64(message.nextClientSequence);
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
                    message.clients.push(IdentifiedClientState.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.clientsConsensus.push(ClientConsensusStates.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.clientsMetadata.push(IdentifiedGenesisMetadata.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.params = Params.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.createLocalhost = reader.bool();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.nextClientSequence = longToNumber(reader.uint64());
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
            clients: Array.isArray(object?.clients) ? object.clients.map((e) => IdentifiedClientState.fromJSON(e)) : [],
            clientsConsensus: Array.isArray(object?.clientsConsensus)
                ? object.clientsConsensus.map((e) => ClientConsensusStates.fromJSON(e))
                : [],
            clientsMetadata: Array.isArray(object?.clientsMetadata)
                ? object.clientsMetadata.map((e) => IdentifiedGenesisMetadata.fromJSON(e))
                : [],
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
            createLocalhost: isSet(object.createLocalhost) ? Boolean(object.createLocalhost) : false,
            nextClientSequence: isSet(object.nextClientSequence) ? Number(object.nextClientSequence) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clients?.length) {
            obj.clients = message.clients.map((e) => IdentifiedClientState.toJSON(e));
        }
        if (message.clientsConsensus?.length) {
            obj.clientsConsensus = message.clientsConsensus.map((e) => ClientConsensusStates.toJSON(e));
        }
        if (message.clientsMetadata?.length) {
            obj.clientsMetadata = message.clientsMetadata.map((e) => IdentifiedGenesisMetadata.toJSON(e));
        }
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        if (message.createLocalhost === true) {
            obj.createLocalhost = message.createLocalhost;
        }
        if (message.nextClientSequence !== 0) {
            obj.nextClientSequence = Math.round(message.nextClientSequence);
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.clients = object.clients?.map((e) => IdentifiedClientState.fromPartial(e)) || [];
        message.clientsConsensus = object.clientsConsensus?.map((e) => ClientConsensusStates.fromPartial(e)) || [];
        message.clientsMetadata = object.clientsMetadata?.map((e) => IdentifiedGenesisMetadata.fromPartial(e)) || [];
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        message.createLocalhost = object.createLocalhost ?? false;
        message.nextClientSequence = object.nextClientSequence ?? 0;
        return message;
    },
};
function createBaseGenesisMetadata() {
    return { key: new Uint8Array(0), value: new Uint8Array(0) };
}
export const GenesisMetadata = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.key = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.value = reader.bytes();
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
            key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
            value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.key.length !== 0) {
            obj.key = base64FromBytes(message.key);
        }
        if (message.value.length !== 0) {
            obj.value = base64FromBytes(message.value);
        }
        return obj;
    },
    create(base) {
        return GenesisMetadata.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisMetadata();
        message.key = object.key ?? new Uint8Array(0);
        message.value = object.value ?? new Uint8Array(0);
        return message;
    },
};
function createBaseIdentifiedGenesisMetadata() {
    return { clientId: "", clientMetadata: [] };
}
export const IdentifiedGenesisMetadata = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        for (const v of message.clientMetadata) {
            GenesisMetadata.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentifiedGenesisMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.clientMetadata.push(GenesisMetadata.decode(reader, reader.uint32()));
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            clientMetadata: Array.isArray(object?.clientMetadata)
                ? object.clientMetadata.map((e) => GenesisMetadata.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.clientMetadata?.length) {
            obj.clientMetadata = message.clientMetadata.map((e) => GenesisMetadata.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return IdentifiedGenesisMetadata.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIdentifiedGenesisMetadata();
        message.clientId = object.clientId ?? "";
        message.clientMetadata = object.clientMetadata?.map((e) => GenesisMetadata.fromPartial(e)) || [];
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
