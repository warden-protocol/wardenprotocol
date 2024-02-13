/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { GrantAuthorization } from "./authz";
export const protobufPackage = "cosmos.authz.v1beta1";
function createBaseGenesisState() {
    return { authorization: [] };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.authorization) {
            GrantAuthorization.encode(v, writer.uint32(10).fork()).ldelim();
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
                    message.authorization.push(GrantAuthorization.decode(reader, reader.uint32()));
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
            authorization: Array.isArray(object?.authorization)
                ? object.authorization.map((e) => GrantAuthorization.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authorization?.length) {
            obj.authorization = message.authorization.map((e) => GrantAuthorization.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.authorization = object.authorization?.map((e) => GrantAuthorization.fromPartial(e)) || [];
        return message;
    },
};
