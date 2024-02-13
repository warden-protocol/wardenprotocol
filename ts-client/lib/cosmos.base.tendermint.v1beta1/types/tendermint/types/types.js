/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Proof } from "../crypto/proof";
import { Consensus } from "../version/types";
import { blockIDFlagFromJSON, blockIDFlagToJSON, ValidatorSet } from "./validator";
export const protobufPackage = "tendermint.types";
/** SignedMsgType is a type of signed message in the consensus. */
export var SignedMsgType;
(function (SignedMsgType) {
    SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_UNKNOWN"] = 0] = "SIGNED_MSG_TYPE_UNKNOWN";
    /** SIGNED_MSG_TYPE_PREVOTE - Votes */
    SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PREVOTE"] = 1] = "SIGNED_MSG_TYPE_PREVOTE";
    SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PRECOMMIT"] = 2] = "SIGNED_MSG_TYPE_PRECOMMIT";
    /** SIGNED_MSG_TYPE_PROPOSAL - Proposals */
    SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PROPOSAL"] = 32] = "SIGNED_MSG_TYPE_PROPOSAL";
    SignedMsgType[SignedMsgType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SignedMsgType || (SignedMsgType = {}));
export function signedMsgTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "SIGNED_MSG_TYPE_UNKNOWN":
            return SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN;
        case 1:
        case "SIGNED_MSG_TYPE_PREVOTE":
            return SignedMsgType.SIGNED_MSG_TYPE_PREVOTE;
        case 2:
        case "SIGNED_MSG_TYPE_PRECOMMIT":
            return SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT;
        case 32:
        case "SIGNED_MSG_TYPE_PROPOSAL":
            return SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL;
        case -1:
        case "UNRECOGNIZED":
        default:
            return SignedMsgType.UNRECOGNIZED;
    }
}
export function signedMsgTypeToJSON(object) {
    switch (object) {
        case SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN:
            return "SIGNED_MSG_TYPE_UNKNOWN";
        case SignedMsgType.SIGNED_MSG_TYPE_PREVOTE:
            return "SIGNED_MSG_TYPE_PREVOTE";
        case SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT:
            return "SIGNED_MSG_TYPE_PRECOMMIT";
        case SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL:
            return "SIGNED_MSG_TYPE_PROPOSAL";
        case SignedMsgType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBasePartSetHeader() {
    return { total: 0, hash: new Uint8Array(0) };
}
export const PartSetHeader = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.total !== 0) {
            writer.uint32(8).uint32(message.total);
        }
        if (message.hash.length !== 0) {
            writer.uint32(18).bytes(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePartSetHeader();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.total = reader.uint32();
                    continue;
                case 2:
                    if (tag !== 18) {
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
        return {
            total: isSet(object.total) ? Number(object.total) : 0,
            hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.total !== 0) {
            obj.total = Math.round(message.total);
        }
        if (message.hash.length !== 0) {
            obj.hash = base64FromBytes(message.hash);
        }
        return obj;
    },
    create(base) {
        return PartSetHeader.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePartSetHeader();
        message.total = object.total ?? 0;
        message.hash = object.hash ?? new Uint8Array(0);
        return message;
    },
};
function createBasePart() {
    return { index: 0, bytes: new Uint8Array(0), proof: undefined };
}
export const Part = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.index !== 0) {
            writer.uint32(8).uint32(message.index);
        }
        if (message.bytes.length !== 0) {
            writer.uint32(18).bytes(message.bytes);
        }
        if (message.proof !== undefined) {
            Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePart();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.index = reader.uint32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.bytes = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proof = Proof.decode(reader, reader.uint32());
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
            index: isSet(object.index) ? Number(object.index) : 0,
            bytes: isSet(object.bytes) ? bytesFromBase64(object.bytes) : new Uint8Array(0),
            proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.index !== 0) {
            obj.index = Math.round(message.index);
        }
        if (message.bytes.length !== 0) {
            obj.bytes = base64FromBytes(message.bytes);
        }
        if (message.proof !== undefined) {
            obj.proof = Proof.toJSON(message.proof);
        }
        return obj;
    },
    create(base) {
        return Part.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePart();
        message.index = object.index ?? 0;
        message.bytes = object.bytes ?? new Uint8Array(0);
        message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
        return message;
    },
};
function createBaseBlockID() {
    return { hash: new Uint8Array(0), partSetHeader: undefined };
}
export const BlockID = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        if (message.partSetHeader !== undefined) {
            PartSetHeader.encode(message.partSetHeader, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockID();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.hash = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.partSetHeader = PartSetHeader.decode(reader, reader.uint32());
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
            hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
            partSetHeader: isSet(object.partSetHeader) ? PartSetHeader.fromJSON(object.partSetHeader) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.hash.length !== 0) {
            obj.hash = base64FromBytes(message.hash);
        }
        if (message.partSetHeader !== undefined) {
            obj.partSetHeader = PartSetHeader.toJSON(message.partSetHeader);
        }
        return obj;
    },
    create(base) {
        return BlockID.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBlockID();
        message.hash = object.hash ?? new Uint8Array(0);
        message.partSetHeader = (object.partSetHeader !== undefined && object.partSetHeader !== null)
            ? PartSetHeader.fromPartial(object.partSetHeader)
            : undefined;
        return message;
    },
};
function createBaseHeader() {
    return {
        version: undefined,
        chainId: "",
        height: 0,
        time: undefined,
        lastBlockId: undefined,
        lastCommitHash: new Uint8Array(0),
        dataHash: new Uint8Array(0),
        validatorsHash: new Uint8Array(0),
        nextValidatorsHash: new Uint8Array(0),
        consensusHash: new Uint8Array(0),
        appHash: new Uint8Array(0),
        lastResultsHash: new Uint8Array(0),
        evidenceHash: new Uint8Array(0),
        proposerAddress: new Uint8Array(0),
    };
}
export const Header = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.version !== undefined) {
            Consensus.encode(message.version, writer.uint32(10).fork()).ldelim();
        }
        if (message.chainId !== "") {
            writer.uint32(18).string(message.chainId);
        }
        if (message.height !== 0) {
            writer.uint32(24).int64(message.height);
        }
        if (message.time !== undefined) {
            Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
        }
        if (message.lastBlockId !== undefined) {
            BlockID.encode(message.lastBlockId, writer.uint32(42).fork()).ldelim();
        }
        if (message.lastCommitHash.length !== 0) {
            writer.uint32(50).bytes(message.lastCommitHash);
        }
        if (message.dataHash.length !== 0) {
            writer.uint32(58).bytes(message.dataHash);
        }
        if (message.validatorsHash.length !== 0) {
            writer.uint32(66).bytes(message.validatorsHash);
        }
        if (message.nextValidatorsHash.length !== 0) {
            writer.uint32(74).bytes(message.nextValidatorsHash);
        }
        if (message.consensusHash.length !== 0) {
            writer.uint32(82).bytes(message.consensusHash);
        }
        if (message.appHash.length !== 0) {
            writer.uint32(90).bytes(message.appHash);
        }
        if (message.lastResultsHash.length !== 0) {
            writer.uint32(98).bytes(message.lastResultsHash);
        }
        if (message.evidenceHash.length !== 0) {
            writer.uint32(106).bytes(message.evidenceHash);
        }
        if (message.proposerAddress.length !== 0) {
            writer.uint32(114).bytes(message.proposerAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHeader();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.version = Consensus.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.chainId = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.height = longToNumber(reader.int64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.lastBlockId = BlockID.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.lastCommitHash = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.dataHash = reader.bytes();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.validatorsHash = reader.bytes();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.nextValidatorsHash = reader.bytes();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.consensusHash = reader.bytes();
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.appHash = reader.bytes();
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.lastResultsHash = reader.bytes();
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.evidenceHash = reader.bytes();
                    continue;
                case 14:
                    if (tag !== 114) {
                        break;
                    }
                    message.proposerAddress = reader.bytes();
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
            version: isSet(object.version) ? Consensus.fromJSON(object.version) : undefined,
            chainId: isSet(object.chainId) ? String(object.chainId) : "",
            height: isSet(object.height) ? Number(object.height) : 0,
            time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
            lastBlockId: isSet(object.lastBlockId) ? BlockID.fromJSON(object.lastBlockId) : undefined,
            lastCommitHash: isSet(object.lastCommitHash) ? bytesFromBase64(object.lastCommitHash) : new Uint8Array(0),
            dataHash: isSet(object.dataHash) ? bytesFromBase64(object.dataHash) : new Uint8Array(0),
            validatorsHash: isSet(object.validatorsHash) ? bytesFromBase64(object.validatorsHash) : new Uint8Array(0),
            nextValidatorsHash: isSet(object.nextValidatorsHash)
                ? bytesFromBase64(object.nextValidatorsHash)
                : new Uint8Array(0),
            consensusHash: isSet(object.consensusHash) ? bytesFromBase64(object.consensusHash) : new Uint8Array(0),
            appHash: isSet(object.appHash) ? bytesFromBase64(object.appHash) : new Uint8Array(0),
            lastResultsHash: isSet(object.lastResultsHash) ? bytesFromBase64(object.lastResultsHash) : new Uint8Array(0),
            evidenceHash: isSet(object.evidenceHash) ? bytesFromBase64(object.evidenceHash) : new Uint8Array(0),
            proposerAddress: isSet(object.proposerAddress) ? bytesFromBase64(object.proposerAddress) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.version !== undefined) {
            obj.version = Consensus.toJSON(message.version);
        }
        if (message.chainId !== "") {
            obj.chainId = message.chainId;
        }
        if (message.height !== 0) {
            obj.height = Math.round(message.height);
        }
        if (message.time !== undefined) {
            obj.time = message.time.toISOString();
        }
        if (message.lastBlockId !== undefined) {
            obj.lastBlockId = BlockID.toJSON(message.lastBlockId);
        }
        if (message.lastCommitHash.length !== 0) {
            obj.lastCommitHash = base64FromBytes(message.lastCommitHash);
        }
        if (message.dataHash.length !== 0) {
            obj.dataHash = base64FromBytes(message.dataHash);
        }
        if (message.validatorsHash.length !== 0) {
            obj.validatorsHash = base64FromBytes(message.validatorsHash);
        }
        if (message.nextValidatorsHash.length !== 0) {
            obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash);
        }
        if (message.consensusHash.length !== 0) {
            obj.consensusHash = base64FromBytes(message.consensusHash);
        }
        if (message.appHash.length !== 0) {
            obj.appHash = base64FromBytes(message.appHash);
        }
        if (message.lastResultsHash.length !== 0) {
            obj.lastResultsHash = base64FromBytes(message.lastResultsHash);
        }
        if (message.evidenceHash.length !== 0) {
            obj.evidenceHash = base64FromBytes(message.evidenceHash);
        }
        if (message.proposerAddress.length !== 0) {
            obj.proposerAddress = base64FromBytes(message.proposerAddress);
        }
        return obj;
    },
    create(base) {
        return Header.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseHeader();
        message.version = (object.version !== undefined && object.version !== null)
            ? Consensus.fromPartial(object.version)
            : undefined;
        message.chainId = object.chainId ?? "";
        message.height = object.height ?? 0;
        message.time = object.time ?? undefined;
        message.lastBlockId = (object.lastBlockId !== undefined && object.lastBlockId !== null)
            ? BlockID.fromPartial(object.lastBlockId)
            : undefined;
        message.lastCommitHash = object.lastCommitHash ?? new Uint8Array(0);
        message.dataHash = object.dataHash ?? new Uint8Array(0);
        message.validatorsHash = object.validatorsHash ?? new Uint8Array(0);
        message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array(0);
        message.consensusHash = object.consensusHash ?? new Uint8Array(0);
        message.appHash = object.appHash ?? new Uint8Array(0);
        message.lastResultsHash = object.lastResultsHash ?? new Uint8Array(0);
        message.evidenceHash = object.evidenceHash ?? new Uint8Array(0);
        message.proposerAddress = object.proposerAddress ?? new Uint8Array(0);
        return message;
    },
};
function createBaseData() {
    return { txs: [] };
}
export const Data = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.txs) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txs.push(reader.bytes());
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
        return { txs: Array.isArray(object?.txs) ? object.txs.map((e) => bytesFromBase64(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.txs?.length) {
            obj.txs = message.txs.map((e) => base64FromBytes(e));
        }
        return obj;
    },
    create(base) {
        return Data.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseData();
        message.txs = object.txs?.map((e) => e) || [];
        return message;
    },
};
function createBaseVote() {
    return {
        type: 0,
        height: 0,
        round: 0,
        blockId: undefined,
        timestamp: undefined,
        validatorAddress: new Uint8Array(0),
        validatorIndex: 0,
        signature: new Uint8Array(0),
        extension: new Uint8Array(0),
        extensionSignature: new Uint8Array(0),
    };
}
export const Vote = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.height !== 0) {
            writer.uint32(16).int64(message.height);
        }
        if (message.round !== 0) {
            writer.uint32(24).int32(message.round);
        }
        if (message.blockId !== undefined) {
            BlockID.encode(message.blockId, writer.uint32(34).fork()).ldelim();
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
        }
        if (message.validatorAddress.length !== 0) {
            writer.uint32(50).bytes(message.validatorAddress);
        }
        if (message.validatorIndex !== 0) {
            writer.uint32(56).int32(message.validatorIndex);
        }
        if (message.signature.length !== 0) {
            writer.uint32(66).bytes(message.signature);
        }
        if (message.extension.length !== 0) {
            writer.uint32(74).bytes(message.extension);
        }
        if (message.extensionSignature.length !== 0) {
            writer.uint32(82).bytes(message.extensionSignature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.type = reader.int32();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.height = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.round = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.blockId = BlockID.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.validatorAddress = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 56) {
                        break;
                    }
                    message.validatorIndex = reader.int32();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.signature = reader.bytes();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.extension = reader.bytes();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.extensionSignature = reader.bytes();
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
            type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
            height: isSet(object.height) ? Number(object.height) : 0,
            round: isSet(object.round) ? Number(object.round) : 0,
            blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
            timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
            validatorAddress: isSet(object.validatorAddress) ? bytesFromBase64(object.validatorAddress) : new Uint8Array(0),
            validatorIndex: isSet(object.validatorIndex) ? Number(object.validatorIndex) : 0,
            signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
            extension: isSet(object.extension) ? bytesFromBase64(object.extension) : new Uint8Array(0),
            extensionSignature: isSet(object.extensionSignature)
                ? bytesFromBase64(object.extensionSignature)
                : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== 0) {
            obj.type = signedMsgTypeToJSON(message.type);
        }
        if (message.height !== 0) {
            obj.height = Math.round(message.height);
        }
        if (message.round !== 0) {
            obj.round = Math.round(message.round);
        }
        if (message.blockId !== undefined) {
            obj.blockId = BlockID.toJSON(message.blockId);
        }
        if (message.timestamp !== undefined) {
            obj.timestamp = message.timestamp.toISOString();
        }
        if (message.validatorAddress.length !== 0) {
            obj.validatorAddress = base64FromBytes(message.validatorAddress);
        }
        if (message.validatorIndex !== 0) {
            obj.validatorIndex = Math.round(message.validatorIndex);
        }
        if (message.signature.length !== 0) {
            obj.signature = base64FromBytes(message.signature);
        }
        if (message.extension.length !== 0) {
            obj.extension = base64FromBytes(message.extension);
        }
        if (message.extensionSignature.length !== 0) {
            obj.extensionSignature = base64FromBytes(message.extensionSignature);
        }
        return obj;
    },
    create(base) {
        return Vote.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseVote();
        message.type = object.type ?? 0;
        message.height = object.height ?? 0;
        message.round = object.round ?? 0;
        message.blockId = (object.blockId !== undefined && object.blockId !== null)
            ? BlockID.fromPartial(object.blockId)
            : undefined;
        message.timestamp = object.timestamp ?? undefined;
        message.validatorAddress = object.validatorAddress ?? new Uint8Array(0);
        message.validatorIndex = object.validatorIndex ?? 0;
        message.signature = object.signature ?? new Uint8Array(0);
        message.extension = object.extension ?? new Uint8Array(0);
        message.extensionSignature = object.extensionSignature ?? new Uint8Array(0);
        return message;
    },
};
function createBaseCommit() {
    return { height: 0, round: 0, blockId: undefined, signatures: [] };
}
export const Commit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.height !== 0) {
            writer.uint32(8).int64(message.height);
        }
        if (message.round !== 0) {
            writer.uint32(16).int32(message.round);
        }
        if (message.blockId !== undefined) {
            BlockID.encode(message.blockId, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.signatures) {
            CommitSig.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommit();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.round = reader.int32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.blockId = BlockID.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.signatures.push(CommitSig.decode(reader, reader.uint32()));
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
            round: isSet(object.round) ? Number(object.round) : 0,
            blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
            signatures: Array.isArray(object?.signatures) ? object.signatures.map((e) => CommitSig.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== 0) {
            obj.height = Math.round(message.height);
        }
        if (message.round !== 0) {
            obj.round = Math.round(message.round);
        }
        if (message.blockId !== undefined) {
            obj.blockId = BlockID.toJSON(message.blockId);
        }
        if (message.signatures?.length) {
            obj.signatures = message.signatures.map((e) => CommitSig.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return Commit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCommit();
        message.height = object.height ?? 0;
        message.round = object.round ?? 0;
        message.blockId = (object.blockId !== undefined && object.blockId !== null)
            ? BlockID.fromPartial(object.blockId)
            : undefined;
        message.signatures = object.signatures?.map((e) => CommitSig.fromPartial(e)) || [];
        return message;
    },
};
function createBaseCommitSig() {
    return { blockIdFlag: 0, validatorAddress: new Uint8Array(0), timestamp: undefined, signature: new Uint8Array(0) };
}
export const CommitSig = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.blockIdFlag !== 0) {
            writer.uint32(8).int32(message.blockIdFlag);
        }
        if (message.validatorAddress.length !== 0) {
            writer.uint32(18).bytes(message.validatorAddress);
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
        }
        if (message.signature.length !== 0) {
            writer.uint32(34).bytes(message.signature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommitSig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.blockIdFlag = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.validatorAddress = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.signature = reader.bytes();
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
            blockIdFlag: isSet(object.blockIdFlag) ? blockIDFlagFromJSON(object.blockIdFlag) : 0,
            validatorAddress: isSet(object.validatorAddress) ? bytesFromBase64(object.validatorAddress) : new Uint8Array(0),
            timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
            signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.blockIdFlag !== 0) {
            obj.blockIdFlag = blockIDFlagToJSON(message.blockIdFlag);
        }
        if (message.validatorAddress.length !== 0) {
            obj.validatorAddress = base64FromBytes(message.validatorAddress);
        }
        if (message.timestamp !== undefined) {
            obj.timestamp = message.timestamp.toISOString();
        }
        if (message.signature.length !== 0) {
            obj.signature = base64FromBytes(message.signature);
        }
        return obj;
    },
    create(base) {
        return CommitSig.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCommitSig();
        message.blockIdFlag = object.blockIdFlag ?? 0;
        message.validatorAddress = object.validatorAddress ?? new Uint8Array(0);
        message.timestamp = object.timestamp ?? undefined;
        message.signature = object.signature ?? new Uint8Array(0);
        return message;
    },
};
function createBaseExtendedCommit() {
    return { height: 0, round: 0, blockId: undefined, extendedSignatures: [] };
}
export const ExtendedCommit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.height !== 0) {
            writer.uint32(8).int64(message.height);
        }
        if (message.round !== 0) {
            writer.uint32(16).int32(message.round);
        }
        if (message.blockId !== undefined) {
            BlockID.encode(message.blockId, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.extendedSignatures) {
            ExtendedCommitSig.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExtendedCommit();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.round = reader.int32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.blockId = BlockID.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.extendedSignatures.push(ExtendedCommitSig.decode(reader, reader.uint32()));
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
            round: isSet(object.round) ? Number(object.round) : 0,
            blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
            extendedSignatures: Array.isArray(object?.extendedSignatures)
                ? object.extendedSignatures.map((e) => ExtendedCommitSig.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== 0) {
            obj.height = Math.round(message.height);
        }
        if (message.round !== 0) {
            obj.round = Math.round(message.round);
        }
        if (message.blockId !== undefined) {
            obj.blockId = BlockID.toJSON(message.blockId);
        }
        if (message.extendedSignatures?.length) {
            obj.extendedSignatures = message.extendedSignatures.map((e) => ExtendedCommitSig.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ExtendedCommit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseExtendedCommit();
        message.height = object.height ?? 0;
        message.round = object.round ?? 0;
        message.blockId = (object.blockId !== undefined && object.blockId !== null)
            ? BlockID.fromPartial(object.blockId)
            : undefined;
        message.extendedSignatures = object.extendedSignatures?.map((e) => ExtendedCommitSig.fromPartial(e)) || [];
        return message;
    },
};
function createBaseExtendedCommitSig() {
    return {
        blockIdFlag: 0,
        validatorAddress: new Uint8Array(0),
        timestamp: undefined,
        signature: new Uint8Array(0),
        extension: new Uint8Array(0),
        extensionSignature: new Uint8Array(0),
    };
}
export const ExtendedCommitSig = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.blockIdFlag !== 0) {
            writer.uint32(8).int32(message.blockIdFlag);
        }
        if (message.validatorAddress.length !== 0) {
            writer.uint32(18).bytes(message.validatorAddress);
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
        }
        if (message.signature.length !== 0) {
            writer.uint32(34).bytes(message.signature);
        }
        if (message.extension.length !== 0) {
            writer.uint32(42).bytes(message.extension);
        }
        if (message.extensionSignature.length !== 0) {
            writer.uint32(50).bytes(message.extensionSignature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExtendedCommitSig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.blockIdFlag = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.validatorAddress = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.signature = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.extension = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.extensionSignature = reader.bytes();
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
            blockIdFlag: isSet(object.blockIdFlag) ? blockIDFlagFromJSON(object.blockIdFlag) : 0,
            validatorAddress: isSet(object.validatorAddress) ? bytesFromBase64(object.validatorAddress) : new Uint8Array(0),
            timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
            signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
            extension: isSet(object.extension) ? bytesFromBase64(object.extension) : new Uint8Array(0),
            extensionSignature: isSet(object.extensionSignature)
                ? bytesFromBase64(object.extensionSignature)
                : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.blockIdFlag !== 0) {
            obj.blockIdFlag = blockIDFlagToJSON(message.blockIdFlag);
        }
        if (message.validatorAddress.length !== 0) {
            obj.validatorAddress = base64FromBytes(message.validatorAddress);
        }
        if (message.timestamp !== undefined) {
            obj.timestamp = message.timestamp.toISOString();
        }
        if (message.signature.length !== 0) {
            obj.signature = base64FromBytes(message.signature);
        }
        if (message.extension.length !== 0) {
            obj.extension = base64FromBytes(message.extension);
        }
        if (message.extensionSignature.length !== 0) {
            obj.extensionSignature = base64FromBytes(message.extensionSignature);
        }
        return obj;
    },
    create(base) {
        return ExtendedCommitSig.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseExtendedCommitSig();
        message.blockIdFlag = object.blockIdFlag ?? 0;
        message.validatorAddress = object.validatorAddress ?? new Uint8Array(0);
        message.timestamp = object.timestamp ?? undefined;
        message.signature = object.signature ?? new Uint8Array(0);
        message.extension = object.extension ?? new Uint8Array(0);
        message.extensionSignature = object.extensionSignature ?? new Uint8Array(0);
        return message;
    },
};
function createBaseProposal() {
    return {
        type: 0,
        height: 0,
        round: 0,
        polRound: 0,
        blockId: undefined,
        timestamp: undefined,
        signature: new Uint8Array(0),
    };
}
export const Proposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.height !== 0) {
            writer.uint32(16).int64(message.height);
        }
        if (message.round !== 0) {
            writer.uint32(24).int32(message.round);
        }
        if (message.polRound !== 0) {
            writer.uint32(32).int32(message.polRound);
        }
        if (message.blockId !== undefined) {
            BlockID.encode(message.blockId, writer.uint32(42).fork()).ldelim();
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(50).fork()).ldelim();
        }
        if (message.signature.length !== 0) {
            writer.uint32(58).bytes(message.signature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.type = reader.int32();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.height = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.round = reader.int32();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.polRound = reader.int32();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.blockId = BlockID.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.signature = reader.bytes();
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
            type: isSet(object.type) ? signedMsgTypeFromJSON(object.type) : 0,
            height: isSet(object.height) ? Number(object.height) : 0,
            round: isSet(object.round) ? Number(object.round) : 0,
            polRound: isSet(object.polRound) ? Number(object.polRound) : 0,
            blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
            timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
            signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== 0) {
            obj.type = signedMsgTypeToJSON(message.type);
        }
        if (message.height !== 0) {
            obj.height = Math.round(message.height);
        }
        if (message.round !== 0) {
            obj.round = Math.round(message.round);
        }
        if (message.polRound !== 0) {
            obj.polRound = Math.round(message.polRound);
        }
        if (message.blockId !== undefined) {
            obj.blockId = BlockID.toJSON(message.blockId);
        }
        if (message.timestamp !== undefined) {
            obj.timestamp = message.timestamp.toISOString();
        }
        if (message.signature.length !== 0) {
            obj.signature = base64FromBytes(message.signature);
        }
        return obj;
    },
    create(base) {
        return Proposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseProposal();
        message.type = object.type ?? 0;
        message.height = object.height ?? 0;
        message.round = object.round ?? 0;
        message.polRound = object.polRound ?? 0;
        message.blockId = (object.blockId !== undefined && object.blockId !== null)
            ? BlockID.fromPartial(object.blockId)
            : undefined;
        message.timestamp = object.timestamp ?? undefined;
        message.signature = object.signature ?? new Uint8Array(0);
        return message;
    },
};
function createBaseSignedHeader() {
    return { header: undefined, commit: undefined };
}
export const SignedHeader = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.header !== undefined) {
            Header.encode(message.header, writer.uint32(10).fork()).ldelim();
        }
        if (message.commit !== undefined) {
            Commit.encode(message.commit, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSignedHeader();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.header = Header.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.commit = Commit.decode(reader, reader.uint32());
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
            header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
            commit: isSet(object.commit) ? Commit.fromJSON(object.commit) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.header !== undefined) {
            obj.header = Header.toJSON(message.header);
        }
        if (message.commit !== undefined) {
            obj.commit = Commit.toJSON(message.commit);
        }
        return obj;
    },
    create(base) {
        return SignedHeader.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSignedHeader();
        message.header = (object.header !== undefined && object.header !== null)
            ? Header.fromPartial(object.header)
            : undefined;
        message.commit = (object.commit !== undefined && object.commit !== null)
            ? Commit.fromPartial(object.commit)
            : undefined;
        return message;
    },
};
function createBaseLightBlock() {
    return { signedHeader: undefined, validatorSet: undefined };
}
export const LightBlock = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.signedHeader !== undefined) {
            SignedHeader.encode(message.signedHeader, writer.uint32(10).fork()).ldelim();
        }
        if (message.validatorSet !== undefined) {
            ValidatorSet.encode(message.validatorSet, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLightBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.signedHeader = SignedHeader.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.validatorSet = ValidatorSet.decode(reader, reader.uint32());
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
            signedHeader: isSet(object.signedHeader) ? SignedHeader.fromJSON(object.signedHeader) : undefined,
            validatorSet: isSet(object.validatorSet) ? ValidatorSet.fromJSON(object.validatorSet) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.signedHeader !== undefined) {
            obj.signedHeader = SignedHeader.toJSON(message.signedHeader);
        }
        if (message.validatorSet !== undefined) {
            obj.validatorSet = ValidatorSet.toJSON(message.validatorSet);
        }
        return obj;
    },
    create(base) {
        return LightBlock.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseLightBlock();
        message.signedHeader = (object.signedHeader !== undefined && object.signedHeader !== null)
            ? SignedHeader.fromPartial(object.signedHeader)
            : undefined;
        message.validatorSet = (object.validatorSet !== undefined && object.validatorSet !== null)
            ? ValidatorSet.fromPartial(object.validatorSet)
            : undefined;
        return message;
    },
};
function createBaseBlockMeta() {
    return { blockId: undefined, blockSize: 0, header: undefined, numTxs: 0 };
}
export const BlockMeta = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.blockId !== undefined) {
            BlockID.encode(message.blockId, writer.uint32(10).fork()).ldelim();
        }
        if (message.blockSize !== 0) {
            writer.uint32(16).int64(message.blockSize);
        }
        if (message.header !== undefined) {
            Header.encode(message.header, writer.uint32(26).fork()).ldelim();
        }
        if (message.numTxs !== 0) {
            writer.uint32(32).int64(message.numTxs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockMeta();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.blockId = BlockID.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.blockSize = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.header = Header.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.numTxs = longToNumber(reader.int64());
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
            blockId: isSet(object.blockId) ? BlockID.fromJSON(object.blockId) : undefined,
            blockSize: isSet(object.blockSize) ? Number(object.blockSize) : 0,
            header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
            numTxs: isSet(object.numTxs) ? Number(object.numTxs) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.blockId !== undefined) {
            obj.blockId = BlockID.toJSON(message.blockId);
        }
        if (message.blockSize !== 0) {
            obj.blockSize = Math.round(message.blockSize);
        }
        if (message.header !== undefined) {
            obj.header = Header.toJSON(message.header);
        }
        if (message.numTxs !== 0) {
            obj.numTxs = Math.round(message.numTxs);
        }
        return obj;
    },
    create(base) {
        return BlockMeta.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBlockMeta();
        message.blockId = (object.blockId !== undefined && object.blockId !== null)
            ? BlockID.fromPartial(object.blockId)
            : undefined;
        message.blockSize = object.blockSize ?? 0;
        message.header = (object.header !== undefined && object.header !== null)
            ? Header.fromPartial(object.header)
            : undefined;
        message.numTxs = object.numTxs ?? 0;
        return message;
    },
};
function createBaseTxProof() {
    return { rootHash: new Uint8Array(0), data: new Uint8Array(0), proof: undefined };
}
export const TxProof = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.rootHash.length !== 0) {
            writer.uint32(10).bytes(message.rootHash);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.proof !== undefined) {
            Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTxProof();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.rootHash = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proof = Proof.decode(reader, reader.uint32());
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
            rootHash: isSet(object.rootHash) ? bytesFromBase64(object.rootHash) : new Uint8Array(0),
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
            proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.rootHash.length !== 0) {
            obj.rootHash = base64FromBytes(message.rootHash);
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        if (message.proof !== undefined) {
            obj.proof = Proof.toJSON(message.proof);
        }
        return obj;
    },
    create(base) {
        return TxProof.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTxProof();
        message.rootHash = object.rootHash ?? new Uint8Array(0);
        message.data = object.data ?? new Uint8Array(0);
        message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
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
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = (t.seconds || 0) * 1000;
    millis += (t.nanos || 0) / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
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
