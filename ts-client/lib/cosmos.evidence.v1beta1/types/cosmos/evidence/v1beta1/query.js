/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
export const protobufPackage = "cosmos.evidence.v1beta1";
function createBaseQueryEvidenceRequest() {
    return { evidenceHash: new Uint8Array(0), hash: "" };
}
export const QueryEvidenceRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.evidenceHash.length !== 0) {
            writer.uint32(10).bytes(message.evidenceHash);
        }
        if (message.hash !== "") {
            writer.uint32(18).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEvidenceRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.evidenceHash = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.hash = reader.string();
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
            evidenceHash: isSet(object.evidenceHash) ? bytesFromBase64(object.evidenceHash) : new Uint8Array(0),
            hash: isSet(object.hash) ? String(object.hash) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.evidenceHash.length !== 0) {
            obj.evidenceHash = base64FromBytes(message.evidenceHash);
        }
        if (message.hash !== "") {
            obj.hash = message.hash;
        }
        return obj;
    },
    create(base) {
        return QueryEvidenceRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryEvidenceRequest();
        message.evidenceHash = object.evidenceHash ?? new Uint8Array(0);
        message.hash = object.hash ?? "";
        return message;
    },
};
function createBaseQueryEvidenceResponse() {
    return { evidence: undefined };
}
export const QueryEvidenceResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.evidence !== undefined) {
            Any.encode(message.evidence, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEvidenceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { evidence: isSet(object.evidence) ? Any.fromJSON(object.evidence) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.evidence !== undefined) {
            obj.evidence = Any.toJSON(message.evidence);
        }
        return obj;
    },
    create(base) {
        return QueryEvidenceResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryEvidenceResponse();
        message.evidence = (object.evidence !== undefined && object.evidence !== null)
            ? Any.fromPartial(object.evidence)
            : undefined;
        return message;
    },
};
function createBaseQueryAllEvidenceRequest() {
    return { pagination: undefined };
}
export const QueryAllEvidenceRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllEvidenceRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryAllEvidenceRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAllEvidenceRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryAllEvidenceResponse() {
    return { evidence: [], pagination: undefined };
}
export const QueryAllEvidenceResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.evidence) {
            Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAllEvidenceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.evidence.push(Any.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            evidence: Array.isArray(object?.evidence) ? object.evidence.map((e) => Any.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.evidence?.length) {
            obj.evidence = message.evidence.map((e) => Any.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryAllEvidenceResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryAllEvidenceResponse();
        message.evidence = object.evidence?.map((e) => Any.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
export const QueryServiceName = "cosmos.evidence.v1beta1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.Evidence = this.Evidence.bind(this);
        this.AllEvidence = this.AllEvidence.bind(this);
    }
    Evidence(request) {
        const data = QueryEvidenceRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Evidence", data);
        return promise.then((data) => QueryEvidenceResponse.decode(_m0.Reader.create(data)));
    }
    AllEvidence(request) {
        const data = QueryAllEvidenceRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "AllEvidence", data);
        return promise.then((data) => QueryAllEvidenceResponse.decode(_m0.Reader.create(data)));
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
