/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PacketId } from "../../../core/channel/v1/channel";
import { Fee, PacketFee } from "./fee";
export const protobufPackage = "ibc.applications.fee.v1";
function createBaseMsgRegisterPayee() {
    return { portId: "", channelId: "", relayer: "", payee: "" };
}
export const MsgRegisterPayee = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.relayer !== "") {
            writer.uint32(26).string(message.relayer);
        }
        if (message.payee !== "") {
            writer.uint32(34).string(message.payee);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterPayee();
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
                    if (tag !== 26) {
                        break;
                    }
                    message.relayer = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            relayer: isSet(object.relayer) ? String(object.relayer) : "",
            payee: isSet(object.payee) ? String(object.payee) : "",
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
        if (message.relayer !== "") {
            obj.relayer = message.relayer;
        }
        if (message.payee !== "") {
            obj.payee = message.payee;
        }
        return obj;
    },
    create(base) {
        return MsgRegisterPayee.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgRegisterPayee();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.relayer = object.relayer ?? "";
        message.payee = object.payee ?? "";
        return message;
    },
};
function createBaseMsgRegisterPayeeResponse() {
    return {};
}
export const MsgRegisterPayeeResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterPayeeResponse();
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
        return MsgRegisterPayeeResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgRegisterPayeeResponse();
        return message;
    },
};
function createBaseMsgRegisterCounterpartyPayee() {
    return { portId: "", channelId: "", relayer: "", counterpartyPayee: "" };
}
export const MsgRegisterCounterpartyPayee = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.relayer !== "") {
            writer.uint32(26).string(message.relayer);
        }
        if (message.counterpartyPayee !== "") {
            writer.uint32(34).string(message.counterpartyPayee);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterCounterpartyPayee();
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
                    if (tag !== 26) {
                        break;
                    }
                    message.relayer = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            relayer: isSet(object.relayer) ? String(object.relayer) : "",
            counterpartyPayee: isSet(object.counterpartyPayee) ? String(object.counterpartyPayee) : "",
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
        if (message.relayer !== "") {
            obj.relayer = message.relayer;
        }
        if (message.counterpartyPayee !== "") {
            obj.counterpartyPayee = message.counterpartyPayee;
        }
        return obj;
    },
    create(base) {
        return MsgRegisterCounterpartyPayee.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgRegisterCounterpartyPayee();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.relayer = object.relayer ?? "";
        message.counterpartyPayee = object.counterpartyPayee ?? "";
        return message;
    },
};
function createBaseMsgRegisterCounterpartyPayeeResponse() {
    return {};
}
export const MsgRegisterCounterpartyPayeeResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRegisterCounterpartyPayeeResponse();
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
        return MsgRegisterCounterpartyPayeeResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgRegisterCounterpartyPayeeResponse();
        return message;
    },
};
function createBaseMsgPayPacketFee() {
    return { fee: undefined, sourcePortId: "", sourceChannelId: "", signer: "", relayers: [] };
}
export const MsgPayPacketFee = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.fee !== undefined) {
            Fee.encode(message.fee, writer.uint32(10).fork()).ldelim();
        }
        if (message.sourcePortId !== "") {
            writer.uint32(18).string(message.sourcePortId);
        }
        if (message.sourceChannelId !== "") {
            writer.uint32(26).string(message.sourceChannelId);
        }
        if (message.signer !== "") {
            writer.uint32(34).string(message.signer);
        }
        for (const v of message.relayers) {
            writer.uint32(42).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPayPacketFee();
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
                    message.sourcePortId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.sourceChannelId = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.signer = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
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
            sourcePortId: isSet(object.sourcePortId) ? String(object.sourcePortId) : "",
            sourceChannelId: isSet(object.sourceChannelId) ? String(object.sourceChannelId) : "",
            signer: isSet(object.signer) ? String(object.signer) : "",
            relayers: Array.isArray(object?.relayers) ? object.relayers.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.fee !== undefined) {
            obj.fee = Fee.toJSON(message.fee);
        }
        if (message.sourcePortId !== "") {
            obj.sourcePortId = message.sourcePortId;
        }
        if (message.sourceChannelId !== "") {
            obj.sourceChannelId = message.sourceChannelId;
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        if (message.relayers?.length) {
            obj.relayers = message.relayers;
        }
        return obj;
    },
    create(base) {
        return MsgPayPacketFee.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgPayPacketFee();
        message.fee = (object.fee !== undefined && object.fee !== null) ? Fee.fromPartial(object.fee) : undefined;
        message.sourcePortId = object.sourcePortId ?? "";
        message.sourceChannelId = object.sourceChannelId ?? "";
        message.signer = object.signer ?? "";
        message.relayers = object.relayers?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgPayPacketFeeResponse() {
    return {};
}
export const MsgPayPacketFeeResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPayPacketFeeResponse();
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
        return MsgPayPacketFeeResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgPayPacketFeeResponse();
        return message;
    },
};
function createBaseMsgPayPacketFeeAsync() {
    return { packetId: undefined, packetFee: undefined };
}
export const MsgPayPacketFeeAsync = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packetId !== undefined) {
            PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
        }
        if (message.packetFee !== undefined) {
            PacketFee.encode(message.packetFee, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPayPacketFeeAsync();
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
                    message.packetFee = PacketFee.decode(reader, reader.uint32());
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
            packetFee: isSet(object.packetFee) ? PacketFee.fromJSON(object.packetFee) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.packetId !== undefined) {
            obj.packetId = PacketId.toJSON(message.packetId);
        }
        if (message.packetFee !== undefined) {
            obj.packetFee = PacketFee.toJSON(message.packetFee);
        }
        return obj;
    },
    create(base) {
        return MsgPayPacketFeeAsync.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgPayPacketFeeAsync();
        message.packetId = (object.packetId !== undefined && object.packetId !== null)
            ? PacketId.fromPartial(object.packetId)
            : undefined;
        message.packetFee = (object.packetFee !== undefined && object.packetFee !== null)
            ? PacketFee.fromPartial(object.packetFee)
            : undefined;
        return message;
    },
};
function createBaseMsgPayPacketFeeAsyncResponse() {
    return {};
}
export const MsgPayPacketFeeAsyncResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPayPacketFeeAsyncResponse();
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
        return MsgPayPacketFeeAsyncResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgPayPacketFeeAsyncResponse();
        return message;
    },
};
export const MsgServiceName = "ibc.applications.fee.v1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.RegisterPayee = this.RegisterPayee.bind(this);
        this.RegisterCounterpartyPayee = this.RegisterCounterpartyPayee.bind(this);
        this.PayPacketFee = this.PayPacketFee.bind(this);
        this.PayPacketFeeAsync = this.PayPacketFeeAsync.bind(this);
    }
    RegisterPayee(request) {
        const data = MsgRegisterPayee.encode(request).finish();
        const promise = this.rpc.request(this.service, "RegisterPayee", data);
        return promise.then((data) => MsgRegisterPayeeResponse.decode(_m0.Reader.create(data)));
    }
    RegisterCounterpartyPayee(request) {
        const data = MsgRegisterCounterpartyPayee.encode(request).finish();
        const promise = this.rpc.request(this.service, "RegisterCounterpartyPayee", data);
        return promise.then((data) => MsgRegisterCounterpartyPayeeResponse.decode(_m0.Reader.create(data)));
    }
    PayPacketFee(request) {
        const data = MsgPayPacketFee.encode(request).finish();
        const promise = this.rpc.request(this.service, "PayPacketFee", data);
        return promise.then((data) => MsgPayPacketFeeResponse.decode(_m0.Reader.create(data)));
    }
    PayPacketFeeAsync(request) {
        const data = MsgPayPacketFeeAsync.encode(request).finish();
        const promise = this.rpc.request(this.service, "PayPacketFeeAsync", data);
        return promise.then((data) => MsgPayPacketFeeAsyncResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
