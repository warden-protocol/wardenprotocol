"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.LastCommitInfo = exports.BlockParams = exports.ConsensusParams = exports.ResponseApplySnapshotChunk = exports.ResponseLoadSnapshotChunk = exports.ResponseOfferSnapshot = exports.ResponseListSnapshots = exports.ResponseCommit = exports.ResponseEndBlock = exports.ResponseDeliverTx = exports.ResponseCheckTx = exports.ResponseBeginBlock = exports.ResponseQuery = exports.ResponseInitChain = exports.ResponseSetOption = exports.ResponseInfo = exports.ResponseFlush = exports.ResponseEcho = exports.ResponseException = exports.Response = exports.RequestApplySnapshotChunk = exports.RequestLoadSnapshotChunk = exports.RequestOfferSnapshot = exports.RequestListSnapshots = exports.RequestCommit = exports.RequestEndBlock = exports.RequestDeliverTx = exports.RequestCheckTx = exports.RequestBeginBlock = exports.RequestQuery = exports.RequestInitChain = exports.RequestSetOption = exports.RequestInfo = exports.RequestFlush = exports.RequestEcho = exports.Request = exports.responseApplySnapshotChunk_ResultToJSON = exports.responseApplySnapshotChunk_ResultFromJSON = exports.ResponseApplySnapshotChunk_Result = exports.responseOfferSnapshot_ResultToJSON = exports.responseOfferSnapshot_ResultFromJSON = exports.ResponseOfferSnapshot_Result = exports.evidenceTypeToJSON = exports.evidenceTypeFromJSON = exports.EvidenceType = exports.checkTxTypeToJSON = exports.checkTxTypeFromJSON = exports.CheckTxType = exports.protobufPackage = void 0;
exports.ABCIApplicationClientImpl = exports.Snapshot = exports.Evidence = exports.VoteInfo = exports.ValidatorUpdate = exports.Validator = exports.TxResult = exports.EventAttribute = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const timestamp_1 = require("../../google/protobuf/timestamp");
const types_1 = require("../../tendermint/types/types");
const proof_1 = require("../../tendermint/crypto/proof");
const params_1 = require("../../tendermint/types/params");
const keys_1 = require("../../tendermint/crypto/keys");
exports.protobufPackage = "tendermint.abci";
var CheckTxType;
(function (CheckTxType) {
    CheckTxType[CheckTxType["NEW"] = 0] = "NEW";
    CheckTxType[CheckTxType["RECHECK"] = 1] = "RECHECK";
    CheckTxType[CheckTxType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(CheckTxType = exports.CheckTxType || (exports.CheckTxType = {}));
function checkTxTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "NEW":
            return CheckTxType.NEW;
        case 1:
        case "RECHECK":
            return CheckTxType.RECHECK;
        case -1:
        case "UNRECOGNIZED":
        default:
            return CheckTxType.UNRECOGNIZED;
    }
}
exports.checkTxTypeFromJSON = checkTxTypeFromJSON;
function checkTxTypeToJSON(object) {
    switch (object) {
        case CheckTxType.NEW:
            return "NEW";
        case CheckTxType.RECHECK:
            return "RECHECK";
        default:
            return "UNKNOWN";
    }
}
exports.checkTxTypeToJSON = checkTxTypeToJSON;
var EvidenceType;
(function (EvidenceType) {
    EvidenceType[EvidenceType["UNKNOWN"] = 0] = "UNKNOWN";
    EvidenceType[EvidenceType["DUPLICATE_VOTE"] = 1] = "DUPLICATE_VOTE";
    EvidenceType[EvidenceType["LIGHT_CLIENT_ATTACK"] = 2] = "LIGHT_CLIENT_ATTACK";
    EvidenceType[EvidenceType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(EvidenceType = exports.EvidenceType || (exports.EvidenceType = {}));
function evidenceTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return EvidenceType.UNKNOWN;
        case 1:
        case "DUPLICATE_VOTE":
            return EvidenceType.DUPLICATE_VOTE;
        case 2:
        case "LIGHT_CLIENT_ATTACK":
            return EvidenceType.LIGHT_CLIENT_ATTACK;
        case -1:
        case "UNRECOGNIZED":
        default:
            return EvidenceType.UNRECOGNIZED;
    }
}
exports.evidenceTypeFromJSON = evidenceTypeFromJSON;
function evidenceTypeToJSON(object) {
    switch (object) {
        case EvidenceType.UNKNOWN:
            return "UNKNOWN";
        case EvidenceType.DUPLICATE_VOTE:
            return "DUPLICATE_VOTE";
        case EvidenceType.LIGHT_CLIENT_ATTACK:
            return "LIGHT_CLIENT_ATTACK";
        default:
            return "UNKNOWN";
    }
}
exports.evidenceTypeToJSON = evidenceTypeToJSON;
var ResponseOfferSnapshot_Result;
(function (ResponseOfferSnapshot_Result) {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["UNKNOWN"] = 0] = "UNKNOWN";
    /** ACCEPT - Snapshot accepted, apply chunks */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["ACCEPT"] = 1] = "ACCEPT";
    /** ABORT - Abort all snapshot restoration */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["ABORT"] = 2] = "ABORT";
    /** REJECT - Reject this specific snapshot, try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT"] = 3] = "REJECT";
    /** REJECT_FORMAT - Reject all snapshots of this format, try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT_FORMAT"] = 4] = "REJECT_FORMAT";
    /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["REJECT_SENDER"] = 5] = "REJECT_SENDER";
    ResponseOfferSnapshot_Result[ResponseOfferSnapshot_Result["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseOfferSnapshot_Result = exports.ResponseOfferSnapshot_Result || (exports.ResponseOfferSnapshot_Result = {}));
function responseOfferSnapshot_ResultFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return ResponseOfferSnapshot_Result.UNKNOWN;
        case 1:
        case "ACCEPT":
            return ResponseOfferSnapshot_Result.ACCEPT;
        case 2:
        case "ABORT":
            return ResponseOfferSnapshot_Result.ABORT;
        case 3:
        case "REJECT":
            return ResponseOfferSnapshot_Result.REJECT;
        case 4:
        case "REJECT_FORMAT":
            return ResponseOfferSnapshot_Result.REJECT_FORMAT;
        case 5:
        case "REJECT_SENDER":
            return ResponseOfferSnapshot_Result.REJECT_SENDER;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseOfferSnapshot_Result.UNRECOGNIZED;
    }
}
exports.responseOfferSnapshot_ResultFromJSON = responseOfferSnapshot_ResultFromJSON;
function responseOfferSnapshot_ResultToJSON(object) {
    switch (object) {
        case ResponseOfferSnapshot_Result.UNKNOWN:
            return "UNKNOWN";
        case ResponseOfferSnapshot_Result.ACCEPT:
            return "ACCEPT";
        case ResponseOfferSnapshot_Result.ABORT:
            return "ABORT";
        case ResponseOfferSnapshot_Result.REJECT:
            return "REJECT";
        case ResponseOfferSnapshot_Result.REJECT_FORMAT:
            return "REJECT_FORMAT";
        case ResponseOfferSnapshot_Result.REJECT_SENDER:
            return "REJECT_SENDER";
        default:
            return "UNKNOWN";
    }
}
exports.responseOfferSnapshot_ResultToJSON = responseOfferSnapshot_ResultToJSON;
var ResponseApplySnapshotChunk_Result;
(function (ResponseApplySnapshotChunk_Result) {
    /** UNKNOWN - Unknown result, abort all snapshot restoration */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["UNKNOWN"] = 0] = "UNKNOWN";
    /** ACCEPT - Chunk successfully accepted */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["ACCEPT"] = 1] = "ACCEPT";
    /** ABORT - Abort all snapshot restoration */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["ABORT"] = 2] = "ABORT";
    /** RETRY - Retry chunk (combine with refetch and reject) */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["RETRY"] = 3] = "RETRY";
    /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["RETRY_SNAPSHOT"] = 4] = "RETRY_SNAPSHOT";
    /** REJECT_SNAPSHOT - Reject this snapshot, try others */
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["REJECT_SNAPSHOT"] = 5] = "REJECT_SNAPSHOT";
    ResponseApplySnapshotChunk_Result[ResponseApplySnapshotChunk_Result["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseApplySnapshotChunk_Result = exports.ResponseApplySnapshotChunk_Result || (exports.ResponseApplySnapshotChunk_Result = {}));
function responseApplySnapshotChunk_ResultFromJSON(object) {
    switch (object) {
        case 0:
        case "UNKNOWN":
            return ResponseApplySnapshotChunk_Result.UNKNOWN;
        case 1:
        case "ACCEPT":
            return ResponseApplySnapshotChunk_Result.ACCEPT;
        case 2:
        case "ABORT":
            return ResponseApplySnapshotChunk_Result.ABORT;
        case 3:
        case "RETRY":
            return ResponseApplySnapshotChunk_Result.RETRY;
        case 4:
        case "RETRY_SNAPSHOT":
            return ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT;
        case 5:
        case "REJECT_SNAPSHOT":
            return ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseApplySnapshotChunk_Result.UNRECOGNIZED;
    }
}
exports.responseApplySnapshotChunk_ResultFromJSON = responseApplySnapshotChunk_ResultFromJSON;
function responseApplySnapshotChunk_ResultToJSON(object) {
    switch (object) {
        case ResponseApplySnapshotChunk_Result.UNKNOWN:
            return "UNKNOWN";
        case ResponseApplySnapshotChunk_Result.ACCEPT:
            return "ACCEPT";
        case ResponseApplySnapshotChunk_Result.ABORT:
            return "ABORT";
        case ResponseApplySnapshotChunk_Result.RETRY:
            return "RETRY";
        case ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT:
            return "RETRY_SNAPSHOT";
        case ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT:
            return "REJECT_SNAPSHOT";
        default:
            return "UNKNOWN";
    }
}
exports.responseApplySnapshotChunk_ResultToJSON = responseApplySnapshotChunk_ResultToJSON;
const baseRequest = {};
exports.Request = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.echo !== undefined) {
            exports.RequestEcho.encode(message.echo, writer.uint32(10).fork()).ldelim();
        }
        if (message.flush !== undefined) {
            exports.RequestFlush.encode(message.flush, writer.uint32(18).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.RequestInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
        }
        if (message.setOption !== undefined) {
            exports.RequestSetOption.encode(message.setOption, writer.uint32(34).fork()).ldelim();
        }
        if (message.initChain !== undefined) {
            exports.RequestInitChain.encode(message.initChain, writer.uint32(42).fork()).ldelim();
        }
        if (message.query !== undefined) {
            exports.RequestQuery.encode(message.query, writer.uint32(50).fork()).ldelim();
        }
        if (message.beginBlock !== undefined) {
            exports.RequestBeginBlock.encode(message.beginBlock, writer.uint32(58).fork()).ldelim();
        }
        if (message.checkTx !== undefined) {
            exports.RequestCheckTx.encode(message.checkTx, writer.uint32(66).fork()).ldelim();
        }
        if (message.deliverTx !== undefined) {
            exports.RequestDeliverTx.encode(message.deliverTx, writer.uint32(74).fork()).ldelim();
        }
        if (message.endBlock !== undefined) {
            exports.RequestEndBlock.encode(message.endBlock, writer.uint32(82).fork()).ldelim();
        }
        if (message.commit !== undefined) {
            exports.RequestCommit.encode(message.commit, writer.uint32(90).fork()).ldelim();
        }
        if (message.listSnapshots !== undefined) {
            exports.RequestListSnapshots.encode(message.listSnapshots, writer.uint32(98).fork()).ldelim();
        }
        if (message.offerSnapshot !== undefined) {
            exports.RequestOfferSnapshot.encode(message.offerSnapshot, writer.uint32(106).fork()).ldelim();
        }
        if (message.loadSnapshotChunk !== undefined) {
            exports.RequestLoadSnapshotChunk.encode(message.loadSnapshotChunk, writer.uint32(114).fork()).ldelim();
        }
        if (message.applySnapshotChunk !== undefined) {
            exports.RequestApplySnapshotChunk.encode(message.applySnapshotChunk, writer.uint32(122).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.echo = exports.RequestEcho.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.flush = exports.RequestFlush.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.info = exports.RequestInfo.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.setOption = exports.RequestSetOption.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.initChain = exports.RequestInitChain.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.query = exports.RequestQuery.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.beginBlock = exports.RequestBeginBlock.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.checkTx = exports.RequestCheckTx.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.deliverTx = exports.RequestDeliverTx.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.endBlock = exports.RequestEndBlock.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.commit = exports.RequestCommit.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.listSnapshots = exports.RequestListSnapshots.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.offerSnapshot = exports.RequestOfferSnapshot.decode(reader, reader.uint32());
                    break;
                case 14:
                    message.loadSnapshotChunk = exports.RequestLoadSnapshotChunk.decode(reader, reader.uint32());
                    break;
                case 15:
                    message.applySnapshotChunk = exports.RequestApplySnapshotChunk.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequest);
        message.echo =
            object.echo !== undefined && object.echo !== null ? exports.RequestEcho.fromJSON(object.echo) : undefined;
        message.flush =
            object.flush !== undefined && object.flush !== null ? exports.RequestFlush.fromJSON(object.flush) : undefined;
        message.info =
            object.info !== undefined && object.info !== null ? exports.RequestInfo.fromJSON(object.info) : undefined;
        message.setOption =
            object.setOption !== undefined && object.setOption !== null
                ? exports.RequestSetOption.fromJSON(object.setOption)
                : undefined;
        message.initChain =
            object.initChain !== undefined && object.initChain !== null
                ? exports.RequestInitChain.fromJSON(object.initChain)
                : undefined;
        message.query =
            object.query !== undefined && object.query !== null ? exports.RequestQuery.fromJSON(object.query) : undefined;
        message.beginBlock =
            object.beginBlock !== undefined && object.beginBlock !== null
                ? exports.RequestBeginBlock.fromJSON(object.beginBlock)
                : undefined;
        message.checkTx =
            object.checkTx !== undefined && object.checkTx !== null
                ? exports.RequestCheckTx.fromJSON(object.checkTx)
                : undefined;
        message.deliverTx =
            object.deliverTx !== undefined && object.deliverTx !== null
                ? exports.RequestDeliverTx.fromJSON(object.deliverTx)
                : undefined;
        message.endBlock =
            object.endBlock !== undefined && object.endBlock !== null
                ? exports.RequestEndBlock.fromJSON(object.endBlock)
                : undefined;
        message.commit =
            object.commit !== undefined && object.commit !== null
                ? exports.RequestCommit.fromJSON(object.commit)
                : undefined;
        message.listSnapshots =
            object.listSnapshots !== undefined && object.listSnapshots !== null
                ? exports.RequestListSnapshots.fromJSON(object.listSnapshots)
                : undefined;
        message.offerSnapshot =
            object.offerSnapshot !== undefined && object.offerSnapshot !== null
                ? exports.RequestOfferSnapshot.fromJSON(object.offerSnapshot)
                : undefined;
        message.loadSnapshotChunk =
            object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null
                ? exports.RequestLoadSnapshotChunk.fromJSON(object.loadSnapshotChunk)
                : undefined;
        message.applySnapshotChunk =
            object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null
                ? exports.RequestApplySnapshotChunk.fromJSON(object.applySnapshotChunk)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.echo !== undefined && (obj.echo = message.echo ? exports.RequestEcho.toJSON(message.echo) : undefined);
        message.flush !== undefined &&
            (obj.flush = message.flush ? exports.RequestFlush.toJSON(message.flush) : undefined);
        message.info !== undefined && (obj.info = message.info ? exports.RequestInfo.toJSON(message.info) : undefined);
        message.setOption !== undefined &&
            (obj.setOption = message.setOption ? exports.RequestSetOption.toJSON(message.setOption) : undefined);
        message.initChain !== undefined &&
            (obj.initChain = message.initChain ? exports.RequestInitChain.toJSON(message.initChain) : undefined);
        message.query !== undefined &&
            (obj.query = message.query ? exports.RequestQuery.toJSON(message.query) : undefined);
        message.beginBlock !== undefined &&
            (obj.beginBlock = message.beginBlock ? exports.RequestBeginBlock.toJSON(message.beginBlock) : undefined);
        message.checkTx !== undefined &&
            (obj.checkTx = message.checkTx ? exports.RequestCheckTx.toJSON(message.checkTx) : undefined);
        message.deliverTx !== undefined &&
            (obj.deliverTx = message.deliverTx ? exports.RequestDeliverTx.toJSON(message.deliverTx) : undefined);
        message.endBlock !== undefined &&
            (obj.endBlock = message.endBlock ? exports.RequestEndBlock.toJSON(message.endBlock) : undefined);
        message.commit !== undefined &&
            (obj.commit = message.commit ? exports.RequestCommit.toJSON(message.commit) : undefined);
        message.listSnapshots !== undefined &&
            (obj.listSnapshots = message.listSnapshots
                ? exports.RequestListSnapshots.toJSON(message.listSnapshots)
                : undefined);
        message.offerSnapshot !== undefined &&
            (obj.offerSnapshot = message.offerSnapshot
                ? exports.RequestOfferSnapshot.toJSON(message.offerSnapshot)
                : undefined);
        message.loadSnapshotChunk !== undefined &&
            (obj.loadSnapshotChunk = message.loadSnapshotChunk
                ? exports.RequestLoadSnapshotChunk.toJSON(message.loadSnapshotChunk)
                : undefined);
        message.applySnapshotChunk !== undefined &&
            (obj.applySnapshotChunk = message.applySnapshotChunk
                ? exports.RequestApplySnapshotChunk.toJSON(message.applySnapshotChunk)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseRequest);
        message.echo =
            object.echo !== undefined && object.echo !== null ? exports.RequestEcho.fromPartial(object.echo) : undefined;
        message.flush =
            object.flush !== undefined && object.flush !== null
                ? exports.RequestFlush.fromPartial(object.flush)
                : undefined;
        message.info =
            object.info !== undefined && object.info !== null ? exports.RequestInfo.fromPartial(object.info) : undefined;
        message.setOption =
            object.setOption !== undefined && object.setOption !== null
                ? exports.RequestSetOption.fromPartial(object.setOption)
                : undefined;
        message.initChain =
            object.initChain !== undefined && object.initChain !== null
                ? exports.RequestInitChain.fromPartial(object.initChain)
                : undefined;
        message.query =
            object.query !== undefined && object.query !== null
                ? exports.RequestQuery.fromPartial(object.query)
                : undefined;
        message.beginBlock =
            object.beginBlock !== undefined && object.beginBlock !== null
                ? exports.RequestBeginBlock.fromPartial(object.beginBlock)
                : undefined;
        message.checkTx =
            object.checkTx !== undefined && object.checkTx !== null
                ? exports.RequestCheckTx.fromPartial(object.checkTx)
                : undefined;
        message.deliverTx =
            object.deliverTx !== undefined && object.deliverTx !== null
                ? exports.RequestDeliverTx.fromPartial(object.deliverTx)
                : undefined;
        message.endBlock =
            object.endBlock !== undefined && object.endBlock !== null
                ? exports.RequestEndBlock.fromPartial(object.endBlock)
                : undefined;
        message.commit =
            object.commit !== undefined && object.commit !== null
                ? exports.RequestCommit.fromPartial(object.commit)
                : undefined;
        message.listSnapshots =
            object.listSnapshots !== undefined && object.listSnapshots !== null
                ? exports.RequestListSnapshots.fromPartial(object.listSnapshots)
                : undefined;
        message.offerSnapshot =
            object.offerSnapshot !== undefined && object.offerSnapshot !== null
                ? exports.RequestOfferSnapshot.fromPartial(object.offerSnapshot)
                : undefined;
        message.loadSnapshotChunk =
            object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null
                ? exports.RequestLoadSnapshotChunk.fromPartial(object.loadSnapshotChunk)
                : undefined;
        message.applySnapshotChunk =
            object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null
                ? exports.RequestApplySnapshotChunk.fromPartial(object.applySnapshotChunk)
                : undefined;
        return message;
    },
};
const baseRequestEcho = { message: "" };
exports.RequestEcho = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestEcho);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestEcho);
        message.message = object.message !== undefined && object.message !== null ? String(object.message) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.message !== undefined && (obj.message = message.message);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseRequestEcho);
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseRequestFlush = {};
exports.RequestFlush = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestFlush);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseRequestFlush);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseRequestFlush);
        return message;
    },
};
const baseRequestInfo = { version: "", blockVersion: long_1.default.UZERO, p2pVersion: long_1.default.UZERO };
exports.RequestInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.version !== "") {
            writer.uint32(10).string(message.version);
        }
        if (!message.blockVersion.isZero()) {
            writer.uint32(16).uint64(message.blockVersion);
        }
        if (!message.p2pVersion.isZero()) {
            writer.uint32(24).uint64(message.p2pVersion);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestInfo);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.version = reader.string();
                    break;
                case 2:
                    message.blockVersion = reader.uint64();
                    break;
                case 3:
                    message.p2pVersion = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestInfo);
        message.version = object.version !== undefined && object.version !== null ? String(object.version) : "";
        message.blockVersion =
            object.blockVersion !== undefined && object.blockVersion !== null
                ? long_1.default.fromString(object.blockVersion)
                : long_1.default.UZERO;
        message.p2pVersion =
            object.p2pVersion !== undefined && object.p2pVersion !== null
                ? long_1.default.fromString(object.p2pVersion)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.version !== undefined && (obj.version = message.version);
        message.blockVersion !== undefined &&
            (obj.blockVersion = (message.blockVersion || long_1.default.UZERO).toString());
        message.p2pVersion !== undefined && (obj.p2pVersion = (message.p2pVersion || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseRequestInfo);
        message.version = (_a = object.version) !== null && _a !== void 0 ? _a : "";
        message.blockVersion =
            object.blockVersion !== undefined && object.blockVersion !== null
                ? long_1.default.fromValue(object.blockVersion)
                : long_1.default.UZERO;
        message.p2pVersion =
            object.p2pVersion !== undefined && object.p2pVersion !== null
                ? long_1.default.fromValue(object.p2pVersion)
                : long_1.default.UZERO;
        return message;
    },
};
const baseRequestSetOption = { key: "", value: "" };
exports.RequestSetOption = {
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
        const message = Object.assign({}, baseRequestSetOption);
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
        const message = Object.assign({}, baseRequestSetOption);
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
        const message = Object.assign({}, baseRequestSetOption);
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : "";
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseRequestInitChain = { chainId: "", initialHeight: long_1.default.ZERO };
exports.RequestInitChain = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode(message.time, writer.uint32(10).fork()).ldelim();
        }
        if (message.chainId !== "") {
            writer.uint32(18).string(message.chainId);
        }
        if (message.consensusParams !== undefined) {
            exports.ConsensusParams.encode(message.consensusParams, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.validators) {
            exports.ValidatorUpdate.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.appStateBytes.length !== 0) {
            writer.uint32(42).bytes(message.appStateBytes);
        }
        if (!message.initialHeight.isZero()) {
            writer.uint32(48).int64(message.initialHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestInitChain);
        message.validators = [];
        message.appStateBytes = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.time = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.chainId = reader.string();
                    break;
                case 3:
                    message.consensusParams = exports.ConsensusParams.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.validators.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.appStateBytes = reader.bytes();
                    break;
                case 6:
                    message.initialHeight = reader.int64();
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
        const message = Object.assign({}, baseRequestInitChain);
        message.time =
            object.time !== undefined && object.time !== null ? fromJsonTimestamp(object.time) : undefined;
        message.chainId = object.chainId !== undefined && object.chainId !== null ? String(object.chainId) : "";
        message.consensusParams =
            object.consensusParams !== undefined && object.consensusParams !== null
                ? exports.ConsensusParams.fromJSON(object.consensusParams)
                : undefined;
        message.validators = ((_a = object.validators) !== null && _a !== void 0 ? _a : []).map((e) => exports.ValidatorUpdate.fromJSON(e));
        message.appStateBytes =
            object.appStateBytes !== undefined && object.appStateBytes !== null
                ? bytesFromBase64(object.appStateBytes)
                : new Uint8Array();
        message.initialHeight =
            object.initialHeight !== undefined && object.initialHeight !== null
                ? long_1.default.fromString(object.initialHeight)
                : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.time !== undefined && (obj.time = fromTimestamp(message.time).toISOString());
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.consensusParams !== undefined &&
            (obj.consensusParams = message.consensusParams
                ? exports.ConsensusParams.toJSON(message.consensusParams)
                : undefined);
        if (message.validators) {
            obj.validators = message.validators.map((e) => (e ? exports.ValidatorUpdate.toJSON(e) : undefined));
        }
        else {
            obj.validators = [];
        }
        message.appStateBytes !== undefined &&
            (obj.appStateBytes = base64FromBytes(message.appStateBytes !== undefined ? message.appStateBytes : new Uint8Array()));
        message.initialHeight !== undefined &&
            (obj.initialHeight = (message.initialHeight || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseRequestInitChain);
        message.time =
            object.time !== undefined && object.time !== null ? timestamp_1.Timestamp.fromPartial(object.time) : undefined;
        message.chainId = (_a = object.chainId) !== null && _a !== void 0 ? _a : "";
        message.consensusParams =
            object.consensusParams !== undefined && object.consensusParams !== null
                ? exports.ConsensusParams.fromPartial(object.consensusParams)
                : undefined;
        message.validators = ((_b = object.validators) === null || _b === void 0 ? void 0 : _b.map((e) => exports.ValidatorUpdate.fromPartial(e))) || [];
        message.appStateBytes = (_c = object.appStateBytes) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.initialHeight =
            object.initialHeight !== undefined && object.initialHeight !== null
                ? long_1.default.fromValue(object.initialHeight)
                : long_1.default.ZERO;
        return message;
    },
};
const baseRequestQuery = { path: "", height: long_1.default.ZERO, prove: false };
exports.RequestQuery = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        if (message.path !== "") {
            writer.uint32(18).string(message.path);
        }
        if (!message.height.isZero()) {
            writer.uint32(24).int64(message.height);
        }
        if (message.prove === true) {
            writer.uint32(32).bool(message.prove);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestQuery);
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.path = reader.string();
                    break;
                case 3:
                    message.height = reader.int64();
                    break;
                case 4:
                    message.prove = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestQuery);
        message.data =
            object.data !== undefined && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
        message.path = object.path !== undefined && object.path !== null ? String(object.path) : "";
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
        message.prove = object.prove !== undefined && object.prove !== null ? Boolean(object.prove) : false;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.path !== undefined && (obj.path = message.path);
        message.height !== undefined && (obj.height = (message.height || long_1.default.ZERO).toString());
        message.prove !== undefined && (obj.prove = message.prove);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseRequestQuery);
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.path = (_b = object.path) !== null && _b !== void 0 ? _b : "";
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
        message.prove = (_c = object.prove) !== null && _c !== void 0 ? _c : false;
        return message;
    },
};
const baseRequestBeginBlock = {};
exports.RequestBeginBlock = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        if (message.header !== undefined) {
            types_1.Header.encode(message.header, writer.uint32(18).fork()).ldelim();
        }
        if (message.lastCommitInfo !== undefined) {
            exports.LastCommitInfo.encode(message.lastCommitInfo, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.byzantineValidators) {
            exports.Evidence.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestBeginBlock);
        message.byzantineValidators = [];
        message.hash = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.bytes();
                    break;
                case 2:
                    message.header = types_1.Header.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.lastCommitInfo = exports.LastCommitInfo.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.byzantineValidators.push(exports.Evidence.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseRequestBeginBlock);
        message.hash =
            object.hash !== undefined && object.hash !== null ? bytesFromBase64(object.hash) : new Uint8Array();
        message.header =
            object.header !== undefined && object.header !== null ? types_1.Header.fromJSON(object.header) : undefined;
        message.lastCommitInfo =
            object.lastCommitInfo !== undefined && object.lastCommitInfo !== null
                ? exports.LastCommitInfo.fromJSON(object.lastCommitInfo)
                : undefined;
        message.byzantineValidators = ((_a = object.byzantineValidators) !== null && _a !== void 0 ? _a : []).map((e) => exports.Evidence.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined &&
            (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
        message.header !== undefined && (obj.header = message.header ? types_1.Header.toJSON(message.header) : undefined);
        message.lastCommitInfo !== undefined &&
            (obj.lastCommitInfo = message.lastCommitInfo
                ? exports.LastCommitInfo.toJSON(message.lastCommitInfo)
                : undefined);
        if (message.byzantineValidators) {
            obj.byzantineValidators = message.byzantineValidators.map((e) => (e ? exports.Evidence.toJSON(e) : undefined));
        }
        else {
            obj.byzantineValidators = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseRequestBeginBlock);
        message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.header =
            object.header !== undefined && object.header !== null ? types_1.Header.fromPartial(object.header) : undefined;
        message.lastCommitInfo =
            object.lastCommitInfo !== undefined && object.lastCommitInfo !== null
                ? exports.LastCommitInfo.fromPartial(object.lastCommitInfo)
                : undefined;
        message.byzantineValidators = ((_b = object.byzantineValidators) === null || _b === void 0 ? void 0 : _b.map((e) => exports.Evidence.fromPartial(e))) || [];
        return message;
    },
};
const baseRequestCheckTx = { type: 0 };
exports.RequestCheckTx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.tx.length !== 0) {
            writer.uint32(10).bytes(message.tx);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestCheckTx);
        message.tx = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = reader.bytes();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestCheckTx);
        message.tx =
            object.tx !== undefined && object.tx !== null ? bytesFromBase64(object.tx) : new Uint8Array();
        message.type = object.type !== undefined && object.type !== null ? checkTxTypeFromJSON(object.type) : 0;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.tx !== undefined &&
            (obj.tx = base64FromBytes(message.tx !== undefined ? message.tx : new Uint8Array()));
        message.type !== undefined && (obj.type = checkTxTypeToJSON(message.type));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseRequestCheckTx);
        message.tx = (_a = object.tx) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.type = (_b = object.type) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
const baseRequestDeliverTx = {};
exports.RequestDeliverTx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.tx.length !== 0) {
            writer.uint32(10).bytes(message.tx);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestDeliverTx);
        message.tx = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tx = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestDeliverTx);
        message.tx =
            object.tx !== undefined && object.tx !== null ? bytesFromBase64(object.tx) : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.tx !== undefined &&
            (obj.tx = base64FromBytes(message.tx !== undefined ? message.tx : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseRequestDeliverTx);
        message.tx = (_a = object.tx) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
const baseRequestEndBlock = { height: long_1.default.ZERO };
exports.RequestEndBlock = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.height.isZero()) {
            writer.uint32(8).int64(message.height);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestEndBlock);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestEndBlock);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined && (obj.height = (message.height || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseRequestEndBlock);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
        return message;
    },
};
const baseRequestCommit = {};
exports.RequestCommit = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestCommit);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseRequestCommit);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseRequestCommit);
        return message;
    },
};
const baseRequestListSnapshots = {};
exports.RequestListSnapshots = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestListSnapshots);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseRequestListSnapshots);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseRequestListSnapshots);
        return message;
    },
};
const baseRequestOfferSnapshot = {};
exports.RequestOfferSnapshot = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.snapshot !== undefined) {
            exports.Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(18).bytes(message.appHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestOfferSnapshot);
        message.appHash = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.snapshot = exports.Snapshot.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.appHash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestOfferSnapshot);
        message.snapshot =
            object.snapshot !== undefined && object.snapshot !== null
                ? exports.Snapshot.fromJSON(object.snapshot)
                : undefined;
        message.appHash =
            object.appHash !== undefined && object.appHash !== null
                ? bytesFromBase64(object.appHash)
                : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.snapshot !== undefined &&
            (obj.snapshot = message.snapshot ? exports.Snapshot.toJSON(message.snapshot) : undefined);
        message.appHash !== undefined &&
            (obj.appHash = base64FromBytes(message.appHash !== undefined ? message.appHash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseRequestOfferSnapshot);
        message.snapshot =
            object.snapshot !== undefined && object.snapshot !== null
                ? exports.Snapshot.fromPartial(object.snapshot)
                : undefined;
        message.appHash = (_a = object.appHash) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
const baseRequestLoadSnapshotChunk = { height: long_1.default.UZERO, format: 0, chunk: 0 };
exports.RequestLoadSnapshotChunk = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.height.isZero()) {
            writer.uint32(8).uint64(message.height);
        }
        if (message.format !== 0) {
            writer.uint32(16).uint32(message.format);
        }
        if (message.chunk !== 0) {
            writer.uint32(24).uint32(message.chunk);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestLoadSnapshotChunk);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.uint64();
                    break;
                case 2:
                    message.format = reader.uint32();
                    break;
                case 3:
                    message.chunk = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestLoadSnapshotChunk);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.UZERO;
        message.format = object.format !== undefined && object.format !== null ? Number(object.format) : 0;
        message.chunk = object.chunk !== undefined && object.chunk !== null ? Number(object.chunk) : 0;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined && (obj.height = (message.height || long_1.default.UZERO).toString());
        message.format !== undefined && (obj.format = message.format);
        message.chunk !== undefined && (obj.chunk = message.chunk);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseRequestLoadSnapshotChunk);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.UZERO;
        message.format = (_a = object.format) !== null && _a !== void 0 ? _a : 0;
        message.chunk = (_b = object.chunk) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
const baseRequestApplySnapshotChunk = { index: 0, sender: "" };
exports.RequestApplySnapshotChunk = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.index !== 0) {
            writer.uint32(8).uint32(message.index);
        }
        if (message.chunk.length !== 0) {
            writer.uint32(18).bytes(message.chunk);
        }
        if (message.sender !== "") {
            writer.uint32(26).string(message.sender);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRequestApplySnapshotChunk);
        message.chunk = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.uint32();
                    break;
                case 2:
                    message.chunk = reader.bytes();
                    break;
                case 3:
                    message.sender = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRequestApplySnapshotChunk);
        message.index = object.index !== undefined && object.index !== null ? Number(object.index) : 0;
        message.chunk =
            object.chunk !== undefined && object.chunk !== null ? bytesFromBase64(object.chunk) : new Uint8Array();
        message.sender = object.sender !== undefined && object.sender !== null ? String(object.sender) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        message.chunk !== undefined &&
            (obj.chunk = base64FromBytes(message.chunk !== undefined ? message.chunk : new Uint8Array()));
        message.sender !== undefined && (obj.sender = message.sender);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseRequestApplySnapshotChunk);
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : 0;
        message.chunk = (_b = object.chunk) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.sender = (_c = object.sender) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseResponse = {};
exports.Response = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.exception !== undefined) {
            exports.ResponseException.encode(message.exception, writer.uint32(10).fork()).ldelim();
        }
        if (message.echo !== undefined) {
            exports.ResponseEcho.encode(message.echo, writer.uint32(18).fork()).ldelim();
        }
        if (message.flush !== undefined) {
            exports.ResponseFlush.encode(message.flush, writer.uint32(26).fork()).ldelim();
        }
        if (message.info !== undefined) {
            exports.ResponseInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
        }
        if (message.setOption !== undefined) {
            exports.ResponseSetOption.encode(message.setOption, writer.uint32(42).fork()).ldelim();
        }
        if (message.initChain !== undefined) {
            exports.ResponseInitChain.encode(message.initChain, writer.uint32(50).fork()).ldelim();
        }
        if (message.query !== undefined) {
            exports.ResponseQuery.encode(message.query, writer.uint32(58).fork()).ldelim();
        }
        if (message.beginBlock !== undefined) {
            exports.ResponseBeginBlock.encode(message.beginBlock, writer.uint32(66).fork()).ldelim();
        }
        if (message.checkTx !== undefined) {
            exports.ResponseCheckTx.encode(message.checkTx, writer.uint32(74).fork()).ldelim();
        }
        if (message.deliverTx !== undefined) {
            exports.ResponseDeliverTx.encode(message.deliverTx, writer.uint32(82).fork()).ldelim();
        }
        if (message.endBlock !== undefined) {
            exports.ResponseEndBlock.encode(message.endBlock, writer.uint32(90).fork()).ldelim();
        }
        if (message.commit !== undefined) {
            exports.ResponseCommit.encode(message.commit, writer.uint32(98).fork()).ldelim();
        }
        if (message.listSnapshots !== undefined) {
            exports.ResponseListSnapshots.encode(message.listSnapshots, writer.uint32(106).fork()).ldelim();
        }
        if (message.offerSnapshot !== undefined) {
            exports.ResponseOfferSnapshot.encode(message.offerSnapshot, writer.uint32(114).fork()).ldelim();
        }
        if (message.loadSnapshotChunk !== undefined) {
            exports.ResponseLoadSnapshotChunk.encode(message.loadSnapshotChunk, writer.uint32(122).fork()).ldelim();
        }
        if (message.applySnapshotChunk !== undefined) {
            exports.ResponseApplySnapshotChunk.encode(message.applySnapshotChunk, writer.uint32(130).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.exception = exports.ResponseException.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.echo = exports.ResponseEcho.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.flush = exports.ResponseFlush.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.info = exports.ResponseInfo.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.setOption = exports.ResponseSetOption.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.initChain = exports.ResponseInitChain.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.query = exports.ResponseQuery.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.beginBlock = exports.ResponseBeginBlock.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.checkTx = exports.ResponseCheckTx.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.deliverTx = exports.ResponseDeliverTx.decode(reader, reader.uint32());
                    break;
                case 11:
                    message.endBlock = exports.ResponseEndBlock.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.commit = exports.ResponseCommit.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.listSnapshots = exports.ResponseListSnapshots.decode(reader, reader.uint32());
                    break;
                case 14:
                    message.offerSnapshot = exports.ResponseOfferSnapshot.decode(reader, reader.uint32());
                    break;
                case 15:
                    message.loadSnapshotChunk = exports.ResponseLoadSnapshotChunk.decode(reader, reader.uint32());
                    break;
                case 16:
                    message.applySnapshotChunk = exports.ResponseApplySnapshotChunk.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponse);
        message.exception =
            object.exception !== undefined && object.exception !== null
                ? exports.ResponseException.fromJSON(object.exception)
                : undefined;
        message.echo =
            object.echo !== undefined && object.echo !== null ? exports.ResponseEcho.fromJSON(object.echo) : undefined;
        message.flush =
            object.flush !== undefined && object.flush !== null ? exports.ResponseFlush.fromJSON(object.flush) : undefined;
        message.info =
            object.info !== undefined && object.info !== null ? exports.ResponseInfo.fromJSON(object.info) : undefined;
        message.setOption =
            object.setOption !== undefined && object.setOption !== null
                ? exports.ResponseSetOption.fromJSON(object.setOption)
                : undefined;
        message.initChain =
            object.initChain !== undefined && object.initChain !== null
                ? exports.ResponseInitChain.fromJSON(object.initChain)
                : undefined;
        message.query =
            object.query !== undefined && object.query !== null ? exports.ResponseQuery.fromJSON(object.query) : undefined;
        message.beginBlock =
            object.beginBlock !== undefined && object.beginBlock !== null
                ? exports.ResponseBeginBlock.fromJSON(object.beginBlock)
                : undefined;
        message.checkTx =
            object.checkTx !== undefined && object.checkTx !== null
                ? exports.ResponseCheckTx.fromJSON(object.checkTx)
                : undefined;
        message.deliverTx =
            object.deliverTx !== undefined && object.deliverTx !== null
                ? exports.ResponseDeliverTx.fromJSON(object.deliverTx)
                : undefined;
        message.endBlock =
            object.endBlock !== undefined && object.endBlock !== null
                ? exports.ResponseEndBlock.fromJSON(object.endBlock)
                : undefined;
        message.commit =
            object.commit !== undefined && object.commit !== null
                ? exports.ResponseCommit.fromJSON(object.commit)
                : undefined;
        message.listSnapshots =
            object.listSnapshots !== undefined && object.listSnapshots !== null
                ? exports.ResponseListSnapshots.fromJSON(object.listSnapshots)
                : undefined;
        message.offerSnapshot =
            object.offerSnapshot !== undefined && object.offerSnapshot !== null
                ? exports.ResponseOfferSnapshot.fromJSON(object.offerSnapshot)
                : undefined;
        message.loadSnapshotChunk =
            object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null
                ? exports.ResponseLoadSnapshotChunk.fromJSON(object.loadSnapshotChunk)
                : undefined;
        message.applySnapshotChunk =
            object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null
                ? exports.ResponseApplySnapshotChunk.fromJSON(object.applySnapshotChunk)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.exception !== undefined &&
            (obj.exception = message.exception ? exports.ResponseException.toJSON(message.exception) : undefined);
        message.echo !== undefined && (obj.echo = message.echo ? exports.ResponseEcho.toJSON(message.echo) : undefined);
        message.flush !== undefined &&
            (obj.flush = message.flush ? exports.ResponseFlush.toJSON(message.flush) : undefined);
        message.info !== undefined && (obj.info = message.info ? exports.ResponseInfo.toJSON(message.info) : undefined);
        message.setOption !== undefined &&
            (obj.setOption = message.setOption ? exports.ResponseSetOption.toJSON(message.setOption) : undefined);
        message.initChain !== undefined &&
            (obj.initChain = message.initChain ? exports.ResponseInitChain.toJSON(message.initChain) : undefined);
        message.query !== undefined &&
            (obj.query = message.query ? exports.ResponseQuery.toJSON(message.query) : undefined);
        message.beginBlock !== undefined &&
            (obj.beginBlock = message.beginBlock ? exports.ResponseBeginBlock.toJSON(message.beginBlock) : undefined);
        message.checkTx !== undefined &&
            (obj.checkTx = message.checkTx ? exports.ResponseCheckTx.toJSON(message.checkTx) : undefined);
        message.deliverTx !== undefined &&
            (obj.deliverTx = message.deliverTx ? exports.ResponseDeliverTx.toJSON(message.deliverTx) : undefined);
        message.endBlock !== undefined &&
            (obj.endBlock = message.endBlock ? exports.ResponseEndBlock.toJSON(message.endBlock) : undefined);
        message.commit !== undefined &&
            (obj.commit = message.commit ? exports.ResponseCommit.toJSON(message.commit) : undefined);
        message.listSnapshots !== undefined &&
            (obj.listSnapshots = message.listSnapshots
                ? exports.ResponseListSnapshots.toJSON(message.listSnapshots)
                : undefined);
        message.offerSnapshot !== undefined &&
            (obj.offerSnapshot = message.offerSnapshot
                ? exports.ResponseOfferSnapshot.toJSON(message.offerSnapshot)
                : undefined);
        message.loadSnapshotChunk !== undefined &&
            (obj.loadSnapshotChunk = message.loadSnapshotChunk
                ? exports.ResponseLoadSnapshotChunk.toJSON(message.loadSnapshotChunk)
                : undefined);
        message.applySnapshotChunk !== undefined &&
            (obj.applySnapshotChunk = message.applySnapshotChunk
                ? exports.ResponseApplySnapshotChunk.toJSON(message.applySnapshotChunk)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseResponse);
        message.exception =
            object.exception !== undefined && object.exception !== null
                ? exports.ResponseException.fromPartial(object.exception)
                : undefined;
        message.echo =
            object.echo !== undefined && object.echo !== null ? exports.ResponseEcho.fromPartial(object.echo) : undefined;
        message.flush =
            object.flush !== undefined && object.flush !== null
                ? exports.ResponseFlush.fromPartial(object.flush)
                : undefined;
        message.info =
            object.info !== undefined && object.info !== null ? exports.ResponseInfo.fromPartial(object.info) : undefined;
        message.setOption =
            object.setOption !== undefined && object.setOption !== null
                ? exports.ResponseSetOption.fromPartial(object.setOption)
                : undefined;
        message.initChain =
            object.initChain !== undefined && object.initChain !== null
                ? exports.ResponseInitChain.fromPartial(object.initChain)
                : undefined;
        message.query =
            object.query !== undefined && object.query !== null
                ? exports.ResponseQuery.fromPartial(object.query)
                : undefined;
        message.beginBlock =
            object.beginBlock !== undefined && object.beginBlock !== null
                ? exports.ResponseBeginBlock.fromPartial(object.beginBlock)
                : undefined;
        message.checkTx =
            object.checkTx !== undefined && object.checkTx !== null
                ? exports.ResponseCheckTx.fromPartial(object.checkTx)
                : undefined;
        message.deliverTx =
            object.deliverTx !== undefined && object.deliverTx !== null
                ? exports.ResponseDeliverTx.fromPartial(object.deliverTx)
                : undefined;
        message.endBlock =
            object.endBlock !== undefined && object.endBlock !== null
                ? exports.ResponseEndBlock.fromPartial(object.endBlock)
                : undefined;
        message.commit =
            object.commit !== undefined && object.commit !== null
                ? exports.ResponseCommit.fromPartial(object.commit)
                : undefined;
        message.listSnapshots =
            object.listSnapshots !== undefined && object.listSnapshots !== null
                ? exports.ResponseListSnapshots.fromPartial(object.listSnapshots)
                : undefined;
        message.offerSnapshot =
            object.offerSnapshot !== undefined && object.offerSnapshot !== null
                ? exports.ResponseOfferSnapshot.fromPartial(object.offerSnapshot)
                : undefined;
        message.loadSnapshotChunk =
            object.loadSnapshotChunk !== undefined && object.loadSnapshotChunk !== null
                ? exports.ResponseLoadSnapshotChunk.fromPartial(object.loadSnapshotChunk)
                : undefined;
        message.applySnapshotChunk =
            object.applySnapshotChunk !== undefined && object.applySnapshotChunk !== null
                ? exports.ResponseApplySnapshotChunk.fromPartial(object.applySnapshotChunk)
                : undefined;
        return message;
    },
};
const baseResponseException = { error: "" };
exports.ResponseException = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.error !== "") {
            writer.uint32(10).string(message.error);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseException);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponseException);
        message.error = object.error !== undefined && object.error !== null ? String(object.error) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.error !== undefined && (obj.error = message.error);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseResponseException);
        message.error = (_a = object.error) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseResponseEcho = { message: "" };
exports.ResponseEcho = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseEcho);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponseEcho);
        message.message = object.message !== undefined && object.message !== null ? String(object.message) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.message !== undefined && (obj.message = message.message);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseResponseEcho);
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseResponseFlush = {};
exports.ResponseFlush = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseFlush);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseResponseFlush);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseResponseFlush);
        return message;
    },
};
const baseResponseInfo = {
    data: "",
    version: "",
    appVersion: long_1.default.UZERO,
    lastBlockHeight: long_1.default.ZERO,
};
exports.ResponseInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data !== "") {
            writer.uint32(10).string(message.data);
        }
        if (message.version !== "") {
            writer.uint32(18).string(message.version);
        }
        if (!message.appVersion.isZero()) {
            writer.uint32(24).uint64(message.appVersion);
        }
        if (!message.lastBlockHeight.isZero()) {
            writer.uint32(32).int64(message.lastBlockHeight);
        }
        if (message.lastBlockAppHash.length !== 0) {
            writer.uint32(42).bytes(message.lastBlockAppHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseInfo);
        message.lastBlockAppHash = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.string();
                    break;
                case 2:
                    message.version = reader.string();
                    break;
                case 3:
                    message.appVersion = reader.uint64();
                    break;
                case 4:
                    message.lastBlockHeight = reader.int64();
                    break;
                case 5:
                    message.lastBlockAppHash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponseInfo);
        message.data = object.data !== undefined && object.data !== null ? String(object.data) : "";
        message.version = object.version !== undefined && object.version !== null ? String(object.version) : "";
        message.appVersion =
            object.appVersion !== undefined && object.appVersion !== null
                ? long_1.default.fromString(object.appVersion)
                : long_1.default.UZERO;
        message.lastBlockHeight =
            object.lastBlockHeight !== undefined && object.lastBlockHeight !== null
                ? long_1.default.fromString(object.lastBlockHeight)
                : long_1.default.ZERO;
        message.lastBlockAppHash =
            object.lastBlockAppHash !== undefined && object.lastBlockAppHash !== null
                ? bytesFromBase64(object.lastBlockAppHash)
                : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined && (obj.data = message.data);
        message.version !== undefined && (obj.version = message.version);
        message.appVersion !== undefined && (obj.appVersion = (message.appVersion || long_1.default.UZERO).toString());
        message.lastBlockHeight !== undefined &&
            (obj.lastBlockHeight = (message.lastBlockHeight || long_1.default.ZERO).toString());
        message.lastBlockAppHash !== undefined &&
            (obj.lastBlockAppHash = base64FromBytes(message.lastBlockAppHash !== undefined ? message.lastBlockAppHash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseResponseInfo);
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : "";
        message.version = (_b = object.version) !== null && _b !== void 0 ? _b : "";
        message.appVersion =
            object.appVersion !== undefined && object.appVersion !== null
                ? long_1.default.fromValue(object.appVersion)
                : long_1.default.UZERO;
        message.lastBlockHeight =
            object.lastBlockHeight !== undefined && object.lastBlockHeight !== null
                ? long_1.default.fromValue(object.lastBlockHeight)
                : long_1.default.ZERO;
        message.lastBlockAppHash = (_c = object.lastBlockAppHash) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
const baseResponseSetOption = { code: 0, log: "", info: "" };
exports.ResponseSetOption = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseSetOption);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 3:
                    message.log = reader.string();
                    break;
                case 4:
                    message.info = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponseSetOption);
        message.code = object.code !== undefined && object.code !== null ? Number(object.code) : 0;
        message.log = object.log !== undefined && object.log !== null ? String(object.log) : "";
        message.info = object.info !== undefined && object.info !== null ? String(object.info) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.code !== undefined && (obj.code = message.code);
        message.log !== undefined && (obj.log = message.log);
        message.info !== undefined && (obj.info = message.info);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseResponseSetOption);
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : 0;
        message.log = (_b = object.log) !== null && _b !== void 0 ? _b : "";
        message.info = (_c = object.info) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseResponseInitChain = {};
exports.ResponseInitChain = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.consensusParams !== undefined) {
            exports.ConsensusParams.encode(message.consensusParams, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.validators) {
            exports.ValidatorUpdate.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.appHash.length !== 0) {
            writer.uint32(26).bytes(message.appHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseInitChain);
        message.validators = [];
        message.appHash = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consensusParams = exports.ConsensusParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.validators.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.appHash = reader.bytes();
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
        const message = Object.assign({}, baseResponseInitChain);
        message.consensusParams =
            object.consensusParams !== undefined && object.consensusParams !== null
                ? exports.ConsensusParams.fromJSON(object.consensusParams)
                : undefined;
        message.validators = ((_a = object.validators) !== null && _a !== void 0 ? _a : []).map((e) => exports.ValidatorUpdate.fromJSON(e));
        message.appHash =
            object.appHash !== undefined && object.appHash !== null
                ? bytesFromBase64(object.appHash)
                : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.consensusParams !== undefined &&
            (obj.consensusParams = message.consensusParams
                ? exports.ConsensusParams.toJSON(message.consensusParams)
                : undefined);
        if (message.validators) {
            obj.validators = message.validators.map((e) => (e ? exports.ValidatorUpdate.toJSON(e) : undefined));
        }
        else {
            obj.validators = [];
        }
        message.appHash !== undefined &&
            (obj.appHash = base64FromBytes(message.appHash !== undefined ? message.appHash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseResponseInitChain);
        message.consensusParams =
            object.consensusParams !== undefined && object.consensusParams !== null
                ? exports.ConsensusParams.fromPartial(object.consensusParams)
                : undefined;
        message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidatorUpdate.fromPartial(e))) || [];
        message.appHash = (_b = object.appHash) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
const baseResponseQuery = {
    code: 0,
    log: "",
    info: "",
    index: long_1.default.ZERO,
    height: long_1.default.ZERO,
    codespace: "",
};
exports.ResponseQuery = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (!message.index.isZero()) {
            writer.uint32(40).int64(message.index);
        }
        if (message.key.length !== 0) {
            writer.uint32(50).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(58).bytes(message.value);
        }
        if (message.proofOps !== undefined) {
            proof_1.ProofOps.encode(message.proofOps, writer.uint32(66).fork()).ldelim();
        }
        if (!message.height.isZero()) {
            writer.uint32(72).int64(message.height);
        }
        if (message.codespace !== "") {
            writer.uint32(82).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseQuery);
        message.key = new Uint8Array();
        message.value = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 3:
                    message.log = reader.string();
                    break;
                case 4:
                    message.info = reader.string();
                    break;
                case 5:
                    message.index = reader.int64();
                    break;
                case 6:
                    message.key = reader.bytes();
                    break;
                case 7:
                    message.value = reader.bytes();
                    break;
                case 8:
                    message.proofOps = proof_1.ProofOps.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.height = reader.int64();
                    break;
                case 10:
                    message.codespace = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponseQuery);
        message.code = object.code !== undefined && object.code !== null ? Number(object.code) : 0;
        message.log = object.log !== undefined && object.log !== null ? String(object.log) : "";
        message.info = object.info !== undefined && object.info !== null ? String(object.info) : "";
        message.index =
            object.index !== undefined && object.index !== null ? long_1.default.fromString(object.index) : long_1.default.ZERO;
        message.key =
            object.key !== undefined && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
        message.value =
            object.value !== undefined && object.value !== null ? bytesFromBase64(object.value) : new Uint8Array();
        message.proofOps =
            object.proofOps !== undefined && object.proofOps !== null
                ? proof_1.ProofOps.fromJSON(object.proofOps)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
        message.codespace =
            object.codespace !== undefined && object.codespace !== null ? String(object.codespace) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.code !== undefined && (obj.code = message.code);
        message.log !== undefined && (obj.log = message.log);
        message.info !== undefined && (obj.info = message.info);
        message.index !== undefined && (obj.index = (message.index || long_1.default.ZERO).toString());
        message.key !== undefined &&
            (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
        message.value !== undefined &&
            (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        message.proofOps !== undefined &&
            (obj.proofOps = message.proofOps ? proof_1.ProofOps.toJSON(message.proofOps) : undefined);
        message.height !== undefined && (obj.height = (message.height || long_1.default.ZERO).toString());
        message.codespace !== undefined && (obj.codespace = message.codespace);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = Object.assign({}, baseResponseQuery);
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : 0;
        message.log = (_b = object.log) !== null && _b !== void 0 ? _b : "";
        message.info = (_c = object.info) !== null && _c !== void 0 ? _c : "";
        message.index =
            object.index !== undefined && object.index !== null ? long_1.default.fromValue(object.index) : long_1.default.ZERO;
        message.key = (_d = object.key) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.value = (_e = object.value) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.proofOps =
            object.proofOps !== undefined && object.proofOps !== null
                ? proof_1.ProofOps.fromPartial(object.proofOps)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
        message.codespace = (_f = object.codespace) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
const baseResponseBeginBlock = {};
exports.ResponseBeginBlock = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseBeginBlock);
        message.events = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseResponseBeginBlock);
        message.events = ((_a = object.events) !== null && _a !== void 0 ? _a : []).map((e) => exports.Event.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.events) {
            obj.events = message.events.map((e) => (e ? exports.Event.toJSON(e) : undefined));
        }
        else {
            obj.events = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseResponseBeginBlock);
        message.events = ((_a = object.events) === null || _a === void 0 ? void 0 : _a.map((e) => exports.Event.fromPartial(e))) || [];
        return message;
    },
};
const baseResponseCheckTx = {
    code: 0,
    log: "",
    info: "",
    gasWanted: long_1.default.ZERO,
    gasUsed: long_1.default.ZERO,
    codespace: "",
};
exports.ResponseCheckTx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (!message.gasWanted.isZero()) {
            writer.uint32(40).int64(message.gasWanted);
        }
        if (!message.gasUsed.isZero()) {
            writer.uint32(48).int64(message.gasUsed);
        }
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.codespace !== "") {
            writer.uint32(66).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseCheckTx);
        message.events = [];
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.log = reader.string();
                    break;
                case 4:
                    message.info = reader.string();
                    break;
                case 5:
                    message.gasWanted = reader.int64();
                    break;
                case 6:
                    message.gasUsed = reader.int64();
                    break;
                case 7:
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.codespace = reader.string();
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
        const message = Object.assign({}, baseResponseCheckTx);
        message.code = object.code !== undefined && object.code !== null ? Number(object.code) : 0;
        message.data =
            object.data !== undefined && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
        message.log = object.log !== undefined && object.log !== null ? String(object.log) : "";
        message.info = object.info !== undefined && object.info !== null ? String(object.info) : "";
        message.gasWanted =
            object.gas_wanted !== undefined && object.gas_wanted !== null
                ? long_1.default.fromString(object.gas_wanted)
                : long_1.default.ZERO;
        message.gasUsed =
            object.gas_used !== undefined && object.gas_used !== null
                ? long_1.default.fromString(object.gas_used)
                : long_1.default.ZERO;
        message.events = ((_a = object.events) !== null && _a !== void 0 ? _a : []).map((e) => exports.Event.fromJSON(e));
        message.codespace =
            object.codespace !== undefined && object.codespace !== null ? String(object.codespace) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.code !== undefined && (obj.code = message.code);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.log !== undefined && (obj.log = message.log);
        message.info !== undefined && (obj.info = message.info);
        message.gasWanted !== undefined && (obj.gas_wanted = (message.gasWanted || long_1.default.ZERO).toString());
        message.gasUsed !== undefined && (obj.gas_used = (message.gasUsed || long_1.default.ZERO).toString());
        if (message.events) {
            obj.events = message.events.map((e) => (e ? exports.Event.toJSON(e) : undefined));
        }
        else {
            obj.events = [];
        }
        message.codespace !== undefined && (obj.codespace = message.codespace);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = Object.assign({}, baseResponseCheckTx);
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : 0;
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.log = (_c = object.log) !== null && _c !== void 0 ? _c : "";
        message.info = (_d = object.info) !== null && _d !== void 0 ? _d : "";
        message.gasWanted =
            object.gasWanted !== undefined && object.gasWanted !== null
                ? long_1.default.fromValue(object.gasWanted)
                : long_1.default.ZERO;
        message.gasUsed =
            object.gasUsed !== undefined && object.gasUsed !== null ? long_1.default.fromValue(object.gasUsed) : long_1.default.ZERO;
        message.events = ((_e = object.events) === null || _e === void 0 ? void 0 : _e.map((e) => exports.Event.fromPartial(e))) || [];
        message.codespace = (_f = object.codespace) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
const baseResponseDeliverTx = {
    code: 0,
    log: "",
    info: "",
    gasWanted: long_1.default.ZERO,
    gasUsed: long_1.default.ZERO,
    codespace: "",
};
exports.ResponseDeliverTx = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.code !== 0) {
            writer.uint32(8).uint32(message.code);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.log !== "") {
            writer.uint32(26).string(message.log);
        }
        if (message.info !== "") {
            writer.uint32(34).string(message.info);
        }
        if (!message.gasWanted.isZero()) {
            writer.uint32(40).int64(message.gasWanted);
        }
        if (!message.gasUsed.isZero()) {
            writer.uint32(48).int64(message.gasUsed);
        }
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.codespace !== "") {
            writer.uint32(66).string(message.codespace);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseDeliverTx);
        message.events = [];
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.log = reader.string();
                    break;
                case 4:
                    message.info = reader.string();
                    break;
                case 5:
                    message.gasWanted = reader.int64();
                    break;
                case 6:
                    message.gasUsed = reader.int64();
                    break;
                case 7:
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.codespace = reader.string();
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
        const message = Object.assign({}, baseResponseDeliverTx);
        message.code = object.code !== undefined && object.code !== null ? Number(object.code) : 0;
        message.data =
            object.data !== undefined && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
        message.log = object.log !== undefined && object.log !== null ? String(object.log) : "";
        message.info = object.info !== undefined && object.info !== null ? String(object.info) : "";
        message.gasWanted =
            object.gas_wanted !== undefined && object.gas_wanted !== null
                ? long_1.default.fromString(object.gas_wanted)
                : long_1.default.ZERO;
        message.gasUsed =
            object.gas_used !== undefined && object.gas_used !== null
                ? long_1.default.fromString(object.gas_used)
                : long_1.default.ZERO;
        message.events = ((_a = object.events) !== null && _a !== void 0 ? _a : []).map((e) => exports.Event.fromJSON(e));
        message.codespace =
            object.codespace !== undefined && object.codespace !== null ? String(object.codespace) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.code !== undefined && (obj.code = message.code);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.log !== undefined && (obj.log = message.log);
        message.info !== undefined && (obj.info = message.info);
        message.gasWanted !== undefined && (obj.gas_wanted = (message.gasWanted || long_1.default.ZERO).toString());
        message.gasUsed !== undefined && (obj.gas_used = (message.gasUsed || long_1.default.ZERO).toString());
        if (message.events) {
            obj.events = message.events.map((e) => (e ? exports.Event.toJSON(e) : undefined));
        }
        else {
            obj.events = [];
        }
        message.codespace !== undefined && (obj.codespace = message.codespace);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = Object.assign({}, baseResponseDeliverTx);
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : 0;
        message.data = (_b = object.data) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.log = (_c = object.log) !== null && _c !== void 0 ? _c : "";
        message.info = (_d = object.info) !== null && _d !== void 0 ? _d : "";
        message.gasWanted =
            object.gasWanted !== undefined && object.gasWanted !== null
                ? long_1.default.fromValue(object.gasWanted)
                : long_1.default.ZERO;
        message.gasUsed =
            object.gasUsed !== undefined && object.gasUsed !== null ? long_1.default.fromValue(object.gasUsed) : long_1.default.ZERO;
        message.events = ((_e = object.events) === null || _e === void 0 ? void 0 : _e.map((e) => exports.Event.fromPartial(e))) || [];
        message.codespace = (_f = object.codespace) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
const baseResponseEndBlock = {};
exports.ResponseEndBlock = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.validatorUpdates) {
            exports.ValidatorUpdate.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.consensusParamUpdates !== undefined) {
            exports.ConsensusParams.encode(message.consensusParamUpdates, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.events) {
            exports.Event.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseEndBlock);
        message.validatorUpdates = [];
        message.events = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorUpdates.push(exports.ValidatorUpdate.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.consensusParamUpdates = exports.ConsensusParams.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.events.push(exports.Event.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseResponseEndBlock);
        message.validatorUpdates = ((_a = object.validatorUpdates) !== null && _a !== void 0 ? _a : []).map((e) => exports.ValidatorUpdate.fromJSON(e));
        message.consensusParamUpdates =
            object.consensusParamUpdates !== undefined && object.consensusParamUpdates !== null
                ? exports.ConsensusParams.fromJSON(object.consensusParamUpdates)
                : undefined;
        message.events = ((_b = object.events) !== null && _b !== void 0 ? _b : []).map((e) => exports.Event.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.validatorUpdates) {
            obj.validatorUpdates = message.validatorUpdates.map((e) => (e ? exports.ValidatorUpdate.toJSON(e) : undefined));
        }
        else {
            obj.validatorUpdates = [];
        }
        message.consensusParamUpdates !== undefined &&
            (obj.consensusParamUpdates = message.consensusParamUpdates
                ? exports.ConsensusParams.toJSON(message.consensusParamUpdates)
                : undefined);
        if (message.events) {
            obj.events = message.events.map((e) => (e ? exports.Event.toJSON(e) : undefined));
        }
        else {
            obj.events = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseResponseEndBlock);
        message.validatorUpdates = ((_a = object.validatorUpdates) === null || _a === void 0 ? void 0 : _a.map((e) => exports.ValidatorUpdate.fromPartial(e))) || [];
        message.consensusParamUpdates =
            object.consensusParamUpdates !== undefined && object.consensusParamUpdates !== null
                ? exports.ConsensusParams.fromPartial(object.consensusParamUpdates)
                : undefined;
        message.events = ((_b = object.events) === null || _b === void 0 ? void 0 : _b.map((e) => exports.Event.fromPartial(e))) || [];
        return message;
    },
};
const baseResponseCommit = { retainHeight: long_1.default.ZERO };
exports.ResponseCommit = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (!message.retainHeight.isZero()) {
            writer.uint32(24).int64(message.retainHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseCommit);
        message.data = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.retainHeight = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponseCommit);
        message.data =
            object.data !== undefined && object.data !== null ? bytesFromBase64(object.data) : new Uint8Array();
        message.retainHeight =
            object.retainHeight !== undefined && object.retainHeight !== null
                ? long_1.default.fromString(object.retainHeight)
                : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.retainHeight !== undefined && (obj.retainHeight = (message.retainHeight || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseResponseCommit);
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.retainHeight =
            object.retainHeight !== undefined && object.retainHeight !== null
                ? long_1.default.fromValue(object.retainHeight)
                : long_1.default.ZERO;
        return message;
    },
};
const baseResponseListSnapshots = {};
exports.ResponseListSnapshots = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.snapshots) {
            exports.Snapshot.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseListSnapshots);
        message.snapshots = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.snapshots.push(exports.Snapshot.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseResponseListSnapshots);
        message.snapshots = ((_a = object.snapshots) !== null && _a !== void 0 ? _a : []).map((e) => exports.Snapshot.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.snapshots) {
            obj.snapshots = message.snapshots.map((e) => (e ? exports.Snapshot.toJSON(e) : undefined));
        }
        else {
            obj.snapshots = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseResponseListSnapshots);
        message.snapshots = ((_a = object.snapshots) === null || _a === void 0 ? void 0 : _a.map((e) => exports.Snapshot.fromPartial(e))) || [];
        return message;
    },
};
const baseResponseOfferSnapshot = { result: 0 };
exports.ResponseOfferSnapshot = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseOfferSnapshot);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponseOfferSnapshot);
        message.result =
            object.result !== undefined && object.result !== null
                ? responseOfferSnapshot_ResultFromJSON(object.result)
                : 0;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined && (obj.result = responseOfferSnapshot_ResultToJSON(message.result));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseResponseOfferSnapshot);
        message.result = (_a = object.result) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
const baseResponseLoadSnapshotChunk = {};
exports.ResponseLoadSnapshotChunk = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.chunk.length !== 0) {
            writer.uint32(10).bytes(message.chunk);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseLoadSnapshotChunk);
        message.chunk = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chunk = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseResponseLoadSnapshotChunk);
        message.chunk =
            object.chunk !== undefined && object.chunk !== null ? bytesFromBase64(object.chunk) : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.chunk !== undefined &&
            (obj.chunk = base64FromBytes(message.chunk !== undefined ? message.chunk : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseResponseLoadSnapshotChunk);
        message.chunk = (_a = object.chunk) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
const baseResponseApplySnapshotChunk = { result: 0, refetchChunks: 0, rejectSenders: "" };
exports.ResponseApplySnapshotChunk = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        writer.uint32(18).fork();
        for (const v of message.refetchChunks) {
            writer.uint32(v);
        }
        writer.ldelim();
        for (const v of message.rejectSenders) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseResponseApplySnapshotChunk);
        message.refetchChunks = [];
        message.rejectSenders = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = reader.int32();
                    break;
                case 2:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.refetchChunks.push(reader.uint32());
                        }
                    }
                    else {
                        message.refetchChunks.push(reader.uint32());
                    }
                    break;
                case 3:
                    message.rejectSenders.push(reader.string());
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
        const message = Object.assign({}, baseResponseApplySnapshotChunk);
        message.result =
            object.result !== undefined && object.result !== null
                ? responseApplySnapshotChunk_ResultFromJSON(object.result)
                : 0;
        message.refetchChunks = ((_a = object.refetchChunks) !== null && _a !== void 0 ? _a : []).map((e) => Number(e));
        message.rejectSenders = ((_b = object.rejectSenders) !== null && _b !== void 0 ? _b : []).map((e) => String(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined && (obj.result = responseApplySnapshotChunk_ResultToJSON(message.result));
        if (message.refetchChunks) {
            obj.refetchChunks = message.refetchChunks.map((e) => e);
        }
        else {
            obj.refetchChunks = [];
        }
        if (message.rejectSenders) {
            obj.rejectSenders = message.rejectSenders.map((e) => e);
        }
        else {
            obj.rejectSenders = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseResponseApplySnapshotChunk);
        message.result = (_a = object.result) !== null && _a !== void 0 ? _a : 0;
        message.refetchChunks = ((_b = object.refetchChunks) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        message.rejectSenders = ((_c = object.rejectSenders) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        return message;
    },
};
const baseConsensusParams = {};
exports.ConsensusParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.block !== undefined) {
            exports.BlockParams.encode(message.block, writer.uint32(10).fork()).ldelim();
        }
        if (message.evidence !== undefined) {
            params_1.EvidenceParams.encode(message.evidence, writer.uint32(18).fork()).ldelim();
        }
        if (message.validator !== undefined) {
            params_1.ValidatorParams.encode(message.validator, writer.uint32(26).fork()).ldelim();
        }
        if (message.version !== undefined) {
            params_1.VersionParams.encode(message.version, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseConsensusParams);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.block = exports.BlockParams.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.evidence = params_1.EvidenceParams.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.validator = params_1.ValidatorParams.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.version = params_1.VersionParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseConsensusParams);
        message.block =
            object.block !== undefined && object.block !== null ? exports.BlockParams.fromJSON(object.block) : undefined;
        message.evidence =
            object.evidence !== undefined && object.evidence !== null
                ? params_1.EvidenceParams.fromJSON(object.evidence)
                : undefined;
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? params_1.ValidatorParams.fromJSON(object.validator)
                : undefined;
        message.version =
            object.version !== undefined && object.version !== null
                ? params_1.VersionParams.fromJSON(object.version)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.block !== undefined &&
            (obj.block = message.block ? exports.BlockParams.toJSON(message.block) : undefined);
        message.evidence !== undefined &&
            (obj.evidence = message.evidence ? params_1.EvidenceParams.toJSON(message.evidence) : undefined);
        message.validator !== undefined &&
            (obj.validator = message.validator ? params_1.ValidatorParams.toJSON(message.validator) : undefined);
        message.version !== undefined &&
            (obj.version = message.version ? params_1.VersionParams.toJSON(message.version) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseConsensusParams);
        message.block =
            object.block !== undefined && object.block !== null ? exports.BlockParams.fromPartial(object.block) : undefined;
        message.evidence =
            object.evidence !== undefined && object.evidence !== null
                ? params_1.EvidenceParams.fromPartial(object.evidence)
                : undefined;
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? params_1.ValidatorParams.fromPartial(object.validator)
                : undefined;
        message.version =
            object.version !== undefined && object.version !== null
                ? params_1.VersionParams.fromPartial(object.version)
                : undefined;
        return message;
    },
};
const baseBlockParams = { maxBytes: long_1.default.ZERO, maxGas: long_1.default.ZERO };
exports.BlockParams = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.maxBytes.isZero()) {
            writer.uint32(8).int64(message.maxBytes);
        }
        if (!message.maxGas.isZero()) {
            writer.uint32(16).int64(message.maxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseBlockParams);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxBytes = reader.int64();
                    break;
                case 2:
                    message.maxGas = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseBlockParams);
        message.maxBytes =
            object.maxBytes !== undefined && object.maxBytes !== null
                ? long_1.default.fromString(object.maxBytes)
                : long_1.default.ZERO;
        message.maxGas =
            object.maxGas !== undefined && object.maxGas !== null ? long_1.default.fromString(object.maxGas) : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.maxBytes !== undefined && (obj.maxBytes = (message.maxBytes || long_1.default.ZERO).toString());
        message.maxGas !== undefined && (obj.maxGas = (message.maxGas || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseBlockParams);
        message.maxBytes =
            object.maxBytes !== undefined && object.maxBytes !== null ? long_1.default.fromValue(object.maxBytes) : long_1.default.ZERO;
        message.maxGas =
            object.maxGas !== undefined && object.maxGas !== null ? long_1.default.fromValue(object.maxGas) : long_1.default.ZERO;
        return message;
    },
};
const baseLastCommitInfo = { round: 0 };
exports.LastCommitInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.round !== 0) {
            writer.uint32(8).int32(message.round);
        }
        for (const v of message.votes) {
            exports.VoteInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseLastCommitInfo);
        message.votes = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.round = reader.int32();
                    break;
                case 2:
                    message.votes.push(exports.VoteInfo.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseLastCommitInfo);
        message.round = object.round !== undefined && object.round !== null ? Number(object.round) : 0;
        message.votes = ((_a = object.votes) !== null && _a !== void 0 ? _a : []).map((e) => exports.VoteInfo.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.round !== undefined && (obj.round = message.round);
        if (message.votes) {
            obj.votes = message.votes.map((e) => (e ? exports.VoteInfo.toJSON(e) : undefined));
        }
        else {
            obj.votes = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseLastCommitInfo);
        message.round = (_a = object.round) !== null && _a !== void 0 ? _a : 0;
        message.votes = ((_b = object.votes) === null || _b === void 0 ? void 0 : _b.map((e) => exports.VoteInfo.fromPartial(e))) || [];
        return message;
    },
};
const baseEvent = { type: "" };
exports.Event = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== "") {
            writer.uint32(10).string(message.type);
        }
        for (const v of message.attributes) {
            exports.EventAttribute.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseEvent);
        message.attributes = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.string();
                    break;
                case 2:
                    message.attributes.push(exports.EventAttribute.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseEvent);
        message.type = object.type !== undefined && object.type !== null ? String(object.type) : "";
        message.attributes = ((_a = object.attributes) !== null && _a !== void 0 ? _a : []).map((e) => exports.EventAttribute.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined && (obj.type = message.type);
        if (message.attributes) {
            obj.attributes = message.attributes.map((e) => (e ? exports.EventAttribute.toJSON(e) : undefined));
        }
        else {
            obj.attributes = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseEvent);
        message.type = (_a = object.type) !== null && _a !== void 0 ? _a : "";
        message.attributes = ((_b = object.attributes) === null || _b === void 0 ? void 0 : _b.map((e) => exports.EventAttribute.fromPartial(e))) || [];
        return message;
    },
};
const baseEventAttribute = { index: false };
exports.EventAttribute = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.key.length !== 0) {
            writer.uint32(10).bytes(message.key);
        }
        if (message.value.length !== 0) {
            writer.uint32(18).bytes(message.value);
        }
        if (message.index === true) {
            writer.uint32(24).bool(message.index);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseEventAttribute);
        message.key = new Uint8Array();
        message.value = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                case 3:
                    message.index = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseEventAttribute);
        message.key =
            object.key !== undefined && object.key !== null ? bytesFromBase64(object.key) : new Uint8Array();
        message.value =
            object.value !== undefined && object.value !== null ? bytesFromBase64(object.value) : new Uint8Array();
        message.index = object.index !== undefined && object.index !== null ? Boolean(object.index) : false;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.key !== undefined &&
            (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
        message.value !== undefined &&
            (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
        message.index !== undefined && (obj.index = message.index);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseEventAttribute);
        message.key = (_a = object.key) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.value = (_b = object.value) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.index = (_c = object.index) !== null && _c !== void 0 ? _c : false;
        return message;
    },
};
const baseTxResult = { height: long_1.default.ZERO, index: 0 };
exports.TxResult = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.height.isZero()) {
            writer.uint32(8).int64(message.height);
        }
        if (message.index !== 0) {
            writer.uint32(16).uint32(message.index);
        }
        if (message.tx.length !== 0) {
            writer.uint32(26).bytes(message.tx);
        }
        if (message.result !== undefined) {
            exports.ResponseDeliverTx.encode(message.result, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseTxResult);
        message.tx = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                case 2:
                    message.index = reader.uint32();
                    break;
                case 3:
                    message.tx = reader.bytes();
                    break;
                case 4:
                    message.result = exports.ResponseDeliverTx.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseTxResult);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
        message.index = object.index !== undefined && object.index !== null ? Number(object.index) : 0;
        message.tx =
            object.tx !== undefined && object.tx !== null ? bytesFromBase64(object.tx) : new Uint8Array();
        message.result =
            object.result !== undefined && object.result !== null
                ? exports.ResponseDeliverTx.fromJSON(object.result)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined && (obj.height = (message.height || long_1.default.ZERO).toString());
        message.index !== undefined && (obj.index = message.index);
        message.tx !== undefined &&
            (obj.tx = base64FromBytes(message.tx !== undefined ? message.tx : new Uint8Array()));
        message.result !== undefined &&
            (obj.result = message.result ? exports.ResponseDeliverTx.toJSON(message.result) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseTxResult);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
        message.index = (_a = object.index) !== null && _a !== void 0 ? _a : 0;
        message.tx = (_b = object.tx) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.result =
            object.result !== undefined && object.result !== null
                ? exports.ResponseDeliverTx.fromPartial(object.result)
                : undefined;
        return message;
    },
};
const baseValidator = { power: long_1.default.ZERO };
exports.Validator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address.length !== 0) {
            writer.uint32(10).bytes(message.address);
        }
        if (!message.power.isZero()) {
            writer.uint32(24).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidator);
        message.address = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.bytes();
                    break;
                case 3:
                    message.power = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidator);
        message.address =
            object.address !== undefined && object.address !== null
                ? bytesFromBase64(object.address)
                : new Uint8Array();
        message.power =
            object.power !== undefined && object.power !== null ? long_1.default.fromString(object.power) : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined &&
            (obj.address = base64FromBytes(message.address !== undefined ? message.address : new Uint8Array()));
        message.power !== undefined && (obj.power = (message.power || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseValidator);
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.power =
            object.power !== undefined && object.power !== null ? long_1.default.fromValue(object.power) : long_1.default.ZERO;
        return message;
    },
};
const baseValidatorUpdate = { power: long_1.default.ZERO };
exports.ValidatorUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pubKey !== undefined) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
        }
        if (!message.power.isZero()) {
            writer.uint32(16).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorUpdate);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.power = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidatorUpdate);
        message.pubKey =
            object.pubKey !== undefined && object.pubKey !== null ? keys_1.PublicKey.fromJSON(object.pubKey) : undefined;
        message.power =
            object.power !== undefined && object.power !== null ? long_1.default.fromString(object.power) : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pubKey !== undefined &&
            (obj.pubKey = message.pubKey ? keys_1.PublicKey.toJSON(message.pubKey) : undefined);
        message.power !== undefined && (obj.power = (message.power || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseValidatorUpdate);
        message.pubKey =
            object.pubKey !== undefined && object.pubKey !== null
                ? keys_1.PublicKey.fromPartial(object.pubKey)
                : undefined;
        message.power =
            object.power !== undefined && object.power !== null ? long_1.default.fromValue(object.power) : long_1.default.ZERO;
        return message;
    },
};
const baseVoteInfo = { signedLastBlock: false };
exports.VoteInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validator !== undefined) {
            exports.Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
        }
        if (message.signedLastBlock === true) {
            writer.uint32(16).bool(message.signedLastBlock);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseVoteInfo);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = exports.Validator.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.signedLastBlock = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseVoteInfo);
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? exports.Validator.fromJSON(object.validator)
                : undefined;
        message.signedLastBlock =
            object.signedLastBlock !== undefined && object.signedLastBlock !== null
                ? Boolean(object.signedLastBlock)
                : false;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined &&
            (obj.validator = message.validator ? exports.Validator.toJSON(message.validator) : undefined);
        message.signedLastBlock !== undefined && (obj.signedLastBlock = message.signedLastBlock);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseVoteInfo);
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? exports.Validator.fromPartial(object.validator)
                : undefined;
        message.signedLastBlock = (_a = object.signedLastBlock) !== null && _a !== void 0 ? _a : false;
        return message;
    },
};
const baseEvidence = { type: 0, height: long_1.default.ZERO, totalVotingPower: long_1.default.ZERO };
exports.Evidence = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.validator !== undefined) {
            exports.Validator.encode(message.validator, writer.uint32(18).fork()).ldelim();
        }
        if (!message.height.isZero()) {
            writer.uint32(24).int64(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode(message.time, writer.uint32(34).fork()).ldelim();
        }
        if (!message.totalVotingPower.isZero()) {
            writer.uint32(40).int64(message.totalVotingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseEvidence);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.validator = exports.Validator.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = reader.int64();
                    break;
                case 4:
                    message.time = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.totalVotingPower = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseEvidence);
        message.type = object.type !== undefined && object.type !== null ? evidenceTypeFromJSON(object.type) : 0;
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? exports.Validator.fromJSON(object.validator)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
        message.time =
            object.time !== undefined && object.time !== null ? fromJsonTimestamp(object.time) : undefined;
        message.totalVotingPower =
            object.totalVotingPower !== undefined && object.totalVotingPower !== null
                ? long_1.default.fromString(object.totalVotingPower)
                : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined && (obj.type = evidenceTypeToJSON(message.type));
        message.validator !== undefined &&
            (obj.validator = message.validator ? exports.Validator.toJSON(message.validator) : undefined);
        message.height !== undefined && (obj.height = (message.height || long_1.default.ZERO).toString());
        message.time !== undefined && (obj.time = fromTimestamp(message.time).toISOString());
        message.totalVotingPower !== undefined &&
            (obj.totalVotingPower = (message.totalVotingPower || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseEvidence);
        message.type = (_a = object.type) !== null && _a !== void 0 ? _a : 0;
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? exports.Validator.fromPartial(object.validator)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
        message.time =
            object.time !== undefined && object.time !== null ? timestamp_1.Timestamp.fromPartial(object.time) : undefined;
        message.totalVotingPower =
            object.totalVotingPower !== undefined && object.totalVotingPower !== null
                ? long_1.default.fromValue(object.totalVotingPower)
                : long_1.default.ZERO;
        return message;
    },
};
const baseSnapshot = { height: long_1.default.UZERO, format: 0, chunks: 0 };
exports.Snapshot = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.height.isZero()) {
            writer.uint32(8).uint64(message.height);
        }
        if (message.format !== 0) {
            writer.uint32(16).uint32(message.format);
        }
        if (message.chunks !== 0) {
            writer.uint32(24).uint32(message.chunks);
        }
        if (message.hash.length !== 0) {
            writer.uint32(34).bytes(message.hash);
        }
        if (message.metadata.length !== 0) {
            writer.uint32(42).bytes(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSnapshot);
        message.hash = new Uint8Array();
        message.metadata = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.uint64();
                    break;
                case 2:
                    message.format = reader.uint32();
                    break;
                case 3:
                    message.chunks = reader.uint32();
                    break;
                case 4:
                    message.hash = reader.bytes();
                    break;
                case 5:
                    message.metadata = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSnapshot);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.UZERO;
        message.format = object.format !== undefined && object.format !== null ? Number(object.format) : 0;
        message.chunks = object.chunks !== undefined && object.chunks !== null ? Number(object.chunks) : 0;
        message.hash =
            object.hash !== undefined && object.hash !== null ? bytesFromBase64(object.hash) : new Uint8Array();
        message.metadata =
            object.metadata !== undefined && object.metadata !== null
                ? bytesFromBase64(object.metadata)
                : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined && (obj.height = (message.height || long_1.default.UZERO).toString());
        message.format !== undefined && (obj.format = message.format);
        message.chunks !== undefined && (obj.chunks = message.chunks);
        message.hash !== undefined &&
            (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
        message.metadata !== undefined &&
            (obj.metadata = base64FromBytes(message.metadata !== undefined ? message.metadata : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseSnapshot);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.UZERO;
        message.format = (_a = object.format) !== null && _a !== void 0 ? _a : 0;
        message.chunks = (_b = object.chunks) !== null && _b !== void 0 ? _b : 0;
        message.hash = (_c = object.hash) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.metadata = (_d = object.metadata) !== null && _d !== void 0 ? _d : new Uint8Array();
        return message;
    },
};
class ABCIApplicationClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Echo = this.Echo.bind(this);
        this.Flush = this.Flush.bind(this);
        this.Info = this.Info.bind(this);
        this.SetOption = this.SetOption.bind(this);
        this.DeliverTx = this.DeliverTx.bind(this);
        this.CheckTx = this.CheckTx.bind(this);
        this.Query = this.Query.bind(this);
        this.Commit = this.Commit.bind(this);
        this.InitChain = this.InitChain.bind(this);
        this.BeginBlock = this.BeginBlock.bind(this);
        this.EndBlock = this.EndBlock.bind(this);
        this.ListSnapshots = this.ListSnapshots.bind(this);
        this.OfferSnapshot = this.OfferSnapshot.bind(this);
        this.LoadSnapshotChunk = this.LoadSnapshotChunk.bind(this);
        this.ApplySnapshotChunk = this.ApplySnapshotChunk.bind(this);
    }
    Echo(request) {
        const data = exports.RequestEcho.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Echo", data);
        return promise.then((data) => exports.ResponseEcho.decode(new minimal_1.default.Reader(data)));
    }
    Flush(request) {
        const data = exports.RequestFlush.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Flush", data);
        return promise.then((data) => exports.ResponseFlush.decode(new minimal_1.default.Reader(data)));
    }
    Info(request) {
        const data = exports.RequestInfo.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Info", data);
        return promise.then((data) => exports.ResponseInfo.decode(new minimal_1.default.Reader(data)));
    }
    SetOption(request) {
        const data = exports.RequestSetOption.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "SetOption", data);
        return promise.then((data) => exports.ResponseSetOption.decode(new minimal_1.default.Reader(data)));
    }
    DeliverTx(request) {
        const data = exports.RequestDeliverTx.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "DeliverTx", data);
        return promise.then((data) => exports.ResponseDeliverTx.decode(new minimal_1.default.Reader(data)));
    }
    CheckTx(request) {
        const data = exports.RequestCheckTx.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "CheckTx", data);
        return promise.then((data) => exports.ResponseCheckTx.decode(new minimal_1.default.Reader(data)));
    }
    Query(request) {
        const data = exports.RequestQuery.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Query", data);
        return promise.then((data) => exports.ResponseQuery.decode(new minimal_1.default.Reader(data)));
    }
    Commit(request) {
        const data = exports.RequestCommit.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "Commit", data);
        return promise.then((data) => exports.ResponseCommit.decode(new minimal_1.default.Reader(data)));
    }
    InitChain(request) {
        const data = exports.RequestInitChain.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "InitChain", data);
        return promise.then((data) => exports.ResponseInitChain.decode(new minimal_1.default.Reader(data)));
    }
    BeginBlock(request) {
        const data = exports.RequestBeginBlock.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "BeginBlock", data);
        return promise.then((data) => exports.ResponseBeginBlock.decode(new minimal_1.default.Reader(data)));
    }
    EndBlock(request) {
        const data = exports.RequestEndBlock.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "EndBlock", data);
        return promise.then((data) => exports.ResponseEndBlock.decode(new minimal_1.default.Reader(data)));
    }
    ListSnapshots(request) {
        const data = exports.RequestListSnapshots.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ListSnapshots", data);
        return promise.then((data) => exports.ResponseListSnapshots.decode(new minimal_1.default.Reader(data)));
    }
    OfferSnapshot(request) {
        const data = exports.RequestOfferSnapshot.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "OfferSnapshot", data);
        return promise.then((data) => exports.ResponseOfferSnapshot.decode(new minimal_1.default.Reader(data)));
    }
    LoadSnapshotChunk(request) {
        const data = exports.RequestLoadSnapshotChunk.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "LoadSnapshotChunk", data);
        return promise.then((data) => exports.ResponseLoadSnapshotChunk.decode(new minimal_1.default.Reader(data)));
    }
    ApplySnapshotChunk(request) {
        const data = exports.RequestApplySnapshotChunk.encode(request).finish();
        const promise = this.rpc.request("tendermint.abci.ABCIApplication", "ApplySnapshotChunk", data);
        return promise.then((data) => exports.ResponseApplySnapshotChunk.decode(new minimal_1.default.Reader(data)));
    }
}
exports.ABCIApplicationClientImpl = ABCIApplicationClientImpl;
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
function toTimestamp(date) {
    const seconds = numberToLong(date.getTime() / 1000);
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds.toNumber() * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return toTimestamp(o);
    }
    else if (typeof o === "string") {
        return toTimestamp(new Date(o));
    }
    else {
        return timestamp_1.Timestamp.fromJSON(o);
    }
}
function numberToLong(number) {
    return long_1.default.fromNumber(number);
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=types.js.map