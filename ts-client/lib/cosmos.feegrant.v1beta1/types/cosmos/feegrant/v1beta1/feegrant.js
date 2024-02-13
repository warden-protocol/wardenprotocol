/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";
export const protobufPackage = "cosmos.feegrant.v1beta1";
function createBaseBasicAllowance() {
    return { spendLimit: [], expiration: undefined };
}
export const BasicAllowance = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.spendLimit) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.expiration !== undefined) {
            Timestamp.encode(toTimestamp(message.expiration), writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBasicAllowance();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.spendLimit.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            spendLimit: Array.isArray(object?.spendLimit) ? object.spendLimit.map((e) => Coin.fromJSON(e)) : [],
            expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.spendLimit?.length) {
            obj.spendLimit = message.spendLimit.map((e) => Coin.toJSON(e));
        }
        if (message.expiration !== undefined) {
            obj.expiration = message.expiration.toISOString();
        }
        return obj;
    },
    create(base) {
        return BasicAllowance.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBasicAllowance();
        message.spendLimit = object.spendLimit?.map((e) => Coin.fromPartial(e)) || [];
        message.expiration = object.expiration ?? undefined;
        return message;
    },
};
function createBasePeriodicAllowance() {
    return { basic: undefined, period: undefined, periodSpendLimit: [], periodCanSpend: [], periodReset: undefined };
}
export const PeriodicAllowance = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.basic !== undefined) {
            BasicAllowance.encode(message.basic, writer.uint32(10).fork()).ldelim();
        }
        if (message.period !== undefined) {
            Duration.encode(message.period, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.periodSpendLimit) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.periodCanSpend) {
            Coin.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (message.periodReset !== undefined) {
            Timestamp.encode(toTimestamp(message.periodReset), writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePeriodicAllowance();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.basic = BasicAllowance.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.period = Duration.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.periodSpendLimit.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.periodCanSpend.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.periodReset = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            basic: isSet(object.basic) ? BasicAllowance.fromJSON(object.basic) : undefined,
            period: isSet(object.period) ? Duration.fromJSON(object.period) : undefined,
            periodSpendLimit: Array.isArray(object?.periodSpendLimit)
                ? object.periodSpendLimit.map((e) => Coin.fromJSON(e))
                : [],
            periodCanSpend: Array.isArray(object?.periodCanSpend)
                ? object.periodCanSpend.map((e) => Coin.fromJSON(e))
                : [],
            periodReset: isSet(object.periodReset) ? fromJsonTimestamp(object.periodReset) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.basic !== undefined) {
            obj.basic = BasicAllowance.toJSON(message.basic);
        }
        if (message.period !== undefined) {
            obj.period = Duration.toJSON(message.period);
        }
        if (message.periodSpendLimit?.length) {
            obj.periodSpendLimit = message.periodSpendLimit.map((e) => Coin.toJSON(e));
        }
        if (message.periodCanSpend?.length) {
            obj.periodCanSpend = message.periodCanSpend.map((e) => Coin.toJSON(e));
        }
        if (message.periodReset !== undefined) {
            obj.periodReset = message.periodReset.toISOString();
        }
        return obj;
    },
    create(base) {
        return PeriodicAllowance.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePeriodicAllowance();
        message.basic = (object.basic !== undefined && object.basic !== null)
            ? BasicAllowance.fromPartial(object.basic)
            : undefined;
        message.period = (object.period !== undefined && object.period !== null)
            ? Duration.fromPartial(object.period)
            : undefined;
        message.periodSpendLimit = object.periodSpendLimit?.map((e) => Coin.fromPartial(e)) || [];
        message.periodCanSpend = object.periodCanSpend?.map((e) => Coin.fromPartial(e)) || [];
        message.periodReset = object.periodReset ?? undefined;
        return message;
    },
};
function createBaseAllowedMsgAllowance() {
    return { allowance: undefined, allowedMessages: [] };
}
export const AllowedMsgAllowance = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.allowance !== undefined) {
            Any.encode(message.allowance, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.allowedMessages) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAllowedMsgAllowance();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.allowance = Any.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.allowedMessages.push(reader.string());
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
            allowance: isSet(object.allowance) ? Any.fromJSON(object.allowance) : undefined,
            allowedMessages: Array.isArray(object?.allowedMessages) ? object.allowedMessages.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.allowance !== undefined) {
            obj.allowance = Any.toJSON(message.allowance);
        }
        if (message.allowedMessages?.length) {
            obj.allowedMessages = message.allowedMessages;
        }
        return obj;
    },
    create(base) {
        return AllowedMsgAllowance.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAllowedMsgAllowance();
        message.allowance = (object.allowance !== undefined && object.allowance !== null)
            ? Any.fromPartial(object.allowance)
            : undefined;
        message.allowedMessages = object.allowedMessages?.map((e) => e) || [];
        return message;
    },
};
function createBaseGrant() {
    return { granter: "", grantee: "", allowance: undefined };
}
export const Grant = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.granter !== "") {
            writer.uint32(10).string(message.granter);
        }
        if (message.grantee !== "") {
            writer.uint32(18).string(message.grantee);
        }
        if (message.allowance !== undefined) {
            Any.encode(message.allowance, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGrant();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.granter = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.grantee = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.allowance = Any.decode(reader, reader.uint32());
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
            granter: isSet(object.granter) ? String(object.granter) : "",
            grantee: isSet(object.grantee) ? String(object.grantee) : "",
            allowance: isSet(object.allowance) ? Any.fromJSON(object.allowance) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.granter !== "") {
            obj.granter = message.granter;
        }
        if (message.grantee !== "") {
            obj.grantee = message.grantee;
        }
        if (message.allowance !== undefined) {
            obj.allowance = Any.toJSON(message.allowance);
        }
        return obj;
    },
    create(base) {
        return Grant.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGrant();
        message.granter = object.granter ?? "";
        message.grantee = object.grantee ?? "";
        message.allowance = (object.allowance !== undefined && object.allowance !== null)
            ? Any.fromPartial(object.allowance)
            : undefined;
        return message;
    },
};
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
function isSet(value) {
    return value !== null && value !== undefined;
}
