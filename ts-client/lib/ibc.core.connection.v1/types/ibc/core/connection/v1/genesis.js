/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ConnectionPaths, IdentifiedConnection, Params } from "./connection";
export const protobufPackage = "ibc.core.connection.v1";
function createBaseGenesisState() {
    return { connections: [], clientConnectionPaths: [], nextConnectionSequence: 0, params: undefined };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.connections) {
            IdentifiedConnection.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.clientConnectionPaths) {
            ConnectionPaths.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.nextConnectionSequence !== 0) {
            writer.uint32(24).uint64(message.nextConnectionSequence);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(34).fork()).ldelim();
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
                    message.connections.push(IdentifiedConnection.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.clientConnectionPaths.push(ConnectionPaths.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.nextConnectionSequence = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
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
            connections: Array.isArray(object?.connections)
                ? object.connections.map((e) => IdentifiedConnection.fromJSON(e))
                : [],
            clientConnectionPaths: Array.isArray(object?.clientConnectionPaths)
                ? object.clientConnectionPaths.map((e) => ConnectionPaths.fromJSON(e))
                : [],
            nextConnectionSequence: isSet(object.nextConnectionSequence) ? Number(object.nextConnectionSequence) : 0,
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.connections?.length) {
            obj.connections = message.connections.map((e) => IdentifiedConnection.toJSON(e));
        }
        if (message.clientConnectionPaths?.length) {
            obj.clientConnectionPaths = message.clientConnectionPaths.map((e) => ConnectionPaths.toJSON(e));
        }
        if (message.nextConnectionSequence !== 0) {
            obj.nextConnectionSequence = Math.round(message.nextConnectionSequence);
        }
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.connections = object.connections?.map((e) => IdentifiedConnection.fromPartial(e)) || [];
        message.clientConnectionPaths = object.clientConnectionPaths?.map((e) => ConnectionPaths.fromPartial(e)) || [];
        message.nextConnectionSequence = object.nextConnectionSequence ?? 0;
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
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
