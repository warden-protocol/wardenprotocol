/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Block } from "../../../tendermint/types/block";
import { BlockID } from "../../../tendermint/types/types";
import { GasInfo, Result, TxResponse } from "../../base/abci/v1beta1/abci";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Tx } from "./tx";
export const protobufPackage = "cosmos.tx.v1beta1";
/** OrderBy defines the sorting order */
export var OrderBy;
(function (OrderBy) {
    /**
     * ORDER_BY_UNSPECIFIED - ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults
     * to ASC in this case.
     */
    OrderBy[OrderBy["ORDER_BY_UNSPECIFIED"] = 0] = "ORDER_BY_UNSPECIFIED";
    /** ORDER_BY_ASC - ORDER_BY_ASC defines ascending order */
    OrderBy[OrderBy["ORDER_BY_ASC"] = 1] = "ORDER_BY_ASC";
    /** ORDER_BY_DESC - ORDER_BY_DESC defines descending order */
    OrderBy[OrderBy["ORDER_BY_DESC"] = 2] = "ORDER_BY_DESC";
    OrderBy[OrderBy["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderBy || (OrderBy = {}));
export function orderByFromJSON(object) {
    switch (object) {
        case 0:
        case "ORDER_BY_UNSPECIFIED":
            return OrderBy.ORDER_BY_UNSPECIFIED;
        case 1:
        case "ORDER_BY_ASC":
            return OrderBy.ORDER_BY_ASC;
        case 2:
        case "ORDER_BY_DESC":
            return OrderBy.ORDER_BY_DESC;
        case -1:
        case "UNRECOGNIZED":
        default:
            return OrderBy.UNRECOGNIZED;
    }
}
export function orderByToJSON(object) {
    switch (object) {
        case OrderBy.ORDER_BY_UNSPECIFIED:
            return "ORDER_BY_UNSPECIFIED";
        case OrderBy.ORDER_BY_ASC:
            return "ORDER_BY_ASC";
        case OrderBy.ORDER_BY_DESC:
            return "ORDER_BY_DESC";
        case OrderBy.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/**
 * BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC
 * method.
 */
export var BroadcastMode;
(function (BroadcastMode) {
    /** BROADCAST_MODE_UNSPECIFIED - zero-value for mode ordering */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_UNSPECIFIED"] = 0] = "BROADCAST_MODE_UNSPECIFIED";
    /**
     * BROADCAST_MODE_BLOCK - DEPRECATED: use BROADCAST_MODE_SYNC instead,
     * BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.
     *
     * @deprecated
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_BLOCK"] = 1] = "BROADCAST_MODE_BLOCK";
    /**
     * BROADCAST_MODE_SYNC - BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits
     * for a CheckTx execution response only.
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_SYNC"] = 2] = "BROADCAST_MODE_SYNC";
    /**
     * BROADCAST_MODE_ASYNC - BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client
     * returns immediately.
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_ASYNC"] = 3] = "BROADCAST_MODE_ASYNC";
    BroadcastMode[BroadcastMode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(BroadcastMode || (BroadcastMode = {}));
export function broadcastModeFromJSON(object) {
    switch (object) {
        case 0:
        case "BROADCAST_MODE_UNSPECIFIED":
            return BroadcastMode.BROADCAST_MODE_UNSPECIFIED;
        case 1:
        case "BROADCAST_MODE_BLOCK":
            return BroadcastMode.BROADCAST_MODE_BLOCK;
        case 2:
        case "BROADCAST_MODE_SYNC":
            return BroadcastMode.BROADCAST_MODE_SYNC;
        case 3:
        case "BROADCAST_MODE_ASYNC":
            return BroadcastMode.BROADCAST_MODE_ASYNC;
        case -1:
        case "UNRECOGNIZED":
        default:
            return BroadcastMode.UNRECOGNIZED;
    }
}
export function broadcastModeToJSON(object) {
    switch (object) {
        case BroadcastMode.BROADCAST_MODE_UNSPECIFIED:
            return "BROADCAST_MODE_UNSPECIFIED";
        case BroadcastMode.BROADCAST_MODE_BLOCK:
            return "BROADCAST_MODE_BLOCK";
        case BroadcastMode.BROADCAST_MODE_SYNC:
            return "BROADCAST_MODE_SYNC";
        case BroadcastMode.BROADCAST_MODE_ASYNC:
            return "BROADCAST_MODE_ASYNC";
        case BroadcastMode.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseGetTxsEventRequest() {
    return { events: [], pagination: undefined, orderBy: 0, page: 0, limit: 0, query: "" };
}
export const GetTxsEventRequest = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.events) {
            writer.uint32(10).string(v);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.orderBy !== 0) {
            writer.uint32(24).int32(message.orderBy);
        }
        if (message.page !== 0) {
            writer.uint32(32).uint64(message.page);
        }
        if (message.limit !== 0) {
            writer.uint32(40).uint64(message.limit);
        }
        if (message.query !== "") {
            writer.uint32(50).string(message.query);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxsEventRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.events.push(reader.string());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.orderBy = reader.int32();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.page = longToNumber(reader.uint64());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.limit = longToNumber(reader.uint64());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.query = reader.string();
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
            events: Array.isArray(object?.events) ? object.events.map((e) => String(e)) : [],
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
            orderBy: isSet(object.orderBy) ? orderByFromJSON(object.orderBy) : 0,
            page: isSet(object.page) ? Number(object.page) : 0,
            limit: isSet(object.limit) ? Number(object.limit) : 0,
            query: isSet(object.query) ? String(object.query) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.events?.length) {
            obj.events = message.events;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.orderBy !== 0) {
            obj.orderBy = orderByToJSON(message.orderBy);
        }
        if (message.page !== 0) {
            obj.page = Math.round(message.page);
        }
        if (message.limit !== 0) {
            obj.limit = Math.round(message.limit);
        }
        if (message.query !== "") {
            obj.query = message.query;
        }
        return obj;
    },
    create(base) {
        return GetTxsEventRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGetTxsEventRequest();
        message.events = object.events?.map((e) => e) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.orderBy = object.orderBy ?? 0;
        message.page = object.page ?? 0;
        message.limit = object.limit ?? 0;
        message.query = object.query ?? "";
        return message;
    },
};
function createBaseGetTxsEventResponse() {
    return { txs: [], txResponses: [], pagination: undefined, total: 0 };
}
export const GetTxsEventResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.txs) {
            Tx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.txResponses) {
            TxResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        if (message.total !== 0) {
            writer.uint32(32).uint64(message.total);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxsEventResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txs.push(Tx.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.txResponses.push(TxResponse.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.total = longToNumber(reader.uint64());
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
            txs: Array.isArray(object?.txs) ? object.txs.map((e) => Tx.fromJSON(e)) : [],
            txResponses: Array.isArray(object?.txResponses) ? object.txResponses.map((e) => TxResponse.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
            total: isSet(object.total) ? Number(object.total) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.txs?.length) {
            obj.txs = message.txs.map((e) => Tx.toJSON(e));
        }
        if (message.txResponses?.length) {
            obj.txResponses = message.txResponses.map((e) => TxResponse.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.total !== 0) {
            obj.total = Math.round(message.total);
        }
        return obj;
    },
    create(base) {
        return GetTxsEventResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGetTxsEventResponse();
        message.txs = object.txs?.map((e) => Tx.fromPartial(e)) || [];
        message.txResponses = object.txResponses?.map((e) => TxResponse.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.total = object.total ?? 0;
        return message;
    },
};
function createBaseBroadcastTxRequest() {
    return { txBytes: new Uint8Array(0), mode: 0 };
}
export const BroadcastTxRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        if (message.mode !== 0) {
            writer.uint32(16).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBroadcastTxRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txBytes = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 16) {
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
        return {
            txBytes: isSet(object.txBytes) ? bytesFromBase64(object.txBytes) : new Uint8Array(0),
            mode: isSet(object.mode) ? broadcastModeFromJSON(object.mode) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.txBytes.length !== 0) {
            obj.txBytes = base64FromBytes(message.txBytes);
        }
        if (message.mode !== 0) {
            obj.mode = broadcastModeToJSON(message.mode);
        }
        return obj;
    },
    create(base) {
        return BroadcastTxRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBroadcastTxRequest();
        message.txBytes = object.txBytes ?? new Uint8Array(0);
        message.mode = object.mode ?? 0;
        return message;
    },
};
function createBaseBroadcastTxResponse() {
    return { txResponse: undefined };
}
export const BroadcastTxResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.txResponse !== undefined) {
            TxResponse.encode(message.txResponse, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBroadcastTxResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txResponse = TxResponse.decode(reader, reader.uint32());
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
        return { txResponse: isSet(object.txResponse) ? TxResponse.fromJSON(object.txResponse) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.txResponse !== undefined) {
            obj.txResponse = TxResponse.toJSON(message.txResponse);
        }
        return obj;
    },
    create(base) {
        return BroadcastTxResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBroadcastTxResponse();
        message.txResponse = (object.txResponse !== undefined && object.txResponse !== null)
            ? TxResponse.fromPartial(object.txResponse)
            : undefined;
        return message;
    },
};
function createBaseSimulateRequest() {
    return { tx: undefined, txBytes: new Uint8Array(0) };
}
export const SimulateRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tx !== undefined) {
            Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        if (message.txBytes.length !== 0) {
            writer.uint32(18).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSimulateRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.tx = Tx.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.txBytes = reader.bytes();
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
            tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined,
            txBytes: isSet(object.txBytes) ? bytesFromBase64(object.txBytes) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.tx !== undefined) {
            obj.tx = Tx.toJSON(message.tx);
        }
        if (message.txBytes.length !== 0) {
            obj.txBytes = base64FromBytes(message.txBytes);
        }
        return obj;
    },
    create(base) {
        return SimulateRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSimulateRequest();
        message.tx = (object.tx !== undefined && object.tx !== null) ? Tx.fromPartial(object.tx) : undefined;
        message.txBytes = object.txBytes ?? new Uint8Array(0);
        return message;
    },
};
function createBaseSimulateResponse() {
    return { gasInfo: undefined, result: undefined };
}
export const SimulateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.gasInfo !== undefined) {
            GasInfo.encode(message.gasInfo, writer.uint32(10).fork()).ldelim();
        }
        if (message.result !== undefined) {
            Result.encode(message.result, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSimulateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.gasInfo = GasInfo.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.result = Result.decode(reader, reader.uint32());
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
            gasInfo: isSet(object.gasInfo) ? GasInfo.fromJSON(object.gasInfo) : undefined,
            result: isSet(object.result) ? Result.fromJSON(object.result) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.gasInfo !== undefined) {
            obj.gasInfo = GasInfo.toJSON(message.gasInfo);
        }
        if (message.result !== undefined) {
            obj.result = Result.toJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return SimulateResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSimulateResponse();
        message.gasInfo = (object.gasInfo !== undefined && object.gasInfo !== null)
            ? GasInfo.fromPartial(object.gasInfo)
            : undefined;
        message.result = (object.result !== undefined && object.result !== null)
            ? Result.fromPartial(object.result)
            : undefined;
        return message;
    },
};
function createBaseGetTxRequest() {
    return { hash: "" };
}
export const GetTxRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxRequest();
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
        return GetTxRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGetTxRequest();
        message.hash = object.hash ?? "";
        return message;
    },
};
function createBaseGetTxResponse() {
    return { tx: undefined, txResponse: undefined };
}
export const GetTxResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tx !== undefined) {
            Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        if (message.txResponse !== undefined) {
            TxResponse.encode(message.txResponse, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetTxResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.tx = Tx.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.txResponse = TxResponse.decode(reader, reader.uint32());
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
            tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined,
            txResponse: isSet(object.txResponse) ? TxResponse.fromJSON(object.txResponse) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.tx !== undefined) {
            obj.tx = Tx.toJSON(message.tx);
        }
        if (message.txResponse !== undefined) {
            obj.txResponse = TxResponse.toJSON(message.txResponse);
        }
        return obj;
    },
    create(base) {
        return GetTxResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGetTxResponse();
        message.tx = (object.tx !== undefined && object.tx !== null) ? Tx.fromPartial(object.tx) : undefined;
        message.txResponse = (object.txResponse !== undefined && object.txResponse !== null)
            ? TxResponse.fromPartial(object.txResponse)
            : undefined;
        return message;
    },
};
function createBaseGetBlockWithTxsRequest() {
    return { height: 0, pagination: undefined };
}
export const GetBlockWithTxsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.height !== 0) {
            writer.uint32(8).int64(message.height);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetBlockWithTxsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.height = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 18) {
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
        return {
            height: isSet(object.height) ? Number(object.height) : 0,
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== 0) {
            obj.height = Math.round(message.height);
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return GetBlockWithTxsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGetBlockWithTxsRequest();
        message.height = object.height ?? 0;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseGetBlockWithTxsResponse() {
    return { txs: [], blockId: undefined, block: undefined, pagination: undefined };
}
export const GetBlockWithTxsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.txs) {
            Tx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.blockId !== undefined) {
            BlockID.encode(message.blockId, writer.uint32(18).fork()).ldelim();
        }
        if (message.block !== undefined) {
            Block.encode(message.block, writer.uint32(26).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetBlockWithTxsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txs.push(Tx.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.blockId = BlockID.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.block = Block.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
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
            txs: Array.isArray(object?.txs) ? object.txs.map((e) => Tx.fromJSON(e)) : [],
            blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
            block: isSet(object.block) ? Block.fromJSON(object.block) : undefined,
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.txs?.length) {
            obj.txs = message.txs.map((e) => Tx.toJSON(e));
        }
        if (message.blockId !== undefined) {
            obj.blockId = BlockID.toJSON(message.blockId);
        }
        if (message.block !== undefined) {
            obj.block = Block.toJSON(message.block);
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return GetBlockWithTxsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGetBlockWithTxsResponse();
        message.txs = object.txs?.map((e) => Tx.fromPartial(e)) || [];
        message.blockId = (object.blockId !== undefined && object.blockId !== null)
            ? BlockID.fromPartial(object.blockId)
            : undefined;
        message.block = (object.block !== undefined && object.block !== null) ? Block.fromPartial(object.block) : undefined;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseTxDecodeRequest() {
    return { txBytes: new Uint8Array(0) };
}
export const TxDecodeRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txBytes = reader.bytes();
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
        return { txBytes: isSet(object.txBytes) ? bytesFromBase64(object.txBytes) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.txBytes.length !== 0) {
            obj.txBytes = base64FromBytes(message.txBytes);
        }
        return obj;
    },
    create(base) {
        return TxDecodeRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxDecodeRequest();
        message.txBytes = object.txBytes ?? new Uint8Array(0);
        return message;
    },
};
function createBaseTxDecodeResponse() {
    return { tx: undefined };
}
export const TxDecodeResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tx !== undefined) {
            Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.tx = Tx.decode(reader, reader.uint32());
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
        return { tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.tx !== undefined) {
            obj.tx = Tx.toJSON(message.tx);
        }
        return obj;
    },
    create(base) {
        return TxDecodeResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxDecodeResponse();
        message.tx = (object.tx !== undefined && object.tx !== null) ? Tx.fromPartial(object.tx) : undefined;
        return message;
    },
};
function createBaseTxEncodeRequest() {
    return { tx: undefined };
}
export const TxEncodeRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tx !== undefined) {
            Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.tx = Tx.decode(reader, reader.uint32());
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
        return { tx: isSet(object.tx) ? Tx.fromJSON(object.tx) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.tx !== undefined) {
            obj.tx = Tx.toJSON(message.tx);
        }
        return obj;
    },
    create(base) {
        return TxEncodeRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxEncodeRequest();
        message.tx = (object.tx !== undefined && object.tx !== null) ? Tx.fromPartial(object.tx) : undefined;
        return message;
    },
};
function createBaseTxEncodeResponse() {
    return { txBytes: new Uint8Array(0) };
}
export const TxEncodeResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txBytes = reader.bytes();
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
        return { txBytes: isSet(object.txBytes) ? bytesFromBase64(object.txBytes) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.txBytes.length !== 0) {
            obj.txBytes = base64FromBytes(message.txBytes);
        }
        return obj;
    },
    create(base) {
        return TxEncodeResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxEncodeResponse();
        message.txBytes = object.txBytes ?? new Uint8Array(0);
        return message;
    },
};
function createBaseTxEncodeAminoRequest() {
    return { aminoJson: "" };
}
export const TxEncodeAminoRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.aminoJson !== "") {
            writer.uint32(10).string(message.aminoJson);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeAminoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.aminoJson = reader.string();
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
        return { aminoJson: isSet(object.aminoJson) ? String(object.aminoJson) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.aminoJson !== "") {
            obj.aminoJson = message.aminoJson;
        }
        return obj;
    },
    create(base) {
        return TxEncodeAminoRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxEncodeAminoRequest();
        message.aminoJson = object.aminoJson ?? "";
        return message;
    },
};
function createBaseTxEncodeAminoResponse() {
    return { aminoBinary: new Uint8Array(0) };
}
export const TxEncodeAminoResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.aminoBinary.length !== 0) {
            writer.uint32(10).bytes(message.aminoBinary);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxEncodeAminoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.aminoBinary = reader.bytes();
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
        return { aminoBinary: isSet(object.aminoBinary) ? bytesFromBase64(object.aminoBinary) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.aminoBinary.length !== 0) {
            obj.aminoBinary = base64FromBytes(message.aminoBinary);
        }
        return obj;
    },
    create(base) {
        return TxEncodeAminoResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxEncodeAminoResponse();
        message.aminoBinary = object.aminoBinary ?? new Uint8Array(0);
        return message;
    },
};
function createBaseTxDecodeAminoRequest() {
    return { aminoBinary: new Uint8Array(0) };
}
export const TxDecodeAminoRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.aminoBinary.length !== 0) {
            writer.uint32(10).bytes(message.aminoBinary);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeAminoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.aminoBinary = reader.bytes();
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
        return { aminoBinary: isSet(object.aminoBinary) ? bytesFromBase64(object.aminoBinary) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.aminoBinary.length !== 0) {
            obj.aminoBinary = base64FromBytes(message.aminoBinary);
        }
        return obj;
    },
    create(base) {
        return TxDecodeAminoRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxDecodeAminoRequest();
        message.aminoBinary = object.aminoBinary ?? new Uint8Array(0);
        return message;
    },
};
function createBaseTxDecodeAminoResponse() {
    return { aminoJson: "" };
}
export const TxDecodeAminoResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.aminoJson !== "") {
            writer.uint32(10).string(message.aminoJson);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxDecodeAminoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.aminoJson = reader.string();
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
        return { aminoJson: isSet(object.aminoJson) ? String(object.aminoJson) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.aminoJson !== "") {
            obj.aminoJson = message.aminoJson;
        }
        return obj;
    },
    create(base) {
        return TxDecodeAminoResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxDecodeAminoResponse();
        message.aminoJson = object.aminoJson ?? "";
        return message;
    },
};
export const ServiceServiceName = "cosmos.tx.v1beta1.Service";
export class ServiceClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || ServiceServiceName;
        this.rpc = rpc;
        this.Simulate = this.Simulate.bind(this);
        this.GetTx = this.GetTx.bind(this);
        this.BroadcastTx = this.BroadcastTx.bind(this);
        this.GetTxsEvent = this.GetTxsEvent.bind(this);
        this.GetBlockWithTxs = this.GetBlockWithTxs.bind(this);
        this.TxDecode = this.TxDecode.bind(this);
        this.TxEncode = this.TxEncode.bind(this);
        this.TxEncodeAmino = this.TxEncodeAmino.bind(this);
        this.TxDecodeAmino = this.TxDecodeAmino.bind(this);
    }
    Simulate(request) {
        const data = SimulateRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Simulate", data);
        return promise.then((data) => SimulateResponse.decode(_m0.Reader.create(data)));
    }
    GetTx(request) {
        const data = GetTxRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GetTx", data);
        return promise.then((data) => GetTxResponse.decode(_m0.Reader.create(data)));
    }
    BroadcastTx(request) {
        const data = BroadcastTxRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "BroadcastTx", data);
        return promise.then((data) => BroadcastTxResponse.decode(_m0.Reader.create(data)));
    }
    GetTxsEvent(request) {
        const data = GetTxsEventRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GetTxsEvent", data);
        return promise.then((data) => GetTxsEventResponse.decode(_m0.Reader.create(data)));
    }
    GetBlockWithTxs(request) {
        const data = GetBlockWithTxsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GetBlockWithTxs", data);
        return promise.then((data) => GetBlockWithTxsResponse.decode(_m0.Reader.create(data)));
    }
    TxDecode(request) {
        const data = TxDecodeRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TxDecode", data);
        return promise.then((data) => TxDecodeResponse.decode(_m0.Reader.create(data)));
    }
    TxEncode(request) {
        const data = TxEncodeRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TxEncode", data);
        return promise.then((data) => TxEncodeResponse.decode(_m0.Reader.create(data)));
    }
    TxEncodeAmino(request) {
        const data = TxEncodeAminoRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TxEncodeAmino", data);
        return promise.then((data) => TxEncodeAminoResponse.decode(_m0.Reader.create(data)));
    }
    TxDecodeAmino(request) {
        const data = TxDecodeAminoRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TxDecodeAmino", data);
        return promise.then((data) => TxDecodeAminoResponse.decode(_m0.Reader.create(data)));
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
