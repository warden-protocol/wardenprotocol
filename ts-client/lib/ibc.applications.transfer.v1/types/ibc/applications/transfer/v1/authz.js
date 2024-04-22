/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
export const protobufPackage = "ibc.applications.transfer.v1";
function createBaseAllocation() {
    return { sourcePort: "", sourceChannel: "", spendLimit: [], allowList: [], allowedPacketData: [] };
}
export const Allocation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sourcePort !== "") {
            writer.uint32(10).string(message.sourcePort);
        }
        if (message.sourceChannel !== "") {
            writer.uint32(18).string(message.sourceChannel);
        }
        for (const v of message.spendLimit) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.allowList) {
            writer.uint32(34).string(v);
        }
        for (const v of message.allowedPacketData) {
            writer.uint32(42).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAllocation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sourcePort = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.sourceChannel = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.spendLimit.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.allowList.push(reader.string());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.allowedPacketData.push(reader.string());
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
            sourcePort: isSet(object.sourcePort) ? String(object.sourcePort) : "",
            sourceChannel: isSet(object.sourceChannel) ? String(object.sourceChannel) : "",
            spendLimit: Array.isArray(object?.spendLimit) ? object.spendLimit.map((e) => Coin.fromJSON(e)) : [],
            allowList: Array.isArray(object?.allowList) ? object.allowList.map((e) => String(e)) : [],
            allowedPacketData: Array.isArray(object?.allowedPacketData)
                ? object.allowedPacketData.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sourcePort !== "") {
            obj.sourcePort = message.sourcePort;
        }
        if (message.sourceChannel !== "") {
            obj.sourceChannel = message.sourceChannel;
        }
        if (message.spendLimit?.length) {
            obj.spendLimit = message.spendLimit.map((e) => Coin.toJSON(e));
        }
        if (message.allowList?.length) {
            obj.allowList = message.allowList;
        }
        if (message.allowedPacketData?.length) {
            obj.allowedPacketData = message.allowedPacketData;
        }
        return obj;
    },
    create(base) {
        return Allocation.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAllocation();
        message.sourcePort = object.sourcePort ?? "";
        message.sourceChannel = object.sourceChannel ?? "";
        message.spendLimit = object.spendLimit?.map((e) => Coin.fromPartial(e)) || [];
        message.allowList = object.allowList?.map((e) => e) || [];
        message.allowedPacketData = object.allowedPacketData?.map((e) => e) || [];
        return message;
    },
};
function createBaseTransferAuthorization() {
    return { allocations: [] };
}
export const TransferAuthorization = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.allocations) {
            Allocation.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTransferAuthorization();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.allocations.push(Allocation.decode(reader, reader.uint32()));
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
            allocations: Array.isArray(object?.allocations) ? object.allocations.map((e) => Allocation.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.allocations?.length) {
            obj.allocations = message.allocations.map((e) => Allocation.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return TransferAuthorization.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTransferAuthorization();
        message.allocations = object.allocations?.map((e) => Allocation.fromPartial(e)) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
