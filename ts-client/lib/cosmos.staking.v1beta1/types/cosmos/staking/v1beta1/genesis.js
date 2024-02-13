/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Delegation, Params, Redelegation, UnbondingDelegation, Validator } from "./staking";
export const protobufPackage = "cosmos.staking.v1beta1";
function createBaseGenesisState() {
    return {
        params: undefined,
        lastTotalPower: new Uint8Array(0),
        lastValidatorPowers: [],
        validators: [],
        delegations: [],
        unbondingDelegations: [],
        redelegations: [],
        exported: false,
    };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        if (message.lastTotalPower.length !== 0) {
            writer.uint32(18).bytes(message.lastTotalPower);
        }
        for (const v of message.lastValidatorPowers) {
            LastValidatorPower.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.validators) {
            Validator.encode(v, writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.delegations) {
            Delegation.encode(v, writer.uint32(42).fork()).ldelim();
        }
        for (const v of message.unbondingDelegations) {
            UnbondingDelegation.encode(v, writer.uint32(50).fork()).ldelim();
        }
        for (const v of message.redelegations) {
            Redelegation.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.exported === true) {
            writer.uint32(64).bool(message.exported);
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
                    message.lastTotalPower = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.lastValidatorPowers.push(LastValidatorPower.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.validators.push(Validator.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.delegations.push(Delegation.decode(reader, reader.uint32()));
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.unbondingDelegations.push(UnbondingDelegation.decode(reader, reader.uint32()));
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.redelegations.push(Redelegation.decode(reader, reader.uint32()));
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.exported = reader.bool();
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
            lastTotalPower: isSet(object.lastTotalPower) ? bytesFromBase64(object.lastTotalPower) : new Uint8Array(0),
            lastValidatorPowers: Array.isArray(object?.lastValidatorPowers)
                ? object.lastValidatorPowers.map((e) => LastValidatorPower.fromJSON(e))
                : [],
            validators: Array.isArray(object?.validators) ? object.validators.map((e) => Validator.fromJSON(e)) : [],
            delegations: Array.isArray(object?.delegations) ? object.delegations.map((e) => Delegation.fromJSON(e)) : [],
            unbondingDelegations: Array.isArray(object?.unbondingDelegations)
                ? object.unbondingDelegations.map((e) => UnbondingDelegation.fromJSON(e))
                : [],
            redelegations: Array.isArray(object?.redelegations)
                ? object.redelegations.map((e) => Redelegation.fromJSON(e))
                : [],
            exported: isSet(object.exported) ? Boolean(object.exported) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        if (message.lastTotalPower.length !== 0) {
            obj.lastTotalPower = base64FromBytes(message.lastTotalPower);
        }
        if (message.lastValidatorPowers?.length) {
            obj.lastValidatorPowers = message.lastValidatorPowers.map((e) => LastValidatorPower.toJSON(e));
        }
        if (message.validators?.length) {
            obj.validators = message.validators.map((e) => Validator.toJSON(e));
        }
        if (message.delegations?.length) {
            obj.delegations = message.delegations.map((e) => Delegation.toJSON(e));
        }
        if (message.unbondingDelegations?.length) {
            obj.unbondingDelegations = message.unbondingDelegations.map((e) => UnbondingDelegation.toJSON(e));
        }
        if (message.redelegations?.length) {
            obj.redelegations = message.redelegations.map((e) => Redelegation.toJSON(e));
        }
        if (message.exported === true) {
            obj.exported = message.exported;
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
        message.lastTotalPower = object.lastTotalPower ?? new Uint8Array(0);
        message.lastValidatorPowers = object.lastValidatorPowers?.map((e) => LastValidatorPower.fromPartial(e)) || [];
        message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
        message.delegations = object.delegations?.map((e) => Delegation.fromPartial(e)) || [];
        message.unbondingDelegations = object.unbondingDelegations?.map((e) => UnbondingDelegation.fromPartial(e)) || [];
        message.redelegations = object.redelegations?.map((e) => Redelegation.fromPartial(e)) || [];
        message.exported = object.exported ?? false;
        return message;
    },
};
function createBaseLastValidatorPower() {
    return { address: "", power: 0 };
}
export const LastValidatorPower = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.power !== 0) {
            writer.uint32(16).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLastValidatorPower();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.power = longToNumber(reader.int64());
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
            power: isSet(object.power) ? Number(object.power) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.power !== 0) {
            obj.power = Math.round(message.power);
        }
        return obj;
    },
    create(base) {
        return LastValidatorPower.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseLastValidatorPower();
        message.address = object.address ?? "";
        message.power = object.power ?? 0;
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
