/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { PacketId } from "../../../core/channel/v1/channel";
export const protobufPackage = "ibc.applications.fee.v1";
function createBaseFee() {
    return { recvFee: [], ackFee: [], timeoutFee: [] };
}
export const Fee = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.recvFee) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.ackFee) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.timeoutFee) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFee();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.recvFee.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.ackFee.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.timeoutFee.push(Coin.decode(reader, reader.uint32()));
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
            recvFee: Array.isArray(object?.recvFee) ? object.recvFee.map((e) => Coin.fromJSON(e)) : [],
            ackFee: Array.isArray(object?.ackFee) ? object.ackFee.map((e) => Coin.fromJSON(e)) : [],
            timeoutFee: Array.isArray(object?.timeoutFee) ? object.timeoutFee.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.recvFee?.length) {
            obj.recvFee = message.recvFee.map((e) => Coin.toJSON(e));
        }
        if (message.ackFee?.length) {
            obj.ackFee = message.ackFee.map((e) => Coin.toJSON(e));
        }
        if (message.timeoutFee?.length) {
            obj.timeoutFee = message.timeoutFee.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return Fee.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseFee();
        message.recvFee = object.recvFee?.map((e) => Coin.fromPartial(e)) || [];
        message.ackFee = object.ackFee?.map((e) => Coin.fromPartial(e)) || [];
        message.timeoutFee = object.timeoutFee?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBasePacketFee() {
    return { fee: undefined, refundAddress: "", relayers: [] };
}
export const PacketFee = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.fee !== undefined) {
            Fee.encode(message.fee, writer.uint32(10).fork()).ldelim();
        }
        if (message.refundAddress !== "") {
            writer.uint32(18).string(message.refundAddress);
        }
        for (const v of message.relayers) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePacketFee();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.fee = Fee.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.refundAddress = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.relayers.push(reader.string());
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
            fee: isSet(object.fee) ? Fee.fromJSON(object.fee) : undefined,
            refundAddress: isSet(object.refundAddress) ? String(object.refundAddress) : "",
            relayers: Array.isArray(object?.relayers) ? object.relayers.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.fee !== undefined) {
            obj.fee = Fee.toJSON(message.fee);
        }
        if (message.refundAddress !== "") {
            obj.refundAddress = message.refundAddress;
        }
        if (message.relayers?.length) {
            obj.relayers = message.relayers;
        }
        return obj;
    },
    create(base) {
        return PacketFee.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePacketFee();
        message.fee = (object.fee !== undefined && object.fee !== null) ? Fee.fromPartial(object.fee) : undefined;
        message.refundAddress = object.refundAddress ?? "";
        message.relayers = object.relayers?.map((e) => e) || [];
        return message;
    },
};
function createBasePacketFees() {
    return { packetFees: [] };
}
export const PacketFees = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.packetFees) {
            PacketFee.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePacketFees();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.packetFees.push(PacketFee.decode(reader, reader.uint32()));
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
            packetFees: Array.isArray(object?.packetFees) ? object.packetFees.map((e) => PacketFee.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.packetFees?.length) {
            obj.packetFees = message.packetFees.map((e) => PacketFee.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return PacketFees.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePacketFees();
        message.packetFees = object.packetFees?.map((e) => PacketFee.fromPartial(e)) || [];
        return message;
    },
};
function createBaseIdentifiedPacketFees() {
    return { packetId: undefined, packetFees: [] };
}
export const IdentifiedPacketFees = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packetId !== undefined) {
            PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.packetFees) {
            PacketFee.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentifiedPacketFees();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.packetId = PacketId.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.packetFees.push(PacketFee.decode(reader, reader.uint32()));
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
            packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined,
            packetFees: Array.isArray(object?.packetFees) ? object.packetFees.map((e) => PacketFee.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.packetId !== undefined) {
            obj.packetId = PacketId.toJSON(message.packetId);
        }
        if (message.packetFees?.length) {
            obj.packetFees = message.packetFees.map((e) => PacketFee.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return IdentifiedPacketFees.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIdentifiedPacketFees();
        message.packetId = (object.packetId !== undefined && object.packetId !== null)
            ? PacketId.fromPartial(object.packetId)
            : undefined;
        message.packetFees = object.packetFees?.map((e) => PacketFee.fromPartial(e)) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
