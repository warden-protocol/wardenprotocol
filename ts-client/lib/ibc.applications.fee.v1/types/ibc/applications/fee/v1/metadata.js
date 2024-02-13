/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "ibc.applications.fee.v1";
function createBaseMetadata() {
    return { feeVersion: "", appVersion: "" };
}
export const Metadata = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.feeVersion !== "") {
            writer.uint32(10).string(message.feeVersion);
        }
        if (message.appVersion !== "") {
            writer.uint32(18).string(message.appVersion);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.feeVersion = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.appVersion = reader.string();
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
            feeVersion: isSet(object.feeVersion) ? String(object.feeVersion) : "",
            appVersion: isSet(object.appVersion) ? String(object.appVersion) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.feeVersion !== "") {
            obj.feeVersion = message.feeVersion;
        }
        if (message.appVersion !== "") {
            obj.appVersion = message.appVersion;
        }
        return obj;
    },
    create(base) {
        return Metadata.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMetadata();
        message.feeVersion = object.feeVersion ?? "";
        message.appVersion = object.appVersion ?? "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
