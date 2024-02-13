/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { Event } from "../../../../tendermint/abci/types";
import { Block } from "../../../../tendermint/types/block";
export const protobufPackage = "cosmos.base.abci.v1beta1";
function createBaseTxResponse() {
    return {
        height: 0,
        txhash: "",
        codespace: "",
        code: 0,
        data: "",
        rawLog: "",
        logs: [],
        info: "",
        gasWanted: 0,
        gasUsed: 0,
        tx: undefined,
        timestamp: "",
        events: [],
    };
}
export const TxResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.height !== 0) {
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
            ABCIMessageLog.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.info !== "") {
            writer.uint32(66).string(message.info);
        }
        if (message.gasWanted !== 0) {
            writer.uint32(72).int64(message.gasWanted);
        }
        if (message.gasUsed !== 0) {
            writer.uint32(80).int64(message.gasUsed);
        }
        if (message.tx !== undefined) {
            Any.encode(message.tx, writer.uint32(90).fork()).ldelim();
        }
        if (message.timestamp !== "") {
            writer.uint32(98).string(message.timestamp);
        }
        for (const v of message.events) {
            Event.encode(v, writer.uint32(106).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxResponse();
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
                    message.txhash = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.codespace = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.code = reader.uint32();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.data = reader.string();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.rawLog = reader.string();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.logs.push(ABCIMessageLog.decode(reader, reader.uint32()));
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.info = reader.string();
                    continue;
                case 9:
                    if (tag !== 72) {
                        break;
                    }
                    message.gasWanted = longToNumber(reader.int64());
                    continue;
                case 10:
                    if (tag !== 80) {
                        break;
                    }
                    message.gasUsed = longToNumber(reader.int64());
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.tx = Any.decode(reader, reader.uint32());
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.timestamp = reader.string();
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.events.push(Event.decode(reader, reader.uint32()));
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
            txhash: isSet(object.txhash) ? String(object.txhash) : "",
            codespace: isSet(object.codespace) ? String(object.codespace) : "",
            code: isSet(object.code) ? Number(object.code) : 0,
            data: isSet(object.data) ? String(object.data) : "",
            rawLog: isSet(object.rawLog) ? String(object.rawLog) : "",
            logs: Array.isArray(object?.logs) ? object.logs.map((e) => ABCIMessageLog.fromJSON(e)) : [],
            info: isSet(object.info) ? String(object.info) : "",
            gasWanted: isSet(object.gasWanted) ? Number(object.gasWanted) : 0,
            gasUsed: isSet(object.gasUsed) ? Number(object.gasUsed) : 0,
            tx: isSet(object.tx) ? Any.fromJSON(object.tx) : undefined,
            timestamp: isSet(object.timestamp) ? String(object.timestamp) : "",
            events: Array.isArray(object?.events) ? object.events.map((e) => Event.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== 0) {
            obj.height = Math.round(message.height);
        }
        if (message.txhash !== "") {
            obj.txhash = message.txhash;
        }
        if (message.codespace !== "") {
            obj.codespace = message.codespace;
        }
        if (message.code !== 0) {
            obj.code = Math.round(message.code);
        }
        if (message.data !== "") {
            obj.data = message.data;
        }
        if (message.rawLog !== "") {
            obj.rawLog = message.rawLog;
        }
        if (message.logs?.length) {
            obj.logs = message.logs.map((e) => ABCIMessageLog.toJSON(e));
        }
        if (message.info !== "") {
            obj.info = message.info;
        }
        if (message.gasWanted !== 0) {
            obj.gasWanted = Math.round(message.gasWanted);
        }
        if (message.gasUsed !== 0) {
            obj.gasUsed = Math.round(message.gasUsed);
        }
        if (message.tx !== undefined) {
            obj.tx = Any.toJSON(message.tx);
        }
        if (message.timestamp !== "") {
            obj.timestamp = message.timestamp;
        }
        if (message.events?.length) {
            obj.events = message.events.map((e) => Event.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return TxResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxResponse();
        message.height = object.height ?? 0;
        message.txhash = object.txhash ?? "";
        message.codespace = object.codespace ?? "";
        message.code = object.code ?? 0;
        message.data = object.data ?? "";
        message.rawLog = object.rawLog ?? "";
        message.logs = object.logs?.map((e) => ABCIMessageLog.fromPartial(e)) || [];
        message.info = object.info ?? "";
        message.gasWanted = object.gasWanted ?? 0;
        message.gasUsed = object.gasUsed ?? 0;
        message.tx = (object.tx !== undefined && object.tx !== null) ? Any.fromPartial(object.tx) : undefined;
        message.timestamp = object.timestamp ?? "";
        message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
        return message;
    },
};
function createBaseABCIMessageLog() {
    return { msgIndex: 0, log: "", events: [] };
}
export const ABCIMessageLog = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.msgIndex !== 0) {
            writer.uint32(8).uint32(message.msgIndex);
        }
        if (message.log !== "") {
            writer.uint32(18).string(message.log);
        }
        for (const v of message.events) {
            StringEvent.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseABCIMessageLog();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.msgIndex = reader.uint32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.log = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.events.push(StringEvent.decode(reader, reader.uint32()));
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
            msgIndex: isSet(object.msgIndex) ? Number(object.msgIndex) : 0,
            log: isSet(object.log) ? String(object.log) : "",
            events: Array.isArray(object?.events) ? object.events.map((e) => StringEvent.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.msgIndex !== 0) {
            obj.msgIndex = Math.round(message.msgIndex);
        }
        if (message.log !== "") {
            obj.log = message.log;
        }
        if (message.events?.length) {
            obj.events = message.events.map((e) => StringEvent.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ABCIMessageLog.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseABCIMessageLog();
        message.msgIndex = object.msgIndex ?? 0;
        message.log = object.log ?? "";
        message.events = object.events?.map((e) => StringEvent.fromPartial(e)) || [];
        return message;
    },
};
function createBaseStringEvent() {
    return { type: "", attributes: [] };
}
export const StringEvent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        for (const v of message.attributes) {
            Attribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStringEvent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.type = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.attributes.push(Attribute.decode(reader, reader.uint32()));
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
            type: isSet(object.type) ? String(object.type) : "",
            attributes: Array.isArray(object?.attributes) ? object.attributes.map((e) => Attribute.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== "") {
            obj.type = message.type;
        }
        if (message.attributes?.length) {
            obj.attributes = message.attributes.map((e) => Attribute.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return StringEvent.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseStringEvent();
        message.type = object.type ?? "";
        message.attributes = object.attributes?.map((e) => Attribute.fromPartial(e)) || [];
        return message;
    },
};
function createBaseAttribute() {
    return { key: "", value: "" };
}
export const Attribute = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAttribute();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.key = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.value = reader.string();
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
        return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.key !== "") {
            obj.key = message.key;
        }
        if (message.value !== "") {
            obj.value = message.value;
        }
        return obj;
    },
    create(base) {
        return Attribute.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAttribute();
        message.key = object.key ?? "";
        message.value = object.value ?? "";
        return message;
    },
};
function createBaseGasInfo() {
    return { gasWanted: 0, gasUsed: 0 };
}
export const GasInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.gasWanted !== 0) {
            writer.uint32(8).uint64(message.gasWanted);
        }
        if (message.gasUsed !== 0) {
            writer.uint32(16).uint64(message.gasUsed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGasInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.gasWanted = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.gasUsed = longToNumber(reader.uint64());
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
            gasWanted: isSet(object.gasWanted) ? Number(object.gasWanted) : 0,
            gasUsed: isSet(object.gasUsed) ? Number(object.gasUsed) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.gasWanted !== 0) {
            obj.gasWanted = Math.round(message.gasWanted);
        }
        if (message.gasUsed !== 0) {
            obj.gasUsed = Math.round(message.gasUsed);
        }
        return obj;
    },
    create(base) {
        return GasInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGasInfo();
        message.gasWanted = object.gasWanted ?? 0;
        message.gasUsed = object.gasUsed ?? 0;
        return message;
    },
};
function createBaseResult() {
    return { data: new Uint8Array(0), log: "", events: [], msgResponses: [] };
}
export const Result = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(18).string(message.log);
        }
        for (const v of message.events) {
            Event.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.msgResponses) {
            Any.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseResult();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.log = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.events.push(Event.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.msgResponses.push(Any.decode(reader, reader.uint32()));
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
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
            log: isSet(object.log) ? String(object.log) : "",
            events: Array.isArray(object?.events) ? object.events.map((e) => Event.fromJSON(e)) : [],
            msgResponses: Array.isArray(object?.msgResponses) ? object.msgResponses.map((e) => Any.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        if (message.log !== "") {
            obj.log = message.log;
        }
        if (message.events?.length) {
            obj.events = message.events.map((e) => Event.toJSON(e));
        }
        if (message.msgResponses?.length) {
            obj.msgResponses = message.msgResponses.map((e) => Any.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return Result.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseResult();
        message.data = object.data ?? new Uint8Array(0);
        message.log = object.log ?? "";
        message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
        message.msgResponses = object.msgResponses?.map((e) => Any.fromPartial(e)) || [];
        return message;
    },
};
function createBaseSimulationResponse() {
    return { gasInfo: undefined, result: undefined };
}
export const SimulationResponse = {
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
        const message = createBaseSimulationResponse();
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
        return SimulationResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSimulationResponse();
        message.gasInfo = (object.gasInfo !== undefined && object.gasInfo !== null)
            ? GasInfo.fromPartial(object.gasInfo)
            : undefined;
        message.result = (object.result !== undefined && object.result !== null)
            ? Result.fromPartial(object.result)
            : undefined;
        return message;
    },
};
function createBaseMsgData() {
    return { msgType: "", data: new Uint8Array(0) };
}
export const MsgData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.msgType !== "") {
            writer.uint32(10).string(message.msgType);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.msgType = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
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
            msgType: isSet(object.msgType) ? String(object.msgType) : "",
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.msgType !== "") {
            obj.msgType = message.msgType;
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return MsgData.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgData();
        message.msgType = object.msgType ?? "";
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseTxMsgData() {
    return { data: [], msgResponses: [] };
}
export const TxMsgData = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.data) {
            MsgData.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.msgResponses) {
            Any.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxMsgData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data.push(MsgData.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.msgResponses.push(Any.decode(reader, reader.uint32()));
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
            data: Array.isArray(object?.data) ? object.data.map((e) => MsgData.fromJSON(e)) : [],
            msgResponses: Array.isArray(object?.msgResponses) ? object.msgResponses.map((e) => Any.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.data?.length) {
            obj.data = message.data.map((e) => MsgData.toJSON(e));
        }
        if (message.msgResponses?.length) {
            obj.msgResponses = message.msgResponses.map((e) => Any.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return TxMsgData.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxMsgData();
        message.data = object.data?.map((e) => MsgData.fromPartial(e)) || [];
        message.msgResponses = object.msgResponses?.map((e) => Any.fromPartial(e)) || [];
        return message;
    },
};
function createBaseSearchTxsResult() {
    return { totalCount: 0, count: 0, pageNumber: 0, pageTotal: 0, limit: 0, txs: [] };
}
export const SearchTxsResult = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.totalCount !== 0) {
            writer.uint32(8).uint64(message.totalCount);
        }
        if (message.count !== 0) {
            writer.uint32(16).uint64(message.count);
        }
        if (message.pageNumber !== 0) {
            writer.uint32(24).uint64(message.pageNumber);
        }
        if (message.pageTotal !== 0) {
            writer.uint32(32).uint64(message.pageTotal);
        }
        if (message.limit !== 0) {
            writer.uint32(40).uint64(message.limit);
        }
        for (const v of message.txs) {
            TxResponse.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSearchTxsResult();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.totalCount = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.count = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.pageNumber = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.pageTotal = longToNumber(reader.uint64());
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
                    message.txs.push(TxResponse.decode(reader, reader.uint32()));
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
            totalCount: isSet(object.totalCount) ? Number(object.totalCount) : 0,
            count: isSet(object.count) ? Number(object.count) : 0,
            pageNumber: isSet(object.pageNumber) ? Number(object.pageNumber) : 0,
            pageTotal: isSet(object.pageTotal) ? Number(object.pageTotal) : 0,
            limit: isSet(object.limit) ? Number(object.limit) : 0,
            txs: Array.isArray(object?.txs) ? object.txs.map((e) => TxResponse.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.totalCount !== 0) {
            obj.totalCount = Math.round(message.totalCount);
        }
        if (message.count !== 0) {
            obj.count = Math.round(message.count);
        }
        if (message.pageNumber !== 0) {
            obj.pageNumber = Math.round(message.pageNumber);
        }
        if (message.pageTotal !== 0) {
            obj.pageTotal = Math.round(message.pageTotal);
        }
        if (message.limit !== 0) {
            obj.limit = Math.round(message.limit);
        }
        if (message.txs?.length) {
            obj.txs = message.txs.map((e) => TxResponse.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return SearchTxsResult.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSearchTxsResult();
        message.totalCount = object.totalCount ?? 0;
        message.count = object.count ?? 0;
        message.pageNumber = object.pageNumber ?? 0;
        message.pageTotal = object.pageTotal ?? 0;
        message.limit = object.limit ?? 0;
        message.txs = object.txs?.map((e) => TxResponse.fromPartial(e)) || [];
        return message;
    },
};
function createBaseSearchBlocksResult() {
    return { totalCount: 0, count: 0, pageNumber: 0, pageTotal: 0, limit: 0, blocks: [] };
}
export const SearchBlocksResult = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.totalCount !== 0) {
            writer.uint32(8).int64(message.totalCount);
        }
        if (message.count !== 0) {
            writer.uint32(16).int64(message.count);
        }
        if (message.pageNumber !== 0) {
            writer.uint32(24).int64(message.pageNumber);
        }
        if (message.pageTotal !== 0) {
            writer.uint32(32).int64(message.pageTotal);
        }
        if (message.limit !== 0) {
            writer.uint32(40).int64(message.limit);
        }
        for (const v of message.blocks) {
            Block.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSearchBlocksResult();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.totalCount = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.count = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.pageNumber = longToNumber(reader.int64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.pageTotal = longToNumber(reader.int64());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.limit = longToNumber(reader.int64());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.blocks.push(Block.decode(reader, reader.uint32()));
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
            totalCount: isSet(object.totalCount) ? Number(object.totalCount) : 0,
            count: isSet(object.count) ? Number(object.count) : 0,
            pageNumber: isSet(object.pageNumber) ? Number(object.pageNumber) : 0,
            pageTotal: isSet(object.pageTotal) ? Number(object.pageTotal) : 0,
            limit: isSet(object.limit) ? Number(object.limit) : 0,
            blocks: Array.isArray(object?.blocks) ? object.blocks.map((e) => Block.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.totalCount !== 0) {
            obj.totalCount = Math.round(message.totalCount);
        }
        if (message.count !== 0) {
            obj.count = Math.round(message.count);
        }
        if (message.pageNumber !== 0) {
            obj.pageNumber = Math.round(message.pageNumber);
        }
        if (message.pageTotal !== 0) {
            obj.pageTotal = Math.round(message.pageTotal);
        }
        if (message.limit !== 0) {
            obj.limit = Math.round(message.limit);
        }
        if (message.blocks?.length) {
            obj.blocks = message.blocks.map((e) => Block.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return SearchBlocksResult.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSearchBlocksResult();
        message.totalCount = object.totalCount ?? 0;
        message.count = object.count ?? 0;
        message.pageNumber = object.pageNumber ?? 0;
        message.pageTotal = object.pageTotal ?? 0;
        message.limit = object.limit ?? 0;
        message.blocks = object.blocks?.map((e) => Block.fromPartial(e)) || [];
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
