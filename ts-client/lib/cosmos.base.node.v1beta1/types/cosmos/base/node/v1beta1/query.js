/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../../google/protobuf/timestamp";
export const protobufPackage = "cosmos.base.node.v1beta1";
function createBaseConfigRequest() {
    return {};
}
export const ConfigRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConfigRequest();
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
        return ConfigRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseConfigRequest();
        return message;
    },
};
function createBaseConfigResponse() {
    return { minimumGasPrice: "", pruningKeepRecent: "", pruningInterval: "", haltHeight: 0 };
}
export const ConfigResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.minimumGasPrice !== "") {
            writer.uint32(10).string(message.minimumGasPrice);
        }
        if (message.pruningKeepRecent !== "") {
            writer.uint32(18).string(message.pruningKeepRecent);
        }
        if (message.pruningInterval !== "") {
            writer.uint32(26).string(message.pruningInterval);
        }
        if (message.haltHeight !== 0) {
            writer.uint32(32).uint64(message.haltHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConfigResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.minimumGasPrice = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pruningKeepRecent = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.pruningInterval = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.haltHeight = longToNumber(reader.uint64());
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
            minimumGasPrice: isSet(object.minimumGasPrice) ? String(object.minimumGasPrice) : "",
            pruningKeepRecent: isSet(object.pruningKeepRecent) ? String(object.pruningKeepRecent) : "",
            pruningInterval: isSet(object.pruningInterval) ? String(object.pruningInterval) : "",
            haltHeight: isSet(object.haltHeight) ? Number(object.haltHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.minimumGasPrice !== "") {
            obj.minimumGasPrice = message.minimumGasPrice;
        }
        if (message.pruningKeepRecent !== "") {
            obj.pruningKeepRecent = message.pruningKeepRecent;
        }
        if (message.pruningInterval !== "") {
            obj.pruningInterval = message.pruningInterval;
        }
        if (message.haltHeight !== 0) {
            obj.haltHeight = Math.round(message.haltHeight);
        }
        return obj;
    },
    create(base) {
        return ConfigResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseConfigResponse();
        message.minimumGasPrice = object.minimumGasPrice ?? "";
        message.pruningKeepRecent = object.pruningKeepRecent ?? "";
        message.pruningInterval = object.pruningInterval ?? "";
        message.haltHeight = object.haltHeight ?? 0;
        return message;
    },
};
function createBaseStatusRequest() {
    return {};
}
export const StatusRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatusRequest();
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
        return StatusRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseStatusRequest();
        return message;
    },
};
function createBaseStatusResponse() {
    return {
        earliestStoreHeight: 0,
        height: 0,
        timestamp: undefined,
        appHash: new Uint8Array(0),
        validatorHash: new Uint8Array(0),
    };
}
export const StatusResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.earliestStoreHeight !== 0) {
            writer.uint32(8).uint64(message.earliestStoreHeight);
        }
        if (message.height !== 0) {
            writer.uint32(16).uint64(message.height);
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(34).bytes(message.appHash);
        }
        if (message.validatorHash.length !== 0) {
            writer.uint32(42).bytes(message.validatorHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStatusResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.earliestStoreHeight = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.height = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.appHash = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.validatorHash = reader.bytes();
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
            earliestStoreHeight: isSet(object.earliestStoreHeight) ? Number(object.earliestStoreHeight) : 0,
            height: isSet(object.height) ? Number(object.height) : 0,
            timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
            appHash: isSet(object.appHash) ? bytesFromBase64(object.appHash) : new Uint8Array(0),
            validatorHash: isSet(object.validatorHash) ? bytesFromBase64(object.validatorHash) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.earliestStoreHeight !== 0) {
            obj.earliestStoreHeight = Math.round(message.earliestStoreHeight);
        }
        if (message.height !== 0) {
            obj.height = Math.round(message.height);
        }
        if (message.timestamp !== undefined) {
            obj.timestamp = message.timestamp.toISOString();
        }
        if (message.appHash.length !== 0) {
            obj.appHash = base64FromBytes(message.appHash);
        }
        if (message.validatorHash.length !== 0) {
            obj.validatorHash = base64FromBytes(message.validatorHash);
        }
        return obj;
    },
    create(base) {
        return StatusResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseStatusResponse();
        message.earliestStoreHeight = object.earliestStoreHeight ?? 0;
        message.height = object.height ?? 0;
        message.timestamp = object.timestamp ?? undefined;
        message.appHash = object.appHash ?? new Uint8Array(0);
        message.validatorHash = object.validatorHash ?? new Uint8Array(0);
        return message;
    },
};
export const ServiceServiceName = "cosmos.base.node.v1beta1.Service";
export class ServiceClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || ServiceServiceName;
        this.rpc = rpc;
        this.Config = this.Config.bind(this);
        this.Status = this.Status.bind(this);
    }
    Config(request) {
        const data = ConfigRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Config", data);
        return promise.then((data) => ConfigResponse.decode(_m0.Reader.create(data)));
    }
    Status(request) {
        const data = StatusRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Status", data);
        return promise.then((data) => StatusResponse.decode(_m0.Reader.create(data)));
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
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = (t.seconds || 0) * 1000;
    millis += (t.nanos || 0) / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
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
