/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Timestamp } from "../../../google/protobuf/timestamp";
export const protobufPackage = "cosmos.authz.v1beta1";
function createBaseGenericAuthorization() {
    return { msg: "" };
}
export const GenericAuthorization = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.msg !== "") {
            writer.uint32(10).string(message.msg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenericAuthorization();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.msg = reader.string();
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
        return { msg: isSet(object.msg) ? String(object.msg) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.msg !== "") {
            obj.msg = message.msg;
        }
        return obj;
    },
    create(base) {
        return GenericAuthorization.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenericAuthorization();
        message.msg = object.msg ?? "";
        return message;
    },
};
function createBaseGrant() {
    return { authorization: undefined, expiration: undefined };
}
export const Grant = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authorization !== undefined) {
            Any.encode(message.authorization, writer.uint32(10).fork()).ldelim();
        }
        if (message.expiration !== undefined) {
            Timestamp.encode(toTimestamp(message.expiration), writer.uint32(18).fork()).ldelim();
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
                    message.authorization = Any.decode(reader, reader.uint32());
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
            authorization: isSet(object.authorization) ? Any.fromJSON(object.authorization) : undefined,
            expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authorization !== undefined) {
            obj.authorization = Any.toJSON(message.authorization);
        }
        if (message.expiration !== undefined) {
            obj.expiration = message.expiration.toISOString();
        }
        return obj;
    },
    create(base) {
        return Grant.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGrant();
        message.authorization = (object.authorization !== undefined && object.authorization !== null)
            ? Any.fromPartial(object.authorization)
            : undefined;
        message.expiration = object.expiration ?? undefined;
        return message;
    },
};
function createBaseGrantAuthorization() {
    return { granter: "", grantee: "", authorization: undefined, expiration: undefined };
}
export const GrantAuthorization = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.granter !== "") {
            writer.uint32(10).string(message.granter);
        }
        if (message.grantee !== "") {
            writer.uint32(18).string(message.grantee);
        }
        if (message.authorization !== undefined) {
            Any.encode(message.authorization, writer.uint32(26).fork()).ldelim();
        }
        if (message.expiration !== undefined) {
            Timestamp.encode(toTimestamp(message.expiration), writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGrantAuthorization();
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
                    message.authorization = Any.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
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
            granter: isSet(object.granter) ? String(object.granter) : "",
            grantee: isSet(object.grantee) ? String(object.grantee) : "",
            authorization: isSet(object.authorization) ? Any.fromJSON(object.authorization) : undefined,
            expiration: isSet(object.expiration) ? fromJsonTimestamp(object.expiration) : undefined,
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
        if (message.authorization !== undefined) {
            obj.authorization = Any.toJSON(message.authorization);
        }
        if (message.expiration !== undefined) {
            obj.expiration = message.expiration.toISOString();
        }
        return obj;
    },
    create(base) {
        return GrantAuthorization.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGrantAuthorization();
        message.granter = object.granter ?? "";
        message.grantee = object.grantee ?? "";
        message.authorization = (object.authorization !== undefined && object.authorization !== null)
            ? Any.fromPartial(object.authorization)
            : undefined;
        message.expiration = object.expiration ?? undefined;
        return message;
    },
};
function createBaseGrantQueueItem() {
    return { msgTypeUrls: [] };
}
export const GrantQueueItem = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.msgTypeUrls) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGrantQueueItem();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.msgTypeUrls.push(reader.string());
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
        return { msgTypeUrls: Array.isArray(object?.msgTypeUrls) ? object.msgTypeUrls.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.msgTypeUrls?.length) {
            obj.msgTypeUrls = message.msgTypeUrls;
        }
        return obj;
    },
    create(base) {
        return GrantQueueItem.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGrantQueueItem();
        message.msgTypeUrls = object.msgTypeUrls?.map((e) => e) || [];
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
