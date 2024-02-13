/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { CommitmentProof } from "../../../../cosmos/ics23/v1/proofs";
export const protobufPackage = "ibc.core.commitment.v1";
function createBaseMerkleRoot() {
    return { hash: new Uint8Array(0) };
}
export const MerkleRoot = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMerkleRoot();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.hash = reader.bytes();
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
        return { hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.hash.length !== 0) {
            obj.hash = base64FromBytes(message.hash);
        }
        return obj;
    },
    create(base) {
        return MerkleRoot.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMerkleRoot();
        message.hash = object.hash ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMerklePrefix() {
    return { keyPrefix: new Uint8Array(0) };
}
export const MerklePrefix = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyPrefix.length !== 0) {
            writer.uint32(10).bytes(message.keyPrefix);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMerklePrefix();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.keyPrefix = reader.bytes();
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
        return { keyPrefix: isSet(object.keyPrefix) ? bytesFromBase64(object.keyPrefix) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.keyPrefix.length !== 0) {
            obj.keyPrefix = base64FromBytes(message.keyPrefix);
        }
        return obj;
    },
    create(base) {
        return MerklePrefix.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMerklePrefix();
        message.keyPrefix = object.keyPrefix ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMerklePath() {
    return { keyPath: [] };
}
export const MerklePath = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.keyPath) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMerklePath();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.keyPath.push(reader.string());
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
        return { keyPath: Array.isArray(object?.keyPath) ? object.keyPath.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.keyPath?.length) {
            obj.keyPath = message.keyPath;
        }
        return obj;
    },
    create(base) {
        return MerklePath.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMerklePath();
        message.keyPath = object.keyPath?.map((e) => e) || [];
        return message;
    },
};
function createBaseMerkleProof() {
    return { proofs: [] };
}
export const MerkleProof = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.proofs) {
            CommitmentProof.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMerkleProof();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.proofs.push(CommitmentProof.decode(reader, reader.uint32()));
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
        return { proofs: Array.isArray(object?.proofs) ? object.proofs.map((e) => CommitmentProof.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.proofs?.length) {
            obj.proofs = message.proofs.map((e) => CommitmentProof.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MerkleProof.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMerkleProof();
        message.proofs = object.proofs?.map((e) => CommitmentProof.fromPartial(e)) || [];
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
function isSet(value) {
    return value !== null && value !== undefined;
}
