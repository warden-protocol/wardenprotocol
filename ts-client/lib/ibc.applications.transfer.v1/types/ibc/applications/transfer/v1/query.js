/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { DenomTrace, Params } from "./transfer";
export const protobufPackage = "ibc.applications.transfer.v1";
function createBaseQueryDenomTraceRequest() {
    return { hash: "" };
}
export const QueryDenomTraceRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomTraceRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { hash: isSet(object.hash) ? String(object.hash) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.hash !== "") {
            obj.hash = message.hash;
        }
        return obj;
    },
    create(base) {
        return QueryDenomTraceRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDenomTraceRequest();
        message.hash = object.hash ?? "";
        return message;
    },
};
function createBaseQueryDenomTraceResponse() {
    return { denomTrace: undefined };
}
export const QueryDenomTraceResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.denomTrace !== undefined) {
            DenomTrace.encode(message.denomTrace, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomTraceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.denomTrace = DenomTrace.decode(reader, reader.uint32());
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
        return { denomTrace: isSet(object.denomTrace) ? DenomTrace.fromJSON(object.denomTrace) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.denomTrace !== undefined) {
            obj.denomTrace = DenomTrace.toJSON(message.denomTrace);
        }
        return obj;
    },
    create(base) {
        return QueryDenomTraceResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDenomTraceResponse();
        message.denomTrace = (object.denomTrace !== undefined && object.denomTrace !== null)
            ? DenomTrace.fromPartial(object.denomTrace)
            : undefined;
        return message;
    },
};
function createBaseQueryDenomTracesRequest() {
    return { pagination: undefined };
}
export const QueryDenomTracesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomTracesRequest();
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
        return QueryDenomTracesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDenomTracesRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryDenomTracesResponse() {
    return { denomTraces: [], pagination: undefined };
}
export const QueryDenomTracesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.denomTraces) {
            DenomTrace.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomTracesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.denomTraces.push(DenomTrace.decode(reader, reader.uint32()));
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
            denomTraces: Array.isArray(object?.denomTraces) ? object.denomTraces.map((e) => DenomTrace.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.denomTraces?.length) {
            obj.denomTraces = message.denomTraces.map((e) => DenomTrace.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryDenomTracesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDenomTracesResponse();
        message.denomTraces = object.denomTraces?.map((e) => DenomTrace.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
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
        return QueryParamsRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryParamsRequest();
        return message;
    },
};
function createBaseQueryParamsResponse() {
    return { params: undefined };
}
export const QueryParamsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return QueryParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseQueryDenomHashRequest() {
    return { trace: "" };
}
export const QueryDenomHashRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.trace !== "") {
            writer.uint32(10).string(message.trace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomHashRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.trace = reader.string();
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
        return { trace: isSet(object.trace) ? String(object.trace) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.trace !== "") {
            obj.trace = message.trace;
        }
        return obj;
    },
    create(base) {
        return QueryDenomHashRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDenomHashRequest();
        message.trace = object.trace ?? "";
        return message;
    },
};
function createBaseQueryDenomHashResponse() {
    return { hash: "" };
}
export const QueryDenomHashResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDenomHashResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { hash: isSet(object.hash) ? String(object.hash) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.hash !== "") {
            obj.hash = message.hash;
        }
        return obj;
    },
    create(base) {
        return QueryDenomHashResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDenomHashResponse();
        message.hash = object.hash ?? "";
        return message;
    },
};
function createBaseQueryEscrowAddressRequest() {
    return { portId: "", channelId: "" };
}
export const QueryEscrowAddressRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEscrowAddressRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        return obj;
    },
    create(base) {
        return QueryEscrowAddressRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryEscrowAddressRequest();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        return message;
    },
};
function createBaseQueryEscrowAddressResponse() {
    return { escrowAddress: "" };
}
export const QueryEscrowAddressResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.escrowAddress !== "") {
            writer.uint32(10).string(message.escrowAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryEscrowAddressResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.escrowAddress = reader.string();
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
        return { escrowAddress: isSet(object.escrowAddress) ? String(object.escrowAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.escrowAddress !== "") {
            obj.escrowAddress = message.escrowAddress;
        }
        return obj;
    },
    create(base) {
        return QueryEscrowAddressResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryEscrowAddressResponse();
        message.escrowAddress = object.escrowAddress ?? "";
        return message;
    },
};
function createBaseQueryTotalEscrowForDenomRequest() {
    return { denom: "" };
}
export const QueryTotalEscrowForDenomRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalEscrowForDenomRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.denom = reader.string();
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
        return { denom: isSet(object.denom) ? String(object.denom) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.denom !== "") {
            obj.denom = message.denom;
        }
        return obj;
    },
    create(base) {
        return QueryTotalEscrowForDenomRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTotalEscrowForDenomRequest();
        message.denom = object.denom ?? "";
        return message;
    },
};
function createBaseQueryTotalEscrowForDenomResponse() {
    return { amount: undefined };
}
export const QueryTotalEscrowForDenomResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalEscrowForDenomResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.amount = Coin.decode(reader, reader.uint32());
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
        return { amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.amount !== undefined) {
            obj.amount = Coin.toJSON(message.amount);
        }
        return obj;
    },
    create(base) {
        return QueryTotalEscrowForDenomResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTotalEscrowForDenomResponse();
        message.amount = (object.amount !== undefined && object.amount !== null)
            ? Coin.fromPartial(object.amount)
            : undefined;
        return message;
    },
};
export const QueryServiceName = "ibc.applications.transfer.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.DenomTraces = this.DenomTraces.bind(this);
        this.DenomTrace = this.DenomTrace.bind(this);
        this.Params = this.Params.bind(this);
        this.DenomHash = this.DenomHash.bind(this);
        this.EscrowAddress = this.EscrowAddress.bind(this);
        this.TotalEscrowForDenom = this.TotalEscrowForDenom.bind(this);
    }
    DenomTraces(request) {
        const data = QueryDenomTracesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DenomTraces", data);
        return promise.then((data) => QueryDenomTracesResponse.decode(_m0.Reader.create(data)));
    }
    DenomTrace(request) {
        const data = QueryDenomTraceRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DenomTrace", data);
        return promise.then((data) => QueryDenomTraceResponse.decode(_m0.Reader.create(data)));
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
    }
    DenomHash(request) {
        const data = QueryDenomHashRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DenomHash", data);
        return promise.then((data) => QueryDenomHashResponse.decode(_m0.Reader.create(data)));
    }
    EscrowAddress(request) {
        const data = QueryEscrowAddressRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "EscrowAddress", data);
        return promise.then((data) => QueryEscrowAddressResponse.decode(_m0.Reader.create(data)));
    }
    TotalEscrowForDenom(request) {
        const data = QueryTotalEscrowForDenomRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TotalEscrowForDenom", data);
        return promise.then((data) => QueryTotalEscrowForDenomResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
