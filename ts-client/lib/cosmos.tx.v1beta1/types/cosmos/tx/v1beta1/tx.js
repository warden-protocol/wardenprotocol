/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../base/v1beta1/coin";
import { CompactBitArray } from "../../crypto/multisig/v1beta1/multisig";
import { signModeFromJSON, signModeToJSON } from "../signing/v1beta1/signing";
export const protobufPackage = "cosmos.tx.v1beta1";
function createBaseTx() {
    return { body: undefined, authInfo: undefined, signatures: [] };
}
export const Tx = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.body !== undefined) {
            TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
        }
        if (message.authInfo !== undefined) {
            AuthInfo.encode(message.authInfo, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.body = TxBody.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.authInfo = AuthInfo.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
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
            body: isSet(object.body) ? TxBody.fromJSON(object.body) : undefined,
            authInfo: isSet(object.authInfo) ? AuthInfo.fromJSON(object.authInfo) : undefined,
            signatures: Array.isArray(object?.signatures) ? object.signatures.map((e) => bytesFromBase64(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.body !== undefined) {
            obj.body = TxBody.toJSON(message.body);
        }
        if (message.authInfo !== undefined) {
            obj.authInfo = AuthInfo.toJSON(message.authInfo);
        }
        if (message.signatures?.length) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return Tx.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTx();
        message.body = (object.body !== undefined && object.body !== null) ? TxBody.fromPartial(object.body) : undefined;
        message.authInfo = (object.authInfo !== undefined && object.authInfo !== null)
            ? AuthInfo.fromPartial(object.authInfo)
            : undefined;
        message.signatures = object.signatures?.map((e) => e) || [];
        return message;
    },
};
function createBaseTxRaw() {
    return { bodyBytes: new Uint8Array(0), authInfoBytes: new Uint8Array(0), signatures: [] };
}
export const TxRaw = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            writer.uint32(18).bytes(message.authInfoBytes);
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxRaw();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bodyBytes = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.authInfoBytes = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
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
            bodyBytes: isSet(object.bodyBytes) ? bytesFromBase64(object.bodyBytes) : new Uint8Array(0),
            authInfoBytes: isSet(object.authInfoBytes) ? bytesFromBase64(object.authInfoBytes) : new Uint8Array(0),
            signatures: Array.isArray(object?.signatures) ? object.signatures.map((e) => bytesFromBase64(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.bodyBytes.length !== 0) {
            obj.bodyBytes = base64FromBytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            obj.authInfoBytes = base64FromBytes(message.authInfoBytes);
        }
        if (message.signatures?.length) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return TxRaw.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxRaw();
        message.bodyBytes = object.bodyBytes ?? new Uint8Array(0);
        message.authInfoBytes = object.authInfoBytes ?? new Uint8Array(0);
        message.signatures = object.signatures?.map((e) => e) || [];
        return message;
    },
};
function createBaseSignDoc() {
    return { bodyBytes: new Uint8Array(0), authInfoBytes: new Uint8Array(0), chainId: "", accountNumber: 0 };
}
export const SignDoc = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            writer.uint32(18).bytes(message.authInfoBytes);
        }
        if (message.chainId !== "") {
            writer.uint32(26).string(message.chainId);
        }
        if (message.accountNumber !== 0) {
            writer.uint32(32).uint64(message.accountNumber);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignDoc();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bodyBytes = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.authInfoBytes = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.chainId = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.accountNumber = longToNumber(reader.uint64());
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
            bodyBytes: isSet(object.bodyBytes) ? bytesFromBase64(object.bodyBytes) : new Uint8Array(0),
            authInfoBytes: isSet(object.authInfoBytes) ? bytesFromBase64(object.authInfoBytes) : new Uint8Array(0),
            chainId: isSet(object.chainId) ? String(object.chainId) : "",
            accountNumber: isSet(object.accountNumber) ? Number(object.accountNumber) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.bodyBytes.length !== 0) {
            obj.bodyBytes = base64FromBytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            obj.authInfoBytes = base64FromBytes(message.authInfoBytes);
        }
        if (message.chainId !== "") {
            obj.chainId = message.chainId;
        }
        if (message.accountNumber !== 0) {
            obj.accountNumber = Math.round(message.accountNumber);
        }
        return obj;
    },
    create(base) {
        return SignDoc.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignDoc();
        message.bodyBytes = object.bodyBytes ?? new Uint8Array(0);
        message.authInfoBytes = object.authInfoBytes ?? new Uint8Array(0);
        message.chainId = object.chainId ?? "";
        message.accountNumber = object.accountNumber ?? 0;
        return message;
    },
};
function createBaseSignDocDirectAux() {
    return {
        bodyBytes: new Uint8Array(0),
        publicKey: undefined,
        chainId: "",
        accountNumber: 0,
        sequence: 0,
        tip: undefined,
    };
}
export const SignDocDirectAux = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.publicKey !== undefined) {
            Any.encode(message.publicKey, writer.uint32(18).fork()).ldelim();
        }
        if (message.chainId !== "") {
            writer.uint32(26).string(message.chainId);
        }
        if (message.accountNumber !== 0) {
            writer.uint32(32).uint64(message.accountNumber);
        }
        if (message.sequence !== 0) {
            writer.uint32(40).uint64(message.sequence);
        }
        if (message.tip !== undefined) {
            Tip.encode(message.tip, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignDocDirectAux();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.bodyBytes = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.publicKey = Any.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.chainId = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.accountNumber = longToNumber(reader.uint64());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.sequence = longToNumber(reader.uint64());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.tip = Tip.decode(reader, reader.uint32());
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
            bodyBytes: isSet(object.bodyBytes) ? bytesFromBase64(object.bodyBytes) : new Uint8Array(0),
            publicKey: isSet(object.publicKey) ? Any.fromJSON(object.publicKey) : undefined,
            chainId: isSet(object.chainId) ? String(object.chainId) : "",
            accountNumber: isSet(object.accountNumber) ? Number(object.accountNumber) : 0,
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
            tip: isSet(object.tip) ? Tip.fromJSON(object.tip) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.bodyBytes.length !== 0) {
            obj.bodyBytes = base64FromBytes(message.bodyBytes);
        }
        if (message.publicKey !== undefined) {
            obj.publicKey = Any.toJSON(message.publicKey);
        }
        if (message.chainId !== "") {
            obj.chainId = message.chainId;
        }
        if (message.accountNumber !== 0) {
            obj.accountNumber = Math.round(message.accountNumber);
        }
        if (message.sequence !== 0) {
            obj.sequence = Math.round(message.sequence);
        }
        if (message.tip !== undefined) {
            obj.tip = Tip.toJSON(message.tip);
        }
        return obj;
    },
    create(base) {
        return SignDocDirectAux.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignDocDirectAux();
        message.bodyBytes = object.bodyBytes ?? new Uint8Array(0);
        message.publicKey = (object.publicKey !== undefined && object.publicKey !== null)
            ? Any.fromPartial(object.publicKey)
            : undefined;
        message.chainId = object.chainId ?? "";
        message.accountNumber = object.accountNumber ?? 0;
        message.sequence = object.sequence ?? 0;
        message.tip = (object.tip !== undefined && object.tip !== null) ? Tip.fromPartial(object.tip) : undefined;
        return message;
    },
};
function createBaseTxBody() {
    return { messages: [], memo: "", timeoutHeight: 0, extensionOptions: [], nonCriticalExtensionOptions: [] };
}
export const TxBody = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.messages) {
            Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.memo !== "") {
            writer.uint32(18).string(message.memo);
        }
        if (message.timeoutHeight !== 0) {
            writer.uint32(24).uint64(message.timeoutHeight);
        }
        for (const v of message.extensionOptions) {
            Any.encode(v, writer.uint32(8186).fork()).ldelim();
        }
        for (const v of message.nonCriticalExtensionOptions) {
            Any.encode(v, writer.uint32(16378).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxBody();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.messages.push(Any.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.memo = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.timeoutHeight = longToNumber(reader.uint64());
                    continue;
                case 1023:
                    if (tag !== 8186) {
                        break;
                    }
                    message.extensionOptions.push(Any.decode(reader, reader.uint32()));
                    continue;
                case 2047:
                    if (tag !== 16378) {
                        break;
                    }
                    message.nonCriticalExtensionOptions.push(Any.decode(reader, reader.uint32()));
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
            messages: Array.isArray(object?.messages) ? object.messages.map((e) => Any.fromJSON(e)) : [],
            memo: isSet(object.memo) ? String(object.memo) : "",
            timeoutHeight: isSet(object.timeoutHeight) ? Number(object.timeoutHeight) : 0,
            extensionOptions: Array.isArray(object?.extensionOptions)
                ? object.extensionOptions.map((e) => Any.fromJSON(e))
                : [],
            nonCriticalExtensionOptions: Array.isArray(object?.nonCriticalExtensionOptions)
                ? object.nonCriticalExtensionOptions.map((e) => Any.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages?.length) {
            obj.messages = message.messages.map((e) => Any.toJSON(e));
        }
        if (message.memo !== "") {
            obj.memo = message.memo;
        }
        if (message.timeoutHeight !== 0) {
            obj.timeoutHeight = Math.round(message.timeoutHeight);
        }
        if (message.extensionOptions?.length) {
            obj.extensionOptions = message.extensionOptions.map((e) => Any.toJSON(e));
        }
        if (message.nonCriticalExtensionOptions?.length) {
            obj.nonCriticalExtensionOptions = message.nonCriticalExtensionOptions.map((e) => Any.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return TxBody.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxBody();
        message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
        message.memo = object.memo ?? "";
        message.timeoutHeight = object.timeoutHeight ?? 0;
        message.extensionOptions = object.extensionOptions?.map((e) => Any.fromPartial(e)) || [];
        message.nonCriticalExtensionOptions = object.nonCriticalExtensionOptions?.map((e) => Any.fromPartial(e)) || [];
        return message;
    },
};
function createBaseAuthInfo() {
    return { signerInfos: [], fee: undefined, tip: undefined };
}
export const AuthInfo = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.signerInfos) {
            SignerInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.fee !== undefined) {
            Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
        }
        if (message.tip !== undefined) {
            Tip.encode(message.tip, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAuthInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.signerInfos.push(SignerInfo.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.fee = Fee.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.tip = Tip.decode(reader, reader.uint32());
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
            signerInfos: Array.isArray(object?.signerInfos) ? object.signerInfos.map((e) => SignerInfo.fromJSON(e)) : [],
            fee: isSet(object.fee) ? Fee.fromJSON(object.fee) : undefined,
            tip: isSet(object.tip) ? Tip.fromJSON(object.tip) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.signerInfos?.length) {
            obj.signerInfos = message.signerInfos.map((e) => SignerInfo.toJSON(e));
        }
        if (message.fee !== undefined) {
            obj.fee = Fee.toJSON(message.fee);
        }
        if (message.tip !== undefined) {
            obj.tip = Tip.toJSON(message.tip);
        }
        return obj;
    },
    create(base) {
        return AuthInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAuthInfo();
        message.signerInfos = object.signerInfos?.map((e) => SignerInfo.fromPartial(e)) || [];
        message.fee = (object.fee !== undefined && object.fee !== null) ? Fee.fromPartial(object.fee) : undefined;
        message.tip = (object.tip !== undefined && object.tip !== null) ? Tip.fromPartial(object.tip) : undefined;
        return message;
    },
};
function createBaseSignerInfo() {
    return { publicKey: undefined, modeInfo: undefined, sequence: 0 };
}
export const SignerInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.publicKey !== undefined) {
            Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.modeInfo !== undefined) {
            ModeInfo.encode(message.modeInfo, writer.uint32(18).fork()).ldelim();
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignerInfo();
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
                    message.modeInfo = ModeInfo.decode(reader, reader.uint32());
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
            modeInfo: isSet(object.modeInfo) ? ModeInfo.fromJSON(object.modeInfo) : undefined,
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.publicKey !== undefined) {
            obj.publicKey = Any.toJSON(message.publicKey);
        }
        if (message.modeInfo !== undefined) {
            obj.modeInfo = ModeInfo.toJSON(message.modeInfo);
        }
        if (message.sequence !== 0) {
            obj.sequence = Math.round(message.sequence);
        }
        return obj;
    },
    create(base) {
        return SignerInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignerInfo();
        message.publicKey = (object.publicKey !== undefined && object.publicKey !== null)
            ? Any.fromPartial(object.publicKey)
            : undefined;
        message.modeInfo = (object.modeInfo !== undefined && object.modeInfo !== null)
            ? ModeInfo.fromPartial(object.modeInfo)
            : undefined;
        message.sequence = object.sequence ?? 0;
        return message;
    },
};
function createBaseModeInfo() {
    return { single: undefined, multi: undefined };
}
export const ModeInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.single !== undefined) {
            ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
        }
        if (message.multi !== undefined) {
            ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModeInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.single = ModeInfo_Single.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.multi = ModeInfo_Multi.decode(reader, reader.uint32());
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
            single: isSet(object.single) ? ModeInfo_Single.fromJSON(object.single) : undefined,
            multi: isSet(object.multi) ? ModeInfo_Multi.fromJSON(object.multi) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.single !== undefined) {
            obj.single = ModeInfo_Single.toJSON(message.single);
        }
        if (message.multi !== undefined) {
            obj.multi = ModeInfo_Multi.toJSON(message.multi);
        }
        return obj;
    },
    create(base) {
        return ModeInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseModeInfo();
        message.single = (object.single !== undefined && object.single !== null)
            ? ModeInfo_Single.fromPartial(object.single)
            : undefined;
        message.multi = (object.multi !== undefined && object.multi !== null)
            ? ModeInfo_Multi.fromPartial(object.multi)
            : undefined;
        return message;
    },
};
function createBaseModeInfo_Single() {
    return { mode: 0 };
}
export const ModeInfo_Single = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.mode !== 0) {
            writer.uint32(8).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModeInfo_Single();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.mode = reader.int32();
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
        return { mode: isSet(object.mode) ? signModeFromJSON(object.mode) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.mode !== 0) {
            obj.mode = signModeToJSON(message.mode);
        }
        return obj;
    },
    create(base) {
        return ModeInfo_Single.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseModeInfo_Single();
        message.mode = object.mode ?? 0;
        return message;
    },
};
function createBaseModeInfo_Multi() {
    return { bitarray: undefined, modeInfos: [] };
}
export const ModeInfo_Multi = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.bitarray !== undefined) {
            CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.modeInfos) {
            ModeInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModeInfo_Multi();
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
                    message.modeInfos.push(ModeInfo.decode(reader, reader.uint32()));
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
            modeInfos: Array.isArray(object?.modeInfos) ? object.modeInfos.map((e) => ModeInfo.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.bitarray !== undefined) {
            obj.bitarray = CompactBitArray.toJSON(message.bitarray);
        }
        if (message.modeInfos?.length) {
            obj.modeInfos = message.modeInfos.map((e) => ModeInfo.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ModeInfo_Multi.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseModeInfo_Multi();
        message.bitarray = (object.bitarray !== undefined && object.bitarray !== null)
            ? CompactBitArray.fromPartial(object.bitarray)
            : undefined;
        message.modeInfos = object.modeInfos?.map((e) => ModeInfo.fromPartial(e)) || [];
        return message;
    },
};
function createBaseFee() {
    return { amount: [], gasLimit: 0, payer: "", granter: "" };
}
export const Fee = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.gasLimit !== 0) {
            writer.uint32(16).uint64(message.gasLimit);
        }
        if (message.payer !== "") {
            writer.uint32(26).string(message.payer);
        }
        if (message.granter !== "") {
            writer.uint32(34).string(message.granter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFee();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.gasLimit = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.payer = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.granter = reader.string();
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
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
            gasLimit: isSet(object.gasLimit) ? Number(object.gasLimit) : 0,
            payer: isSet(object.payer) ? String(object.payer) : "",
            granter: isSet(object.granter) ? String(object.granter) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        if (message.gasLimit !== 0) {
            obj.gasLimit = Math.round(message.gasLimit);
        }
        if (message.payer !== "") {
            obj.payer = message.payer;
        }
        if (message.granter !== "") {
            obj.granter = message.granter;
        }
        return obj;
    },
    create(base) {
        return Fee.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseFee();
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        message.gasLimit = object.gasLimit ?? 0;
        message.payer = object.payer ?? "";
        message.granter = object.granter ?? "";
        return message;
    },
};
function createBaseTip() {
    return { amount: [], tipper: "" };
}
export const Tip = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.tipper !== "") {
            writer.uint32(18).string(message.tipper);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTip();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.tipper = reader.string();
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
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
            tipper: isSet(object.tipper) ? String(object.tipper) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        if (message.tipper !== "") {
            obj.tipper = message.tipper;
        }
        return obj;
    },
    create(base) {
        return Tip.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTip();
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        message.tipper = object.tipper ?? "";
        return message;
    },
};
function createBaseAuxSignerData() {
    return { address: "", signDoc: undefined, mode: 0, sig: new Uint8Array(0) };
}
export const AuxSignerData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.signDoc !== undefined) {
            SignDocDirectAux.encode(message.signDoc, writer.uint32(18).fork()).ldelim();
        }
        if (message.mode !== 0) {
            writer.uint32(24).int32(message.mode);
        }
        if (message.sig.length !== 0) {
            writer.uint32(34).bytes(message.sig);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAuxSignerData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.signDoc = SignDocDirectAux.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.mode = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.sig = reader.bytes();
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
            address: isSet(object.address) ? String(object.address) : "",
            signDoc: isSet(object.signDoc) ? SignDocDirectAux.fromJSON(object.signDoc) : undefined,
            mode: isSet(object.mode) ? signModeFromJSON(object.mode) : 0,
            sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.signDoc !== undefined) {
            obj.signDoc = SignDocDirectAux.toJSON(message.signDoc);
        }
        if (message.mode !== 0) {
            obj.mode = signModeToJSON(message.mode);
        }
        if (message.sig.length !== 0) {
            obj.sig = base64FromBytes(message.sig);
        }
        return obj;
    },
    create(base) {
        return AuxSignerData.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAuxSignerData();
        message.address = object.address ?? "";
        message.signDoc = (object.signDoc !== undefined && object.signDoc !== null)
            ? SignDocDirectAux.fromPartial(object.signDoc)
            : undefined;
        message.mode = object.mode ?? 0;
        message.sig = object.sig ?? new Uint8Array(0);
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
