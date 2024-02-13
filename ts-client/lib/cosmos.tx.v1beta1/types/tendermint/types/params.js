/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";
export const protobufPackage = "tendermint.types";
function createBaseConsensusParams() {
    return { block: undefined, evidence: undefined, validator: undefined, version: undefined, abci: undefined };
}
export const ConsensusParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.block !== undefined) {
            BlockParams.encode(message.block, writer.uint32(10).fork()).ldelim();
        }
        if (message.evidence !== undefined) {
            EvidenceParams.encode(message.evidence, writer.uint32(18).fork()).ldelim();
        }
        if (message.validator !== undefined) {
            ValidatorParams.encode(message.validator, writer.uint32(26).fork()).ldelim();
        }
        if (message.version !== undefined) {
            VersionParams.encode(message.version, writer.uint32(34).fork()).ldelim();
        }
        if (message.abci !== undefined) {
            ABCIParams.encode(message.abci, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConsensusParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.block = BlockParams.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.evidence = EvidenceParams.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.validator = ValidatorParams.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.version = VersionParams.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.abci = ABCIParams.decode(reader, reader.uint32());
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
            block: isSet(object.block) ? BlockParams.fromJSON(object.block) : undefined,
            evidence: isSet(object.evidence) ? EvidenceParams.fromJSON(object.evidence) : undefined,
            validator: isSet(object.validator) ? ValidatorParams.fromJSON(object.validator) : undefined,
            version: isSet(object.version) ? VersionParams.fromJSON(object.version) : undefined,
            abci: isSet(object.abci) ? ABCIParams.fromJSON(object.abci) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.block !== undefined) {
            obj.block = BlockParams.toJSON(message.block);
        }
        if (message.evidence !== undefined) {
            obj.evidence = EvidenceParams.toJSON(message.evidence);
        }
        if (message.validator !== undefined) {
            obj.validator = ValidatorParams.toJSON(message.validator);
        }
        if (message.version !== undefined) {
            obj.version = VersionParams.toJSON(message.version);
        }
        if (message.abci !== undefined) {
            obj.abci = ABCIParams.toJSON(message.abci);
        }
        return obj;
    },
    create(base) {
        return ConsensusParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseConsensusParams();
        message.block = (object.block !== undefined && object.block !== null)
            ? BlockParams.fromPartial(object.block)
            : undefined;
        message.evidence = (object.evidence !== undefined && object.evidence !== null)
            ? EvidenceParams.fromPartial(object.evidence)
            : undefined;
        message.validator = (object.validator !== undefined && object.validator !== null)
            ? ValidatorParams.fromPartial(object.validator)
            : undefined;
        message.version = (object.version !== undefined && object.version !== null)
            ? VersionParams.fromPartial(object.version)
            : undefined;
        message.abci = (object.abci !== undefined && object.abci !== null)
            ? ABCIParams.fromPartial(object.abci)
            : undefined;
        return message;
    },
};
function createBaseBlockParams() {
    return { maxBytes: 0, maxGas: 0 };
}
export const BlockParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.maxBytes !== 0) {
            writer.uint32(8).int64(message.maxBytes);
        }
        if (message.maxGas !== 0) {
            writer.uint32(16).int64(message.maxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBlockParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.maxBytes = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.maxGas = longToNumber(reader.int64());
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
            maxBytes: isSet(object.maxBytes) ? Number(object.maxBytes) : 0,
            maxGas: isSet(object.maxGas) ? Number(object.maxGas) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.maxBytes !== 0) {
            obj.maxBytes = Math.round(message.maxBytes);
        }
        if (message.maxGas !== 0) {
            obj.maxGas = Math.round(message.maxGas);
        }
        return obj;
    },
    create(base) {
        return BlockParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBlockParams();
        message.maxBytes = object.maxBytes ?? 0;
        message.maxGas = object.maxGas ?? 0;
        return message;
    },
};
function createBaseEvidenceParams() {
    return { maxAgeNumBlocks: 0, maxAgeDuration: undefined, maxBytes: 0 };
}
export const EvidenceParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.maxAgeNumBlocks !== 0) {
            writer.uint32(8).int64(message.maxAgeNumBlocks);
        }
        if (message.maxAgeDuration !== undefined) {
            Duration.encode(message.maxAgeDuration, writer.uint32(18).fork()).ldelim();
        }
        if (message.maxBytes !== 0) {
            writer.uint32(24).int64(message.maxBytes);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEvidenceParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.maxAgeNumBlocks = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.maxAgeDuration = Duration.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.maxBytes = longToNumber(reader.int64());
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
            maxAgeNumBlocks: isSet(object.maxAgeNumBlocks) ? Number(object.maxAgeNumBlocks) : 0,
            maxAgeDuration: isSet(object.maxAgeDuration) ? Duration.fromJSON(object.maxAgeDuration) : undefined,
            maxBytes: isSet(object.maxBytes) ? Number(object.maxBytes) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.maxAgeNumBlocks !== 0) {
            obj.maxAgeNumBlocks = Math.round(message.maxAgeNumBlocks);
        }
        if (message.maxAgeDuration !== undefined) {
            obj.maxAgeDuration = Duration.toJSON(message.maxAgeDuration);
        }
        if (message.maxBytes !== 0) {
            obj.maxBytes = Math.round(message.maxBytes);
        }
        return obj;
    },
    create(base) {
        return EvidenceParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEvidenceParams();
        message.maxAgeNumBlocks = object.maxAgeNumBlocks ?? 0;
        message.maxAgeDuration = (object.maxAgeDuration !== undefined && object.maxAgeDuration !== null)
            ? Duration.fromPartial(object.maxAgeDuration)
            : undefined;
        message.maxBytes = object.maxBytes ?? 0;
        return message;
    },
};
function createBaseValidatorParams() {
    return { pubKeyTypes: [] };
}
export const ValidatorParams = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.pubKeyTypes) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pubKeyTypes.push(reader.string());
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
        return { pubKeyTypes: Array.isArray(object?.pubKeyTypes) ? object.pubKeyTypes.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.pubKeyTypes?.length) {
            obj.pubKeyTypes = message.pubKeyTypes;
        }
        return obj;
    },
    create(base) {
        return ValidatorParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseValidatorParams();
        message.pubKeyTypes = object.pubKeyTypes?.map((e) => e) || [];
        return message;
    },
};
function createBaseVersionParams() {
    return { app: 0 };
}
export const VersionParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.app !== 0) {
            writer.uint32(8).uint64(message.app);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVersionParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.app = longToNumber(reader.uint64());
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
        return { app: isSet(object.app) ? Number(object.app) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.app !== 0) {
            obj.app = Math.round(message.app);
        }
        return obj;
    },
    create(base) {
        return VersionParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseVersionParams();
        message.app = object.app ?? 0;
        return message;
    },
};
function createBaseHashedParams() {
    return { blockMaxBytes: 0, blockMaxGas: 0 };
}
export const HashedParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.blockMaxBytes !== 0) {
            writer.uint32(8).int64(message.blockMaxBytes);
        }
        if (message.blockMaxGas !== 0) {
            writer.uint32(16).int64(message.blockMaxGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHashedParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.blockMaxBytes = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.blockMaxGas = longToNumber(reader.int64());
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
            blockMaxBytes: isSet(object.blockMaxBytes) ? Number(object.blockMaxBytes) : 0,
            blockMaxGas: isSet(object.blockMaxGas) ? Number(object.blockMaxGas) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.blockMaxBytes !== 0) {
            obj.blockMaxBytes = Math.round(message.blockMaxBytes);
        }
        if (message.blockMaxGas !== 0) {
            obj.blockMaxGas = Math.round(message.blockMaxGas);
        }
        return obj;
    },
    create(base) {
        return HashedParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseHashedParams();
        message.blockMaxBytes = object.blockMaxBytes ?? 0;
        message.blockMaxGas = object.blockMaxGas ?? 0;
        return message;
    },
};
function createBaseABCIParams() {
    return { voteExtensionsEnableHeight: 0 };
}
export const ABCIParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.voteExtensionsEnableHeight !== 0) {
            writer.uint32(8).int64(message.voteExtensionsEnableHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseABCIParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.voteExtensionsEnableHeight = longToNumber(reader.int64());
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
            voteExtensionsEnableHeight: isSet(object.voteExtensionsEnableHeight)
                ? Number(object.voteExtensionsEnableHeight)
                : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.voteExtensionsEnableHeight !== 0) {
            obj.voteExtensionsEnableHeight = Math.round(message.voteExtensionsEnableHeight);
        }
        return obj;
    },
    create(base) {
        return ABCIParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseABCIParams();
        message.voteExtensionsEnableHeight = object.voteExtensionsEnableHeight ?? 0;
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
