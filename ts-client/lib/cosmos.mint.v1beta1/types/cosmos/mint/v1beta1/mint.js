/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "cosmos.mint.v1beta1";
function createBaseMinter() {
    return { inflation: "", annualProvisions: "" };
}
export const Minter = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.inflation !== "") {
            writer.uint32(10).string(message.inflation);
        }
        if (message.annualProvisions !== "") {
            writer.uint32(18).string(message.annualProvisions);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMinter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.inflation = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.annualProvisions = reader.string();
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
            inflation: isSet(object.inflation) ? String(object.inflation) : "",
            annualProvisions: isSet(object.annualProvisions) ? String(object.annualProvisions) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.inflation !== "") {
            obj.inflation = message.inflation;
        }
        if (message.annualProvisions !== "") {
            obj.annualProvisions = message.annualProvisions;
        }
        return obj;
    },
    create(base) {
        return Minter.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMinter();
        message.inflation = object.inflation ?? "";
        message.annualProvisions = object.annualProvisions ?? "";
        return message;
    },
};
function createBaseParams() {
    return {
        mintDenom: "",
        inflationRateChange: "",
        inflationMax: "",
        inflationMin: "",
        goalBonded: "",
        blocksPerYear: 0,
    };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.mintDenom !== "") {
            writer.uint32(10).string(message.mintDenom);
        }
        if (message.inflationRateChange !== "") {
            writer.uint32(18).string(message.inflationRateChange);
        }
        if (message.inflationMax !== "") {
            writer.uint32(26).string(message.inflationMax);
        }
        if (message.inflationMin !== "") {
            writer.uint32(34).string(message.inflationMin);
        }
        if (message.goalBonded !== "") {
            writer.uint32(42).string(message.goalBonded);
        }
        if (message.blocksPerYear !== 0) {
            writer.uint32(48).uint64(message.blocksPerYear);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.mintDenom = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.inflationRateChange = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.inflationMax = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.inflationMin = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.goalBonded = reader.string();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.blocksPerYear = longToNumber(reader.uint64());
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
            mintDenom: isSet(object.mintDenom) ? String(object.mintDenom) : "",
            inflationRateChange: isSet(object.inflationRateChange) ? String(object.inflationRateChange) : "",
            inflationMax: isSet(object.inflationMax) ? String(object.inflationMax) : "",
            inflationMin: isSet(object.inflationMin) ? String(object.inflationMin) : "",
            goalBonded: isSet(object.goalBonded) ? String(object.goalBonded) : "",
            blocksPerYear: isSet(object.blocksPerYear) ? Number(object.blocksPerYear) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.mintDenom !== "") {
            obj.mintDenom = message.mintDenom;
        }
        if (message.inflationRateChange !== "") {
            obj.inflationRateChange = message.inflationRateChange;
        }
        if (message.inflationMax !== "") {
            obj.inflationMax = message.inflationMax;
        }
        if (message.inflationMin !== "") {
            obj.inflationMin = message.inflationMin;
        }
        if (message.goalBonded !== "") {
            obj.goalBonded = message.goalBonded;
        }
        if (message.blocksPerYear !== 0) {
            obj.blocksPerYear = Math.round(message.blocksPerYear);
        }
        return obj;
    },
    create(base) {
        return Params.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.mintDenom = object.mintDenom ?? "";
        message.inflationRateChange = object.inflationRateChange ?? "";
        message.inflationMax = object.inflationMax ?? "";
        message.inflationMin = object.inflationMin ?? "";
        message.goalBonded = object.goalBonded ?? "";
        message.blocksPerYear = object.blocksPerYear ?? 0;
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
