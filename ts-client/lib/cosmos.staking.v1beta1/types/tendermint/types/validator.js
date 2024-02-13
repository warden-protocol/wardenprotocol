/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PublicKey } from "../crypto/keys";
export const protobufPackage = "tendermint.types";
/** BlockIdFlag indicates which BlockID the signature is for */
export var BlockIDFlag;
(function (BlockIDFlag) {
    /** BLOCK_ID_FLAG_UNKNOWN - indicates an error condition */
    BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_UNKNOWN"] = 0] = "BLOCK_ID_FLAG_UNKNOWN";
    /** BLOCK_ID_FLAG_ABSENT - the vote was not received */
    BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_ABSENT"] = 1] = "BLOCK_ID_FLAG_ABSENT";
    /** BLOCK_ID_FLAG_COMMIT - voted for the block that received the majority */
    BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_COMMIT"] = 2] = "BLOCK_ID_FLAG_COMMIT";
    /** BLOCK_ID_FLAG_NIL - voted for nil */
    BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_NIL"] = 3] = "BLOCK_ID_FLAG_NIL";
    BlockIDFlag[BlockIDFlag["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(BlockIDFlag || (BlockIDFlag = {}));
export function blockIDFlagFromJSON(object) {
    switch (object) {
        case 0:
        case "BLOCK_ID_FLAG_UNKNOWN":
            return BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN;
        case 1:
        case "BLOCK_ID_FLAG_ABSENT":
            return BlockIDFlag.BLOCK_ID_FLAG_ABSENT;
        case 2:
        case "BLOCK_ID_FLAG_COMMIT":
            return BlockIDFlag.BLOCK_ID_FLAG_COMMIT;
        case 3:
        case "BLOCK_ID_FLAG_NIL":
            return BlockIDFlag.BLOCK_ID_FLAG_NIL;
        case -1:
        case "UNRECOGNIZED":
        default:
            return BlockIDFlag.UNRECOGNIZED;
    }
}
export function blockIDFlagToJSON(object) {
    switch (object) {
        case BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN:
            return "BLOCK_ID_FLAG_UNKNOWN";
        case BlockIDFlag.BLOCK_ID_FLAG_ABSENT:
            return "BLOCK_ID_FLAG_ABSENT";
        case BlockIDFlag.BLOCK_ID_FLAG_COMMIT:
            return "BLOCK_ID_FLAG_COMMIT";
        case BlockIDFlag.BLOCK_ID_FLAG_NIL:
            return "BLOCK_ID_FLAG_NIL";
        case BlockIDFlag.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseValidatorSet() {
    return { validators: [], proposer: undefined, totalVotingPower: 0 };
}
export const ValidatorSet = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.validators) {
            Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.proposer !== undefined) {
            Validator.encode(message.proposer, writer.uint32(18).fork()).ldelim();
        }
        if (message.totalVotingPower !== 0) {
            writer.uint32(24).int64(message.totalVotingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorSet();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.validators.push(Validator.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.proposer = Validator.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.totalVotingPower = longToNumber(reader.int64());
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
            validators: Array.isArray(object?.validators) ? object.validators.map((e) => Validator.fromJSON(e)) : [],
            proposer: isSet(object.proposer) ? Validator.fromJSON(object.proposer) : undefined,
            totalVotingPower: isSet(object.totalVotingPower) ? Number(object.totalVotingPower) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.validators?.length) {
            obj.validators = message.validators.map((e) => Validator.toJSON(e));
        }
        if (message.proposer !== undefined) {
            obj.proposer = Validator.toJSON(message.proposer);
        }
        if (message.totalVotingPower !== 0) {
            obj.totalVotingPower = Math.round(message.totalVotingPower);
        }
        return obj;
    },
    create(base) {
        return ValidatorSet.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseValidatorSet();
        message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
        message.proposer = (object.proposer !== undefined && object.proposer !== null)
            ? Validator.fromPartial(object.proposer)
            : undefined;
        message.totalVotingPower = object.totalVotingPower ?? 0;
        return message;
    },
};
function createBaseValidator() {
    return { address: new Uint8Array(0), pubKey: undefined, votingPower: 0, proposerPriority: 0 };
}
export const Validator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address.length !== 0) {
            writer.uint32(10).bytes(message.address);
        }
        if (message.pubKey !== undefined) {
            PublicKey.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
        }
        if (message.votingPower !== 0) {
            writer.uint32(24).int64(message.votingPower);
        }
        if (message.proposerPriority !== 0) {
            writer.uint32(32).int64(message.proposerPriority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pubKey = PublicKey.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.votingPower = longToNumber(reader.int64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.proposerPriority = longToNumber(reader.int64());
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
            address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array(0),
            pubKey: isSet(object.pubKey) ? PublicKey.fromJSON(object.pubKey) : undefined,
            votingPower: isSet(object.votingPower) ? Number(object.votingPower) : 0,
            proposerPriority: isSet(object.proposerPriority) ? Number(object.proposerPriority) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address.length !== 0) {
            obj.address = base64FromBytes(message.address);
        }
        if (message.pubKey !== undefined) {
            obj.pubKey = PublicKey.toJSON(message.pubKey);
        }
        if (message.votingPower !== 0) {
            obj.votingPower = Math.round(message.votingPower);
        }
        if (message.proposerPriority !== 0) {
            obj.proposerPriority = Math.round(message.proposerPriority);
        }
        return obj;
    },
    create(base) {
        return Validator.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseValidator();
        message.address = object.address ?? new Uint8Array(0);
        message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
            ? PublicKey.fromPartial(object.pubKey)
            : undefined;
        message.votingPower = object.votingPower ?? 0;
        message.proposerPriority = object.proposerPriority ?? 0;
        return message;
    },
};
function createBaseSimpleValidator() {
    return { pubKey: undefined, votingPower: 0 };
}
export const SimpleValidator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pubKey !== undefined) {
            PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.votingPower !== 0) {
            writer.uint32(16).int64(message.votingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSimpleValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pubKey = PublicKey.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.votingPower = longToNumber(reader.int64());
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
            pubKey: isSet(object.pubKey) ? PublicKey.fromJSON(object.pubKey) : undefined,
            votingPower: isSet(object.votingPower) ? Number(object.votingPower) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pubKey !== undefined) {
            obj.pubKey = PublicKey.toJSON(message.pubKey);
        }
        if (message.votingPower !== 0) {
            obj.votingPower = Math.round(message.votingPower);
        }
        return obj;
    },
    create(base) {
        return SimpleValidator.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSimpleValidator();
        message.pubKey = (object.pubKey !== undefined && object.pubKey !== null)
            ? PublicKey.fromPartial(object.pubKey)
            : undefined;
        message.votingPower = object.votingPower ?? 0;
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
