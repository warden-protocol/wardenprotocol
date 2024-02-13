/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
export const protobufPackage = "cosmos.bank.v1beta1";
function createBaseSendAuthorization() {
    return { spendLimit: [], allowList: [] };
}
export const SendAuthorization = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.spendLimit) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.allowList) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSendAuthorization();
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
                    message.allowList.push(reader.string());
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
            allowList: Array.isArray(object?.allowList) ? object.allowList.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.spendLimit?.length) {
            obj.spendLimit = message.spendLimit.map((e) => Coin.toJSON(e));
        }
        if (message.allowList?.length) {
            obj.allowList = message.allowList;
        }
        return obj;
    },
    create(base) {
        return SendAuthorization.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSendAuthorization();
        message.spendLimit = object.spendLimit?.map((e) => Coin.fromPartial(e)) || [];
        message.allowList = object.allowList?.map((e) => e) || [];
        return message;
    },
};
