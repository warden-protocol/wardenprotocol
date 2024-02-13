/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "warden.intent.module";
function createBaseModule() {
    return { authority: "" };
}
export const Module = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModule();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
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
        return { authority: isSet(object.authority) ? String(object.authority) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        return obj;
    },
    create(base) {
        return Module.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseModule();
        message.authority = object.authority ?? "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
