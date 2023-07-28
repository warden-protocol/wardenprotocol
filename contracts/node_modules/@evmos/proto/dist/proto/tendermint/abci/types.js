"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tendermint = void 0;
const dependency_1 = __importStar(require("./../crypto/proof"));
const dependency_2 = __importStar(require("./../types/types"));
const dependency_3 = __importStar(require("./../crypto/keys"));
const dependency_4 = __importStar(require("./../types/params"));
const dependency_5 = __importStar(require("./../../google/protobuf/timestamp"));
const pb_1 = __importStar(require("google-protobuf"));
var tendermint;
(function (tendermint) {
    var abci;
    (function (abci) {
        let CheckTxType;
        (function (CheckTxType) {
            CheckTxType[CheckTxType["NEW"] = 0] = "NEW";
            CheckTxType[CheckTxType["RECHECK"] = 1] = "RECHECK";
        })(CheckTxType = abci.CheckTxType || (abci.CheckTxType = {}));
        let EvidenceType;
        (function (EvidenceType) {
            EvidenceType[EvidenceType["UNKNOWN"] = 0] = "UNKNOWN";
            EvidenceType[EvidenceType["DUPLICATE_VOTE"] = 1] = "DUPLICATE_VOTE";
            EvidenceType[EvidenceType["LIGHT_CLIENT_ATTACK"] = 2] = "LIGHT_CLIENT_ATTACK";
        })(EvidenceType = abci.EvidenceType || (abci.EvidenceType = {}));
        class Request extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]]);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("echo" in data && data.echo != undefined) {
                        this.echo = data.echo;
                    }
                    if ("flush" in data && data.flush != undefined) {
                        this.flush = data.flush;
                    }
                    if ("info" in data && data.info != undefined) {
                        this.info = data.info;
                    }
                    if ("set_option" in data && data.set_option != undefined) {
                        this.set_option = data.set_option;
                    }
                    if ("init_chain" in data && data.init_chain != undefined) {
                        this.init_chain = data.init_chain;
                    }
                    if ("query" in data && data.query != undefined) {
                        this.query = data.query;
                    }
                    if ("begin_block" in data && data.begin_block != undefined) {
                        this.begin_block = data.begin_block;
                    }
                    if ("check_tx" in data && data.check_tx != undefined) {
                        this.check_tx = data.check_tx;
                    }
                    if ("deliver_tx" in data && data.deliver_tx != undefined) {
                        this.deliver_tx = data.deliver_tx;
                    }
                    if ("end_block" in data && data.end_block != undefined) {
                        this.end_block = data.end_block;
                    }
                    if ("commit" in data && data.commit != undefined) {
                        this.commit = data.commit;
                    }
                    if ("list_snapshots" in data && data.list_snapshots != undefined) {
                        this.list_snapshots = data.list_snapshots;
                    }
                    if ("offer_snapshot" in data && data.offer_snapshot != undefined) {
                        this.offer_snapshot = data.offer_snapshot;
                    }
                    if ("load_snapshot_chunk" in data && data.load_snapshot_chunk != undefined) {
                        this.load_snapshot_chunk = data.load_snapshot_chunk;
                    }
                    if ("apply_snapshot_chunk" in data && data.apply_snapshot_chunk != undefined) {
                        this.apply_snapshot_chunk = data.apply_snapshot_chunk;
                    }
                }
            }
            get echo() {
                return pb_1.Message.getWrapperField(this, RequestEcho, 1);
            }
            set echo(value) {
                pb_1.Message.setOneofWrapperField(this, 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get flush() {
                return pb_1.Message.getWrapperField(this, RequestFlush, 2);
            }
            set flush(value) {
                pb_1.Message.setOneofWrapperField(this, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get info() {
                return pb_1.Message.getWrapperField(this, RequestInfo, 3);
            }
            set info(value) {
                pb_1.Message.setOneofWrapperField(this, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get set_option() {
                return pb_1.Message.getWrapperField(this, RequestSetOption, 4);
            }
            set set_option(value) {
                pb_1.Message.setOneofWrapperField(this, 4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get init_chain() {
                return pb_1.Message.getWrapperField(this, RequestInitChain, 5);
            }
            set init_chain(value) {
                pb_1.Message.setOneofWrapperField(this, 5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get query() {
                return pb_1.Message.getWrapperField(this, RequestQuery, 6);
            }
            set query(value) {
                pb_1.Message.setOneofWrapperField(this, 6, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get begin_block() {
                return pb_1.Message.getWrapperField(this, RequestBeginBlock, 7);
            }
            set begin_block(value) {
                pb_1.Message.setOneofWrapperField(this, 7, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get check_tx() {
                return pb_1.Message.getWrapperField(this, RequestCheckTx, 8);
            }
            set check_tx(value) {
                pb_1.Message.setOneofWrapperField(this, 8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get deliver_tx() {
                return pb_1.Message.getWrapperField(this, RequestDeliverTx, 9);
            }
            set deliver_tx(value) {
                pb_1.Message.setOneofWrapperField(this, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get end_block() {
                return pb_1.Message.getWrapperField(this, RequestEndBlock, 10);
            }
            set end_block(value) {
                pb_1.Message.setOneofWrapperField(this, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get commit() {
                return pb_1.Message.getWrapperField(this, RequestCommit, 11);
            }
            set commit(value) {
                pb_1.Message.setOneofWrapperField(this, 11, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get list_snapshots() {
                return pb_1.Message.getWrapperField(this, RequestListSnapshots, 12);
            }
            set list_snapshots(value) {
                pb_1.Message.setOneofWrapperField(this, 12, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get offer_snapshot() {
                return pb_1.Message.getWrapperField(this, RequestOfferSnapshot, 13);
            }
            set offer_snapshot(value) {
                pb_1.Message.setOneofWrapperField(this, 13, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get load_snapshot_chunk() {
                return pb_1.Message.getWrapperField(this, RequestLoadSnapshotChunk, 14);
            }
            set load_snapshot_chunk(value) {
                pb_1.Message.setOneofWrapperField(this, 14, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get apply_snapshot_chunk() {
                return pb_1.Message.getWrapperField(this, RequestApplySnapshotChunk, 15);
            }
            set apply_snapshot_chunk(value) {
                pb_1.Message.setOneofWrapperField(this, 15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], value);
            }
            get value() {
                const cases = {
                    0: "none",
                    1: "echo",
                    2: "flush",
                    3: "info",
                    4: "set_option",
                    5: "init_chain",
                    6: "query",
                    7: "begin_block",
                    8: "check_tx",
                    9: "deliver_tx",
                    10: "end_block",
                    11: "commit",
                    12: "list_snapshots",
                    13: "offer_snapshot",
                    14: "load_snapshot_chunk",
                    15: "apply_snapshot_chunk"
                };
                return cases[pb_1.Message.computeOneofCase(this, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])];
            }
            static fromObject(data) {
                const message = new Request({});
                if (data.echo != null) {
                    message.echo = RequestEcho.fromObject(data.echo);
                }
                if (data.flush != null) {
                    message.flush = RequestFlush.fromObject(data.flush);
                }
                if (data.info != null) {
                    message.info = RequestInfo.fromObject(data.info);
                }
                if (data.set_option != null) {
                    message.set_option = RequestSetOption.fromObject(data.set_option);
                }
                if (data.init_chain != null) {
                    message.init_chain = RequestInitChain.fromObject(data.init_chain);
                }
                if (data.query != null) {
                    message.query = RequestQuery.fromObject(data.query);
                }
                if (data.begin_block != null) {
                    message.begin_block = RequestBeginBlock.fromObject(data.begin_block);
                }
                if (data.check_tx != null) {
                    message.check_tx = RequestCheckTx.fromObject(data.check_tx);
                }
                if (data.deliver_tx != null) {
                    message.deliver_tx = RequestDeliverTx.fromObject(data.deliver_tx);
                }
                if (data.end_block != null) {
                    message.end_block = RequestEndBlock.fromObject(data.end_block);
                }
                if (data.commit != null) {
                    message.commit = RequestCommit.fromObject(data.commit);
                }
                if (data.list_snapshots != null) {
                    message.list_snapshots = RequestListSnapshots.fromObject(data.list_snapshots);
                }
                if (data.offer_snapshot != null) {
                    message.offer_snapshot = RequestOfferSnapshot.fromObject(data.offer_snapshot);
                }
                if (data.load_snapshot_chunk != null) {
                    message.load_snapshot_chunk = RequestLoadSnapshotChunk.fromObject(data.load_snapshot_chunk);
                }
                if (data.apply_snapshot_chunk != null) {
                    message.apply_snapshot_chunk = RequestApplySnapshotChunk.fromObject(data.apply_snapshot_chunk);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.echo != null) {
                    data.echo = this.echo.toObject();
                }
                if (this.flush != null) {
                    data.flush = this.flush.toObject();
                }
                if (this.info != null) {
                    data.info = this.info.toObject();
                }
                if (this.set_option != null) {
                    data.set_option = this.set_option.toObject();
                }
                if (this.init_chain != null) {
                    data.init_chain = this.init_chain.toObject();
                }
                if (this.query != null) {
                    data.query = this.query.toObject();
                }
                if (this.begin_block != null) {
                    data.begin_block = this.begin_block.toObject();
                }
                if (this.check_tx != null) {
                    data.check_tx = this.check_tx.toObject();
                }
                if (this.deliver_tx != null) {
                    data.deliver_tx = this.deliver_tx.toObject();
                }
                if (this.end_block != null) {
                    data.end_block = this.end_block.toObject();
                }
                if (this.commit != null) {
                    data.commit = this.commit.toObject();
                }
                if (this.list_snapshots != null) {
                    data.list_snapshots = this.list_snapshots.toObject();
                }
                if (this.offer_snapshot != null) {
                    data.offer_snapshot = this.offer_snapshot.toObject();
                }
                if (this.load_snapshot_chunk != null) {
                    data.load_snapshot_chunk = this.load_snapshot_chunk.toObject();
                }
                if (this.apply_snapshot_chunk != null) {
                    data.apply_snapshot_chunk = this.apply_snapshot_chunk.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.echo !== undefined)
                    writer.writeMessage(1, this.echo, () => this.echo.serialize(writer));
                if (this.flush !== undefined)
                    writer.writeMessage(2, this.flush, () => this.flush.serialize(writer));
                if (this.info !== undefined)
                    writer.writeMessage(3, this.info, () => this.info.serialize(writer));
                if (this.set_option !== undefined)
                    writer.writeMessage(4, this.set_option, () => this.set_option.serialize(writer));
                if (this.init_chain !== undefined)
                    writer.writeMessage(5, this.init_chain, () => this.init_chain.serialize(writer));
                if (this.query !== undefined)
                    writer.writeMessage(6, this.query, () => this.query.serialize(writer));
                if (this.begin_block !== undefined)
                    writer.writeMessage(7, this.begin_block, () => this.begin_block.serialize(writer));
                if (this.check_tx !== undefined)
                    writer.writeMessage(8, this.check_tx, () => this.check_tx.serialize(writer));
                if (this.deliver_tx !== undefined)
                    writer.writeMessage(9, this.deliver_tx, () => this.deliver_tx.serialize(writer));
                if (this.end_block !== undefined)
                    writer.writeMessage(10, this.end_block, () => this.end_block.serialize(writer));
                if (this.commit !== undefined)
                    writer.writeMessage(11, this.commit, () => this.commit.serialize(writer));
                if (this.list_snapshots !== undefined)
                    writer.writeMessage(12, this.list_snapshots, () => this.list_snapshots.serialize(writer));
                if (this.offer_snapshot !== undefined)
                    writer.writeMessage(13, this.offer_snapshot, () => this.offer_snapshot.serialize(writer));
                if (this.load_snapshot_chunk !== undefined)
                    writer.writeMessage(14, this.load_snapshot_chunk, () => this.load_snapshot_chunk.serialize(writer));
                if (this.apply_snapshot_chunk !== undefined)
                    writer.writeMessage(15, this.apply_snapshot_chunk, () => this.apply_snapshot_chunk.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Request();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.echo, () => message.echo = RequestEcho.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.flush, () => message.flush = RequestFlush.deserialize(reader));
                            break;
                        case 3:
                            reader.readMessage(message.info, () => message.info = RequestInfo.deserialize(reader));
                            break;
                        case 4:
                            reader.readMessage(message.set_option, () => message.set_option = RequestSetOption.deserialize(reader));
                            break;
                        case 5:
                            reader.readMessage(message.init_chain, () => message.init_chain = RequestInitChain.deserialize(reader));
                            break;
                        case 6:
                            reader.readMessage(message.query, () => message.query = RequestQuery.deserialize(reader));
                            break;
                        case 7:
                            reader.readMessage(message.begin_block, () => message.begin_block = RequestBeginBlock.deserialize(reader));
                            break;
                        case 8:
                            reader.readMessage(message.check_tx, () => message.check_tx = RequestCheckTx.deserialize(reader));
                            break;
                        case 9:
                            reader.readMessage(message.deliver_tx, () => message.deliver_tx = RequestDeliverTx.deserialize(reader));
                            break;
                        case 10:
                            reader.readMessage(message.end_block, () => message.end_block = RequestEndBlock.deserialize(reader));
                            break;
                        case 11:
                            reader.readMessage(message.commit, () => message.commit = RequestCommit.deserialize(reader));
                            break;
                        case 12:
                            reader.readMessage(message.list_snapshots, () => message.list_snapshots = RequestListSnapshots.deserialize(reader));
                            break;
                        case 13:
                            reader.readMessage(message.offer_snapshot, () => message.offer_snapshot = RequestOfferSnapshot.deserialize(reader));
                            break;
                        case 14:
                            reader.readMessage(message.load_snapshot_chunk, () => message.load_snapshot_chunk = RequestLoadSnapshotChunk.deserialize(reader));
                            break;
                        case 15:
                            reader.readMessage(message.apply_snapshot_chunk, () => message.apply_snapshot_chunk = RequestApplySnapshotChunk.deserialize(reader));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return Request.deserialize(bytes);
            }
        }
        abci.Request = Request;
        class RequestEcho extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("message" in data && data.message != undefined) {
                        this.message = data.message;
                    }
                }
            }
            get message() {
                return pb_1.Message.getField(this, 1);
            }
            set message(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new RequestEcho({});
                if (data.message != null) {
                    message.message = data.message;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.message != null) {
                    data.message = this.message;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.message === "string" && this.message.length)
                    writer.writeString(1, this.message);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestEcho();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.message = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestEcho.deserialize(bytes);
            }
        }
        abci.RequestEcho = RequestEcho;
        class RequestFlush extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") { }
            }
            static fromObject(data) {
                const message = new RequestFlush({});
                return message;
            }
            toObject() {
                const data = {};
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestFlush();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestFlush.deserialize(bytes);
            }
        }
        abci.RequestFlush = RequestFlush;
        class RequestInfo extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("version" in data && data.version != undefined) {
                        this.version = data.version;
                    }
                    if ("block_version" in data && data.block_version != undefined) {
                        this.block_version = data.block_version;
                    }
                    if ("p2p_version" in data && data.p2p_version != undefined) {
                        this.p2p_version = data.p2p_version;
                    }
                }
            }
            get version() {
                return pb_1.Message.getField(this, 1);
            }
            set version(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get block_version() {
                return pb_1.Message.getField(this, 2);
            }
            set block_version(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get p2p_version() {
                return pb_1.Message.getField(this, 3);
            }
            set p2p_version(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new RequestInfo({});
                if (data.version != null) {
                    message.version = data.version;
                }
                if (data.block_version != null) {
                    message.block_version = data.block_version;
                }
                if (data.p2p_version != null) {
                    message.p2p_version = data.p2p_version;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.version != null) {
                    data.version = this.version;
                }
                if (this.block_version != null) {
                    data.block_version = this.block_version;
                }
                if (this.p2p_version != null) {
                    data.p2p_version = this.p2p_version;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.version === "string" && this.version.length)
                    writer.writeString(1, this.version);
                if (this.block_version !== undefined)
                    writer.writeUint64(2, this.block_version);
                if (this.p2p_version !== undefined)
                    writer.writeUint64(3, this.p2p_version);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestInfo();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.version = reader.readString();
                            break;
                        case 2:
                            message.block_version = reader.readUint64();
                            break;
                        case 3:
                            message.p2p_version = reader.readUint64();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestInfo.deserialize(bytes);
            }
        }
        abci.RequestInfo = RequestInfo;
        class RequestSetOption extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("key" in data && data.key != undefined) {
                        this.key = data.key;
                    }
                    if ("value" in data && data.value != undefined) {
                        this.value = data.value;
                    }
                }
            }
            get key() {
                return pb_1.Message.getField(this, 1);
            }
            set key(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get value() {
                return pb_1.Message.getField(this, 2);
            }
            set value(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new RequestSetOption({});
                if (data.key != null) {
                    message.key = data.key;
                }
                if (data.value != null) {
                    message.value = data.value;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.key != null) {
                    data.key = this.key;
                }
                if (this.value != null) {
                    data.value = this.value;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.key === "string" && this.key.length)
                    writer.writeString(1, this.key);
                if (typeof this.value === "string" && this.value.length)
                    writer.writeString(2, this.value);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestSetOption();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.key = reader.readString();
                            break;
                        case 2:
                            message.value = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestSetOption.deserialize(bytes);
            }
        }
        abci.RequestSetOption = RequestSetOption;
        class RequestInitChain extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("time" in data && data.time != undefined) {
                        this.time = data.time;
                    }
                    if ("chain_id" in data && data.chain_id != undefined) {
                        this.chain_id = data.chain_id;
                    }
                    if ("consensus_params" in data && data.consensus_params != undefined) {
                        this.consensus_params = data.consensus_params;
                    }
                    if ("validators" in data && data.validators != undefined) {
                        this.validators = data.validators;
                    }
                    if ("app_state_bytes" in data && data.app_state_bytes != undefined) {
                        this.app_state_bytes = data.app_state_bytes;
                    }
                    if ("initial_height" in data && data.initial_height != undefined) {
                        this.initial_height = data.initial_height;
                    }
                }
            }
            get time() {
                return pb_1.Message.getWrapperField(this, dependency_5.google.protobuf.Timestamp, 1);
            }
            set time(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get chain_id() {
                return pb_1.Message.getField(this, 2);
            }
            set chain_id(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get consensus_params() {
                return pb_1.Message.getWrapperField(this, ConsensusParams, 3);
            }
            set consensus_params(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            get validators() {
                return pb_1.Message.getRepeatedWrapperField(this, ValidatorUpdate, 4);
            }
            set validators(value) {
                pb_1.Message.setRepeatedWrapperField(this, 4, value);
            }
            get app_state_bytes() {
                return pb_1.Message.getField(this, 5);
            }
            set app_state_bytes(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get initial_height() {
                return pb_1.Message.getField(this, 6);
            }
            set initial_height(value) {
                pb_1.Message.setField(this, 6, value);
            }
            static fromObject(data) {
                const message = new RequestInitChain({});
                if (data.time != null) {
                    message.time = dependency_5.google.protobuf.Timestamp.fromObject(data.time);
                }
                if (data.chain_id != null) {
                    message.chain_id = data.chain_id;
                }
                if (data.consensus_params != null) {
                    message.consensus_params = ConsensusParams.fromObject(data.consensus_params);
                }
                if (data.validators != null) {
                    message.validators = data.validators.map(item => ValidatorUpdate.fromObject(item));
                }
                if (data.app_state_bytes != null) {
                    message.app_state_bytes = data.app_state_bytes;
                }
                if (data.initial_height != null) {
                    message.initial_height = data.initial_height;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.time != null) {
                    data.time = this.time.toObject();
                }
                if (this.chain_id != null) {
                    data.chain_id = this.chain_id;
                }
                if (this.consensus_params != null) {
                    data.consensus_params = this.consensus_params.toObject();
                }
                if (this.validators != null) {
                    data.validators = this.validators.map((item) => item.toObject());
                }
                if (this.app_state_bytes != null) {
                    data.app_state_bytes = this.app_state_bytes;
                }
                if (this.initial_height != null) {
                    data.initial_height = this.initial_height;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.time !== undefined)
                    writer.writeMessage(1, this.time, () => this.time.serialize(writer));
                if (typeof this.chain_id === "string" && this.chain_id.length)
                    writer.writeString(2, this.chain_id);
                if (this.consensus_params !== undefined)
                    writer.writeMessage(3, this.consensus_params, () => this.consensus_params.serialize(writer));
                if (this.validators !== undefined)
                    writer.writeRepeatedMessage(4, this.validators, (item) => item.serialize(writer));
                if (this.app_state_bytes !== undefined)
                    writer.writeBytes(5, this.app_state_bytes);
                if (this.initial_height !== undefined)
                    writer.writeInt64(6, this.initial_height);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestInitChain();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.time, () => message.time = dependency_5.google.protobuf.Timestamp.deserialize(reader));
                            break;
                        case 2:
                            message.chain_id = reader.readString();
                            break;
                        case 3:
                            reader.readMessage(message.consensus_params, () => message.consensus_params = ConsensusParams.deserialize(reader));
                            break;
                        case 4:
                            reader.readMessage(message.validators, () => pb_1.Message.addToRepeatedWrapperField(message, 4, ValidatorUpdate.deserialize(reader), ValidatorUpdate));
                            break;
                        case 5:
                            message.app_state_bytes = reader.readBytes();
                            break;
                        case 6:
                            message.initial_height = reader.readInt64();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestInitChain.deserialize(bytes);
            }
        }
        abci.RequestInitChain = RequestInitChain;
        class RequestQuery extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("data" in data && data.data != undefined) {
                        this.data = data.data;
                    }
                    if ("path" in data && data.path != undefined) {
                        this.path = data.path;
                    }
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("prove" in data && data.prove != undefined) {
                        this.prove = data.prove;
                    }
                }
            }
            get data() {
                return pb_1.Message.getField(this, 1);
            }
            set data(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get path() {
                return pb_1.Message.getField(this, 2);
            }
            set path(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get height() {
                return pb_1.Message.getField(this, 3);
            }
            set height(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get prove() {
                return pb_1.Message.getField(this, 4);
            }
            set prove(value) {
                pb_1.Message.setField(this, 4, value);
            }
            static fromObject(data) {
                const message = new RequestQuery({});
                if (data.data != null) {
                    message.data = data.data;
                }
                if (data.path != null) {
                    message.path = data.path;
                }
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.prove != null) {
                    message.prove = data.prove;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.data != null) {
                    data.data = this.data;
                }
                if (this.path != null) {
                    data.path = this.path;
                }
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.prove != null) {
                    data.prove = this.prove;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.data !== undefined)
                    writer.writeBytes(1, this.data);
                if (typeof this.path === "string" && this.path.length)
                    writer.writeString(2, this.path);
                if (this.height !== undefined)
                    writer.writeInt64(3, this.height);
                if (this.prove !== undefined)
                    writer.writeBool(4, this.prove);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestQuery();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.data = reader.readBytes();
                            break;
                        case 2:
                            message.path = reader.readString();
                            break;
                        case 3:
                            message.height = reader.readInt64();
                            break;
                        case 4:
                            message.prove = reader.readBool();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestQuery.deserialize(bytes);
            }
        }
        abci.RequestQuery = RequestQuery;
        class RequestBeginBlock extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("hash" in data && data.hash != undefined) {
                        this.hash = data.hash;
                    }
                    if ("header" in data && data.header != undefined) {
                        this.header = data.header;
                    }
                    if ("last_commit_info" in data && data.last_commit_info != undefined) {
                        this.last_commit_info = data.last_commit_info;
                    }
                    if ("byzantine_validators" in data && data.byzantine_validators != undefined) {
                        this.byzantine_validators = data.byzantine_validators;
                    }
                }
            }
            get hash() {
                return pb_1.Message.getField(this, 1);
            }
            set hash(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get header() {
                return pb_1.Message.getWrapperField(this, dependency_2.tendermint.types.Header, 2);
            }
            set header(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get last_commit_info() {
                return pb_1.Message.getWrapperField(this, LastCommitInfo, 3);
            }
            set last_commit_info(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            get byzantine_validators() {
                return pb_1.Message.getRepeatedWrapperField(this, Evidence, 4);
            }
            set byzantine_validators(value) {
                pb_1.Message.setRepeatedWrapperField(this, 4, value);
            }
            static fromObject(data) {
                const message = new RequestBeginBlock({});
                if (data.hash != null) {
                    message.hash = data.hash;
                }
                if (data.header != null) {
                    message.header = dependency_2.tendermint.types.Header.fromObject(data.header);
                }
                if (data.last_commit_info != null) {
                    message.last_commit_info = LastCommitInfo.fromObject(data.last_commit_info);
                }
                if (data.byzantine_validators != null) {
                    message.byzantine_validators = data.byzantine_validators.map(item => Evidence.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.hash != null) {
                    data.hash = this.hash;
                }
                if (this.header != null) {
                    data.header = this.header.toObject();
                }
                if (this.last_commit_info != null) {
                    data.last_commit_info = this.last_commit_info.toObject();
                }
                if (this.byzantine_validators != null) {
                    data.byzantine_validators = this.byzantine_validators.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.hash !== undefined)
                    writer.writeBytes(1, this.hash);
                if (this.header !== undefined)
                    writer.writeMessage(2, this.header, () => this.header.serialize(writer));
                if (this.last_commit_info !== undefined)
                    writer.writeMessage(3, this.last_commit_info, () => this.last_commit_info.serialize(writer));
                if (this.byzantine_validators !== undefined)
                    writer.writeRepeatedMessage(4, this.byzantine_validators, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestBeginBlock();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.hash = reader.readBytes();
                            break;
                        case 2:
                            reader.readMessage(message.header, () => message.header = dependency_2.tendermint.types.Header.deserialize(reader));
                            break;
                        case 3:
                            reader.readMessage(message.last_commit_info, () => message.last_commit_info = LastCommitInfo.deserialize(reader));
                            break;
                        case 4:
                            reader.readMessage(message.byzantine_validators, () => pb_1.Message.addToRepeatedWrapperField(message, 4, Evidence.deserialize(reader), Evidence));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestBeginBlock.deserialize(bytes);
            }
        }
        abci.RequestBeginBlock = RequestBeginBlock;
        class RequestCheckTx extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("tx" in data && data.tx != undefined) {
                        this.tx = data.tx;
                    }
                    if ("type" in data && data.type != undefined) {
                        this.type = data.type;
                    }
                }
            }
            get tx() {
                return pb_1.Message.getField(this, 1);
            }
            set tx(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get type() {
                return pb_1.Message.getField(this, 2);
            }
            set type(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new RequestCheckTx({});
                if (data.tx != null) {
                    message.tx = data.tx;
                }
                if (data.type != null) {
                    message.type = data.type;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.tx != null) {
                    data.tx = this.tx;
                }
                if (this.type != null) {
                    data.type = this.type;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.tx !== undefined)
                    writer.writeBytes(1, this.tx);
                if (this.type !== undefined)
                    writer.writeEnum(2, this.type);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestCheckTx();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.tx = reader.readBytes();
                            break;
                        case 2:
                            message.type = reader.readEnum();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestCheckTx.deserialize(bytes);
            }
        }
        abci.RequestCheckTx = RequestCheckTx;
        class RequestDeliverTx extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("tx" in data && data.tx != undefined) {
                        this.tx = data.tx;
                    }
                }
            }
            get tx() {
                return pb_1.Message.getField(this, 1);
            }
            set tx(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new RequestDeliverTx({});
                if (data.tx != null) {
                    message.tx = data.tx;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.tx != null) {
                    data.tx = this.tx;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.tx !== undefined)
                    writer.writeBytes(1, this.tx);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestDeliverTx();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.tx = reader.readBytes();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestDeliverTx.deserialize(bytes);
            }
        }
        abci.RequestDeliverTx = RequestDeliverTx;
        class RequestEndBlock extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                }
            }
            get height() {
                return pb_1.Message.getField(this, 1);
            }
            set height(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new RequestEndBlock({});
                if (data.height != null) {
                    message.height = data.height;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.height != null) {
                    data.height = this.height;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.height !== undefined)
                    writer.writeInt64(1, this.height);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestEndBlock();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.height = reader.readInt64();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestEndBlock.deserialize(bytes);
            }
        }
        abci.RequestEndBlock = RequestEndBlock;
        class RequestCommit extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") { }
            }
            static fromObject(data) {
                const message = new RequestCommit({});
                return message;
            }
            toObject() {
                const data = {};
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestCommit();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestCommit.deserialize(bytes);
            }
        }
        abci.RequestCommit = RequestCommit;
        class RequestListSnapshots extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") { }
            }
            static fromObject(data) {
                const message = new RequestListSnapshots({});
                return message;
            }
            toObject() {
                const data = {};
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestListSnapshots();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestListSnapshots.deserialize(bytes);
            }
        }
        abci.RequestListSnapshots = RequestListSnapshots;
        class RequestOfferSnapshot extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("snapshot" in data && data.snapshot != undefined) {
                        this.snapshot = data.snapshot;
                    }
                    if ("app_hash" in data && data.app_hash != undefined) {
                        this.app_hash = data.app_hash;
                    }
                }
            }
            get snapshot() {
                return pb_1.Message.getWrapperField(this, Snapshot, 1);
            }
            set snapshot(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get app_hash() {
                return pb_1.Message.getField(this, 2);
            }
            set app_hash(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new RequestOfferSnapshot({});
                if (data.snapshot != null) {
                    message.snapshot = Snapshot.fromObject(data.snapshot);
                }
                if (data.app_hash != null) {
                    message.app_hash = data.app_hash;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.snapshot != null) {
                    data.snapshot = this.snapshot.toObject();
                }
                if (this.app_hash != null) {
                    data.app_hash = this.app_hash;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.snapshot !== undefined)
                    writer.writeMessage(1, this.snapshot, () => this.snapshot.serialize(writer));
                if (this.app_hash !== undefined)
                    writer.writeBytes(2, this.app_hash);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestOfferSnapshot();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.snapshot, () => message.snapshot = Snapshot.deserialize(reader));
                            break;
                        case 2:
                            message.app_hash = reader.readBytes();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestOfferSnapshot.deserialize(bytes);
            }
        }
        abci.RequestOfferSnapshot = RequestOfferSnapshot;
        class RequestLoadSnapshotChunk extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("format" in data && data.format != undefined) {
                        this.format = data.format;
                    }
                    if ("chunk" in data && data.chunk != undefined) {
                        this.chunk = data.chunk;
                    }
                }
            }
            get height() {
                return pb_1.Message.getField(this, 1);
            }
            set height(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get format() {
                return pb_1.Message.getField(this, 2);
            }
            set format(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get chunk() {
                return pb_1.Message.getField(this, 3);
            }
            set chunk(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new RequestLoadSnapshotChunk({});
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.format != null) {
                    message.format = data.format;
                }
                if (data.chunk != null) {
                    message.chunk = data.chunk;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.format != null) {
                    data.format = this.format;
                }
                if (this.chunk != null) {
                    data.chunk = this.chunk;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.height !== undefined)
                    writer.writeUint64(1, this.height);
                if (this.format !== undefined)
                    writer.writeUint32(2, this.format);
                if (this.chunk !== undefined)
                    writer.writeUint32(3, this.chunk);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestLoadSnapshotChunk();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.height = reader.readUint64();
                            break;
                        case 2:
                            message.format = reader.readUint32();
                            break;
                        case 3:
                            message.chunk = reader.readUint32();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestLoadSnapshotChunk.deserialize(bytes);
            }
        }
        abci.RequestLoadSnapshotChunk = RequestLoadSnapshotChunk;
        class RequestApplySnapshotChunk extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("index" in data && data.index != undefined) {
                        this.index = data.index;
                    }
                    if ("chunk" in data && data.chunk != undefined) {
                        this.chunk = data.chunk;
                    }
                    if ("sender" in data && data.sender != undefined) {
                        this.sender = data.sender;
                    }
                }
            }
            get index() {
                return pb_1.Message.getField(this, 1);
            }
            set index(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get chunk() {
                return pb_1.Message.getField(this, 2);
            }
            set chunk(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get sender() {
                return pb_1.Message.getField(this, 3);
            }
            set sender(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new RequestApplySnapshotChunk({});
                if (data.index != null) {
                    message.index = data.index;
                }
                if (data.chunk != null) {
                    message.chunk = data.chunk;
                }
                if (data.sender != null) {
                    message.sender = data.sender;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.index != null) {
                    data.index = this.index;
                }
                if (this.chunk != null) {
                    data.chunk = this.chunk;
                }
                if (this.sender != null) {
                    data.sender = this.sender;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.index !== undefined)
                    writer.writeUint32(1, this.index);
                if (this.chunk !== undefined)
                    writer.writeBytes(2, this.chunk);
                if (typeof this.sender === "string" && this.sender.length)
                    writer.writeString(3, this.sender);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestApplySnapshotChunk();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.index = reader.readUint32();
                            break;
                        case 2:
                            message.chunk = reader.readBytes();
                            break;
                        case 3:
                            message.sender = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return RequestApplySnapshotChunk.deserialize(bytes);
            }
        }
        abci.RequestApplySnapshotChunk = RequestApplySnapshotChunk;
        class Response extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("exception" in data && data.exception != undefined) {
                        this.exception = data.exception;
                    }
                    if ("echo" in data && data.echo != undefined) {
                        this.echo = data.echo;
                    }
                    if ("flush" in data && data.flush != undefined) {
                        this.flush = data.flush;
                    }
                    if ("info" in data && data.info != undefined) {
                        this.info = data.info;
                    }
                    if ("set_option" in data && data.set_option != undefined) {
                        this.set_option = data.set_option;
                    }
                    if ("init_chain" in data && data.init_chain != undefined) {
                        this.init_chain = data.init_chain;
                    }
                    if ("query" in data && data.query != undefined) {
                        this.query = data.query;
                    }
                    if ("begin_block" in data && data.begin_block != undefined) {
                        this.begin_block = data.begin_block;
                    }
                    if ("check_tx" in data && data.check_tx != undefined) {
                        this.check_tx = data.check_tx;
                    }
                    if ("deliver_tx" in data && data.deliver_tx != undefined) {
                        this.deliver_tx = data.deliver_tx;
                    }
                    if ("end_block" in data && data.end_block != undefined) {
                        this.end_block = data.end_block;
                    }
                    if ("commit" in data && data.commit != undefined) {
                        this.commit = data.commit;
                    }
                    if ("list_snapshots" in data && data.list_snapshots != undefined) {
                        this.list_snapshots = data.list_snapshots;
                    }
                    if ("offer_snapshot" in data && data.offer_snapshot != undefined) {
                        this.offer_snapshot = data.offer_snapshot;
                    }
                    if ("load_snapshot_chunk" in data && data.load_snapshot_chunk != undefined) {
                        this.load_snapshot_chunk = data.load_snapshot_chunk;
                    }
                    if ("apply_snapshot_chunk" in data && data.apply_snapshot_chunk != undefined) {
                        this.apply_snapshot_chunk = data.apply_snapshot_chunk;
                    }
                }
            }
            get exception() {
                return pb_1.Message.getWrapperField(this, ResponseException, 1);
            }
            set exception(value) {
                pb_1.Message.setOneofWrapperField(this, 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get echo() {
                return pb_1.Message.getWrapperField(this, ResponseEcho, 2);
            }
            set echo(value) {
                pb_1.Message.setOneofWrapperField(this, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get flush() {
                return pb_1.Message.getWrapperField(this, ResponseFlush, 3);
            }
            set flush(value) {
                pb_1.Message.setOneofWrapperField(this, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get info() {
                return pb_1.Message.getWrapperField(this, ResponseInfo, 4);
            }
            set info(value) {
                pb_1.Message.setOneofWrapperField(this, 4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get set_option() {
                return pb_1.Message.getWrapperField(this, ResponseSetOption, 5);
            }
            set set_option(value) {
                pb_1.Message.setOneofWrapperField(this, 5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get init_chain() {
                return pb_1.Message.getWrapperField(this, ResponseInitChain, 6);
            }
            set init_chain(value) {
                pb_1.Message.setOneofWrapperField(this, 6, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get query() {
                return pb_1.Message.getWrapperField(this, ResponseQuery, 7);
            }
            set query(value) {
                pb_1.Message.setOneofWrapperField(this, 7, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get begin_block() {
                return pb_1.Message.getWrapperField(this, ResponseBeginBlock, 8);
            }
            set begin_block(value) {
                pb_1.Message.setOneofWrapperField(this, 8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get check_tx() {
                return pb_1.Message.getWrapperField(this, ResponseCheckTx, 9);
            }
            set check_tx(value) {
                pb_1.Message.setOneofWrapperField(this, 9, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get deliver_tx() {
                return pb_1.Message.getWrapperField(this, ResponseDeliverTx, 10);
            }
            set deliver_tx(value) {
                pb_1.Message.setOneofWrapperField(this, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get end_block() {
                return pb_1.Message.getWrapperField(this, ResponseEndBlock, 11);
            }
            set end_block(value) {
                pb_1.Message.setOneofWrapperField(this, 11, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get commit() {
                return pb_1.Message.getWrapperField(this, ResponseCommit, 12);
            }
            set commit(value) {
                pb_1.Message.setOneofWrapperField(this, 12, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get list_snapshots() {
                return pb_1.Message.getWrapperField(this, ResponseListSnapshots, 13);
            }
            set list_snapshots(value) {
                pb_1.Message.setOneofWrapperField(this, 13, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get offer_snapshot() {
                return pb_1.Message.getWrapperField(this, ResponseOfferSnapshot, 14);
            }
            set offer_snapshot(value) {
                pb_1.Message.setOneofWrapperField(this, 14, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get load_snapshot_chunk() {
                return pb_1.Message.getWrapperField(this, ResponseLoadSnapshotChunk, 15);
            }
            set load_snapshot_chunk(value) {
                pb_1.Message.setOneofWrapperField(this, 15, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get apply_snapshot_chunk() {
                return pb_1.Message.getWrapperField(this, ResponseApplySnapshotChunk, 16);
            }
            set apply_snapshot_chunk(value) {
                pb_1.Message.setOneofWrapperField(this, 16, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], value);
            }
            get value() {
                const cases = {
                    0: "none",
                    1: "exception",
                    2: "echo",
                    3: "flush",
                    4: "info",
                    5: "set_option",
                    6: "init_chain",
                    7: "query",
                    8: "begin_block",
                    9: "check_tx",
                    10: "deliver_tx",
                    11: "end_block",
                    12: "commit",
                    13: "list_snapshots",
                    14: "offer_snapshot",
                    15: "load_snapshot_chunk",
                    16: "apply_snapshot_chunk"
                };
                return cases[pb_1.Message.computeOneofCase(this, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])];
            }
            static fromObject(data) {
                const message = new Response({});
                if (data.exception != null) {
                    message.exception = ResponseException.fromObject(data.exception);
                }
                if (data.echo != null) {
                    message.echo = ResponseEcho.fromObject(data.echo);
                }
                if (data.flush != null) {
                    message.flush = ResponseFlush.fromObject(data.flush);
                }
                if (data.info != null) {
                    message.info = ResponseInfo.fromObject(data.info);
                }
                if (data.set_option != null) {
                    message.set_option = ResponseSetOption.fromObject(data.set_option);
                }
                if (data.init_chain != null) {
                    message.init_chain = ResponseInitChain.fromObject(data.init_chain);
                }
                if (data.query != null) {
                    message.query = ResponseQuery.fromObject(data.query);
                }
                if (data.begin_block != null) {
                    message.begin_block = ResponseBeginBlock.fromObject(data.begin_block);
                }
                if (data.check_tx != null) {
                    message.check_tx = ResponseCheckTx.fromObject(data.check_tx);
                }
                if (data.deliver_tx != null) {
                    message.deliver_tx = ResponseDeliverTx.fromObject(data.deliver_tx);
                }
                if (data.end_block != null) {
                    message.end_block = ResponseEndBlock.fromObject(data.end_block);
                }
                if (data.commit != null) {
                    message.commit = ResponseCommit.fromObject(data.commit);
                }
                if (data.list_snapshots != null) {
                    message.list_snapshots = ResponseListSnapshots.fromObject(data.list_snapshots);
                }
                if (data.offer_snapshot != null) {
                    message.offer_snapshot = ResponseOfferSnapshot.fromObject(data.offer_snapshot);
                }
                if (data.load_snapshot_chunk != null) {
                    message.load_snapshot_chunk = ResponseLoadSnapshotChunk.fromObject(data.load_snapshot_chunk);
                }
                if (data.apply_snapshot_chunk != null) {
                    message.apply_snapshot_chunk = ResponseApplySnapshotChunk.fromObject(data.apply_snapshot_chunk);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.exception != null) {
                    data.exception = this.exception.toObject();
                }
                if (this.echo != null) {
                    data.echo = this.echo.toObject();
                }
                if (this.flush != null) {
                    data.flush = this.flush.toObject();
                }
                if (this.info != null) {
                    data.info = this.info.toObject();
                }
                if (this.set_option != null) {
                    data.set_option = this.set_option.toObject();
                }
                if (this.init_chain != null) {
                    data.init_chain = this.init_chain.toObject();
                }
                if (this.query != null) {
                    data.query = this.query.toObject();
                }
                if (this.begin_block != null) {
                    data.begin_block = this.begin_block.toObject();
                }
                if (this.check_tx != null) {
                    data.check_tx = this.check_tx.toObject();
                }
                if (this.deliver_tx != null) {
                    data.deliver_tx = this.deliver_tx.toObject();
                }
                if (this.end_block != null) {
                    data.end_block = this.end_block.toObject();
                }
                if (this.commit != null) {
                    data.commit = this.commit.toObject();
                }
                if (this.list_snapshots != null) {
                    data.list_snapshots = this.list_snapshots.toObject();
                }
                if (this.offer_snapshot != null) {
                    data.offer_snapshot = this.offer_snapshot.toObject();
                }
                if (this.load_snapshot_chunk != null) {
                    data.load_snapshot_chunk = this.load_snapshot_chunk.toObject();
                }
                if (this.apply_snapshot_chunk != null) {
                    data.apply_snapshot_chunk = this.apply_snapshot_chunk.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.exception !== undefined)
                    writer.writeMessage(1, this.exception, () => this.exception.serialize(writer));
                if (this.echo !== undefined)
                    writer.writeMessage(2, this.echo, () => this.echo.serialize(writer));
                if (this.flush !== undefined)
                    writer.writeMessage(3, this.flush, () => this.flush.serialize(writer));
                if (this.info !== undefined)
                    writer.writeMessage(4, this.info, () => this.info.serialize(writer));
                if (this.set_option !== undefined)
                    writer.writeMessage(5, this.set_option, () => this.set_option.serialize(writer));
                if (this.init_chain !== undefined)
                    writer.writeMessage(6, this.init_chain, () => this.init_chain.serialize(writer));
                if (this.query !== undefined)
                    writer.writeMessage(7, this.query, () => this.query.serialize(writer));
                if (this.begin_block !== undefined)
                    writer.writeMessage(8, this.begin_block, () => this.begin_block.serialize(writer));
                if (this.check_tx !== undefined)
                    writer.writeMessage(9, this.check_tx, () => this.check_tx.serialize(writer));
                if (this.deliver_tx !== undefined)
                    writer.writeMessage(10, this.deliver_tx, () => this.deliver_tx.serialize(writer));
                if (this.end_block !== undefined)
                    writer.writeMessage(11, this.end_block, () => this.end_block.serialize(writer));
                if (this.commit !== undefined)
                    writer.writeMessage(12, this.commit, () => this.commit.serialize(writer));
                if (this.list_snapshots !== undefined)
                    writer.writeMessage(13, this.list_snapshots, () => this.list_snapshots.serialize(writer));
                if (this.offer_snapshot !== undefined)
                    writer.writeMessage(14, this.offer_snapshot, () => this.offer_snapshot.serialize(writer));
                if (this.load_snapshot_chunk !== undefined)
                    writer.writeMessage(15, this.load_snapshot_chunk, () => this.load_snapshot_chunk.serialize(writer));
                if (this.apply_snapshot_chunk !== undefined)
                    writer.writeMessage(16, this.apply_snapshot_chunk, () => this.apply_snapshot_chunk.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Response();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.exception, () => message.exception = ResponseException.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.echo, () => message.echo = ResponseEcho.deserialize(reader));
                            break;
                        case 3:
                            reader.readMessage(message.flush, () => message.flush = ResponseFlush.deserialize(reader));
                            break;
                        case 4:
                            reader.readMessage(message.info, () => message.info = ResponseInfo.deserialize(reader));
                            break;
                        case 5:
                            reader.readMessage(message.set_option, () => message.set_option = ResponseSetOption.deserialize(reader));
                            break;
                        case 6:
                            reader.readMessage(message.init_chain, () => message.init_chain = ResponseInitChain.deserialize(reader));
                            break;
                        case 7:
                            reader.readMessage(message.query, () => message.query = ResponseQuery.deserialize(reader));
                            break;
                        case 8:
                            reader.readMessage(message.begin_block, () => message.begin_block = ResponseBeginBlock.deserialize(reader));
                            break;
                        case 9:
                            reader.readMessage(message.check_tx, () => message.check_tx = ResponseCheckTx.deserialize(reader));
                            break;
                        case 10:
                            reader.readMessage(message.deliver_tx, () => message.deliver_tx = ResponseDeliverTx.deserialize(reader));
                            break;
                        case 11:
                            reader.readMessage(message.end_block, () => message.end_block = ResponseEndBlock.deserialize(reader));
                            break;
                        case 12:
                            reader.readMessage(message.commit, () => message.commit = ResponseCommit.deserialize(reader));
                            break;
                        case 13:
                            reader.readMessage(message.list_snapshots, () => message.list_snapshots = ResponseListSnapshots.deserialize(reader));
                            break;
                        case 14:
                            reader.readMessage(message.offer_snapshot, () => message.offer_snapshot = ResponseOfferSnapshot.deserialize(reader));
                            break;
                        case 15:
                            reader.readMessage(message.load_snapshot_chunk, () => message.load_snapshot_chunk = ResponseLoadSnapshotChunk.deserialize(reader));
                            break;
                        case 16:
                            reader.readMessage(message.apply_snapshot_chunk, () => message.apply_snapshot_chunk = ResponseApplySnapshotChunk.deserialize(reader));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return Response.deserialize(bytes);
            }
        }
        abci.Response = Response;
        class ResponseException extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("error" in data && data.error != undefined) {
                        this.error = data.error;
                    }
                }
            }
            get error() {
                return pb_1.Message.getField(this, 1);
            }
            set error(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new ResponseException({});
                if (data.error != null) {
                    message.error = data.error;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.error != null) {
                    data.error = this.error;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.error === "string" && this.error.length)
                    writer.writeString(1, this.error);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseException();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.error = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseException.deserialize(bytes);
            }
        }
        abci.ResponseException = ResponseException;
        class ResponseEcho extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("message" in data && data.message != undefined) {
                        this.message = data.message;
                    }
                }
            }
            get message() {
                return pb_1.Message.getField(this, 1);
            }
            set message(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new ResponseEcho({});
                if (data.message != null) {
                    message.message = data.message;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.message != null) {
                    data.message = this.message;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.message === "string" && this.message.length)
                    writer.writeString(1, this.message);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseEcho();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.message = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseEcho.deserialize(bytes);
            }
        }
        abci.ResponseEcho = ResponseEcho;
        class ResponseFlush extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") { }
            }
            static fromObject(data) {
                const message = new ResponseFlush({});
                return message;
            }
            toObject() {
                const data = {};
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseFlush();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseFlush.deserialize(bytes);
            }
        }
        abci.ResponseFlush = ResponseFlush;
        class ResponseInfo extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("data" in data && data.data != undefined) {
                        this.data = data.data;
                    }
                    if ("version" in data && data.version != undefined) {
                        this.version = data.version;
                    }
                    if ("app_version" in data && data.app_version != undefined) {
                        this.app_version = data.app_version;
                    }
                    if ("last_block_height" in data && data.last_block_height != undefined) {
                        this.last_block_height = data.last_block_height;
                    }
                    if ("last_block_app_hash" in data && data.last_block_app_hash != undefined) {
                        this.last_block_app_hash = data.last_block_app_hash;
                    }
                }
            }
            get data() {
                return pb_1.Message.getField(this, 1);
            }
            set data(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get version() {
                return pb_1.Message.getField(this, 2);
            }
            set version(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get app_version() {
                return pb_1.Message.getField(this, 3);
            }
            set app_version(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get last_block_height() {
                return pb_1.Message.getField(this, 4);
            }
            set last_block_height(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get last_block_app_hash() {
                return pb_1.Message.getField(this, 5);
            }
            set last_block_app_hash(value) {
                pb_1.Message.setField(this, 5, value);
            }
            static fromObject(data) {
                const message = new ResponseInfo({});
                if (data.data != null) {
                    message.data = data.data;
                }
                if (data.version != null) {
                    message.version = data.version;
                }
                if (data.app_version != null) {
                    message.app_version = data.app_version;
                }
                if (data.last_block_height != null) {
                    message.last_block_height = data.last_block_height;
                }
                if (data.last_block_app_hash != null) {
                    message.last_block_app_hash = data.last_block_app_hash;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.data != null) {
                    data.data = this.data;
                }
                if (this.version != null) {
                    data.version = this.version;
                }
                if (this.app_version != null) {
                    data.app_version = this.app_version;
                }
                if (this.last_block_height != null) {
                    data.last_block_height = this.last_block_height;
                }
                if (this.last_block_app_hash != null) {
                    data.last_block_app_hash = this.last_block_app_hash;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.data === "string" && this.data.length)
                    writer.writeString(1, this.data);
                if (typeof this.version === "string" && this.version.length)
                    writer.writeString(2, this.version);
                if (this.app_version !== undefined)
                    writer.writeUint64(3, this.app_version);
                if (this.last_block_height !== undefined)
                    writer.writeInt64(4, this.last_block_height);
                if (this.last_block_app_hash !== undefined)
                    writer.writeBytes(5, this.last_block_app_hash);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseInfo();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.data = reader.readString();
                            break;
                        case 2:
                            message.version = reader.readString();
                            break;
                        case 3:
                            message.app_version = reader.readUint64();
                            break;
                        case 4:
                            message.last_block_height = reader.readInt64();
                            break;
                        case 5:
                            message.last_block_app_hash = reader.readBytes();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseInfo.deserialize(bytes);
            }
        }
        abci.ResponseInfo = ResponseInfo;
        class ResponseSetOption extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("code" in data && data.code != undefined) {
                        this.code = data.code;
                    }
                    if ("log" in data && data.log != undefined) {
                        this.log = data.log;
                    }
                    if ("info" in data && data.info != undefined) {
                        this.info = data.info;
                    }
                }
            }
            get code() {
                return pb_1.Message.getField(this, 1);
            }
            set code(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get log() {
                return pb_1.Message.getField(this, 3);
            }
            set log(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get info() {
                return pb_1.Message.getField(this, 4);
            }
            set info(value) {
                pb_1.Message.setField(this, 4, value);
            }
            static fromObject(data) {
                const message = new ResponseSetOption({});
                if (data.code != null) {
                    message.code = data.code;
                }
                if (data.log != null) {
                    message.log = data.log;
                }
                if (data.info != null) {
                    message.info = data.info;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.code != null) {
                    data.code = this.code;
                }
                if (this.log != null) {
                    data.log = this.log;
                }
                if (this.info != null) {
                    data.info = this.info;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.code !== undefined)
                    writer.writeUint32(1, this.code);
                if (typeof this.log === "string" && this.log.length)
                    writer.writeString(3, this.log);
                if (typeof this.info === "string" && this.info.length)
                    writer.writeString(4, this.info);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseSetOption();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.code = reader.readUint32();
                            break;
                        case 3:
                            message.log = reader.readString();
                            break;
                        case 4:
                            message.info = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseSetOption.deserialize(bytes);
            }
        }
        abci.ResponseSetOption = ResponseSetOption;
        class ResponseInitChain extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("consensus_params" in data && data.consensus_params != undefined) {
                        this.consensus_params = data.consensus_params;
                    }
                    if ("validators" in data && data.validators != undefined) {
                        this.validators = data.validators;
                    }
                    if ("app_hash" in data && data.app_hash != undefined) {
                        this.app_hash = data.app_hash;
                    }
                }
            }
            get consensus_params() {
                return pb_1.Message.getWrapperField(this, ConsensusParams, 1);
            }
            set consensus_params(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get validators() {
                return pb_1.Message.getRepeatedWrapperField(this, ValidatorUpdate, 2);
            }
            set validators(value) {
                pb_1.Message.setRepeatedWrapperField(this, 2, value);
            }
            get app_hash() {
                return pb_1.Message.getField(this, 3);
            }
            set app_hash(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new ResponseInitChain({});
                if (data.consensus_params != null) {
                    message.consensus_params = ConsensusParams.fromObject(data.consensus_params);
                }
                if (data.validators != null) {
                    message.validators = data.validators.map(item => ValidatorUpdate.fromObject(item));
                }
                if (data.app_hash != null) {
                    message.app_hash = data.app_hash;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.consensus_params != null) {
                    data.consensus_params = this.consensus_params.toObject();
                }
                if (this.validators != null) {
                    data.validators = this.validators.map((item) => item.toObject());
                }
                if (this.app_hash != null) {
                    data.app_hash = this.app_hash;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.consensus_params !== undefined)
                    writer.writeMessage(1, this.consensus_params, () => this.consensus_params.serialize(writer));
                if (this.validators !== undefined)
                    writer.writeRepeatedMessage(2, this.validators, (item) => item.serialize(writer));
                if (this.app_hash !== undefined)
                    writer.writeBytes(3, this.app_hash);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseInitChain();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.consensus_params, () => message.consensus_params = ConsensusParams.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.validators, () => pb_1.Message.addToRepeatedWrapperField(message, 2, ValidatorUpdate.deserialize(reader), ValidatorUpdate));
                            break;
                        case 3:
                            message.app_hash = reader.readBytes();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseInitChain.deserialize(bytes);
            }
        }
        abci.ResponseInitChain = ResponseInitChain;
        class ResponseQuery extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("code" in data && data.code != undefined) {
                        this.code = data.code;
                    }
                    if ("log" in data && data.log != undefined) {
                        this.log = data.log;
                    }
                    if ("info" in data && data.info != undefined) {
                        this.info = data.info;
                    }
                    if ("index" in data && data.index != undefined) {
                        this.index = data.index;
                    }
                    if ("key" in data && data.key != undefined) {
                        this.key = data.key;
                    }
                    if ("value" in data && data.value != undefined) {
                        this.value = data.value;
                    }
                    if ("proof_ops" in data && data.proof_ops != undefined) {
                        this.proof_ops = data.proof_ops;
                    }
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("codespace" in data && data.codespace != undefined) {
                        this.codespace = data.codespace;
                    }
                }
            }
            get code() {
                return pb_1.Message.getField(this, 1);
            }
            set code(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get log() {
                return pb_1.Message.getField(this, 3);
            }
            set log(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get info() {
                return pb_1.Message.getField(this, 4);
            }
            set info(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get index() {
                return pb_1.Message.getField(this, 5);
            }
            set index(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get key() {
                return pb_1.Message.getField(this, 6);
            }
            set key(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get value() {
                return pb_1.Message.getField(this, 7);
            }
            set value(value) {
                pb_1.Message.setField(this, 7, value);
            }
            get proof_ops() {
                return pb_1.Message.getWrapperField(this, dependency_1.tendermint.crypto.ProofOps, 8);
            }
            set proof_ops(value) {
                pb_1.Message.setWrapperField(this, 8, value);
            }
            get height() {
                return pb_1.Message.getField(this, 9);
            }
            set height(value) {
                pb_1.Message.setField(this, 9, value);
            }
            get codespace() {
                return pb_1.Message.getField(this, 10);
            }
            set codespace(value) {
                pb_1.Message.setField(this, 10, value);
            }
            static fromObject(data) {
                const message = new ResponseQuery({});
                if (data.code != null) {
                    message.code = data.code;
                }
                if (data.log != null) {
                    message.log = data.log;
                }
                if (data.info != null) {
                    message.info = data.info;
                }
                if (data.index != null) {
                    message.index = data.index;
                }
                if (data.key != null) {
                    message.key = data.key;
                }
                if (data.value != null) {
                    message.value = data.value;
                }
                if (data.proof_ops != null) {
                    message.proof_ops = dependency_1.tendermint.crypto.ProofOps.fromObject(data.proof_ops);
                }
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.codespace != null) {
                    message.codespace = data.codespace;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.code != null) {
                    data.code = this.code;
                }
                if (this.log != null) {
                    data.log = this.log;
                }
                if (this.info != null) {
                    data.info = this.info;
                }
                if (this.index != null) {
                    data.index = this.index;
                }
                if (this.key != null) {
                    data.key = this.key;
                }
                if (this.value != null) {
                    data.value = this.value;
                }
                if (this.proof_ops != null) {
                    data.proof_ops = this.proof_ops.toObject();
                }
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.codespace != null) {
                    data.codespace = this.codespace;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.code !== undefined)
                    writer.writeUint32(1, this.code);
                if (typeof this.log === "string" && this.log.length)
                    writer.writeString(3, this.log);
                if (typeof this.info === "string" && this.info.length)
                    writer.writeString(4, this.info);
                if (this.index !== undefined)
                    writer.writeInt64(5, this.index);
                if (this.key !== undefined)
                    writer.writeBytes(6, this.key);
                if (this.value !== undefined)
                    writer.writeBytes(7, this.value);
                if (this.proof_ops !== undefined)
                    writer.writeMessage(8, this.proof_ops, () => this.proof_ops.serialize(writer));
                if (this.height !== undefined)
                    writer.writeInt64(9, this.height);
                if (typeof this.codespace === "string" && this.codespace.length)
                    writer.writeString(10, this.codespace);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseQuery();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.code = reader.readUint32();
                            break;
                        case 3:
                            message.log = reader.readString();
                            break;
                        case 4:
                            message.info = reader.readString();
                            break;
                        case 5:
                            message.index = reader.readInt64();
                            break;
                        case 6:
                            message.key = reader.readBytes();
                            break;
                        case 7:
                            message.value = reader.readBytes();
                            break;
                        case 8:
                            reader.readMessage(message.proof_ops, () => message.proof_ops = dependency_1.tendermint.crypto.ProofOps.deserialize(reader));
                            break;
                        case 9:
                            message.height = reader.readInt64();
                            break;
                        case 10:
                            message.codespace = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseQuery.deserialize(bytes);
            }
        }
        abci.ResponseQuery = ResponseQuery;
        class ResponseBeginBlock extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("events" in data && data.events != undefined) {
                        this.events = data.events;
                    }
                }
            }
            get events() {
                return pb_1.Message.getRepeatedWrapperField(this, Event, 1);
            }
            set events(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            static fromObject(data) {
                const message = new ResponseBeginBlock({});
                if (data.events != null) {
                    message.events = data.events.map(item => Event.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.events != null) {
                    data.events = this.events.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.events !== undefined)
                    writer.writeRepeatedMessage(1, this.events, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseBeginBlock();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.events, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Event.deserialize(reader), Event));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseBeginBlock.deserialize(bytes);
            }
        }
        abci.ResponseBeginBlock = ResponseBeginBlock;
        class ResponseCheckTx extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [7], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("code" in data && data.code != undefined) {
                        this.code = data.code;
                    }
                    if ("data" in data && data.data != undefined) {
                        this.data = data.data;
                    }
                    if ("log" in data && data.log != undefined) {
                        this.log = data.log;
                    }
                    if ("info" in data && data.info != undefined) {
                        this.info = data.info;
                    }
                    if ("gas_wanted" in data && data.gas_wanted != undefined) {
                        this.gas_wanted = data.gas_wanted;
                    }
                    if ("gas_used" in data && data.gas_used != undefined) {
                        this.gas_used = data.gas_used;
                    }
                    if ("events" in data && data.events != undefined) {
                        this.events = data.events;
                    }
                    if ("codespace" in data && data.codespace != undefined) {
                        this.codespace = data.codespace;
                    }
                }
            }
            get code() {
                return pb_1.Message.getField(this, 1);
            }
            set code(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get data() {
                return pb_1.Message.getField(this, 2);
            }
            set data(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get log() {
                return pb_1.Message.getField(this, 3);
            }
            set log(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get info() {
                return pb_1.Message.getField(this, 4);
            }
            set info(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get gas_wanted() {
                return pb_1.Message.getField(this, 5);
            }
            set gas_wanted(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get gas_used() {
                return pb_1.Message.getField(this, 6);
            }
            set gas_used(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get events() {
                return pb_1.Message.getRepeatedWrapperField(this, Event, 7);
            }
            set events(value) {
                pb_1.Message.setRepeatedWrapperField(this, 7, value);
            }
            get codespace() {
                return pb_1.Message.getField(this, 8);
            }
            set codespace(value) {
                pb_1.Message.setField(this, 8, value);
            }
            static fromObject(data) {
                const message = new ResponseCheckTx({});
                if (data.code != null) {
                    message.code = data.code;
                }
                if (data.data != null) {
                    message.data = data.data;
                }
                if (data.log != null) {
                    message.log = data.log;
                }
                if (data.info != null) {
                    message.info = data.info;
                }
                if (data.gas_wanted != null) {
                    message.gas_wanted = data.gas_wanted;
                }
                if (data.gas_used != null) {
                    message.gas_used = data.gas_used;
                }
                if (data.events != null) {
                    message.events = data.events.map(item => Event.fromObject(item));
                }
                if (data.codespace != null) {
                    message.codespace = data.codespace;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.code != null) {
                    data.code = this.code;
                }
                if (this.data != null) {
                    data.data = this.data;
                }
                if (this.log != null) {
                    data.log = this.log;
                }
                if (this.info != null) {
                    data.info = this.info;
                }
                if (this.gas_wanted != null) {
                    data.gas_wanted = this.gas_wanted;
                }
                if (this.gas_used != null) {
                    data.gas_used = this.gas_used;
                }
                if (this.events != null) {
                    data.events = this.events.map((item) => item.toObject());
                }
                if (this.codespace != null) {
                    data.codespace = this.codespace;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.code !== undefined)
                    writer.writeUint32(1, this.code);
                if (this.data !== undefined)
                    writer.writeBytes(2, this.data);
                if (typeof this.log === "string" && this.log.length)
                    writer.writeString(3, this.log);
                if (typeof this.info === "string" && this.info.length)
                    writer.writeString(4, this.info);
                if (this.gas_wanted !== undefined)
                    writer.writeInt64(5, this.gas_wanted);
                if (this.gas_used !== undefined)
                    writer.writeInt64(6, this.gas_used);
                if (this.events !== undefined)
                    writer.writeRepeatedMessage(7, this.events, (item) => item.serialize(writer));
                if (typeof this.codespace === "string" && this.codespace.length)
                    writer.writeString(8, this.codespace);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseCheckTx();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.code = reader.readUint32();
                            break;
                        case 2:
                            message.data = reader.readBytes();
                            break;
                        case 3:
                            message.log = reader.readString();
                            break;
                        case 4:
                            message.info = reader.readString();
                            break;
                        case 5:
                            message.gas_wanted = reader.readInt64();
                            break;
                        case 6:
                            message.gas_used = reader.readInt64();
                            break;
                        case 7:
                            reader.readMessage(message.events, () => pb_1.Message.addToRepeatedWrapperField(message, 7, Event.deserialize(reader), Event));
                            break;
                        case 8:
                            message.codespace = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseCheckTx.deserialize(bytes);
            }
        }
        abci.ResponseCheckTx = ResponseCheckTx;
        class ResponseDeliverTx extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [7], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("code" in data && data.code != undefined) {
                        this.code = data.code;
                    }
                    if ("data" in data && data.data != undefined) {
                        this.data = data.data;
                    }
                    if ("log" in data && data.log != undefined) {
                        this.log = data.log;
                    }
                    if ("info" in data && data.info != undefined) {
                        this.info = data.info;
                    }
                    if ("gas_wanted" in data && data.gas_wanted != undefined) {
                        this.gas_wanted = data.gas_wanted;
                    }
                    if ("gas_used" in data && data.gas_used != undefined) {
                        this.gas_used = data.gas_used;
                    }
                    if ("events" in data && data.events != undefined) {
                        this.events = data.events;
                    }
                    if ("codespace" in data && data.codespace != undefined) {
                        this.codespace = data.codespace;
                    }
                }
            }
            get code() {
                return pb_1.Message.getField(this, 1);
            }
            set code(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get data() {
                return pb_1.Message.getField(this, 2);
            }
            set data(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get log() {
                return pb_1.Message.getField(this, 3);
            }
            set log(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get info() {
                return pb_1.Message.getField(this, 4);
            }
            set info(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get gas_wanted() {
                return pb_1.Message.getField(this, 5);
            }
            set gas_wanted(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get gas_used() {
                return pb_1.Message.getField(this, 6);
            }
            set gas_used(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get events() {
                return pb_1.Message.getRepeatedWrapperField(this, Event, 7);
            }
            set events(value) {
                pb_1.Message.setRepeatedWrapperField(this, 7, value);
            }
            get codespace() {
                return pb_1.Message.getField(this, 8);
            }
            set codespace(value) {
                pb_1.Message.setField(this, 8, value);
            }
            static fromObject(data) {
                const message = new ResponseDeliverTx({});
                if (data.code != null) {
                    message.code = data.code;
                }
                if (data.data != null) {
                    message.data = data.data;
                }
                if (data.log != null) {
                    message.log = data.log;
                }
                if (data.info != null) {
                    message.info = data.info;
                }
                if (data.gas_wanted != null) {
                    message.gas_wanted = data.gas_wanted;
                }
                if (data.gas_used != null) {
                    message.gas_used = data.gas_used;
                }
                if (data.events != null) {
                    message.events = data.events.map(item => Event.fromObject(item));
                }
                if (data.codespace != null) {
                    message.codespace = data.codespace;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.code != null) {
                    data.code = this.code;
                }
                if (this.data != null) {
                    data.data = this.data;
                }
                if (this.log != null) {
                    data.log = this.log;
                }
                if (this.info != null) {
                    data.info = this.info;
                }
                if (this.gas_wanted != null) {
                    data.gas_wanted = this.gas_wanted;
                }
                if (this.gas_used != null) {
                    data.gas_used = this.gas_used;
                }
                if (this.events != null) {
                    data.events = this.events.map((item) => item.toObject());
                }
                if (this.codespace != null) {
                    data.codespace = this.codespace;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.code !== undefined)
                    writer.writeUint32(1, this.code);
                if (this.data !== undefined)
                    writer.writeBytes(2, this.data);
                if (typeof this.log === "string" && this.log.length)
                    writer.writeString(3, this.log);
                if (typeof this.info === "string" && this.info.length)
                    writer.writeString(4, this.info);
                if (this.gas_wanted !== undefined)
                    writer.writeInt64(5, this.gas_wanted);
                if (this.gas_used !== undefined)
                    writer.writeInt64(6, this.gas_used);
                if (this.events !== undefined)
                    writer.writeRepeatedMessage(7, this.events, (item) => item.serialize(writer));
                if (typeof this.codespace === "string" && this.codespace.length)
                    writer.writeString(8, this.codespace);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseDeliverTx();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.code = reader.readUint32();
                            break;
                        case 2:
                            message.data = reader.readBytes();
                            break;
                        case 3:
                            message.log = reader.readString();
                            break;
                        case 4:
                            message.info = reader.readString();
                            break;
                        case 5:
                            message.gas_wanted = reader.readInt64();
                            break;
                        case 6:
                            message.gas_used = reader.readInt64();
                            break;
                        case 7:
                            reader.readMessage(message.events, () => pb_1.Message.addToRepeatedWrapperField(message, 7, Event.deserialize(reader), Event));
                            break;
                        case 8:
                            message.codespace = reader.readString();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseDeliverTx.deserialize(bytes);
            }
        }
        abci.ResponseDeliverTx = ResponseDeliverTx;
        class ResponseEndBlock extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 3], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("validator_updates" in data && data.validator_updates != undefined) {
                        this.validator_updates = data.validator_updates;
                    }
                    if ("consensus_param_updates" in data && data.consensus_param_updates != undefined) {
                        this.consensus_param_updates = data.consensus_param_updates;
                    }
                    if ("events" in data && data.events != undefined) {
                        this.events = data.events;
                    }
                }
            }
            get validator_updates() {
                return pb_1.Message.getRepeatedWrapperField(this, ValidatorUpdate, 1);
            }
            set validator_updates(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            get consensus_param_updates() {
                return pb_1.Message.getWrapperField(this, ConsensusParams, 2);
            }
            set consensus_param_updates(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get events() {
                return pb_1.Message.getRepeatedWrapperField(this, Event, 3);
            }
            set events(value) {
                pb_1.Message.setRepeatedWrapperField(this, 3, value);
            }
            static fromObject(data) {
                const message = new ResponseEndBlock({});
                if (data.validator_updates != null) {
                    message.validator_updates = data.validator_updates.map(item => ValidatorUpdate.fromObject(item));
                }
                if (data.consensus_param_updates != null) {
                    message.consensus_param_updates = ConsensusParams.fromObject(data.consensus_param_updates);
                }
                if (data.events != null) {
                    message.events = data.events.map(item => Event.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.validator_updates != null) {
                    data.validator_updates = this.validator_updates.map((item) => item.toObject());
                }
                if (this.consensus_param_updates != null) {
                    data.consensus_param_updates = this.consensus_param_updates.toObject();
                }
                if (this.events != null) {
                    data.events = this.events.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.validator_updates !== undefined)
                    writer.writeRepeatedMessage(1, this.validator_updates, (item) => item.serialize(writer));
                if (this.consensus_param_updates !== undefined)
                    writer.writeMessage(2, this.consensus_param_updates, () => this.consensus_param_updates.serialize(writer));
                if (this.events !== undefined)
                    writer.writeRepeatedMessage(3, this.events, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseEndBlock();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.validator_updates, () => pb_1.Message.addToRepeatedWrapperField(message, 1, ValidatorUpdate.deserialize(reader), ValidatorUpdate));
                            break;
                        case 2:
                            reader.readMessage(message.consensus_param_updates, () => message.consensus_param_updates = ConsensusParams.deserialize(reader));
                            break;
                        case 3:
                            reader.readMessage(message.events, () => pb_1.Message.addToRepeatedWrapperField(message, 3, Event.deserialize(reader), Event));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseEndBlock.deserialize(bytes);
            }
        }
        abci.ResponseEndBlock = ResponseEndBlock;
        class ResponseCommit extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("data" in data && data.data != undefined) {
                        this.data = data.data;
                    }
                    if ("retain_height" in data && data.retain_height != undefined) {
                        this.retain_height = data.retain_height;
                    }
                }
            }
            get data() {
                return pb_1.Message.getField(this, 2);
            }
            set data(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get retain_height() {
                return pb_1.Message.getField(this, 3);
            }
            set retain_height(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new ResponseCommit({});
                if (data.data != null) {
                    message.data = data.data;
                }
                if (data.retain_height != null) {
                    message.retain_height = data.retain_height;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.data != null) {
                    data.data = this.data;
                }
                if (this.retain_height != null) {
                    data.retain_height = this.retain_height;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.data !== undefined)
                    writer.writeBytes(2, this.data);
                if (this.retain_height !== undefined)
                    writer.writeInt64(3, this.retain_height);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseCommit();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 2:
                            message.data = reader.readBytes();
                            break;
                        case 3:
                            message.retain_height = reader.readInt64();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseCommit.deserialize(bytes);
            }
        }
        abci.ResponseCommit = ResponseCommit;
        class ResponseListSnapshots extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("snapshots" in data && data.snapshots != undefined) {
                        this.snapshots = data.snapshots;
                    }
                }
            }
            get snapshots() {
                return pb_1.Message.getRepeatedWrapperField(this, Snapshot, 1);
            }
            set snapshots(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            static fromObject(data) {
                const message = new ResponseListSnapshots({});
                if (data.snapshots != null) {
                    message.snapshots = data.snapshots.map(item => Snapshot.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.snapshots != null) {
                    data.snapshots = this.snapshots.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.snapshots !== undefined)
                    writer.writeRepeatedMessage(1, this.snapshots, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseListSnapshots();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.snapshots, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Snapshot.deserialize(reader), Snapshot));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseListSnapshots.deserialize(bytes);
            }
        }
        abci.ResponseListSnapshots = ResponseListSnapshots;
        class ResponseOfferSnapshot extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("result" in data && data.result != undefined) {
                        this.result = data.result;
                    }
                }
            }
            get result() {
                return pb_1.Message.getField(this, 1);
            }
            set result(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new ResponseOfferSnapshot({});
                if (data.result != null) {
                    message.result = data.result;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.result != null) {
                    data.result = this.result;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.result !== undefined)
                    writer.writeEnum(1, this.result);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseOfferSnapshot();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.result = reader.readEnum();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseOfferSnapshot.deserialize(bytes);
            }
        }
        abci.ResponseOfferSnapshot = ResponseOfferSnapshot;
        (function (ResponseOfferSnapshot) {
            let Result;
            (function (Result) {
                Result[Result["UNKNOWN"] = 0] = "UNKNOWN";
                Result[Result["ACCEPT"] = 1] = "ACCEPT";
                Result[Result["ABORT"] = 2] = "ABORT";
                Result[Result["REJECT"] = 3] = "REJECT";
                Result[Result["REJECT_FORMAT"] = 4] = "REJECT_FORMAT";
                Result[Result["REJECT_SENDER"] = 5] = "REJECT_SENDER";
            })(Result = ResponseOfferSnapshot.Result || (ResponseOfferSnapshot.Result = {}));
        })(ResponseOfferSnapshot = abci.ResponseOfferSnapshot || (abci.ResponseOfferSnapshot = {}));
        class ResponseLoadSnapshotChunk extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("chunk" in data && data.chunk != undefined) {
                        this.chunk = data.chunk;
                    }
                }
            }
            get chunk() {
                return pb_1.Message.getField(this, 1);
            }
            set chunk(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new ResponseLoadSnapshotChunk({});
                if (data.chunk != null) {
                    message.chunk = data.chunk;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.chunk != null) {
                    data.chunk = this.chunk;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.chunk !== undefined)
                    writer.writeBytes(1, this.chunk);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseLoadSnapshotChunk();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.chunk = reader.readBytes();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseLoadSnapshotChunk.deserialize(bytes);
            }
        }
        abci.ResponseLoadSnapshotChunk = ResponseLoadSnapshotChunk;
        class ResponseApplySnapshotChunk extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2, 3], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("result" in data && data.result != undefined) {
                        this.result = data.result;
                    }
                    if ("refetch_chunks" in data && data.refetch_chunks != undefined) {
                        this.refetch_chunks = data.refetch_chunks;
                    }
                    if ("reject_senders" in data && data.reject_senders != undefined) {
                        this.reject_senders = data.reject_senders;
                    }
                }
            }
            get result() {
                return pb_1.Message.getField(this, 1);
            }
            set result(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get refetch_chunks() {
                return pb_1.Message.getField(this, 2);
            }
            set refetch_chunks(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get reject_senders() {
                return pb_1.Message.getField(this, 3);
            }
            set reject_senders(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new ResponseApplySnapshotChunk({});
                if (data.result != null) {
                    message.result = data.result;
                }
                if (data.refetch_chunks != null) {
                    message.refetch_chunks = data.refetch_chunks;
                }
                if (data.reject_senders != null) {
                    message.reject_senders = data.reject_senders;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.result != null) {
                    data.result = this.result;
                }
                if (this.refetch_chunks != null) {
                    data.refetch_chunks = this.refetch_chunks;
                }
                if (this.reject_senders != null) {
                    data.reject_senders = this.reject_senders;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.result !== undefined)
                    writer.writeEnum(1, this.result);
                if (this.refetch_chunks !== undefined)
                    writer.writePackedUint32(2, this.refetch_chunks);
                if (this.reject_senders !== undefined)
                    writer.writeRepeatedString(3, this.reject_senders);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ResponseApplySnapshotChunk();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.result = reader.readEnum();
                            break;
                        case 2:
                            message.refetch_chunks = reader.readPackedUint32();
                            break;
                        case 3:
                            pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ResponseApplySnapshotChunk.deserialize(bytes);
            }
        }
        abci.ResponseApplySnapshotChunk = ResponseApplySnapshotChunk;
        (function (ResponseApplySnapshotChunk) {
            let Result;
            (function (Result) {
                Result[Result["UNKNOWN"] = 0] = "UNKNOWN";
                Result[Result["ACCEPT"] = 1] = "ACCEPT";
                Result[Result["ABORT"] = 2] = "ABORT";
                Result[Result["RETRY"] = 3] = "RETRY";
                Result[Result["RETRY_SNAPSHOT"] = 4] = "RETRY_SNAPSHOT";
                Result[Result["REJECT_SNAPSHOT"] = 5] = "REJECT_SNAPSHOT";
            })(Result = ResponseApplySnapshotChunk.Result || (ResponseApplySnapshotChunk.Result = {}));
        })(ResponseApplySnapshotChunk = abci.ResponseApplySnapshotChunk || (abci.ResponseApplySnapshotChunk = {}));
        class ConsensusParams extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("block" in data && data.block != undefined) {
                        this.block = data.block;
                    }
                    if ("evidence" in data && data.evidence != undefined) {
                        this.evidence = data.evidence;
                    }
                    if ("validator" in data && data.validator != undefined) {
                        this.validator = data.validator;
                    }
                    if ("version" in data && data.version != undefined) {
                        this.version = data.version;
                    }
                }
            }
            get block() {
                return pb_1.Message.getWrapperField(this, BlockParams, 1);
            }
            set block(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get evidence() {
                return pb_1.Message.getWrapperField(this, dependency_4.tendermint.types.EvidenceParams, 2);
            }
            set evidence(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get validator() {
                return pb_1.Message.getWrapperField(this, dependency_4.tendermint.types.ValidatorParams, 3);
            }
            set validator(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            get version() {
                return pb_1.Message.getWrapperField(this, dependency_4.tendermint.types.VersionParams, 4);
            }
            set version(value) {
                pb_1.Message.setWrapperField(this, 4, value);
            }
            static fromObject(data) {
                const message = new ConsensusParams({});
                if (data.block != null) {
                    message.block = BlockParams.fromObject(data.block);
                }
                if (data.evidence != null) {
                    message.evidence = dependency_4.tendermint.types.EvidenceParams.fromObject(data.evidence);
                }
                if (data.validator != null) {
                    message.validator = dependency_4.tendermint.types.ValidatorParams.fromObject(data.validator);
                }
                if (data.version != null) {
                    message.version = dependency_4.tendermint.types.VersionParams.fromObject(data.version);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.block != null) {
                    data.block = this.block.toObject();
                }
                if (this.evidence != null) {
                    data.evidence = this.evidence.toObject();
                }
                if (this.validator != null) {
                    data.validator = this.validator.toObject();
                }
                if (this.version != null) {
                    data.version = this.version.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.block !== undefined)
                    writer.writeMessage(1, this.block, () => this.block.serialize(writer));
                if (this.evidence !== undefined)
                    writer.writeMessage(2, this.evidence, () => this.evidence.serialize(writer));
                if (this.validator !== undefined)
                    writer.writeMessage(3, this.validator, () => this.validator.serialize(writer));
                if (this.version !== undefined)
                    writer.writeMessage(4, this.version, () => this.version.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ConsensusParams();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.block, () => message.block = BlockParams.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.evidence, () => message.evidence = dependency_4.tendermint.types.EvidenceParams.deserialize(reader));
                            break;
                        case 3:
                            reader.readMessage(message.validator, () => message.validator = dependency_4.tendermint.types.ValidatorParams.deserialize(reader));
                            break;
                        case 4:
                            reader.readMessage(message.version, () => message.version = dependency_4.tendermint.types.VersionParams.deserialize(reader));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ConsensusParams.deserialize(bytes);
            }
        }
        abci.ConsensusParams = ConsensusParams;
        class BlockParams extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("max_bytes" in data && data.max_bytes != undefined) {
                        this.max_bytes = data.max_bytes;
                    }
                    if ("max_gas" in data && data.max_gas != undefined) {
                        this.max_gas = data.max_gas;
                    }
                }
            }
            get max_bytes() {
                return pb_1.Message.getField(this, 1);
            }
            set max_bytes(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get max_gas() {
                return pb_1.Message.getField(this, 2);
            }
            set max_gas(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new BlockParams({});
                if (data.max_bytes != null) {
                    message.max_bytes = data.max_bytes;
                }
                if (data.max_gas != null) {
                    message.max_gas = data.max_gas;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.max_bytes != null) {
                    data.max_bytes = this.max_bytes;
                }
                if (this.max_gas != null) {
                    data.max_gas = this.max_gas;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.max_bytes !== undefined)
                    writer.writeInt64(1, this.max_bytes);
                if (this.max_gas !== undefined)
                    writer.writeInt64(2, this.max_gas);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BlockParams();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.max_bytes = reader.readInt64();
                            break;
                        case 2:
                            message.max_gas = reader.readInt64();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return BlockParams.deserialize(bytes);
            }
        }
        abci.BlockParams = BlockParams;
        class LastCommitInfo extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("round" in data && data.round != undefined) {
                        this.round = data.round;
                    }
                    if ("votes" in data && data.votes != undefined) {
                        this.votes = data.votes;
                    }
                }
            }
            get round() {
                return pb_1.Message.getField(this, 1);
            }
            set round(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get votes() {
                return pb_1.Message.getRepeatedWrapperField(this, VoteInfo, 2);
            }
            set votes(value) {
                pb_1.Message.setRepeatedWrapperField(this, 2, value);
            }
            static fromObject(data) {
                const message = new LastCommitInfo({});
                if (data.round != null) {
                    message.round = data.round;
                }
                if (data.votes != null) {
                    message.votes = data.votes.map(item => VoteInfo.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.round != null) {
                    data.round = this.round;
                }
                if (this.votes != null) {
                    data.votes = this.votes.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.round !== undefined)
                    writer.writeInt32(1, this.round);
                if (this.votes !== undefined)
                    writer.writeRepeatedMessage(2, this.votes, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LastCommitInfo();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.round = reader.readInt32();
                            break;
                        case 2:
                            reader.readMessage(message.votes, () => pb_1.Message.addToRepeatedWrapperField(message, 2, VoteInfo.deserialize(reader), VoteInfo));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return LastCommitInfo.deserialize(bytes);
            }
        }
        abci.LastCommitInfo = LastCommitInfo;
        class Event extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("type" in data && data.type != undefined) {
                        this.type = data.type;
                    }
                    if ("attributes" in data && data.attributes != undefined) {
                        this.attributes = data.attributes;
                    }
                }
            }
            get type() {
                return pb_1.Message.getField(this, 1);
            }
            set type(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get attributes() {
                return pb_1.Message.getRepeatedWrapperField(this, EventAttribute, 2);
            }
            set attributes(value) {
                pb_1.Message.setRepeatedWrapperField(this, 2, value);
            }
            static fromObject(data) {
                const message = new Event({});
                if (data.type != null) {
                    message.type = data.type;
                }
                if (data.attributes != null) {
                    message.attributes = data.attributes.map(item => EventAttribute.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.type != null) {
                    data.type = this.type;
                }
                if (this.attributes != null) {
                    data.attributes = this.attributes.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.type === "string" && this.type.length)
                    writer.writeString(1, this.type);
                if (this.attributes !== undefined)
                    writer.writeRepeatedMessage(2, this.attributes, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Event();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.type = reader.readString();
                            break;
                        case 2:
                            reader.readMessage(message.attributes, () => pb_1.Message.addToRepeatedWrapperField(message, 2, EventAttribute.deserialize(reader), EventAttribute));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return Event.deserialize(bytes);
            }
        }
        abci.Event = Event;
        class EventAttribute extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("key" in data && data.key != undefined) {
                        this.key = data.key;
                    }
                    if ("value" in data && data.value != undefined) {
                        this.value = data.value;
                    }
                    if ("index" in data && data.index != undefined) {
                        this.index = data.index;
                    }
                }
            }
            get key() {
                return pb_1.Message.getField(this, 1);
            }
            set key(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get value() {
                return pb_1.Message.getField(this, 2);
            }
            set value(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get index() {
                return pb_1.Message.getField(this, 3);
            }
            set index(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new EventAttribute({});
                if (data.key != null) {
                    message.key = data.key;
                }
                if (data.value != null) {
                    message.value = data.value;
                }
                if (data.index != null) {
                    message.index = data.index;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.key != null) {
                    data.key = this.key;
                }
                if (this.value != null) {
                    data.value = this.value;
                }
                if (this.index != null) {
                    data.index = this.index;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.key !== undefined)
                    writer.writeBytes(1, this.key);
                if (this.value !== undefined)
                    writer.writeBytes(2, this.value);
                if (this.index !== undefined)
                    writer.writeBool(3, this.index);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventAttribute();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.key = reader.readBytes();
                            break;
                        case 2:
                            message.value = reader.readBytes();
                            break;
                        case 3:
                            message.index = reader.readBool();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return EventAttribute.deserialize(bytes);
            }
        }
        abci.EventAttribute = EventAttribute;
        class TxResult extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("index" in data && data.index != undefined) {
                        this.index = data.index;
                    }
                    if ("tx" in data && data.tx != undefined) {
                        this.tx = data.tx;
                    }
                    if ("result" in data && data.result != undefined) {
                        this.result = data.result;
                    }
                }
            }
            get height() {
                return pb_1.Message.getField(this, 1);
            }
            set height(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get index() {
                return pb_1.Message.getField(this, 2);
            }
            set index(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get tx() {
                return pb_1.Message.getField(this, 3);
            }
            set tx(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get result() {
                return pb_1.Message.getWrapperField(this, ResponseDeliverTx, 4);
            }
            set result(value) {
                pb_1.Message.setWrapperField(this, 4, value);
            }
            static fromObject(data) {
                const message = new TxResult({});
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.index != null) {
                    message.index = data.index;
                }
                if (data.tx != null) {
                    message.tx = data.tx;
                }
                if (data.result != null) {
                    message.result = ResponseDeliverTx.fromObject(data.result);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.index != null) {
                    data.index = this.index;
                }
                if (this.tx != null) {
                    data.tx = this.tx;
                }
                if (this.result != null) {
                    data.result = this.result.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.height !== undefined)
                    writer.writeInt64(1, this.height);
                if (this.index !== undefined)
                    writer.writeUint32(2, this.index);
                if (this.tx !== undefined)
                    writer.writeBytes(3, this.tx);
                if (this.result !== undefined)
                    writer.writeMessage(4, this.result, () => this.result.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TxResult();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.height = reader.readInt64();
                            break;
                        case 2:
                            message.index = reader.readUint32();
                            break;
                        case 3:
                            message.tx = reader.readBytes();
                            break;
                        case 4:
                            reader.readMessage(message.result, () => message.result = ResponseDeliverTx.deserialize(reader));
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return TxResult.deserialize(bytes);
            }
        }
        abci.TxResult = TxResult;
        class Validator extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("address" in data && data.address != undefined) {
                        this.address = data.address;
                    }
                    if ("power" in data && data.power != undefined) {
                        this.power = data.power;
                    }
                }
            }
            get address() {
                return pb_1.Message.getField(this, 1);
            }
            set address(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get power() {
                return pb_1.Message.getField(this, 3);
            }
            set power(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new Validator({});
                if (data.address != null) {
                    message.address = data.address;
                }
                if (data.power != null) {
                    message.power = data.power;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.address != null) {
                    data.address = this.address;
                }
                if (this.power != null) {
                    data.power = this.power;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.address !== undefined)
                    writer.writeBytes(1, this.address);
                if (this.power !== undefined)
                    writer.writeInt64(3, this.power);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Validator();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.address = reader.readBytes();
                            break;
                        case 3:
                            message.power = reader.readInt64();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return Validator.deserialize(bytes);
            }
        }
        abci.Validator = Validator;
        class ValidatorUpdate extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("pub_key" in data && data.pub_key != undefined) {
                        this.pub_key = data.pub_key;
                    }
                    if ("power" in data && data.power != undefined) {
                        this.power = data.power;
                    }
                }
            }
            get pub_key() {
                return pb_1.Message.getWrapperField(this, dependency_3.tendermint.crypto.PublicKey, 1);
            }
            set pub_key(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get power() {
                return pb_1.Message.getField(this, 2);
            }
            set power(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new ValidatorUpdate({});
                if (data.pub_key != null) {
                    message.pub_key = dependency_3.tendermint.crypto.PublicKey.fromObject(data.pub_key);
                }
                if (data.power != null) {
                    message.power = data.power;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.pub_key != null) {
                    data.pub_key = this.pub_key.toObject();
                }
                if (this.power != null) {
                    data.power = this.power;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.pub_key !== undefined)
                    writer.writeMessage(1, this.pub_key, () => this.pub_key.serialize(writer));
                if (this.power !== undefined)
                    writer.writeInt64(2, this.power);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorUpdate();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.pub_key, () => message.pub_key = dependency_3.tendermint.crypto.PublicKey.deserialize(reader));
                            break;
                        case 2:
                            message.power = reader.readInt64();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return ValidatorUpdate.deserialize(bytes);
            }
        }
        abci.ValidatorUpdate = ValidatorUpdate;
        class VoteInfo extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("validator" in data && data.validator != undefined) {
                        this.validator = data.validator;
                    }
                    if ("signed_last_block" in data && data.signed_last_block != undefined) {
                        this.signed_last_block = data.signed_last_block;
                    }
                }
            }
            get validator() {
                return pb_1.Message.getWrapperField(this, Validator, 1);
            }
            set validator(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get signed_last_block() {
                return pb_1.Message.getField(this, 2);
            }
            set signed_last_block(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new VoteInfo({});
                if (data.validator != null) {
                    message.validator = Validator.fromObject(data.validator);
                }
                if (data.signed_last_block != null) {
                    message.signed_last_block = data.signed_last_block;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.validator != null) {
                    data.validator = this.validator.toObject();
                }
                if (this.signed_last_block != null) {
                    data.signed_last_block = this.signed_last_block;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.validator !== undefined)
                    writer.writeMessage(1, this.validator, () => this.validator.serialize(writer));
                if (this.signed_last_block !== undefined)
                    writer.writeBool(2, this.signed_last_block);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new VoteInfo();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.validator, () => message.validator = Validator.deserialize(reader));
                            break;
                        case 2:
                            message.signed_last_block = reader.readBool();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return VoteInfo.deserialize(bytes);
            }
        }
        abci.VoteInfo = VoteInfo;
        class Evidence extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("type" in data && data.type != undefined) {
                        this.type = data.type;
                    }
                    if ("validator" in data && data.validator != undefined) {
                        this.validator = data.validator;
                    }
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("time" in data && data.time != undefined) {
                        this.time = data.time;
                    }
                    if ("total_voting_power" in data && data.total_voting_power != undefined) {
                        this.total_voting_power = data.total_voting_power;
                    }
                }
            }
            get type() {
                return pb_1.Message.getField(this, 1);
            }
            set type(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get validator() {
                return pb_1.Message.getWrapperField(this, Validator, 2);
            }
            set validator(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get height() {
                return pb_1.Message.getField(this, 3);
            }
            set height(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get time() {
                return pb_1.Message.getWrapperField(this, dependency_5.google.protobuf.Timestamp, 4);
            }
            set time(value) {
                pb_1.Message.setWrapperField(this, 4, value);
            }
            get total_voting_power() {
                return pb_1.Message.getField(this, 5);
            }
            set total_voting_power(value) {
                pb_1.Message.setField(this, 5, value);
            }
            static fromObject(data) {
                const message = new Evidence({});
                if (data.type != null) {
                    message.type = data.type;
                }
                if (data.validator != null) {
                    message.validator = Validator.fromObject(data.validator);
                }
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.time != null) {
                    message.time = dependency_5.google.protobuf.Timestamp.fromObject(data.time);
                }
                if (data.total_voting_power != null) {
                    message.total_voting_power = data.total_voting_power;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.type != null) {
                    data.type = this.type;
                }
                if (this.validator != null) {
                    data.validator = this.validator.toObject();
                }
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.time != null) {
                    data.time = this.time.toObject();
                }
                if (this.total_voting_power != null) {
                    data.total_voting_power = this.total_voting_power;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.type !== undefined)
                    writer.writeEnum(1, this.type);
                if (this.validator !== undefined)
                    writer.writeMessage(2, this.validator, () => this.validator.serialize(writer));
                if (this.height !== undefined)
                    writer.writeInt64(3, this.height);
                if (this.time !== undefined)
                    writer.writeMessage(4, this.time, () => this.time.serialize(writer));
                if (this.total_voting_power !== undefined)
                    writer.writeInt64(5, this.total_voting_power);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Evidence();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.type = reader.readEnum();
                            break;
                        case 2:
                            reader.readMessage(message.validator, () => message.validator = Validator.deserialize(reader));
                            break;
                        case 3:
                            message.height = reader.readInt64();
                            break;
                        case 4:
                            reader.readMessage(message.time, () => message.time = dependency_5.google.protobuf.Timestamp.deserialize(reader));
                            break;
                        case 5:
                            message.total_voting_power = reader.readInt64();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return Evidence.deserialize(bytes);
            }
        }
        abci.Evidence = Evidence;
        class Snapshot extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("format" in data && data.format != undefined) {
                        this.format = data.format;
                    }
                    if ("chunks" in data && data.chunks != undefined) {
                        this.chunks = data.chunks;
                    }
                    if ("hash" in data && data.hash != undefined) {
                        this.hash = data.hash;
                    }
                    if ("metadata" in data && data.metadata != undefined) {
                        this.metadata = data.metadata;
                    }
                }
            }
            get height() {
                return pb_1.Message.getField(this, 1);
            }
            set height(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get format() {
                return pb_1.Message.getField(this, 2);
            }
            set format(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get chunks() {
                return pb_1.Message.getField(this, 3);
            }
            set chunks(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get hash() {
                return pb_1.Message.getField(this, 4);
            }
            set hash(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get metadata() {
                return pb_1.Message.getField(this, 5);
            }
            set metadata(value) {
                pb_1.Message.setField(this, 5, value);
            }
            static fromObject(data) {
                const message = new Snapshot({});
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.format != null) {
                    message.format = data.format;
                }
                if (data.chunks != null) {
                    message.chunks = data.chunks;
                }
                if (data.hash != null) {
                    message.hash = data.hash;
                }
                if (data.metadata != null) {
                    message.metadata = data.metadata;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.format != null) {
                    data.format = this.format;
                }
                if (this.chunks != null) {
                    data.chunks = this.chunks;
                }
                if (this.hash != null) {
                    data.hash = this.hash;
                }
                if (this.metadata != null) {
                    data.metadata = this.metadata;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.height !== undefined)
                    writer.writeUint64(1, this.height);
                if (this.format !== undefined)
                    writer.writeUint32(2, this.format);
                if (this.chunks !== undefined)
                    writer.writeUint32(3, this.chunks);
                if (this.hash !== undefined)
                    writer.writeBytes(4, this.hash);
                if (this.metadata !== undefined)
                    writer.writeBytes(5, this.metadata);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Snapshot();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.height = reader.readUint64();
                            break;
                        case 2:
                            message.format = reader.readUint32();
                            break;
                        case 3:
                            message.chunks = reader.readUint32();
                            break;
                        case 4:
                            message.hash = reader.readBytes();
                            break;
                        case 5:
                            message.metadata = reader.readBytes();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary() {
                return this.serialize();
            }
            static deserializeBinary(bytes) {
                return Snapshot.deserialize(bytes);
            }
        }
        abci.Snapshot = Snapshot;
    })(abci = tendermint.abci || (tendermint.abci = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=types.js.map