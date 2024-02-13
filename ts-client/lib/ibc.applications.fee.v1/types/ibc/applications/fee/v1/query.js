/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { PacketId } from "../../../core/channel/v1/channel";
import { IdentifiedPacketFees } from "./fee";
import { FeeEnabledChannel } from "./genesis";
export const protobufPackage = "ibc.applications.fee.v1";
function createBaseQueryIncentivizedPacketsRequest() {
    return { pagination: undefined, queryHeight: 0 };
}
export const QueryIncentivizedPacketsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.queryHeight !== 0) {
            writer.uint32(16).uint64(message.queryHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIncentivizedPacketsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.queryHeight = longToNumber(reader.uint64());
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
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
            queryHeight: isSet(object.queryHeight) ? Number(object.queryHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.queryHeight !== 0) {
            obj.queryHeight = Math.round(message.queryHeight);
        }
        return obj;
    },
    create(base) {
        return QueryIncentivizedPacketsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIncentivizedPacketsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.queryHeight = object.queryHeight ?? 0;
        return message;
    },
};
function createBaseQueryIncentivizedPacketsResponse() {
    return { incentivizedPackets: [], pagination: undefined };
}
export const QueryIncentivizedPacketsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.incentivizedPackets) {
            IdentifiedPacketFees.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIncentivizedPacketsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.incentivizedPackets.push(IdentifiedPacketFees.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            incentivizedPackets: Array.isArray(object?.incentivizedPackets)
                ? object.incentivizedPackets.map((e) => IdentifiedPacketFees.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.incentivizedPackets?.length) {
            obj.incentivizedPackets = message.incentivizedPackets.map((e) => IdentifiedPacketFees.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryIncentivizedPacketsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIncentivizedPacketsResponse();
        message.incentivizedPackets = object.incentivizedPackets?.map((e) => IdentifiedPacketFees.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryIncentivizedPacketRequest() {
    return { packetId: undefined, queryHeight: 0 };
}
export const QueryIncentivizedPacketRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packetId !== undefined) {
            PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
        }
        if (message.queryHeight !== 0) {
            writer.uint32(16).uint64(message.queryHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIncentivizedPacketRequest();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.queryHeight = longToNumber(reader.uint64());
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
            queryHeight: isSet(object.queryHeight) ? Number(object.queryHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.packetId !== undefined) {
            obj.packetId = PacketId.toJSON(message.packetId);
        }
        if (message.queryHeight !== 0) {
            obj.queryHeight = Math.round(message.queryHeight);
        }
        return obj;
    },
    create(base) {
        return QueryIncentivizedPacketRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIncentivizedPacketRequest();
        message.packetId = (object.packetId !== undefined && object.packetId !== null)
            ? PacketId.fromPartial(object.packetId)
            : undefined;
        message.queryHeight = object.queryHeight ?? 0;
        return message;
    },
};
function createBaseQueryIncentivizedPacketResponse() {
    return { incentivizedPacket: undefined };
}
export const QueryIncentivizedPacketResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.incentivizedPacket !== undefined) {
            IdentifiedPacketFees.encode(message.incentivizedPacket, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIncentivizedPacketResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.incentivizedPacket = IdentifiedPacketFees.decode(reader, reader.uint32());
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
            incentivizedPacket: isSet(object.incentivizedPacket)
                ? IdentifiedPacketFees.fromJSON(object.incentivizedPacket)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.incentivizedPacket !== undefined) {
            obj.incentivizedPacket = IdentifiedPacketFees.toJSON(message.incentivizedPacket);
        }
        return obj;
    },
    create(base) {
        return QueryIncentivizedPacketResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIncentivizedPacketResponse();
        message.incentivizedPacket = (object.incentivizedPacket !== undefined && object.incentivizedPacket !== null)
            ? IdentifiedPacketFees.fromPartial(object.incentivizedPacket)
            : undefined;
        return message;
    },
};
function createBaseQueryIncentivizedPacketsForChannelRequest() {
    return { pagination: undefined, portId: "", channelId: "", queryHeight: 0 };
}
export const QueryIncentivizedPacketsForChannelRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.portId !== "") {
            writer.uint32(18).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(26).string(message.channelId);
        }
        if (message.queryHeight !== 0) {
            writer.uint32(32).uint64(message.queryHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIncentivizedPacketsForChannelRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.queryHeight = longToNumber(reader.uint64());
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
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            queryHeight: isSet(object.queryHeight) ? Number(object.queryHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.queryHeight !== 0) {
            obj.queryHeight = Math.round(message.queryHeight);
        }
        return obj;
    },
    create(base) {
        return QueryIncentivizedPacketsForChannelRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIncentivizedPacketsForChannelRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.queryHeight = object.queryHeight ?? 0;
        return message;
    },
};
function createBaseQueryIncentivizedPacketsForChannelResponse() {
    return { incentivizedPackets: [], pagination: undefined };
}
export const QueryIncentivizedPacketsForChannelResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.incentivizedPackets) {
            IdentifiedPacketFees.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryIncentivizedPacketsForChannelResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.incentivizedPackets.push(IdentifiedPacketFees.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            incentivizedPackets: Array.isArray(object?.incentivizedPackets)
                ? object.incentivizedPackets.map((e) => IdentifiedPacketFees.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.incentivizedPackets?.length) {
            obj.incentivizedPackets = message.incentivizedPackets.map((e) => IdentifiedPacketFees.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryIncentivizedPacketsForChannelResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryIncentivizedPacketsForChannelResponse();
        message.incentivizedPackets = object.incentivizedPackets?.map((e) => IdentifiedPacketFees.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryTotalRecvFeesRequest() {
    return { packetId: undefined };
}
export const QueryTotalRecvFeesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packetId !== undefined) {
            PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalRecvFeesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.packetId !== undefined) {
            obj.packetId = PacketId.toJSON(message.packetId);
        }
        return obj;
    },
    create(base) {
        return QueryTotalRecvFeesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTotalRecvFeesRequest();
        message.packetId = (object.packetId !== undefined && object.packetId !== null)
            ? PacketId.fromPartial(object.packetId)
            : undefined;
        return message;
    },
};
function createBaseQueryTotalRecvFeesResponse() {
    return { recvFees: [] };
}
export const QueryTotalRecvFeesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.recvFees) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalRecvFeesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.recvFees.push(Coin.decode(reader, reader.uint32()));
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
        return { recvFees: Array.isArray(object?.recvFees) ? object.recvFees.map((e) => Coin.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.recvFees?.length) {
            obj.recvFees = message.recvFees.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryTotalRecvFeesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTotalRecvFeesResponse();
        message.recvFees = object.recvFees?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryTotalAckFeesRequest() {
    return { packetId: undefined };
}
export const QueryTotalAckFeesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packetId !== undefined) {
            PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalAckFeesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.packetId !== undefined) {
            obj.packetId = PacketId.toJSON(message.packetId);
        }
        return obj;
    },
    create(base) {
        return QueryTotalAckFeesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTotalAckFeesRequest();
        message.packetId = (object.packetId !== undefined && object.packetId !== null)
            ? PacketId.fromPartial(object.packetId)
            : undefined;
        return message;
    },
};
function createBaseQueryTotalAckFeesResponse() {
    return { ackFees: [] };
}
export const QueryTotalAckFeesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.ackFees) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalAckFeesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.ackFees.push(Coin.decode(reader, reader.uint32()));
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
        return { ackFees: Array.isArray(object?.ackFees) ? object.ackFees.map((e) => Coin.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.ackFees?.length) {
            obj.ackFees = message.ackFees.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryTotalAckFeesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTotalAckFeesResponse();
        message.ackFees = object.ackFees?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryTotalTimeoutFeesRequest() {
    return { packetId: undefined };
}
export const QueryTotalTimeoutFeesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packetId !== undefined) {
            PacketId.encode(message.packetId, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalTimeoutFeesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { packetId: isSet(object.packetId) ? PacketId.fromJSON(object.packetId) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.packetId !== undefined) {
            obj.packetId = PacketId.toJSON(message.packetId);
        }
        return obj;
    },
    create(base) {
        return QueryTotalTimeoutFeesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTotalTimeoutFeesRequest();
        message.packetId = (object.packetId !== undefined && object.packetId !== null)
            ? PacketId.fromPartial(object.packetId)
            : undefined;
        return message;
    },
};
function createBaseQueryTotalTimeoutFeesResponse() {
    return { timeoutFees: [] };
}
export const QueryTotalTimeoutFeesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.timeoutFees) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTotalTimeoutFeesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.timeoutFees.push(Coin.decode(reader, reader.uint32()));
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
            timeoutFees: Array.isArray(object?.timeoutFees) ? object.timeoutFees.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.timeoutFees?.length) {
            obj.timeoutFees = message.timeoutFees.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryTotalTimeoutFeesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTotalTimeoutFeesResponse();
        message.timeoutFees = object.timeoutFees?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryPayeeRequest() {
    return { channelId: "", relayer: "" };
}
export const QueryPayeeRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        if (message.relayer !== "") {
            writer.uint32(18).string(message.relayer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPayeeRequest();
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
        return obj;
    },
    create(base) {
        return QueryPayeeRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryPayeeRequest();
        message.channelId = object.channelId ?? "";
        message.relayer = object.relayer ?? "";
        return message;
    },
};
function createBaseQueryPayeeResponse() {
    return { payeeAddress: "" };
}
export const QueryPayeeResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.payeeAddress !== "") {
            writer.uint32(10).string(message.payeeAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPayeeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.payeeAddress = reader.string();
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
        return { payeeAddress: isSet(object.payeeAddress) ? String(object.payeeAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.payeeAddress !== "") {
            obj.payeeAddress = message.payeeAddress;
        }
        return obj;
    },
    create(base) {
        return QueryPayeeResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryPayeeResponse();
        message.payeeAddress = object.payeeAddress ?? "";
        return message;
    },
};
function createBaseQueryCounterpartyPayeeRequest() {
    return { channelId: "", relayer: "" };
}
export const QueryCounterpartyPayeeRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        if (message.relayer !== "") {
            writer.uint32(18).string(message.relayer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCounterpartyPayeeRequest();
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
        return obj;
    },
    create(base) {
        return QueryCounterpartyPayeeRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryCounterpartyPayeeRequest();
        message.channelId = object.channelId ?? "";
        message.relayer = object.relayer ?? "";
        return message;
    },
};
function createBaseQueryCounterpartyPayeeResponse() {
    return { counterpartyPayee: "" };
}
export const QueryCounterpartyPayeeResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.counterpartyPayee !== "") {
            writer.uint32(10).string(message.counterpartyPayee);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCounterpartyPayeeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
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
        return { counterpartyPayee: isSet(object.counterpartyPayee) ? String(object.counterpartyPayee) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.counterpartyPayee !== "") {
            obj.counterpartyPayee = message.counterpartyPayee;
        }
        return obj;
    },
    create(base) {
        return QueryCounterpartyPayeeResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryCounterpartyPayeeResponse();
        message.counterpartyPayee = object.counterpartyPayee ?? "";
        return message;
    },
};
function createBaseQueryFeeEnabledChannelsRequest() {
    return { pagination: undefined, queryHeight: 0 };
}
export const QueryFeeEnabledChannelsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        if (message.queryHeight !== 0) {
            writer.uint32(16).uint64(message.queryHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryFeeEnabledChannelsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.queryHeight = longToNumber(reader.uint64());
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
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
            queryHeight: isSet(object.queryHeight) ? Number(object.queryHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        if (message.queryHeight !== 0) {
            obj.queryHeight = Math.round(message.queryHeight);
        }
        return obj;
    },
    create(base) {
        return QueryFeeEnabledChannelsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryFeeEnabledChannelsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        message.queryHeight = object.queryHeight ?? 0;
        return message;
    },
};
function createBaseQueryFeeEnabledChannelsResponse() {
    return { feeEnabledChannels: [], pagination: undefined };
}
export const QueryFeeEnabledChannelsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.feeEnabledChannels) {
            FeeEnabledChannel.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryFeeEnabledChannelsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.feeEnabledChannels.push(FeeEnabledChannel.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            feeEnabledChannels: Array.isArray(object?.feeEnabledChannels)
                ? object.feeEnabledChannels.map((e) => FeeEnabledChannel.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.feeEnabledChannels?.length) {
            obj.feeEnabledChannels = message.feeEnabledChannels.map((e) => FeeEnabledChannel.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryFeeEnabledChannelsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryFeeEnabledChannelsResponse();
        message.feeEnabledChannels = object.feeEnabledChannels?.map((e) => FeeEnabledChannel.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryFeeEnabledChannelRequest() {
    return { portId: "", channelId: "" };
}
export const QueryFeeEnabledChannelRequest = {
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
        const message = createBaseQueryFeeEnabledChannelRequest();
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
        return QueryFeeEnabledChannelRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryFeeEnabledChannelRequest();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        return message;
    },
};
function createBaseQueryFeeEnabledChannelResponse() {
    return { feeEnabled: false };
}
export const QueryFeeEnabledChannelResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.feeEnabled === true) {
            writer.uint32(8).bool(message.feeEnabled);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryFeeEnabledChannelResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.feeEnabled = reader.bool();
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
        return { feeEnabled: isSet(object.feeEnabled) ? Boolean(object.feeEnabled) : false };
    },
    toJSON(message) {
        const obj = {};
        if (message.feeEnabled === true) {
            obj.feeEnabled = message.feeEnabled;
        }
        return obj;
    },
    create(base) {
        return QueryFeeEnabledChannelResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryFeeEnabledChannelResponse();
        message.feeEnabled = object.feeEnabled ?? false;
        return message;
    },
};
export const QueryServiceName = "ibc.applications.fee.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.IncentivizedPackets = this.IncentivizedPackets.bind(this);
        this.IncentivizedPacket = this.IncentivizedPacket.bind(this);
        this.IncentivizedPacketsForChannel = this.IncentivizedPacketsForChannel.bind(this);
        this.TotalRecvFees = this.TotalRecvFees.bind(this);
        this.TotalAckFees = this.TotalAckFees.bind(this);
        this.TotalTimeoutFees = this.TotalTimeoutFees.bind(this);
        this.Payee = this.Payee.bind(this);
        this.CounterpartyPayee = this.CounterpartyPayee.bind(this);
        this.FeeEnabledChannels = this.FeeEnabledChannels.bind(this);
        this.FeeEnabledChannel = this.FeeEnabledChannel.bind(this);
    }
    IncentivizedPackets(request) {
        const data = QueryIncentivizedPacketsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "IncentivizedPackets", data);
        return promise.then((data) => QueryIncentivizedPacketsResponse.decode(_m0.Reader.create(data)));
    }
    IncentivizedPacket(request) {
        const data = QueryIncentivizedPacketRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "IncentivizedPacket", data);
        return promise.then((data) => QueryIncentivizedPacketResponse.decode(_m0.Reader.create(data)));
    }
    IncentivizedPacketsForChannel(request) {
        const data = QueryIncentivizedPacketsForChannelRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "IncentivizedPacketsForChannel", data);
        return promise.then((data) => QueryIncentivizedPacketsForChannelResponse.decode(_m0.Reader.create(data)));
    }
    TotalRecvFees(request) {
        const data = QueryTotalRecvFeesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TotalRecvFees", data);
        return promise.then((data) => QueryTotalRecvFeesResponse.decode(_m0.Reader.create(data)));
    }
    TotalAckFees(request) {
        const data = QueryTotalAckFeesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TotalAckFees", data);
        return promise.then((data) => QueryTotalAckFeesResponse.decode(_m0.Reader.create(data)));
    }
    TotalTimeoutFees(request) {
        const data = QueryTotalTimeoutFeesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TotalTimeoutFees", data);
        return promise.then((data) => QueryTotalTimeoutFeesResponse.decode(_m0.Reader.create(data)));
    }
    Payee(request) {
        const data = QueryPayeeRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Payee", data);
        return promise.then((data) => QueryPayeeResponse.decode(_m0.Reader.create(data)));
    }
    CounterpartyPayee(request) {
        const data = QueryCounterpartyPayeeRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "CounterpartyPayee", data);
        return promise.then((data) => QueryCounterpartyPayeeResponse.decode(_m0.Reader.create(data)));
    }
    FeeEnabledChannels(request) {
        const data = QueryFeeEnabledChannelsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "FeeEnabledChannels", data);
        return promise.then((data) => QueryFeeEnabledChannelsResponse.decode(_m0.Reader.create(data)));
    }
    FeeEnabledChannel(request) {
        const data = QueryFeeEnabledChannelRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "FeeEnabledChannel", data);
        return promise.then((data) => QueryFeeEnabledChannelResponse.decode(_m0.Reader.create(data)));
    }
}
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
