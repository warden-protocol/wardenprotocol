/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { CompactBitArray } from "../../../crypto/multisig/v1beta1/multisig";
export const protobufPackage = "cosmos.tx.signing.v1beta1";
/**
 * SignMode represents a signing mode with its own security guarantees.
 *
 * This enum should be considered a registry of all known sign modes
 * in the Cosmos ecosystem. Apps are not expected to support all known
 * sign modes. Apps that would like to support custom  sign modes are
 * encouraged to open a small PR against this file to add a new case
 * to this SignMode enum describing their sign mode so that different
 * apps have a consistent version of this enum.
 */
export var SignMode;
(function (SignMode) {
    /**
     * SIGN_MODE_UNSPECIFIED - SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
     * rejected.
     */
    SignMode[SignMode["SIGN_MODE_UNSPECIFIED"] = 0] = "SIGN_MODE_UNSPECIFIED";
    /**
     * SIGN_MODE_DIRECT - SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
     * verified with raw bytes from Tx.
     */
    SignMode[SignMode["SIGN_MODE_DIRECT"] = 1] = "SIGN_MODE_DIRECT";
    /**
     * SIGN_MODE_TEXTUAL - SIGN_MODE_TEXTUAL is a future signing mode that will verify some
     * human-readable textual representation on top of the binary representation
     * from SIGN_MODE_DIRECT.
     *
     * Since: cosmos-sdk 0.50
     */
    SignMode[SignMode["SIGN_MODE_TEXTUAL"] = 2] = "SIGN_MODE_TEXTUAL";
    /**
     * SIGN_MODE_DIRECT_AUX - SIGN_MODE_DIRECT_AUX specifies a signing mode which uses
     * SignDocDirectAux. As opposed to SIGN_MODE_DIRECT, this sign mode does not
     * require signers signing over other signers' `signer_info`.
     *
     * Since: cosmos-sdk 0.46
     */
    SignMode[SignMode["SIGN_MODE_DIRECT_AUX"] = 3] = "SIGN_MODE_DIRECT_AUX";
    /**
     * SIGN_MODE_LEGACY_AMINO_JSON - SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
     * Amino JSON and will be removed in the future.
     */
    SignMode[SignMode["SIGN_MODE_LEGACY_AMINO_JSON"] = 127] = "SIGN_MODE_LEGACY_AMINO_JSON";
    /**
     * SIGN_MODE_EIP_191 - SIGN_MODE_EIP_191 specifies the sign mode for EIP 191 signing on the Cosmos
     * SDK. Ref: https://eips.ethereum.org/EIPS/eip-191
     *
     * Currently, SIGN_MODE_EIP_191 is registered as a SignMode enum variant,
     * but is not implemented on the SDK by default. To enable EIP-191, you need
     * to pass a custom `TxConfig` that has an implementation of
     * `SignModeHandler` for EIP-191. The SDK may decide to fully support
     * EIP-191 in the future.
     *
     * Since: cosmos-sdk 0.45.2
     */
    SignMode[SignMode["SIGN_MODE_EIP_191"] = 191] = "SIGN_MODE_EIP_191";
    SignMode[SignMode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SignMode || (SignMode = {}));
export function signModeFromJSON(object) {
    switch (object) {
        case 0:
        case "SIGN_MODE_UNSPECIFIED":
            return SignMode.SIGN_MODE_UNSPECIFIED;
        case 1:
        case "SIGN_MODE_DIRECT":
            return SignMode.SIGN_MODE_DIRECT;
        case 2:
        case "SIGN_MODE_TEXTUAL":
            return SignMode.SIGN_MODE_TEXTUAL;
        case 3:
        case "SIGN_MODE_DIRECT_AUX":
            return SignMode.SIGN_MODE_DIRECT_AUX;
        case 127:
        case "SIGN_MODE_LEGACY_AMINO_JSON":
            return SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
        case 191:
        case "SIGN_MODE_EIP_191":
            return SignMode.SIGN_MODE_EIP_191;
        case -1:
        case "UNRECOGNIZED":
        default:
            return SignMode.UNRECOGNIZED;
    }
}
export function signModeToJSON(object) {
    switch (object) {
        case SignMode.SIGN_MODE_UNSPECIFIED:
            return "SIGN_MODE_UNSPECIFIED";
        case SignMode.SIGN_MODE_DIRECT:
            return "SIGN_MODE_DIRECT";
        case SignMode.SIGN_MODE_TEXTUAL:
            return "SIGN_MODE_TEXTUAL";
        case SignMode.SIGN_MODE_DIRECT_AUX:
            return "SIGN_MODE_DIRECT_AUX";
        case SignMode.SIGN_MODE_LEGACY_AMINO_JSON:
            return "SIGN_MODE_LEGACY_AMINO_JSON";
        case SignMode.SIGN_MODE_EIP_191:
            return "SIGN_MODE_EIP_191";
        case SignMode.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseSignatureDescriptors() {
    return { signatures: [] };
}
export const SignatureDescriptors = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.signatures) {
            SignatureDescriptor.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptors();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.signatures.push(SignatureDescriptor.decode(reader, reader.uint32()));
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
            signatures: Array.isArray(object?.signatures)
                ? object.signatures.map((e) => SignatureDescriptor.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.signatures?.length) {
            obj.signatures = message.signatures.map((e) => SignatureDescriptor.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return SignatureDescriptors.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptors();
        message.signatures = object.signatures?.map((e) => SignatureDescriptor.fromPartial(e)) || [];
        return message;
    },
};
function createBaseSignatureDescriptor() {
    return { publicKey: undefined, data: undefined, sequence: 0 };
}
export const SignatureDescriptor = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.publicKey !== undefined) {
            Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.data !== undefined) {
            SignatureDescriptor_Data.encode(message.data, writer.uint32(18).fork()).ldelim();
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.publicKey = Any.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = SignatureDescriptor_Data.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.sequence = longToNumber(reader.uint64());
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
            publicKey: isSet(object.publicKey) ? Any.fromJSON(object.publicKey) : undefined,
            data: isSet(object.data) ? SignatureDescriptor_Data.fromJSON(object.data) : undefined,
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.publicKey !== undefined) {
            obj.publicKey = Any.toJSON(message.publicKey);
        }
        if (message.data !== undefined) {
            obj.data = SignatureDescriptor_Data.toJSON(message.data);
        }
        if (message.sequence !== 0) {
            obj.sequence = Math.round(message.sequence);
        }
        return obj;
    },
    create(base) {
        return SignatureDescriptor.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptor();
        message.publicKey = (object.publicKey !== undefined && object.publicKey !== null)
            ? Any.fromPartial(object.publicKey)
            : undefined;
        message.data = (object.data !== undefined && object.data !== null)
            ? SignatureDescriptor_Data.fromPartial(object.data)
            : undefined;
        message.sequence = object.sequence ?? 0;
        return message;
    },
};
function createBaseSignatureDescriptor_Data() {
    return { single: undefined, multi: undefined };
}
export const SignatureDescriptor_Data = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.single !== undefined) {
            SignatureDescriptor_Data_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
        }
        if (message.multi !== undefined) {
            SignatureDescriptor_Data_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptor_Data();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.single = SignatureDescriptor_Data_Single.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.multi = SignatureDescriptor_Data_Multi.decode(reader, reader.uint32());
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
            single: isSet(object.single) ? SignatureDescriptor_Data_Single.fromJSON(object.single) : undefined,
            multi: isSet(object.multi) ? SignatureDescriptor_Data_Multi.fromJSON(object.multi) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.single !== undefined) {
            obj.single = SignatureDescriptor_Data_Single.toJSON(message.single);
        }
        if (message.multi !== undefined) {
            obj.multi = SignatureDescriptor_Data_Multi.toJSON(message.multi);
        }
        return obj;
    },
    create(base) {
        return SignatureDescriptor_Data.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptor_Data();
        message.single = (object.single !== undefined && object.single !== null)
            ? SignatureDescriptor_Data_Single.fromPartial(object.single)
            : undefined;
        message.multi = (object.multi !== undefined && object.multi !== null)
            ? SignatureDescriptor_Data_Multi.fromPartial(object.multi)
            : undefined;
        return message;
    },
};
function createBaseSignatureDescriptor_Data_Single() {
    return { mode: 0, signature: new Uint8Array(0) };
}
export const SignatureDescriptor_Data_Single = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.mode !== 0) {
            writer.uint32(8).int32(message.mode);
        }
        if (message.signature.length !== 0) {
            writer.uint32(18).bytes(message.signature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptor_Data_Single();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.mode = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.signature = reader.bytes();
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
            mode: isSet(object.mode) ? signModeFromJSON(object.mode) : 0,
            signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.mode !== 0) {
            obj.mode = signModeToJSON(message.mode);
        }
        if (message.signature.length !== 0) {
            obj.signature = base64FromBytes(message.signature);
        }
        return obj;
    },
    create(base) {
        return SignatureDescriptor_Data_Single.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptor_Data_Single();
        message.mode = object.mode ?? 0;
        message.signature = object.signature ?? new Uint8Array(0);
        return message;
    },
};
function createBaseSignatureDescriptor_Data_Multi() {
    return { bitarray: undefined, signatures: [] };
}
export const SignatureDescriptor_Data_Multi = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bitarray !== undefined) {
            CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.signatures) {
            SignatureDescriptor_Data.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignatureDescriptor_Data_Multi();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bitarray = CompactBitArray.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.signatures.push(SignatureDescriptor_Data.decode(reader, reader.uint32()));
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
            bitarray: isSet(object.bitarray) ? CompactBitArray.fromJSON(object.bitarray) : undefined,
            signatures: Array.isArray(object?.signatures)
                ? object.signatures.map((e) => SignatureDescriptor_Data.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.bitarray !== undefined) {
            obj.bitarray = CompactBitArray.toJSON(message.bitarray);
        }
        if (message.signatures?.length) {
            obj.signatures = message.signatures.map((e) => SignatureDescriptor_Data.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return SignatureDescriptor_Data_Multi.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignatureDescriptor_Data_Multi();
        message.bitarray = (object.bitarray !== undefined && object.bitarray !== null)
            ? CompactBitArray.fromPartial(object.bitarray)
            : undefined;
        message.signatures = object.signatures?.map((e) => SignatureDescriptor_Data.fromPartial(e)) || [];
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
