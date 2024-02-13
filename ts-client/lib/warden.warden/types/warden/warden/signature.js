/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { keyTypeFromJSON, keyTypeToJSON } from "./key";
import { walletTypeFromJSON, walletTypeToJSON } from "./wallet";
export const protobufPackage = "warden.warden";
/**
 * SignRequestStatus indicates the status of a signature request.
 * A request starts as "pending", waiting to be picked up. Then it can move to
 * either "approved" or "rejected", depending on the decision of the keychain.
 */
export var SignRequestStatus;
(function (SignRequestStatus) {
    /** SIGN_REQUEST_STATUS_UNSPECIFIED - The request is missing the status field. */
    SignRequestStatus[SignRequestStatus["SIGN_REQUEST_STATUS_UNSPECIFIED"] = 0] = "SIGN_REQUEST_STATUS_UNSPECIFIED";
    /**
     * SIGN_REQUEST_STATUS_PENDING - The request is waiting to be fulfilled. This is the initial state of a
     * request.
     */
    SignRequestStatus[SignRequestStatus["SIGN_REQUEST_STATUS_PENDING"] = 1] = "SIGN_REQUEST_STATUS_PENDING";
    /** SIGN_REQUEST_STATUS_FULFILLED - The request was fulfilled. This is a final state for a request. */
    SignRequestStatus[SignRequestStatus["SIGN_REQUEST_STATUS_FULFILLED"] = 2] = "SIGN_REQUEST_STATUS_FULFILLED";
    /** SIGN_REQUEST_STATUS_REJECTED - The request was rejected. This is a final state for a request. */
    SignRequestStatus[SignRequestStatus["SIGN_REQUEST_STATUS_REJECTED"] = 3] = "SIGN_REQUEST_STATUS_REJECTED";
    SignRequestStatus[SignRequestStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SignRequestStatus || (SignRequestStatus = {}));
export function signRequestStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "SIGN_REQUEST_STATUS_UNSPECIFIED":
            return SignRequestStatus.SIGN_REQUEST_STATUS_UNSPECIFIED;
        case 1:
        case "SIGN_REQUEST_STATUS_PENDING":
            return SignRequestStatus.SIGN_REQUEST_STATUS_PENDING;
        case 2:
        case "SIGN_REQUEST_STATUS_FULFILLED":
            return SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED;
        case 3:
        case "SIGN_REQUEST_STATUS_REJECTED":
            return SignRequestStatus.SIGN_REQUEST_STATUS_REJECTED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return SignRequestStatus.UNRECOGNIZED;
    }
}
export function signRequestStatusToJSON(object) {
    switch (object) {
        case SignRequestStatus.SIGN_REQUEST_STATUS_UNSPECIFIED:
            return "SIGN_REQUEST_STATUS_UNSPECIFIED";
        case SignRequestStatus.SIGN_REQUEST_STATUS_PENDING:
            return "SIGN_REQUEST_STATUS_PENDING";
        case SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED:
            return "SIGN_REQUEST_STATUS_FULFILLED";
        case SignRequestStatus.SIGN_REQUEST_STATUS_REJECTED:
            return "SIGN_REQUEST_STATUS_REJECTED";
        case SignRequestStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseSignRequest() {
    return {
        id: 0,
        creator: "",
        keyId: 0,
        dataForSigning: new Uint8Array(0),
        status: 0,
        keyType: 0,
        signedData: undefined,
        rejectReason: undefined,
    };
}
export const SignRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.creator !== "") {
            writer.uint32(18).string(message.creator);
        }
        if (message.keyId !== 0) {
            writer.uint32(24).uint64(message.keyId);
        }
        if (message.dataForSigning.length !== 0) {
            writer.uint32(34).bytes(message.dataForSigning);
        }
        if (message.status !== 0) {
            writer.uint32(40).int32(message.status);
        }
        if (message.keyType !== 0) {
            writer.uint32(64).int32(message.keyType);
        }
        if (message.signedData !== undefined) {
            writer.uint32(50).bytes(message.signedData);
        }
        if (message.rejectReason !== undefined) {
            writer.uint32(58).string(message.rejectReason);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.keyId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.dataForSigning = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.keyType = reader.int32();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.signedData = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.rejectReason = reader.string();
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
            id: isSet(object.id) ? Number(object.id) : 0,
            creator: isSet(object.creator) ? String(object.creator) : "",
            keyId: isSet(object.keyId) ? Number(object.keyId) : 0,
            dataForSigning: isSet(object.dataForSigning) ? bytesFromBase64(object.dataForSigning) : new Uint8Array(0),
            status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : 0,
            keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
            signedData: isSet(object.signedData) ? bytesFromBase64(object.signedData) : undefined,
            rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.keyId !== 0) {
            obj.keyId = Math.round(message.keyId);
        }
        if (message.dataForSigning.length !== 0) {
            obj.dataForSigning = base64FromBytes(message.dataForSigning);
        }
        if (message.status !== 0) {
            obj.status = signRequestStatusToJSON(message.status);
        }
        if (message.keyType !== 0) {
            obj.keyType = keyTypeToJSON(message.keyType);
        }
        if (message.signedData !== undefined) {
            obj.signedData = base64FromBytes(message.signedData);
        }
        if (message.rejectReason !== undefined) {
            obj.rejectReason = message.rejectReason;
        }
        return obj;
    },
    create(base) {
        return SignRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignRequest();
        message.id = object.id ?? 0;
        message.creator = object.creator ?? "";
        message.keyId = object.keyId ?? 0;
        message.dataForSigning = object.dataForSigning ?? new Uint8Array(0);
        message.status = object.status ?? 0;
        message.keyType = object.keyType ?? 0;
        message.signedData = object.signedData ?? undefined;
        message.rejectReason = object.rejectReason ?? undefined;
        return message;
    },
};
function createBaseSignTransactionRequest() {
    return { id: 0, creator: "", keyId: 0, walletType: 0, unsignedTransaction: new Uint8Array(0), signRequestId: 0 };
}
export const SignTransactionRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.creator !== "") {
            writer.uint32(18).string(message.creator);
        }
        if (message.keyId !== 0) {
            writer.uint32(24).uint64(message.keyId);
        }
        if (message.walletType !== 0) {
            writer.uint32(32).int32(message.walletType);
        }
        if (message.unsignedTransaction.length !== 0) {
            writer.uint32(42).bytes(message.unsignedTransaction);
        }
        if (message.signRequestId !== 0) {
            writer.uint32(48).uint64(message.signRequestId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignTransactionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.keyId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.walletType = reader.int32();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.unsignedTransaction = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.signRequestId = longToNumber(reader.uint64());
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
            id: isSet(object.id) ? Number(object.id) : 0,
            creator: isSet(object.creator) ? String(object.creator) : "",
            keyId: isSet(object.keyId) ? Number(object.keyId) : 0,
            walletType: isSet(object.walletType) ? walletTypeFromJSON(object.walletType) : 0,
            unsignedTransaction: isSet(object.unsignedTransaction)
                ? bytesFromBase64(object.unsignedTransaction)
                : new Uint8Array(0),
            signRequestId: isSet(object.signRequestId) ? Number(object.signRequestId) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.keyId !== 0) {
            obj.keyId = Math.round(message.keyId);
        }
        if (message.walletType !== 0) {
            obj.walletType = walletTypeToJSON(message.walletType);
        }
        if (message.unsignedTransaction.length !== 0) {
            obj.unsignedTransaction = base64FromBytes(message.unsignedTransaction);
        }
        if (message.signRequestId !== 0) {
            obj.signRequestId = Math.round(message.signRequestId);
        }
        return obj;
    },
    create(base) {
        return SignTransactionRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignTransactionRequest();
        message.id = object.id ?? 0;
        message.creator = object.creator ?? "";
        message.keyId = object.keyId ?? 0;
        message.walletType = object.walletType ?? 0;
        message.unsignedTransaction = object.unsignedTransaction ?? new Uint8Array(0);
        message.signRequestId = object.signRequestId ?? 0;
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
