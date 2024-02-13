/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "cosmos.base.v1beta1";
function createBaseCoin() {
    return { denom: "", amount: "" };
}
export const Coin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.amount !== "") {
            writer.uint32(18).string(message.amount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.denom = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.amount = reader.string();
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
            denom: isSet(object.denom) ? String(object.denom) : "",
            amount: isSet(object.amount) ? String(object.amount) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.denom !== "") {
            obj.denom = message.denom;
        }
        if (message.amount !== "") {
            obj.amount = message.amount;
        }
        return obj;
    },
    create(base) {
        return Coin.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCoin();
        message.denom = object.denom ?? "";
        message.amount = object.amount ?? "";
        return message;
    },
};
function createBaseDecCoin() {
    return { denom: "", amount: "" };
}
export const DecCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.amount !== "") {
            writer.uint32(18).string(message.amount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.denom = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.amount = reader.string();
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
            denom: isSet(object.denom) ? String(object.denom) : "",
            amount: isSet(object.amount) ? String(object.amount) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.denom !== "") {
            obj.denom = message.denom;
        }
        if (message.amount !== "") {
            obj.amount = message.amount;
        }
        return obj;
    },
    create(base) {
        return DecCoin.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDecCoin();
        message.denom = object.denom ?? "";
        message.amount = object.amount ?? "";
        return message;
    },
};
function createBaseIntProto() {
    return { int: "" };
}
export const IntProto = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.int !== "") {
            writer.uint32(10).string(message.int);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIntProto();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.int = reader.string();
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
        return { int: isSet(object.int) ? String(object.int) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.int !== "") {
            obj.int = message.int;
        }
        return obj;
    },
    create(base) {
        return IntProto.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIntProto();
        message.int = object.int ?? "";
        return message;
    },
};
function createBaseDecProto() {
    return { dec: "" };
}
export const DecProto = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.dec !== "") {
            writer.uint32(10).string(message.dec);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDecProto();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.dec = reader.string();
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
        return { dec: isSet(object.dec) ? String(object.dec) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.dec !== "") {
            obj.dec = message.dec;
        }
        return obj;
    },
    create(base) {
        return DecProto.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseDecProto();
        message.dec = object.dec ?? "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
