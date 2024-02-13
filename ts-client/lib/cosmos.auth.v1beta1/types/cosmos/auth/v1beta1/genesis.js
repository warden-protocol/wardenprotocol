/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Params } from "./auth";
export const protobufPackage = "cosmos.auth.v1beta1";
function createBaseGenesisState() {
    return { params: undefined, accounts: [] };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.accounts) {
            Any.encode(v, writer.uint32(18).fork()).ldelim();
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
                    message.accounts.push(Any.decode(reader, reader.uint32()));
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
            accounts: Array.isArray(object?.accounts) ? object.accounts.map((e) => Any.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        if (message.accounts?.length) {
            obj.accounts = message.accounts.map((e) => Any.toJSON(e));
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
        message.accounts = object.accounts?.map((e) => Any.fromPartial(e)) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
