/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { LightBlock, Vote } from "./types";
import { Validator } from "./validator";
export const protobufPackage = "tendermint.types";
function createBaseEvidence() {
    return { duplicateVoteEvidence: undefined, lightClientAttackEvidence: undefined };
}
export const Evidence = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.duplicateVoteEvidence !== undefined) {
            DuplicateVoteEvidence.encode(message.duplicateVoteEvidence, writer.uint32(10).fork()).ldelim();
        }
        if (message.lightClientAttackEvidence !== undefined) {
            LightClientAttackEvidence.encode(message.lightClientAttackEvidence, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvidence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.duplicateVoteEvidence = DuplicateVoteEvidence.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.lightClientAttackEvidence = LightClientAttackEvidence.decode(reader, reader.uint32());
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
            duplicateVoteEvidence: isSet(object.duplicateVoteEvidence)
                ? DuplicateVoteEvidence.fromJSON(object.duplicateVoteEvidence)
                : undefined,
            lightClientAttackEvidence: isSet(object.lightClientAttackEvidence)
                ? LightClientAttackEvidence.fromJSON(object.lightClientAttackEvidence)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.duplicateVoteEvidence !== undefined) {
            obj.duplicateVoteEvidence = DuplicateVoteEvidence.toJSON(message.duplicateVoteEvidence);
        }
        if (message.lightClientAttackEvidence !== undefined) {
            obj.lightClientAttackEvidence = LightClientAttackEvidence.toJSON(message.lightClientAttackEvidence);
        }
        return obj;
    },
    create(base) {
        return Evidence.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEvidence();
        message.duplicateVoteEvidence =
            (object.duplicateVoteEvidence !== undefined && object.duplicateVoteEvidence !== null)
                ? DuplicateVoteEvidence.fromPartial(object.duplicateVoteEvidence)
                : undefined;
        message.lightClientAttackEvidence =
            (object.lightClientAttackEvidence !== undefined && object.lightClientAttackEvidence !== null)
                ? LightClientAttackEvidence.fromPartial(object.lightClientAttackEvidence)
                : undefined;
        return message;
    },
};
function createBaseDuplicateVoteEvidence() {
    return { voteA: undefined, voteB: undefined, totalVotingPower: 0, validatorPower: 0, timestamp: undefined };
}
export const DuplicateVoteEvidence = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.voteA !== undefined) {
            Vote.encode(message.voteA, writer.uint32(10).fork()).ldelim();
        }
        if (message.voteB !== undefined) {
            Vote.encode(message.voteB, writer.uint32(18).fork()).ldelim();
        }
        if (message.totalVotingPower !== 0) {
            writer.uint32(24).int64(message.totalVotingPower);
        }
        if (message.validatorPower !== 0) {
            writer.uint32(32).int64(message.validatorPower);
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDuplicateVoteEvidence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.voteA = Vote.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.voteB = Vote.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.totalVotingPower = longToNumber(reader.int64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.validatorPower = longToNumber(reader.int64());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            voteA: isSet(object.voteA) ? Vote.fromJSON(object.voteA) : undefined,
            voteB: isSet(object.voteB) ? Vote.fromJSON(object.voteB) : undefined,
            totalVotingPower: isSet(object.totalVotingPower) ? Number(object.totalVotingPower) : 0,
            validatorPower: isSet(object.validatorPower) ? Number(object.validatorPower) : 0,
            timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.voteA !== undefined) {
            obj.voteA = Vote.toJSON(message.voteA);
        }
        if (message.voteB !== undefined) {
            obj.voteB = Vote.toJSON(message.voteB);
        }
        if (message.totalVotingPower !== 0) {
            obj.totalVotingPower = Math.round(message.totalVotingPower);
        }
        if (message.validatorPower !== 0) {
            obj.validatorPower = Math.round(message.validatorPower);
        }
        if (message.timestamp !== undefined) {
            obj.timestamp = message.timestamp.toISOString();
        }
        return obj;
    },
    create(base) {
        return DuplicateVoteEvidence.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDuplicateVoteEvidence();
        message.voteA = (object.voteA !== undefined && object.voteA !== null) ? Vote.fromPartial(object.voteA) : undefined;
        message.voteB = (object.voteB !== undefined && object.voteB !== null) ? Vote.fromPartial(object.voteB) : undefined;
        message.totalVotingPower = object.totalVotingPower ?? 0;
        message.validatorPower = object.validatorPower ?? 0;
        message.timestamp = object.timestamp ?? undefined;
        return message;
    },
};
function createBaseLightClientAttackEvidence() {
    return {
        conflictingBlock: undefined,
        commonHeight: 0,
        byzantineValidators: [],
        totalVotingPower: 0,
        timestamp: undefined,
    };
}
export const LightClientAttackEvidence = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.conflictingBlock !== undefined) {
            LightBlock.encode(message.conflictingBlock, writer.uint32(10).fork()).ldelim();
        }
        if (message.commonHeight !== 0) {
            writer.uint32(16).int64(message.commonHeight);
        }
        for (const v of message.byzantineValidators) {
            Validator.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.totalVotingPower !== 0) {
            writer.uint32(32).int64(message.totalVotingPower);
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLightClientAttackEvidence();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.conflictingBlock = LightBlock.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.commonHeight = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.byzantineValidators.push(Validator.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.totalVotingPower = longToNumber(reader.int64());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            conflictingBlock: isSet(object.conflictingBlock) ? LightBlock.fromJSON(object.conflictingBlock) : undefined,
            commonHeight: isSet(object.commonHeight) ? Number(object.commonHeight) : 0,
            byzantineValidators: Array.isArray(object?.byzantineValidators)
                ? object.byzantineValidators.map((e) => Validator.fromJSON(e))
                : [],
            totalVotingPower: isSet(object.totalVotingPower) ? Number(object.totalVotingPower) : 0,
            timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.conflictingBlock !== undefined) {
            obj.conflictingBlock = LightBlock.toJSON(message.conflictingBlock);
        }
        if (message.commonHeight !== 0) {
            obj.commonHeight = Math.round(message.commonHeight);
        }
        if (message.byzantineValidators?.length) {
            obj.byzantineValidators = message.byzantineValidators.map((e) => Validator.toJSON(e));
        }
        if (message.totalVotingPower !== 0) {
            obj.totalVotingPower = Math.round(message.totalVotingPower);
        }
        if (message.timestamp !== undefined) {
            obj.timestamp = message.timestamp.toISOString();
        }
        return obj;
    },
    create(base) {
        return LightClientAttackEvidence.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseLightClientAttackEvidence();
        message.conflictingBlock = (object.conflictingBlock !== undefined && object.conflictingBlock !== null)
            ? LightBlock.fromPartial(object.conflictingBlock)
            : undefined;
        message.commonHeight = object.commonHeight ?? 0;
        message.byzantineValidators = object.byzantineValidators?.map((e) => Validator.fromPartial(e)) || [];
        message.totalVotingPower = object.totalVotingPower ?? 0;
        message.timestamp = object.timestamp ?? undefined;
        return message;
    },
};
function createBaseEvidenceList() {
    return { evidence: [] };
}
export const EvidenceList = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.evidence) {
            Evidence.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvidenceList();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.evidence.push(Evidence.decode(reader, reader.uint32()));
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
        return { evidence: Array.isArray(object?.evidence) ? object.evidence.map((e) => Evidence.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.evidence?.length) {
            obj.evidence = message.evidence.map((e) => Evidence.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return EvidenceList.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEvidenceList();
        message.evidence = object.evidence?.map((e) => Evidence.fromPartial(e)) || [];
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
