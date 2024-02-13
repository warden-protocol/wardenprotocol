/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { BaseAccount } from "../../auth/v1beta1/auth";
import { Coin } from "../../base/v1beta1/coin";
export const protobufPackage = "cosmos.vesting.v1beta1";
function createBaseBaseVestingAccount() {
    return { baseAccount: undefined, originalVesting: [], delegatedFree: [], delegatedVesting: [], endTime: 0 };
}
export const BaseVestingAccount = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.baseAccount !== undefined) {
            BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.originalVesting) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.delegatedFree) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.delegatedVesting) {
            Coin.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.endTime !== 0) {
            writer.uint32(40).int64(message.endTime);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBaseVestingAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.baseAccount = BaseAccount.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.originalVesting.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.delegatedFree.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.delegatedVesting.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.endTime = longToNumber(reader.int64());
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
            baseAccount: isSet(object.baseAccount) ? BaseAccount.fromJSON(object.baseAccount) : undefined,
            originalVesting: Array.isArray(object?.originalVesting)
                ? object.originalVesting.map((e) => Coin.fromJSON(e))
                : [],
            delegatedFree: Array.isArray(object?.delegatedFree) ? object.delegatedFree.map((e) => Coin.fromJSON(e)) : [],
            delegatedVesting: Array.isArray(object?.delegatedVesting)
                ? object.delegatedVesting.map((e) => Coin.fromJSON(e))
                : [],
            endTime: isSet(object.endTime) ? Number(object.endTime) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.baseAccount !== undefined) {
            obj.baseAccount = BaseAccount.toJSON(message.baseAccount);
        }
        if (message.originalVesting?.length) {
            obj.originalVesting = message.originalVesting.map((e) => Coin.toJSON(e));
        }
        if (message.delegatedFree?.length) {
            obj.delegatedFree = message.delegatedFree.map((e) => Coin.toJSON(e));
        }
        if (message.delegatedVesting?.length) {
            obj.delegatedVesting = message.delegatedVesting.map((e) => Coin.toJSON(e));
        }
        if (message.endTime !== 0) {
            obj.endTime = Math.round(message.endTime);
        }
        return obj;
    },
    create(base) {
        return BaseVestingAccount.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBaseVestingAccount();
        message.baseAccount = (object.baseAccount !== undefined && object.baseAccount !== null)
            ? BaseAccount.fromPartial(object.baseAccount)
            : undefined;
        message.originalVesting = object.originalVesting?.map((e) => Coin.fromPartial(e)) || [];
        message.delegatedFree = object.delegatedFree?.map((e) => Coin.fromPartial(e)) || [];
        message.delegatedVesting = object.delegatedVesting?.map((e) => Coin.fromPartial(e)) || [];
        message.endTime = object.endTime ?? 0;
        return message;
    },
};
function createBaseContinuousVestingAccount() {
    return { baseVestingAccount: undefined, startTime: 0 };
}
export const ContinuousVestingAccount = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.baseVestingAccount !== undefined) {
            BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
        }
        if (message.startTime !== 0) {
            writer.uint32(16).int64(message.startTime);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseContinuousVestingAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.startTime = longToNumber(reader.int64());
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
            baseVestingAccount: isSet(object.baseVestingAccount)
                ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
                : undefined,
            startTime: isSet(object.startTime) ? Number(object.startTime) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.baseVestingAccount !== undefined) {
            obj.baseVestingAccount = BaseVestingAccount.toJSON(message.baseVestingAccount);
        }
        if (message.startTime !== 0) {
            obj.startTime = Math.round(message.startTime);
        }
        return obj;
    },
    create(base) {
        return ContinuousVestingAccount.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseContinuousVestingAccount();
        message.baseVestingAccount = (object.baseVestingAccount !== undefined && object.baseVestingAccount !== null)
            ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
            : undefined;
        message.startTime = object.startTime ?? 0;
        return message;
    },
};
function createBaseDelayedVestingAccount() {
    return { baseVestingAccount: undefined };
}
export const DelayedVestingAccount = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.baseVestingAccount !== undefined) {
            BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDelayedVestingAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
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
            baseVestingAccount: isSet(object.baseVestingAccount)
                ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.baseVestingAccount !== undefined) {
            obj.baseVestingAccount = BaseVestingAccount.toJSON(message.baseVestingAccount);
        }
        return obj;
    },
    create(base) {
        return DelayedVestingAccount.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDelayedVestingAccount();
        message.baseVestingAccount = (object.baseVestingAccount !== undefined && object.baseVestingAccount !== null)
            ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
            : undefined;
        return message;
    },
};
function createBasePeriod() {
    return { length: 0, amount: [] };
}
export const Period = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.length !== 0) {
            writer.uint32(8).int64(message.length);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePeriod();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.length = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
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
            length: isSet(object.length) ? Number(object.length) : 0,
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.length !== 0) {
            obj.length = Math.round(message.length);
        }
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return Period.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePeriod();
        message.length = object.length ?? 0;
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBasePeriodicVestingAccount() {
    return { baseVestingAccount: undefined, startTime: 0, vestingPeriods: [] };
}
export const PeriodicVestingAccount = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.baseVestingAccount !== undefined) {
            BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
        }
        if (message.startTime !== 0) {
            writer.uint32(16).int64(message.startTime);
        }
        for (const v of message.vestingPeriods) {
            Period.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePeriodicVestingAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.startTime = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.vestingPeriods.push(Period.decode(reader, reader.uint32()));
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
            baseVestingAccount: isSet(object.baseVestingAccount)
                ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
                : undefined,
            startTime: isSet(object.startTime) ? Number(object.startTime) : 0,
            vestingPeriods: Array.isArray(object?.vestingPeriods)
                ? object.vestingPeriods.map((e) => Period.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.baseVestingAccount !== undefined) {
            obj.baseVestingAccount = BaseVestingAccount.toJSON(message.baseVestingAccount);
        }
        if (message.startTime !== 0) {
            obj.startTime = Math.round(message.startTime);
        }
        if (message.vestingPeriods?.length) {
            obj.vestingPeriods = message.vestingPeriods.map((e) => Period.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return PeriodicVestingAccount.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePeriodicVestingAccount();
        message.baseVestingAccount = (object.baseVestingAccount !== undefined && object.baseVestingAccount !== null)
            ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
            : undefined;
        message.startTime = object.startTime ?? 0;
        message.vestingPeriods = object.vestingPeriods?.map((e) => Period.fromPartial(e)) || [];
        return message;
    },
};
function createBasePermanentLockedAccount() {
    return { baseVestingAccount: undefined };
}
export const PermanentLockedAccount = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.baseVestingAccount !== undefined) {
            BaseVestingAccount.encode(message.baseVestingAccount, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePermanentLockedAccount();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.baseVestingAccount = BaseVestingAccount.decode(reader, reader.uint32());
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
            baseVestingAccount: isSet(object.baseVestingAccount)
                ? BaseVestingAccount.fromJSON(object.baseVestingAccount)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.baseVestingAccount !== undefined) {
            obj.baseVestingAccount = BaseVestingAccount.toJSON(message.baseVestingAccount);
        }
        return obj;
    },
    create(base) {
        return PermanentLockedAccount.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePermanentLockedAccount();
        message.baseVestingAccount = (object.baseVestingAccount !== undefined && object.baseVestingAccount !== null)
            ? BaseVestingAccount.fromPartial(object.baseVestingAccount)
            : undefined;
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
