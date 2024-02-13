/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "warden.warden";
function createBaseParams() {
    return {};
}
export const Params = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return Params.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseParams();
        return message;
    },
};
