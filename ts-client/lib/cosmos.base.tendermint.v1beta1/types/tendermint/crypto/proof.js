/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "tendermint.crypto";
function createBaseProof() {
    return { total: 0, index: 0, leafHash: new Uint8Array(0), aunts: [] };
}
export const Proof = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.total !== 0) {
            writer.uint32(8).int64(message.total);
        }
        if (message.index !== 0) {
            writer.uint32(16).int64(message.index);
        }
        if (message.leafHash.length !== 0) {
            writer.uint32(26).bytes(message.leafHash);
        }
        for (const v of message.aunts) {
            writer.uint32(34).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProof();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.total = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.index = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.leafHash = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.aunts.push(reader.bytes());
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
            total: isSet(object.total) ? Number(object.total) : 0,
            index: isSet(object.index) ? Number(object.index) : 0,
            leafHash: isSet(object.leafHash) ? bytesFromBase64(object.leafHash) : new Uint8Array(0),
            aunts: Array.isArray(object?.aunts) ? object.aunts.map((e) => bytesFromBase64(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.total !== 0) {
            obj.total = Math.round(message.total);
        }
        if (message.index !== 0) {
            obj.index = Math.round(message.index);
        }
        if (message.leafHash.length !== 0) {
            obj.leafHash = base64FromBytes(message.leafHash);
        }
        if (message.aunts?.length) {
            obj.aunts = message.aunts.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return Proof.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseProof();
        message.total = object.total ?? 0;
        message.index = object.index ?? 0;
        message.leafHash = object.leafHash ?? new Uint8Array(0);
        message.aunts = object.aunts?.map((e) => e) || [];
        return message;
    },
};
function createBaseValueOp() {
    return { key: new Uint8Array(0), proof: undefined };
}
export const ValueOp = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.proof !== undefined) {
            Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValueOp();
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
                    message.proof = Proof.decode(reader, reader.uint32());
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
            proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.key.length !== 0) {
            obj.key = base64FromBytes(message.key);
        }
        if (message.proof !== undefined) {
            obj.proof = Proof.toJSON(message.proof);
        }
        return obj;
    },
    create(base) {
        return ValueOp.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseValueOp();
        message.key = object.key ?? new Uint8Array(0);
        message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
        return message;
    },
};
function createBaseDominoOp() {
    return { key: "", input: "", output: "" };
}
export const DominoOp = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.input !== "") {
            writer.uint32(18).string(message.input);
        }
        if (message.output !== "") {
            writer.uint32(26).string(message.output);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDominoOp();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.key = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.input = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.output = reader.string();
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
            key: isSet(object.key) ? String(object.key) : "",
            input: isSet(object.input) ? String(object.input) : "",
            output: isSet(object.output) ? String(object.output) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.key !== "") {
            obj.key = message.key;
        }
        if (message.input !== "") {
            obj.input = message.input;
        }
        if (message.output !== "") {
            obj.output = message.output;
        }
        return obj;
    },
    create(base) {
        return DominoOp.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDominoOp();
        message.key = object.key ?? "";
        message.input = object.input ?? "";
        message.output = object.output ?? "";
        return message;
    },
};
function createBaseProofOp() {
    return { type: "", key: new Uint8Array(0), data: new Uint8Array(0) };
}
export const ProofOp = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        if (message.key.length !== 0) {
            writer.uint32(18).bytes(message.key);
        }
        if (message.data.length !== 0) {
            writer.uint32(26).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProofOp();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.type = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.key = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.data = reader.bytes();
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
            type: isSet(object.type) ? String(object.type) : "",
            key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== "") {
            obj.type = message.type;
        }
        if (message.key.length !== 0) {
            obj.key = base64FromBytes(message.key);
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return ProofOp.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseProofOp();
        message.type = object.type ?? "";
        message.key = object.key ?? new Uint8Array(0);
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseProofOps() {
    return { ops: [] };
}
export const ProofOps = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.ops) {
            ProofOp.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProofOps();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.ops.push(ProofOp.decode(reader, reader.uint32()));
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
        return { ops: Array.isArray(object?.ops) ? object.ops.map((e) => ProofOp.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.ops?.length) {
            obj.ops = message.ops.map((e) => ProofOp.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ProofOps.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseProofOps();
        message.ops = object.ops?.map((e) => ProofOp.fromPartial(e)) || [];
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
