/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Height } from "../../client/v1/client";
export const protobufPackage = "ibc.core.channel.v1";
/**
 * State defines if a channel is in one of the following states:
 * CLOSED, INIT, TRYOPEN, OPEN, FLUSHING, FLUSHCOMPLETE or UNINITIALIZED.
 */
export var State;
(function (State) {
    /** STATE_UNINITIALIZED_UNSPECIFIED - Default State */
    State[State["STATE_UNINITIALIZED_UNSPECIFIED"] = 0] = "STATE_UNINITIALIZED_UNSPECIFIED";
    /** STATE_INIT - A channel has just started the opening handshake. */
    State[State["STATE_INIT"] = 1] = "STATE_INIT";
    /** STATE_TRYOPEN - A channel has acknowledged the handshake step on the counterparty chain. */
    State[State["STATE_TRYOPEN"] = 2] = "STATE_TRYOPEN";
    /**
     * STATE_OPEN - A channel has completed the handshake. Open channels are
     * ready to send and receive packets.
     */
    State[State["STATE_OPEN"] = 3] = "STATE_OPEN";
    /**
     * STATE_CLOSED - A channel has been closed and can no longer be used to send or receive
     * packets.
     */
    State[State["STATE_CLOSED"] = 4] = "STATE_CLOSED";
    /** STATE_FLUSHING - A channel has just accepted the upgrade handshake attempt and is flushing in-flight packets. */
    State[State["STATE_FLUSHING"] = 5] = "STATE_FLUSHING";
    /** STATE_FLUSHCOMPLETE - A channel has just completed flushing any in-flight packets. */
    State[State["STATE_FLUSHCOMPLETE"] = 6] = "STATE_FLUSHCOMPLETE";
    State[State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(State || (State = {}));
export function stateFromJSON(object) {
    switch (object) {
        case 0:
        case "STATE_UNINITIALIZED_UNSPECIFIED":
            return State.STATE_UNINITIALIZED_UNSPECIFIED;
        case 1:
        case "STATE_INIT":
            return State.STATE_INIT;
        case 2:
        case "STATE_TRYOPEN":
            return State.STATE_TRYOPEN;
        case 3:
        case "STATE_OPEN":
            return State.STATE_OPEN;
        case 4:
        case "STATE_CLOSED":
            return State.STATE_CLOSED;
        case 5:
        case "STATE_FLUSHING":
            return State.STATE_FLUSHING;
        case 6:
        case "STATE_FLUSHCOMPLETE":
            return State.STATE_FLUSHCOMPLETE;
        case -1:
        case "UNRECOGNIZED":
        default:
            return State.UNRECOGNIZED;
    }
}
export function stateToJSON(object) {
    switch (object) {
        case State.STATE_UNINITIALIZED_UNSPECIFIED:
            return "STATE_UNINITIALIZED_UNSPECIFIED";
        case State.STATE_INIT:
            return "STATE_INIT";
        case State.STATE_TRYOPEN:
            return "STATE_TRYOPEN";
        case State.STATE_OPEN:
            return "STATE_OPEN";
        case State.STATE_CLOSED:
            return "STATE_CLOSED";
        case State.STATE_FLUSHING:
            return "STATE_FLUSHING";
        case State.STATE_FLUSHCOMPLETE:
            return "STATE_FLUSHCOMPLETE";
        case State.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/** Order defines if a channel is ORDERED or UNORDERED */
export var Order;
(function (Order) {
    /** ORDER_NONE_UNSPECIFIED - zero-value for channel ordering */
    Order[Order["ORDER_NONE_UNSPECIFIED"] = 0] = "ORDER_NONE_UNSPECIFIED";
    /**
     * ORDER_UNORDERED - packets can be delivered in any order, which may differ from the order in
     * which they were sent.
     */
    Order[Order["ORDER_UNORDERED"] = 1] = "ORDER_UNORDERED";
    /** ORDER_ORDERED - packets are delivered exactly in the order which they were sent */
    Order[Order["ORDER_ORDERED"] = 2] = "ORDER_ORDERED";
    Order[Order["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Order || (Order = {}));
export function orderFromJSON(object) {
    switch (object) {
        case 0:
        case "ORDER_NONE_UNSPECIFIED":
            return Order.ORDER_NONE_UNSPECIFIED;
        case 1:
        case "ORDER_UNORDERED":
            return Order.ORDER_UNORDERED;
        case 2:
        case "ORDER_ORDERED":
            return Order.ORDER_ORDERED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Order.UNRECOGNIZED;
    }
}
export function orderToJSON(object) {
    switch (object) {
        case Order.ORDER_NONE_UNSPECIFIED:
            return "ORDER_NONE_UNSPECIFIED";
        case Order.ORDER_UNORDERED:
            return "ORDER_UNORDERED";
        case Order.ORDER_ORDERED:
            return "ORDER_ORDERED";
        case Order.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseChannel() {
    return { state: 0, ordering: 0, counterparty: undefined, connectionHops: [], version: "", upgradeSequence: 0 };
}
export const Channel = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
        }
        if (message.ordering !== 0) {
            writer.uint32(16).int32(message.ordering);
        }
        if (message.counterparty !== undefined) {
            Counterparty.encode(message.counterparty, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.connectionHops) {
            writer.uint32(34).string(v);
        }
        if (message.version !== "") {
            writer.uint32(42).string(message.version);
        }
        if (message.upgradeSequence !== 0) {
            writer.uint32(48).uint64(message.upgradeSequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseChannel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.state = reader.int32();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.ordering = reader.int32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.counterparty = Counterparty.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.connectionHops.push(reader.string());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.version = reader.string();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.upgradeSequence = longToNumber(reader.uint64());
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
            state: isSet(object.state) ? stateFromJSON(object.state) : 0,
            ordering: isSet(object.ordering) ? orderFromJSON(object.ordering) : 0,
            counterparty: isSet(object.counterparty) ? Counterparty.fromJSON(object.counterparty) : undefined,
            connectionHops: Array.isArray(object?.connectionHops) ? object.connectionHops.map((e) => String(e)) : [],
            version: isSet(object.version) ? String(object.version) : "",
            upgradeSequence: isSet(object.upgradeSequence) ? Number(object.upgradeSequence) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.state !== 0) {
            obj.state = stateToJSON(message.state);
        }
        if (message.ordering !== 0) {
            obj.ordering = orderToJSON(message.ordering);
        }
        if (message.counterparty !== undefined) {
            obj.counterparty = Counterparty.toJSON(message.counterparty);
        }
        if (message.connectionHops?.length) {
            obj.connectionHops = message.connectionHops;
        }
        if (message.version !== "") {
            obj.version = message.version;
        }
        if (message.upgradeSequence !== 0) {
            obj.upgradeSequence = Math.round(message.upgradeSequence);
        }
        return obj;
    },
    create(base) {
        return Channel.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseChannel();
        message.state = object.state ?? 0;
        message.ordering = object.ordering ?? 0;
        message.counterparty = (object.counterparty !== undefined && object.counterparty !== null)
            ? Counterparty.fromPartial(object.counterparty)
            : undefined;
        message.connectionHops = object.connectionHops?.map((e) => e) || [];
        message.version = object.version ?? "";
        message.upgradeSequence = object.upgradeSequence ?? 0;
        return message;
    },
};
function createBaseIdentifiedChannel() {
    return {
        state: 0,
        ordering: 0,
        counterparty: undefined,
        connectionHops: [],
        version: "",
        portId: "",
        channelId: "",
        upgradeSequence: 0,
    };
}
export const IdentifiedChannel = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
        }
        if (message.ordering !== 0) {
            writer.uint32(16).int32(message.ordering);
        }
        if (message.counterparty !== undefined) {
            Counterparty.encode(message.counterparty, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.connectionHops) {
            writer.uint32(34).string(v);
        }
        if (message.version !== "") {
            writer.uint32(42).string(message.version);
        }
        if (message.portId !== "") {
            writer.uint32(50).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(58).string(message.channelId);
        }
        if (message.upgradeSequence !== 0) {
            writer.uint32(64).uint64(message.upgradeSequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentifiedChannel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.state = reader.int32();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.ordering = reader.int32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.counterparty = Counterparty.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.connectionHops.push(reader.string());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.version = reader.string();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.upgradeSequence = longToNumber(reader.uint64());
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
            state: isSet(object.state) ? stateFromJSON(object.state) : 0,
            ordering: isSet(object.ordering) ? orderFromJSON(object.ordering) : 0,
            counterparty: isSet(object.counterparty) ? Counterparty.fromJSON(object.counterparty) : undefined,
            connectionHops: Array.isArray(object?.connectionHops) ? object.connectionHops.map((e) => String(e)) : [],
            version: isSet(object.version) ? String(object.version) : "",
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            upgradeSequence: isSet(object.upgradeSequence) ? Number(object.upgradeSequence) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.state !== 0) {
            obj.state = stateToJSON(message.state);
        }
        if (message.ordering !== 0) {
            obj.ordering = orderToJSON(message.ordering);
        }
        if (message.counterparty !== undefined) {
            obj.counterparty = Counterparty.toJSON(message.counterparty);
        }
        if (message.connectionHops?.length) {
            obj.connectionHops = message.connectionHops;
        }
        if (message.version !== "") {
            obj.version = message.version;
        }
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.upgradeSequence !== 0) {
            obj.upgradeSequence = Math.round(message.upgradeSequence);
        }
        return obj;
    },
    create(base) {
        return IdentifiedChannel.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIdentifiedChannel();
        message.state = object.state ?? 0;
        message.ordering = object.ordering ?? 0;
        message.counterparty = (object.counterparty !== undefined && object.counterparty !== null)
            ? Counterparty.fromPartial(object.counterparty)
            : undefined;
        message.connectionHops = object.connectionHops?.map((e) => e) || [];
        message.version = object.version ?? "";
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.upgradeSequence = object.upgradeSequence ?? 0;
        return message;
    },
};
function createBaseCounterparty() {
    return { portId: "", channelId: "" };
}
export const Counterparty = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCounterparty();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        return obj;
    },
    create(base) {
        return Counterparty.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCounterparty();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        return message;
    },
};
function createBasePacket() {
    return {
        sequence: 0,
        sourcePort: "",
        sourceChannel: "",
        destinationPort: "",
        destinationChannel: "",
        data: new Uint8Array(0),
        timeoutHeight: undefined,
        timeoutTimestamp: 0,
    };
}
export const Packet = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sequence !== 0) {
            writer.uint32(8).uint64(message.sequence);
        }
        if (message.sourcePort !== "") {
            writer.uint32(18).string(message.sourcePort);
        }
        if (message.sourceChannel !== "") {
            writer.uint32(26).string(message.sourceChannel);
        }
        if (message.destinationPort !== "") {
            writer.uint32(34).string(message.destinationPort);
        }
        if (message.destinationChannel !== "") {
            writer.uint32(42).string(message.destinationChannel);
        }
        if (message.data.length !== 0) {
            writer.uint32(50).bytes(message.data);
        }
        if (message.timeoutHeight !== undefined) {
            Height.encode(message.timeoutHeight, writer.uint32(58).fork()).ldelim();
        }
        if (message.timeoutTimestamp !== 0) {
            writer.uint32(64).uint64(message.timeoutTimestamp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePacket();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.sequence = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.sourcePort = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.sourceChannel = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.destinationPort = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.destinationChannel = reader.string();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.timeoutHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.timeoutTimestamp = longToNumber(reader.uint64());
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
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
            sourcePort: isSet(object.sourcePort) ? String(object.sourcePort) : "",
            sourceChannel: isSet(object.sourceChannel) ? String(object.sourceChannel) : "",
            destinationPort: isSet(object.destinationPort) ? String(object.destinationPort) : "",
            destinationChannel: isSet(object.destinationChannel) ? String(object.destinationChannel) : "",
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
            timeoutHeight: isSet(object.timeoutHeight) ? Height.fromJSON(object.timeoutHeight) : undefined,
            timeoutTimestamp: isSet(object.timeoutTimestamp) ? Number(object.timeoutTimestamp) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sequence !== 0) {
            obj.sequence = Math.round(message.sequence);
        }
        if (message.sourcePort !== "") {
            obj.sourcePort = message.sourcePort;
        }
        if (message.sourceChannel !== "") {
            obj.sourceChannel = message.sourceChannel;
        }
        if (message.destinationPort !== "") {
            obj.destinationPort = message.destinationPort;
        }
        if (message.destinationChannel !== "") {
            obj.destinationChannel = message.destinationChannel;
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        if (message.timeoutHeight !== undefined) {
            obj.timeoutHeight = Height.toJSON(message.timeoutHeight);
        }
        if (message.timeoutTimestamp !== 0) {
            obj.timeoutTimestamp = Math.round(message.timeoutTimestamp);
        }
        return obj;
    },
    create(base) {
        return Packet.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePacket();
        message.sequence = object.sequence ?? 0;
        message.sourcePort = object.sourcePort ?? "";
        message.sourceChannel = object.sourceChannel ?? "";
        message.destinationPort = object.destinationPort ?? "";
        message.destinationChannel = object.destinationChannel ?? "";
        message.data = object.data ?? new Uint8Array(0);
        message.timeoutHeight = (object.timeoutHeight !== undefined && object.timeoutHeight !== null)
            ? Height.fromPartial(object.timeoutHeight)
            : undefined;
        message.timeoutTimestamp = object.timeoutTimestamp ?? 0;
        return message;
    },
};
function createBasePacketState() {
    return { portId: "", channelId: "", sequence: 0, data: new Uint8Array(0) };
}
export const PacketState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        if (message.data.length !== 0) {
            writer.uint32(34).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePacketState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.sequence = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.data = reader.bytes();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.sequence !== 0) {
            obj.sequence = Math.round(message.sequence);
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return PacketState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePacketState();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.sequence = object.sequence ?? 0;
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBasePacketId() {
    return { portId: "", channelId: "", sequence: 0 };
}
export const PacketId = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePacketId();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.sequence = longToNumber(reader.uint64());
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.sequence !== 0) {
            obj.sequence = Math.round(message.sequence);
        }
        return obj;
    },
    create(base) {
        return PacketId.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePacketId();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.sequence = object.sequence ?? 0;
        return message;
    },
};
function createBaseAcknowledgement() {
    return { result: undefined, error: undefined };
}
export const Acknowledgement = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.result !== undefined) {
            writer.uint32(170).bytes(message.result);
        }
        if (message.error !== undefined) {
            writer.uint32(178).string(message.error);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAcknowledgement();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 21:
                    if (tag !== 170) {
                        break;
                    }
                    message.result = reader.bytes();
                    continue;
                case 22:
                    if (tag !== 178) {
                        break;
                    }
                    message.error = reader.string();
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
            result: isSet(object.result) ? bytesFromBase64(object.result) : undefined,
            error: isSet(object.error) ? String(object.error) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== undefined) {
            obj.result = base64FromBytes(message.result);
        }
        if (message.error !== undefined) {
            obj.error = message.error;
        }
        return obj;
    },
    create(base) {
        return Acknowledgement.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAcknowledgement();
        message.result = object.result ?? undefined;
        message.error = object.error ?? undefined;
        return message;
    },
};
function createBaseTimeout() {
    return { height: undefined, timestamp: 0 };
}
export const Timeout = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.height !== undefined) {
            Height.encode(message.height, writer.uint32(10).fork()).ldelim();
        }
        if (message.timestamp !== 0) {
            writer.uint32(16).uint64(message.timestamp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTimeout();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.height = Height.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.timestamp = longToNumber(reader.uint64());
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
            height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
            timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== undefined) {
            obj.height = Height.toJSON(message.height);
        }
        if (message.timestamp !== 0) {
            obj.timestamp = Math.round(message.timestamp);
        }
        return obj;
    },
    create(base) {
        return Timeout.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseTimeout();
        message.height = (object.height !== undefined && object.height !== null)
            ? Height.fromPartial(object.height)
            : undefined;
        message.timestamp = object.timestamp ?? 0;
        return message;
    },
};
function createBaseParams() {
    return { upgradeTimeout: undefined };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.upgradeTimeout !== undefined) {
            Timeout.encode(message.upgradeTimeout, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.upgradeTimeout = Timeout.decode(reader, reader.uint32());
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
        return { upgradeTimeout: isSet(object.upgradeTimeout) ? Timeout.fromJSON(object.upgradeTimeout) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.upgradeTimeout !== undefined) {
            obj.upgradeTimeout = Timeout.toJSON(message.upgradeTimeout);
        }
        return obj;
    },
    create(base) {
        return Params.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.upgradeTimeout = (object.upgradeTimeout !== undefined && object.upgradeTimeout !== null)
            ? Timeout.fromPartial(object.upgradeTimeout)
            : undefined;
        return message;
    },
};
const tsProtoGlobalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = tsProtoGlobalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin.join(""));
    }
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
