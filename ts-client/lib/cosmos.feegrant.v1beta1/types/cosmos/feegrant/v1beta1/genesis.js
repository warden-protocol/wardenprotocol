/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Grant } from "./feegrant";
export const protobufPackage = "cosmos.feegrant.v1beta1";
function createBaseGenesisState() {
    return { allowances: [] };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.allowances) {
            Grant.encode(v, writer.uint32(10).fork()).ldelim();
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
                    message.allowances.push(Grant.decode(reader, reader.uint32()));
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
            allowances: Array.isArray(object?.allowances) ? object.allowances.map((e) => Grant.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.allowances?.length) {
            obj.allowances = message.allowances.map((e) => Grant.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.allowances = object.allowances?.map((e) => Grant.fromPartial(e)) || [];
        return message;
    },
};
