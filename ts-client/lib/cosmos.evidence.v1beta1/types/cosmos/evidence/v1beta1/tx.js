/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export const protobufPackage = "cosmos.evidence.v1beta1";
function createBaseMsgSubmitEvidence() {
    return { submitter: "", evidence: undefined };
}
export const MsgSubmitEvidence = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.submitter !== "") {
            writer.uint32(10).string(message.submitter);
        }
        if (message.evidence !== undefined) {
            Any.encode(message.evidence, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitEvidence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.submitter = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.evidence = Any.decode(reader, reader.uint32());
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
            submitter: isSet(object.submitter) ? String(object.submitter) : "",
            evidence: isSet(object.evidence) ? Any.fromJSON(object.evidence) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.submitter !== "") {
            obj.submitter = message.submitter;
        }
        if (message.evidence !== undefined) {
            obj.evidence = Any.toJSON(message.evidence);
        }
        return obj;
    },
    create(base) {
        return MsgSubmitEvidence.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitEvidence();
        message.submitter = object.submitter ?? "";
        message.evidence = (object.evidence !== undefined && object.evidence !== null)
            ? Any.fromPartial(object.evidence)
            : undefined;
        return message;
    },
};
function createBaseMsgSubmitEvidenceResponse() {
    return { hash: new Uint8Array(0) };
}
export const MsgSubmitEvidenceResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(34).bytes(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitEvidenceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 4:
                    if (tag !== 34) {
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
        return MsgSubmitEvidenceResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitEvidenceResponse();
        message.hash = object.hash ?? new Uint8Array(0);
        return message;
    },
};
export const MsgServiceName = "cosmos.evidence.v1beta1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.SubmitEvidence = this.SubmitEvidence.bind(this);
    }
    SubmitEvidence(request) {
        const data = MsgSubmitEvidence.encode(request).finish();
        const promise = this.rpc.request(this.service, "SubmitEvidence", data);
        return promise.then((data) => MsgSubmitEvidenceResponse.decode(_m0.Reader.create(data)));
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
function isSet(value) {
    return value !== null && value !== undefined;
}
