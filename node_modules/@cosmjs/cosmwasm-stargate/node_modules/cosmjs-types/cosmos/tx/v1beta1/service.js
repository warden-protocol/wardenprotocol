"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceClientImpl = exports.GetTxResponse = exports.GetTxRequest = exports.SimulateResponse = exports.SimulateRequest = exports.BroadcastTxResponse = exports.BroadcastTxRequest = exports.GetTxsEventResponse = exports.GetTxsEventRequest = exports.broadcastModeToJSON = exports.broadcastModeFromJSON = exports.BroadcastMode = exports.orderByToJSON = exports.orderByFromJSON = exports.OrderBy = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const pagination_1 = require("../../../cosmos/base/query/v1beta1/pagination");
const abci_1 = require("../../../cosmos/base/abci/v1beta1/abci");
const tx_1 = require("../../../cosmos/tx/v1beta1/tx");
exports.protobufPackage = "cosmos.tx.v1beta1";
/** OrderBy defines the sorting order */
var OrderBy;
(function (OrderBy) {
    /** ORDER_BY_UNSPECIFIED - ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults to ASC in this case. */
    OrderBy[OrderBy["ORDER_BY_UNSPECIFIED"] = 0] = "ORDER_BY_UNSPECIFIED";
    /** ORDER_BY_ASC - ORDER_BY_ASC defines ascending order */
    OrderBy[OrderBy["ORDER_BY_ASC"] = 1] = "ORDER_BY_ASC";
    /** ORDER_BY_DESC - ORDER_BY_DESC defines descending order */
    OrderBy[OrderBy["ORDER_BY_DESC"] = 2] = "ORDER_BY_DESC";
    OrderBy[OrderBy["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(OrderBy = exports.OrderBy || (exports.OrderBy = {}));
function orderByFromJSON(object) {
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
exports.orderByFromJSON = orderByFromJSON;
function orderByToJSON(object) {
    switch (object) {
        case OrderBy.ORDER_BY_UNSPECIFIED:
            return "ORDER_BY_UNSPECIFIED";
        case OrderBy.ORDER_BY_ASC:
            return "ORDER_BY_ASC";
        case OrderBy.ORDER_BY_DESC:
            return "ORDER_BY_DESC";
        default:
            return "UNKNOWN";
    }
}
exports.orderByToJSON = orderByToJSON;
/** BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC method. */
var BroadcastMode;
(function (BroadcastMode) {
    /** BROADCAST_MODE_UNSPECIFIED - zero-value for mode ordering */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_UNSPECIFIED"] = 0] = "BROADCAST_MODE_UNSPECIFIED";
    /**
     * BROADCAST_MODE_BLOCK - BROADCAST_MODE_BLOCK defines a tx broadcasting mode where the client waits for
     * the tx to be committed in a block.
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_BLOCK"] = 1] = "BROADCAST_MODE_BLOCK";
    /**
     * BROADCAST_MODE_SYNC - BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits for
     * a CheckTx execution response only.
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_SYNC"] = 2] = "BROADCAST_MODE_SYNC";
    /**
     * BROADCAST_MODE_ASYNC - BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client returns
     * immediately.
     */
    BroadcastMode[BroadcastMode["BROADCAST_MODE_ASYNC"] = 3] = "BROADCAST_MODE_ASYNC";
    BroadcastMode[BroadcastMode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(BroadcastMode = exports.BroadcastMode || (exports.BroadcastMode = {}));
function broadcastModeFromJSON(object) {
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
exports.broadcastModeFromJSON = broadcastModeFromJSON;
function broadcastModeToJSON(object) {
    switch (object) {
        case BroadcastMode.BROADCAST_MODE_UNSPECIFIED:
            return "BROADCAST_MODE_UNSPECIFIED";
        case BroadcastMode.BROADCAST_MODE_BLOCK:
            return "BROADCAST_MODE_BLOCK";
        case BroadcastMode.BROADCAST_MODE_SYNC:
            return "BROADCAST_MODE_SYNC";
        case BroadcastMode.BROADCAST_MODE_ASYNC:
            return "BROADCAST_MODE_ASYNC";
        default:
            return "UNKNOWN";
    }
}
exports.broadcastModeToJSON = broadcastModeToJSON;
const baseGetTxsEventRequest = { events: "", orderBy: 0 };
exports.GetTxsEventRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.events) {
            writer.uint32(10).string(v);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.orderBy !== 0) {
            writer.uint32(24).int32(message.orderBy);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGetTxsEventRequest);
        message.events = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.events.push(reader.string());
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.orderBy = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseGetTxsEventRequest);
        message.events = ((_a = object.events) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        message.orderBy =
            object.orderBy !== undefined && object.orderBy !== null ? orderByFromJSON(object.orderBy) : 0;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.events) {
            obj.events = message.events.map((e) => e);
        }
        else {
            obj.events = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        message.orderBy !== undefined && (obj.orderBy = orderByToJSON(message.orderBy));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseGetTxsEventRequest);
        message.events = ((_a = object.events) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        message.orderBy = (_b = object.orderBy) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
const baseGetTxsEventResponse = {};
exports.GetTxsEventResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.txs) {
            tx_1.Tx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.txResponses) {
            abci_1.TxResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGetTxsEventResponse);
        message.txs = [];
        message.txResponses = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(tx_1.Tx.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.txResponses.push(abci_1.TxResponse.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a, _b;
        const message = Object.assign({}, baseGetTxsEventResponse);
        message.txs = ((_a = object.txs) !== null && _a !== void 0 ? _a : []).map((e) => tx_1.Tx.fromJSON(e));
        message.txResponses = ((_b = object.txResponses) !== null && _b !== void 0 ? _b : []).map((e) => abci_1.TxResponse.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map((e) => (e ? tx_1.Tx.toJSON(e) : undefined));
        }
        else {
            obj.txs = [];
        }
        if (message.txResponses) {
            obj.txResponses = message.txResponses.map((e) => (e ? abci_1.TxResponse.toJSON(e) : undefined));
        }
        else {
            obj.txResponses = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseGetTxsEventResponse);
        message.txs = ((_a = object.txs) === null || _a === void 0 ? void 0 : _a.map((e) => tx_1.Tx.fromPartial(e))) || [];
        message.txResponses = ((_b = object.txResponses) === null || _b === void 0 ? void 0 : _b.map((e) => abci_1.TxResponse.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseBroadcastTxRequest = { mode: 0 };
exports.BroadcastTxRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.txBytes.length !== 0) {
            writer.uint32(10).bytes(message.txBytes);
        }
        if (message.mode !== 0) {
            writer.uint32(16).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseBroadcastTxRequest);
        message.txBytes = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txBytes = reader.bytes();
                    break;
                case 2:
                    message.mode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseBroadcastTxRequest);
        message.txBytes =
            object.txBytes !== undefined && object.txBytes !== null
                ? bytesFromBase64(object.txBytes)
                : new Uint8Array();
        message.mode = object.mode !== undefined && object.mode !== null ? broadcastModeFromJSON(object.mode) : 0;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.txBytes !== undefined &&
            (obj.txBytes = base64FromBytes(message.txBytes !== undefined ? message.txBytes : new Uint8Array()));
        message.mode !== undefined && (obj.mode = broadcastModeToJSON(message.mode));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseBroadcastTxRequest);
        message.txBytes = (_a = object.txBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.mode = (_b = object.mode) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
const baseBroadcastTxResponse = {};
exports.BroadcastTxResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.txResponse !== undefined) {
            abci_1.TxResponse.encode(message.txResponse, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseBroadcastTxResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txResponse = abci_1.TxResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseBroadcastTxResponse);
        message.txResponse =
            object.txResponse !== undefined && object.txResponse !== null
                ? abci_1.TxResponse.fromJSON(object.txResponse)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.txResponse !== undefined &&
            (obj.txResponse = message.txResponse ? abci_1.TxResponse.toJSON(message.txResponse) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseBroadcastTxResponse);
        message.txResponse =
            object.txResponse !== undefined && object.txResponse !== null
                ? abci_1.TxResponse.fromPartial(object.txResponse)
                : undefined;
        return message;
    },
};
const baseSimulateRequest = {};
exports.SimulateRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.tx !== undefined) {
            tx_1.Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        if (message.txBytes.length !== 0) {
            writer.uint32(18).bytes(message.txBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSimulateRequest);
        message.txBytes = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = tx_1.Tx.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.txBytes = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSimulateRequest);
        message.tx = object.tx !== undefined && object.tx !== null ? tx_1.Tx.fromJSON(object.tx) : undefined;
        message.txBytes =
            object.txBytes !== undefined && object.txBytes !== null
                ? bytesFromBase64(object.txBytes)
                : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.tx !== undefined && (obj.tx = message.tx ? tx_1.Tx.toJSON(message.tx) : undefined);
        message.txBytes !== undefined &&
            (obj.txBytes = base64FromBytes(message.txBytes !== undefined ? message.txBytes : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseSimulateRequest);
        message.tx = object.tx !== undefined && object.tx !== null ? tx_1.Tx.fromPartial(object.tx) : undefined;
        message.txBytes = (_a = object.txBytes) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
const baseSimulateResponse = {};
exports.SimulateResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.gasInfo !== undefined) {
            abci_1.GasInfo.encode(message.gasInfo, writer.uint32(10).fork()).ldelim();
        }
        if (message.result !== undefined) {
            abci_1.Result.encode(message.result, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSimulateResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gasInfo = abci_1.GasInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = abci_1.Result.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSimulateResponse);
        message.gasInfo =
            object.gasInfo !== undefined && object.gasInfo !== null ? abci_1.GasInfo.fromJSON(object.gasInfo) : undefined;
        message.result =
            object.result !== undefined && object.result !== null ? abci_1.Result.fromJSON(object.result) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.gasInfo !== undefined &&
            (obj.gasInfo = message.gasInfo ? abci_1.GasInfo.toJSON(message.gasInfo) : undefined);
        message.result !== undefined && (obj.result = message.result ? abci_1.Result.toJSON(message.result) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSimulateResponse);
        message.gasInfo =
            object.gasInfo !== undefined && object.gasInfo !== null
                ? abci_1.GasInfo.fromPartial(object.gasInfo)
                : undefined;
        message.result =
            object.result !== undefined && object.result !== null ? abci_1.Result.fromPartial(object.result) : undefined;
        return message;
    },
};
const baseGetTxRequest = { hash: "" };
exports.GetTxRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGetTxRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseGetTxRequest);
        message.hash = object.hash !== undefined && object.hash !== null ? String(object.hash) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = message.hash);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseGetTxRequest);
        message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseGetTxResponse = {};
exports.GetTxResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.tx !== undefined) {
            tx_1.Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
        }
        if (message.txResponse !== undefined) {
            abci_1.TxResponse.encode(message.txResponse, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGetTxResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = tx_1.Tx.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.txResponse = abci_1.TxResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseGetTxResponse);
        message.tx = object.tx !== undefined && object.tx !== null ? tx_1.Tx.fromJSON(object.tx) : undefined;
        message.txResponse =
            object.txResponse !== undefined && object.txResponse !== null
                ? abci_1.TxResponse.fromJSON(object.txResponse)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.tx !== undefined && (obj.tx = message.tx ? tx_1.Tx.toJSON(message.tx) : undefined);
        message.txResponse !== undefined &&
            (obj.txResponse = message.txResponse ? abci_1.TxResponse.toJSON(message.txResponse) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseGetTxResponse);
        message.tx = object.tx !== undefined && object.tx !== null ? tx_1.Tx.fromPartial(object.tx) : undefined;
        message.txResponse =
            object.txResponse !== undefined && object.txResponse !== null
                ? abci_1.TxResponse.fromPartial(object.txResponse)
                : undefined;
        return message;
    },
};
class ServiceClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Simulate = this.Simulate.bind(this);
        this.GetTx = this.GetTx.bind(this);
        this.BroadcastTx = this.BroadcastTx.bind(this);
        this.GetTxsEvent = this.GetTxsEvent.bind(this);
    }
    Simulate(request) {
        const data = exports.SimulateRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "Simulate", data);
        return promise.then((data) => exports.SimulateResponse.decode(new minimal_1.default.Reader(data)));
    }
    GetTx(request) {
        const data = exports.GetTxRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "GetTx", data);
        return promise.then((data) => exports.GetTxResponse.decode(new minimal_1.default.Reader(data)));
    }
    BroadcastTx(request) {
        const data = exports.BroadcastTxRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "BroadcastTx", data);
        return promise.then((data) => exports.BroadcastTxResponse.decode(new minimal_1.default.Reader(data)));
    }
    GetTxsEvent(request) {
        const data = exports.GetTxsEventRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.tx.v1beta1.Service", "GetTxsEvent", data);
        return promise.then((data) => exports.GetTxsEventResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.ServiceClientImpl = ServiceClientImpl;
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (const byte of arr) {
        bin.push(String.fromCharCode(byte));
    }
    return btoa(bin.join(""));
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=service.js.map