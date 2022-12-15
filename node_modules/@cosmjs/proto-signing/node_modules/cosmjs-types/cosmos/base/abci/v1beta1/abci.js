"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTxsResult = exports.TxMsgData = exports.MsgData = exports.SimulationResponse = exports.Result = exports.GasInfo = exports.Attribute = exports.StringEvent = exports.ABCIMessageLog = exports.TxResponse = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../../google/protobuf/any");
const types_1 = require("../../../../tendermint/abci/types");
exports.protobufPackage = "cosmos.base.abci.v1beta1";
const baseTxResponse = {
    height: long_1.default.ZERO,
    txhash: "",
    codespace: "",
    code: 0,
    data: "",
    rawLog: "",
    info: "",
    gasWanted: long_1.default.ZERO,
    gasUsed: long_1.default.ZERO,
    timestamp: "",
};
exports.TxResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.height.isZero()) {
            writer.uint32(8).int64(message.height);
        }
        if (message.txhash !== "") {
            writer.uint32(18).string(message.txhash);
        }
        if (message.codespace !== "") {
            writer.uint32(26).string(message.codespace);
        }
        if (message.code !== 0) {
            writer.uint32(32).uint32(message.code);
        }
        if (message.data !== "") {
            writer.uint32(42).string(message.data);
        }
        if (message.rawLog !== "") {
            writer.uint32(50).string(message.rawLog);
        }
        for (const v of message.logs) {
            exports.ABCIMessageLog.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.info !== "") {
            writer.uint32(66).string(message.info);
        }
        if (!message.gasWanted.isZero()) {
            writer.uint32(72).int64(message.gasWanted);
        }
        if (!message.gasUsed.isZero()) {
            writer.uint32(80).int64(message.gasUsed);
        }
        if (message.tx !== undefined) {
            any_1.Any.encode(message.tx, writer.uint32(90).fork()).ldelim();
        }
        if (message.timestamp !== "") {
            writer.uint32(98).string(message.timestamp);
        }
        for (const v of message.events) {
            types_1.Event.encode(v, writer.uint32(106).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseTxResponse);
        message.logs = [];
        message.events = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                case 2:
                    message.txhash = reader.string();
                    break;
                case 3:
                    message.codespace = reader.string();
                    break;
                case 4:
                    message.code = reader.uint32();
                    break;
                case 5:
                    message.data = reader.string();
                    break;
                case 6:
                    message.rawLog = reader.string();
                    break;
                case 7:
                    message.logs.push(exports.ABCIMessageLog.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.info = reader.string();
                    break;
                case 9:
                    message.gasWanted = reader.int64();
                    break;
                case 10:
                    message.gasUsed = reader.int64();
                    break;
                case 11:
                    message.tx = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.timestamp = reader.string();
                    break;
                case 13:
                    message.events.push(types_1.Event.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseTxResponse);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
        message.txhash = object.txhash !== undefined && object.txhash !== null ? String(object.txhash) : "";
        message.codespace =
            object.codespace !== undefined && object.codespace !== null ? String(object.codespace) : "";
        message.code = object.code !== undefined && object.code !== null ? Number(object.code) : 0;
        message.data = object.data !== undefined && object.data !== null ? String(object.data) : "";
        message.rawLog = object.rawLog !== undefined && object.rawLog !== null ? String(object.rawLog) : "";
        message.logs = ((_a = object.logs) !== null && _a !== void 0 ? _a : []).map((e) => exports.ABCIMessageLog.fromJSON(e));
        message.info = object.info !== undefined && object.info !== null ? String(object.info) : "";
        message.gasWanted =
            object.gasWanted !== undefined && object.gasWanted !== null
                ? long_1.default.fromString(object.gasWanted)
                : long_1.default.ZERO;
        message.gasUsed =
            object.gasUsed !== undefined && object.gasUsed !== null ? long_1.default.fromString(object.gasUsed) : long_1.default.ZERO;
        message.tx = object.tx !== undefined && object.tx !== null ? any_1.Any.fromJSON(object.tx) : undefined;
        message.timestamp =
            object.timestamp !== undefined && object.timestamp !== null ? String(object.timestamp) : "";
        message.events = ((_b = object.events) !== null && _b !== void 0 ? _b : []).map((e) => types_1.Event.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined && (obj.height = (message.height || long_1.default.ZERO).toString());
        message.txhash !== undefined && (obj.txhash = message.txhash);
        message.codespace !== undefined && (obj.codespace = message.codespace);
        message.code !== undefined && (obj.code = message.code);
        message.data !== undefined && (obj.data = message.data);
        message.rawLog !== undefined && (obj.rawLog = message.rawLog);
        if (message.logs) {
            obj.logs = message.logs.map((e) => (e ? exports.ABCIMessageLog.toJSON(e) : undefined));
        }
        else {
            obj.logs = [];
        }
        message.info !== undefined && (obj.info = message.info);
        message.gasWanted !== undefined && (obj.gasWanted = (message.gasWanted || long_1.default.ZERO).toString());
        message.gasUsed !== undefined && (obj.gasUsed = (message.gasUsed || long_1.default.ZERO).toString());
        message.tx !== undefined && (obj.tx = message.tx ? any_1.Any.toJSON(message.tx) : undefined);
        message.timestamp !== undefined && (obj.timestamp = message.timestamp);
        if (message.events) {
            obj.events = message.events.map((e) => (e ? types_1.Event.toJSON(e) : undefined));
        }
        else {
            obj.events = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const message = Object.assign({}, baseTxResponse);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
        message.txhash = (_a = object.txhash) !== null && _a !== void 0 ? _a : "";
        message.codespace = (_b = object.codespace) !== null && _b !== void 0 ? _b : "";
        message.code = (_c = object.code) !== null && _c !== void 0 ? _c : 0;
        message.data = (_d = object.data) !== null && _d !== void 0 ? _d : "";
        message.rawLog = (_e = object.rawLog) !== null && _e !== void 0 ? _e : "";
        message.logs = ((_f = object.logs) === null || _f === void 0 ? void 0 : _f.map((e) => exports.ABCIMessageLog.fromPartial(e))) || [];
        message.info = (_g = object.info) !== null && _g !== void 0 ? _g : "";
        message.gasWanted =
            object.gasWanted !== undefined && object.gasWanted !== null
                ? long_1.default.fromValue(object.gasWanted)
                : long_1.default.ZERO;
        message.gasUsed =
            object.gasUsed !== undefined && object.gasUsed !== null ? long_1.default.fromValue(object.gasUsed) : long_1.default.ZERO;
        message.tx = object.tx !== undefined && object.tx !== null ? any_1.Any.fromPartial(object.tx) : undefined;
        message.timestamp = (_h = object.timestamp) !== null && _h !== void 0 ? _h : "";
        message.events = ((_j = object.events) === null || _j === void 0 ? void 0 : _j.map((e) => types_1.Event.fromPartial(e))) || [];
        return message;
    },
};
const baseABCIMessageLog = { msgIndex: 0, log: "" };
exports.ABCIMessageLog = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msgIndex !== 0) {
            writer.uint32(8).uint32(message.msgIndex);
        }
        if (message.log !== "") {
            writer.uint32(18).string(message.log);
        }
        for (const v of message.events) {
            exports.StringEvent.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseABCIMessageLog);
        message.events = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msgIndex = reader.uint32();
                    break;
                case 2:
                    message.log = reader.string();
                    break;
                case 3:
                    message.events.push(exports.StringEvent.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseABCIMessageLog);
        message.msgIndex =
            object.msgIndex !== undefined && object.msgIndex !== null ? Number(object.msgIndex) : 0;
        message.log = object.log !== undefined && object.log !== null ? String(object.log) : "";
        message.events = ((_a = object.events) !== null && _a !== void 0 ? _a : []).map((e) => exports.StringEvent.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.msgIndex !== undefined && (obj.msgIndex = message.msgIndex);
        message.log !== undefined && (obj.log = message.log);
        if (message.events) {
            obj.events = message.events.map((e) => (e ? exports.StringEvent.toJSON(e) : undefined));
        }
        else {
            obj.events = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseABCIMessageLog);
        message.msgIndex = (_a = object.msgIndex) !== null && _a !== void 0 ? _a : 0;
        message.log = (_b = object.log) !== null && _b !== void 0 ? _b : "";
        message.events = ((_c = object.events) === null || _c === void 0 ? void 0 : _c.map((e) => exports.StringEvent.fromPartial(e))) || [];
        return message;
    },
};
const baseStringEvent = { type: "" };
exports.StringEvent = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        for (const v of message.attributes) {
            exports.Attribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseStringEvent);
        message.attributes = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.string();
                    break;
                case 2:
                    message.attributes.push(exports.Attribute.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseStringEvent);
        message.type = object.type !== undefined && object.type !== null ? String(object.type) : "";
        message.attributes = ((_a = object.attributes) !== null && _a !== void 0 ? _a : []).map((e) => exports.Attribute.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined && (obj.type = message.type);
        if (message.attributes) {
            obj.attributes = message.attributes.map((e) => (e ? exports.Attribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseStringEvent);
        message.type = (_a = object.type) !== null && _a !== void 0 ? _a : "";
        message.attributes = ((_b = object.attributes) === null || _b === void 0 ? void 0 : _b.map((e) => exports.Attribute.fromPartial(e))) || [];
        return message;
    },
};
const baseAttribute = { key: "", value: "" };
exports.Attribute = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseAttribute);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseAttribute);
        message.key = object.key !== undefined && object.key !== null ? String(object.key) : "";
        message.value = object.value !== undefined && object.value !== null ? String(object.value) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined && (obj.value = message.value);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseAttribute);
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseGasInfo = { gasWanted: long_1.default.UZERO, gasUsed: long_1.default.UZERO };
exports.GasInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.gasWanted.isZero()) {
            writer.uint32(8).uint64(message.gasWanted);
        }
        if (!message.gasUsed.isZero()) {
            writer.uint32(16).uint64(message.gasUsed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGasInfo);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gasWanted = reader.uint64();
                    break;
                case 2:
                    message.gasUsed = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseGasInfo);
        message.gasWanted =
            object.gasWanted !== undefined && object.gasWanted !== null
                ? long_1.default.fromString(object.gasWanted)
                : long_1.default.UZERO;
        message.gasUsed =
            object.gasUsed !== undefined && object.gasUsed !== null ? long_1.default.fromString(object.gasUsed) : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.gasWanted !== undefined && (obj.gasWanted = (message.gasWanted || long_1.default.UZERO).toString());
        message.gasUsed !== undefined && (obj.gasUsed = (message.gasUsed || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseGasInfo);
        message.gasWanted =
            object.gasWanted !== undefined && object.gasWanted !== null
                ? long_1.default.fromValue(object.gasWanted)
                : long_1.default.UZERO;
        message.gasUsed =
            object.gasUsed !== undefined && object.gasUsed !== null ? long_1.default.fromValue(object.gasUsed) : long_1.default.UZERO;
        return message;
    },
};
const baseResult = { log: "" };
exports.Result = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(18).string(message.log);
        }
        for (const v of message.events) {
            types_1.Event.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResult);
        message.events = [];
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.log = reader.string();
                    break;
                case 3:
                    message.events.push(types_1.Event.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseResult);
        message.data =
            object.data !== undefined && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
        message.log = object.log !== undefined && object.log !== null ? String(object.log) : "";
        message.events = ((_a = object.events) !== null && _a !== void 0 ? _a : []).map((e) => types_1.Event.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.log !== undefined && (obj.log = message.log);
        if (message.events) {
            obj.events = message.events.map((e) => (e ? types_1.Event.toJSON(e) : undefined));
        }
        else {
            obj.events = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseResult);
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.log = (_b = object.log) !== null && _b !== void 0 ? _b : "";
        message.events = ((_c = object.events) === null || _c === void 0 ? void 0 : _c.map((e) => types_1.Event.fromPartial(e))) || [];
        return message;
    },
};
const baseSimulationResponse = {};
exports.SimulationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.gasInfo !== undefined) {
            exports.GasInfo.encode(message.gasInfo, writer.uint32(10).fork()).ldelim();
        }
        if (message.result !== undefined) {
            exports.Result.encode(message.result, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSimulationResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gasInfo = exports.GasInfo.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.result = exports.Result.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSimulationResponse);
        message.gasInfo =
            object.gasInfo !== undefined && object.gasInfo !== null ? exports.GasInfo.fromJSON(object.gasInfo) : undefined;
        message.result =
            object.result !== undefined && object.result !== null ? exports.Result.fromJSON(object.result) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.gasInfo !== undefined &&
            (obj.gasInfo = message.gasInfo ? exports.GasInfo.toJSON(message.gasInfo) : undefined);
        message.result !== undefined && (obj.result = message.result ? exports.Result.toJSON(message.result) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSimulationResponse);
        message.gasInfo =
            object.gasInfo !== undefined && object.gasInfo !== null
                ? exports.GasInfo.fromPartial(object.gasInfo)
                : undefined;
        message.result =
            object.result !== undefined && object.result !== null ? exports.Result.fromPartial(object.result) : undefined;
        return message;
    },
};
const baseMsgData = { msgType: "" };
exports.MsgData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msgType !== "") {
            writer.uint32(10).string(message.msgType);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgData);
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msgType = reader.string();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgData);
        message.msgType = object.msgType !== undefined && object.msgType !== null ? String(object.msgType) : "";
        message.data =
            object.data !== undefined && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.msgType !== undefined && (obj.msgType = message.msgType);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgData);
        message.msgType = (_a = object.msgType) !== null && _a !== void 0 ? _a : "";
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
const baseTxMsgData = {};
exports.TxMsgData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.data) {
            exports.MsgData.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseTxMsgData);
        message.data = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data.push(exports.MsgData.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseTxMsgData);
        message.data = ((_a = object.data) !== null && _a !== void 0 ? _a : []).map((e) => exports.MsgData.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.data) {
            obj.data = message.data.map((e) => (e ? exports.MsgData.toJSON(e) : undefined));
        }
        else {
            obj.data = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseTxMsgData);
        message.data = ((_a = object.data) === null || _a === void 0 ? void 0 : _a.map((e) => exports.MsgData.fromPartial(e))) || [];
        return message;
    },
};
const baseSearchTxsResult = {
    totalCount: long_1.default.UZERO,
    count: long_1.default.UZERO,
    pageNumber: long_1.default.UZERO,
    pageTotal: long_1.default.UZERO,
    limit: long_1.default.UZERO,
};
exports.SearchTxsResult = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.totalCount.isZero()) {
            writer.uint32(8).uint64(message.totalCount);
        }
        if (!message.count.isZero()) {
            writer.uint32(16).uint64(message.count);
        }
        if (!message.pageNumber.isZero()) {
            writer.uint32(24).uint64(message.pageNumber);
        }
        if (!message.pageTotal.isZero()) {
            writer.uint32(32).uint64(message.pageTotal);
        }
        if (!message.limit.isZero()) {
            writer.uint32(40).uint64(message.limit);
        }
        for (const v of message.txs) {
            exports.TxResponse.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSearchTxsResult);
        message.txs = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.totalCount = reader.uint64();
                    break;
                case 2:
                    message.count = reader.uint64();
                    break;
                case 3:
                    message.pageNumber = reader.uint64();
                    break;
                case 4:
                    message.pageTotal = reader.uint64();
                    break;
                case 5:
                    message.limit = reader.uint64();
                    break;
                case 6:
                    message.txs.push(exports.TxResponse.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseSearchTxsResult);
        message.totalCount =
            object.totalCount !== undefined && object.totalCount !== null
                ? long_1.default.fromString(object.totalCount)
                : long_1.default.UZERO;
        message.count =
            object.count !== undefined && object.count !== null ? long_1.default.fromString(object.count) : long_1.default.UZERO;
        message.pageNumber =
            object.pageNumber !== undefined && object.pageNumber !== null
                ? long_1.default.fromString(object.pageNumber)
                : long_1.default.UZERO;
        message.pageTotal =
            object.pageTotal !== undefined && object.pageTotal !== null
                ? long_1.default.fromString(object.pageTotal)
                : long_1.default.UZERO;
        message.limit =
            object.limit !== undefined && object.limit !== null ? long_1.default.fromString(object.limit) : long_1.default.UZERO;
        message.txs = ((_a = object.txs) !== null && _a !== void 0 ? _a : []).map((e) => exports.TxResponse.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.totalCount !== undefined && (obj.totalCount = (message.totalCount || long_1.default.UZERO).toString());
        message.count !== undefined && (obj.count = (message.count || long_1.default.UZERO).toString());
        message.pageNumber !== undefined && (obj.pageNumber = (message.pageNumber || long_1.default.UZERO).toString());
        message.pageTotal !== undefined && (obj.pageTotal = (message.pageTotal || long_1.default.UZERO).toString());
        message.limit !== undefined && (obj.limit = (message.limit || long_1.default.UZERO).toString());
        if (message.txs) {
            obj.txs = message.txs.map((e) => (e ? exports.TxResponse.toJSON(e) : undefined));
        }
        else {
            obj.txs = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseSearchTxsResult);
        message.totalCount =
            object.totalCount !== undefined && object.totalCount !== null
                ? long_1.default.fromValue(object.totalCount)
                : long_1.default.UZERO;
        message.count =
            object.count !== undefined && object.count !== null ? long_1.default.fromValue(object.count) : long_1.default.UZERO;
        message.pageNumber =
            object.pageNumber !== undefined && object.pageNumber !== null
                ? long_1.default.fromValue(object.pageNumber)
                : long_1.default.UZERO;
        message.pageTotal =
            object.pageTotal !== undefined && object.pageTotal !== null
                ? long_1.default.fromValue(object.pageTotal)
                : long_1.default.UZERO;
        message.limit =
            object.limit !== undefined && object.limit !== null ? long_1.default.fromValue(object.limit) : long_1.default.UZERO;
        message.txs = ((_a = object.txs) === null || _a === void 0 ? void 0 : _a.map((e) => exports.TxResponse.fromPartial(e))) || [];
        return message;
    },
};
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
//# sourceMappingURL=abci.js.map