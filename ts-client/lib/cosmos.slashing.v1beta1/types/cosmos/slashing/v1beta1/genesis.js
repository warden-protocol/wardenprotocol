/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params, ValidatorSigningInfo } from "./slashing";
export const protobufPackage = "cosmos.slashing.v1beta1";
function createBaseGenesisState() {
    return { params: undefined, signingInfos: [], missedBlocks: [] };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.signingInfos) {
            SigningInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.missedBlocks) {
            ValidatorMissedBlocks.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.params = Params.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.signingInfos.push(SigningInfo.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.missedBlocks.push(ValidatorMissedBlocks.decode(reader, reader.uint32()));
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
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
            signingInfos: Array.isArray(object?.signingInfos)
                ? object.signingInfos.map((e) => SigningInfo.fromJSON(e))
                : [],
            missedBlocks: Array.isArray(object?.missedBlocks)
                ? object.missedBlocks.map((e) => ValidatorMissedBlocks.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        if (message.signingInfos?.length) {
            obj.signingInfos = message.signingInfos.map((e) => SigningInfo.toJSON(e));
        }
        if (message.missedBlocks?.length) {
            obj.missedBlocks = message.missedBlocks.map((e) => ValidatorMissedBlocks.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        message.signingInfos = object.signingInfos?.map((e) => SigningInfo.fromPartial(e)) || [];
        message.missedBlocks = object.missedBlocks?.map((e) => ValidatorMissedBlocks.fromPartial(e)) || [];
        return message;
    },
};
function createBaseSigningInfo() {
    return { address: "", validatorSigningInfo: undefined };
}
export const SigningInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.validatorSigningInfo !== undefined) {
            ValidatorSigningInfo.encode(message.validatorSigningInfo, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSigningInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.validatorSigningInfo = ValidatorSigningInfo.decode(reader, reader.uint32());
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
            address: isSet(object.address) ? String(object.address) : "",
            validatorSigningInfo: isSet(object.validatorSigningInfo)
                ? ValidatorSigningInfo.fromJSON(object.validatorSigningInfo)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.validatorSigningInfo !== undefined) {
            obj.validatorSigningInfo = ValidatorSigningInfo.toJSON(message.validatorSigningInfo);
        }
        return obj;
    },
    create(base) {
        return SigningInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSigningInfo();
        message.address = object.address ?? "";
        message.validatorSigningInfo = (object.validatorSigningInfo !== undefined && object.validatorSigningInfo !== null)
            ? ValidatorSigningInfo.fromPartial(object.validatorSigningInfo)
            : undefined;
        return message;
    },
};
function createBaseValidatorMissedBlocks() {
    return { address: "", missedBlocks: [] };
}
export const ValidatorMissedBlocks = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        for (const v of message.missedBlocks) {
            MissedBlock.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorMissedBlocks();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.missedBlocks.push(MissedBlock.decode(reader, reader.uint32()));
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
            address: isSet(object.address) ? String(object.address) : "",
            missedBlocks: Array.isArray(object?.missedBlocks)
                ? object.missedBlocks.map((e) => MissedBlock.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.missedBlocks?.length) {
            obj.missedBlocks = message.missedBlocks.map((e) => MissedBlock.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ValidatorMissedBlocks.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseValidatorMissedBlocks();
        message.address = object.address ?? "";
        message.missedBlocks = object.missedBlocks?.map((e) => MissedBlock.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMissedBlock() {
    return { index: 0, missed: false };
}
export const MissedBlock = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.index !== 0) {
            writer.uint32(8).int64(message.index);
        }
        if (message.missed === true) {
            writer.uint32(16).bool(message.missed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMissedBlock();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.index = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.missed = reader.bool();
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
            missed: isSet(object.missed) ? Boolean(object.missed) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.index !== 0) {
            obj.index = Math.round(message.index);
        }
        if (message.missed === true) {
            obj.missed = message.missed;
        }
        return obj;
    },
    create(base) {
        return MissedBlock.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMissedBlock();
        message.index = object.index ?? 0;
        message.missed = object.missed ?? false;
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
