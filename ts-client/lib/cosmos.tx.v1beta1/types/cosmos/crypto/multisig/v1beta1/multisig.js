/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "cosmos.crypto.multisig.v1beta1";
function createBaseMultiSignature() {
    return { signatures: [] };
}
export const MultiSignature = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.signatures) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMultiSignature();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.signatures.push(reader.bytes());
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
            signatures: Array.isArray(object?.signatures) ? object.signatures.map((e) => bytesFromBase64(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.signatures?.length) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return MultiSignature.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMultiSignature();
        message.signatures = object.signatures?.map((e) => e) || [];
        return message;
    },
};
function createBaseCompactBitArray() {
    return { extraBitsStored: 0, elems: new Uint8Array(0) };
}
export const CompactBitArray = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.extraBitsStored !== 0) {
            writer.uint32(8).uint32(message.extraBitsStored);
        }
        if (message.elems.length !== 0) {
            writer.uint32(18).bytes(message.elems);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCompactBitArray();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.extraBitsStored = reader.uint32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.elems = reader.bytes();
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
            extraBitsStored: isSet(object.extraBitsStored) ? Number(object.extraBitsStored) : 0,
            elems: isSet(object.elems) ? bytesFromBase64(object.elems) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.extraBitsStored !== 0) {
            obj.extraBitsStored = Math.round(message.extraBitsStored);
        }
        if (message.elems.length !== 0) {
            obj.elems = base64FromBytes(message.elems);
        }
        return obj;
    },
    create(base) {
        return CompactBitArray.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCompactBitArray();
        message.extraBitsStored = object.extraBitsStored ?? 0;
        message.elems = object.elems ?? new Uint8Array(0);
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
