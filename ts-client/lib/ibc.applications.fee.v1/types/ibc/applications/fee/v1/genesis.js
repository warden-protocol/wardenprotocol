/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PacketId } from "../../../core/channel/v1/channel";
import { IdentifiedPacketFees } from "./fee";
export const protobufPackage = "ibc.applications.fee.v1";
function createBaseGenesisState() {
    return {
        identifiedFees: [],
        feeEnabledChannels: [],
        registeredPayees: [],
        registeredCounterpartyPayees: [],
        forwardRelayers: [],
    };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.identifiedFees) {
            IdentifiedPacketFees.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.feeEnabledChannels) {
            FeeEnabledChannel.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.registeredPayees) {
            RegisteredPayee.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.registeredCounterpartyPayees) {
            RegisteredCounterpartyPayee.encode(v, writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.forwardRelayers) {
            ForwardRelayerAddress.encode(v, writer.uint32(42).fork()).ldelim();
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
                    message.identifiedFees.push(IdentifiedPacketFees.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.feeEnabledChannels.push(FeeEnabledChannel.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.registeredPayees.push(RegisteredPayee.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.registeredCounterpartyPayees.push(RegisteredCounterpartyPayee.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.forwardRelayers.push(ForwardRelayerAddress.decode(reader, reader.uint32()));
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
            identifiedFees: Array.isArray(object?.identifiedFees)
                ? object.identifiedFees.map((e) => IdentifiedPacketFees.fromJSON(e))
                : [],
            feeEnabledChannels: Array.isArray(object?.feeEnabledChannels)
                ? object.feeEnabledChannels.map((e) => FeeEnabledChannel.fromJSON(e))
                : [],
            registeredPayees: Array.isArray(object?.registeredPayees)
                ? object.registeredPayees.map((e) => RegisteredPayee.fromJSON(e))
                : [],
            registeredCounterpartyPayees: Array.isArray(object?.registeredCounterpartyPayees)
                ? object.registeredCounterpartyPayees.map((e) => RegisteredCounterpartyPayee.fromJSON(e))
                : [],
            forwardRelayers: Array.isArray(object?.forwardRelayers)
                ? object.forwardRelayers.map((e) => ForwardRelayerAddress.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.identifiedFees?.length) {
            obj.identifiedFees = message.identifiedFees.map((e) => IdentifiedPacketFees.toJSON(e));
        }
        if (message.feeEnabledChannels?.length) {
            obj.feeEnabledChannels = message.feeEnabledChannels.map((e) => FeeEnabledChannel.toJSON(e));
        }
        if (message.registeredPayees?.length) {
            obj.registeredPayees = message.registeredPayees.map((e) => RegisteredPayee.toJSON(e));
        }
        if (message.registeredCounterpartyPayees?.length) {
            obj.registeredCounterpartyPayees = message.registeredCounterpartyPayees.map((e) => RegisteredCounterpartyPayee.toJSON(e));
        }
        if (message.forwardRelayers?.length) {
            obj.forwardRelayers = message.forwardRelayers.map((e) => ForwardRelayerAddress.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.identifiedFees = object.identifiedFees?.map((e) => IdentifiedPacketFees.fromPartial(e)) || [];
        message.feeEnabledChannels = object.feeEnabledChannels?.map((e) => FeeEnabledChannel.fromPartial(e)) || [];
        message.registeredPayees = object.registeredPayees?.map((e) => RegisteredPayee.fromPartial(e)) || [];
        message.registeredCounterpartyPayees =
            object.registeredCounterpartyPayees?.map((e) => RegisteredCounterpartyPayee.fromPartial(e)) || [];
        message.forwardRelayers = object.forwardRelayers?.map((e) => ForwardRelayerAddress.fromPartial(e)) || [];
        return message;
    },
};
function createBaseFeeEnabledChannel() {
    return { portId: "", channelId: "" };
}
export const FeeEnabledChannel = {
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
        const message = createBaseFeeEnabledChannel();
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
        return FeeEnabledChannel.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseFeeEnabledChannel();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        return message;
    },
};
function createBaseRegisteredPayee() {
    return { channelId: "", relayer: "", payee: "" };
}
export const RegisteredPayee = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        if (message.relayer !== "") {
            writer.uint32(18).string(message.relayer);
        }
        if (message.payee !== "") {
            writer.uint32(26).string(message.payee);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRegisteredPayee();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.relayer = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.payee = reader.string();
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
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            relayer: isSet(object.relayer) ? String(object.relayer) : "",
            payee: isSet(object.payee) ? String(object.payee) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.relayer !== "") {
            obj.relayer = message.relayer;
        }
        if (message.payee !== "") {
            obj.payee = message.payee;
        }
        return obj;
    },
    create(base) {
        return RegisteredPayee.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseRegisteredPayee();
        message.channelId = object.channelId ?? "";
        message.relayer = object.relayer ?? "";
        message.payee = object.payee ?? "";
        return message;
    },
};
function createBaseRegisteredCounterpartyPayee() {
    return { channelId: "", relayer: "", counterpartyPayee: "" };
}
export const RegisteredCounterpartyPayee = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        if (message.relayer !== "") {
            writer.uint32(18).string(message.relayer);
        }
        if (message.counterpartyPayee !== "") {
            writer.uint32(26).string(message.counterpartyPayee);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRegisteredCounterpartyPayee();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.relayer = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.counterpartyPayee = reader.string();
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
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            relayer: isSet(object.relayer) ? String(object.relayer) : "",
            counterpartyPayee: isSet(object.counterpartyPayee) ? String(object.counterpartyPayee) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.relayer !== "") {
            obj.relayer = message.relayer;
        }
        if (message.counterpartyPayee !== "") {
            obj.counterpartyPayee = message.counterpartyPayee;
        }
        return obj;
    },
    create(base) {
        return RegisteredCounterpartyPayee.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseRegisteredCounterpartyPayee();
        message.channelId = object.channelId ?? "";
        message.relayer = object.relayer ?? "";
        message.counterpartyPayee = object.counterpartyPayee ?? "";
        return message;
    },
};
function createBaseForwardRelayerAddress() {
    return { address: "", packetId: undefined };
}
export const ForwardRelayerAddress = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.packetId !== undefined) {
            PacketId.encode(message.packetId, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseForwardRelayerAddress();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.packetId = PacketId.decode(reader, reader.uint32());
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
            address: isSet(object.address) ? String(object.address) : "",
            packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.packetId !== undefined) {
            obj.packetId = PacketId.toJSON(message.packetId);
        }
        return obj;
    },
    create(base) {
        return ForwardRelayerAddress.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseForwardRelayerAddress();
        message.address = object.address ?? "";
        message.packetId = (object.packetId !== undefined && object.packetId !== null)
            ? PacketId.fromPartial(object.packetId)
            : undefined;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
