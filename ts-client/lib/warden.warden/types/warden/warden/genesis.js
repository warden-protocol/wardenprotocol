/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Keychain } from "./keychain";
import { Params } from "./params";
import { Space } from "./space";
export const protobufPackage = "warden.warden";
function createBaseGenesisState() {
    return { params: undefined, keychains: [], spaces: [] };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.keychains) {
            Keychain.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.spaces) {
            Space.encode(v, writer.uint32(26).fork()).ldelim();
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
                    message.keychains.push(Keychain.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.spaces.push(Space.decode(reader, reader.uint32()));
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
            keychains: Array.isArray(object?.keychains) ? object.keychains.map((e) => Keychain.fromJSON(e)) : [],
            spaces: Array.isArray(object?.spaces) ? object.spaces.map((e) => Space.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        if (message.keychains?.length) {
            obj.keychains = message.keychains.map((e) => Keychain.toJSON(e));
        }
        if (message.spaces?.length) {
            obj.spaces = message.spaces.map((e) => Space.toJSON(e));
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
        message.keychains = object.keychains?.map((e) => Keychain.fromPartial(e)) || [];
        message.spaces = object.spaces?.map((e) => Space.fromPartial(e)) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
