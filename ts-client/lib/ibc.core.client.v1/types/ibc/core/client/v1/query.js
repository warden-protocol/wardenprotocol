/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { ConsensusStateWithHeight, Height, IdentifiedClientState, Params } from "./client";
export const protobufPackage = "ibc.core.client.v1";
function createBaseQueryClientStateRequest() {
    return { clientId: "" };
}
export const QueryClientStateRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientStateRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
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
        return { clientId: isSet(object.clientId) ? String(object.clientId) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        return obj;
    },
    create(base) {
        return QueryClientStateRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientStateRequest();
        message.clientId = object.clientId ?? "";
        return message;
    },
};
function createBaseQueryClientStateResponse() {
    return { clientState: undefined, proof: new Uint8Array(0), proofHeight: undefined };
}
export const QueryClientStateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientState !== undefined) {
            Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientStateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientState = Any.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.proof = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
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
            clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
            proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientState !== undefined) {
            obj.clientState = Any.toJSON(message.clientState);
        }
        if (message.proof.length !== 0) {
            obj.proof = base64FromBytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        return obj;
    },
    create(base) {
        return QueryClientStateResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientStateResponse();
        message.clientState = (object.clientState !== undefined && object.clientState !== null)
            ? Any.fromPartial(object.clientState)
            : undefined;
        message.proof = object.proof ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        return message;
    },
};
function createBaseQueryClientStatesRequest() {
    return { pagination: undefined };
}
export const QueryClientStatesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientStatesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryClientStatesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientStatesRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryClientStatesResponse() {
    return { clientStates: [], pagination: undefined };
}
export const QueryClientStatesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.clientStates) {
            IdentifiedClientState.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientStatesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientStates.push(IdentifiedClientState.decode(reader, reader.uint32()));
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
            clientStates: Array.isArray(object?.clientStates)
                ? object.clientStates.map((e) => IdentifiedClientState.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientStates?.length) {
            obj.clientStates = message.clientStates.map((e) => IdentifiedClientState.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryClientStatesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientStatesResponse();
        message.clientStates = object.clientStates?.map((e) => IdentifiedClientState.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryConsensusStateRequest() {
    return { clientId: "", revisionNumber: 0, revisionHeight: 0, latestHeight: false };
}
export const QueryConsensusStateRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.revisionNumber !== 0) {
            writer.uint32(16).uint64(message.revisionNumber);
        }
        if (message.revisionHeight !== 0) {
            writer.uint32(24).uint64(message.revisionHeight);
        }
        if (message.latestHeight === true) {
            writer.uint32(32).bool(message.latestHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConsensusStateRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.revisionNumber = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.revisionHeight = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.latestHeight = reader.bool();
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            revisionNumber: isSet(object.revisionNumber) ? Number(object.revisionNumber) : 0,
            revisionHeight: isSet(object.revisionHeight) ? Number(object.revisionHeight) : 0,
            latestHeight: isSet(object.latestHeight) ? Boolean(object.latestHeight) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.revisionNumber !== 0) {
            obj.revisionNumber = Math.round(message.revisionNumber);
        }
        if (message.revisionHeight !== 0) {
            obj.revisionHeight = Math.round(message.revisionHeight);
        }
        if (message.latestHeight === true) {
            obj.latestHeight = message.latestHeight;
        }
        return obj;
    },
    create(base) {
        return QueryConsensusStateRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConsensusStateRequest();
        message.clientId = object.clientId ?? "";
        message.revisionNumber = object.revisionNumber ?? 0;
        message.revisionHeight = object.revisionHeight ?? 0;
        message.latestHeight = object.latestHeight ?? false;
        return message;
    },
};
function createBaseQueryConsensusStateResponse() {
    return { consensusState: undefined, proof: new Uint8Array(0), proofHeight: undefined };
}
export const QueryConsensusStateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.consensusState !== undefined) {
            Any.encode(message.consensusState, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConsensusStateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.consensusState = Any.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.proof = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
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
            consensusState: isSet(object.consensusState) ? Any.fromJSON(object.consensusState) : undefined,
            proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.consensusState !== undefined) {
            obj.consensusState = Any.toJSON(message.consensusState);
        }
        if (message.proof.length !== 0) {
            obj.proof = base64FromBytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        return obj;
    },
    create(base) {
        return QueryConsensusStateResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConsensusStateResponse();
        message.consensusState = (object.consensusState !== undefined && object.consensusState !== null)
            ? Any.fromPartial(object.consensusState)
            : undefined;
        message.proof = object.proof ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        return message;
    },
};
function createBaseQueryConsensusStatesRequest() {
    return { clientId: "", pagination: undefined };
}
export const QueryConsensusStatesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConsensusStatesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryConsensusStatesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConsensusStatesRequest();
        message.clientId = object.clientId ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryConsensusStatesResponse() {
    return { consensusStates: [], pagination: undefined };
}
export const QueryConsensusStatesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.consensusStates) {
            ConsensusStateWithHeight.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConsensusStatesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.consensusStates.push(ConsensusStateWithHeight.decode(reader, reader.uint32()));
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
            consensusStates: Array.isArray(object?.consensusStates)
                ? object.consensusStates.map((e) => ConsensusStateWithHeight.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.consensusStates?.length) {
            obj.consensusStates = message.consensusStates.map((e) => ConsensusStateWithHeight.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryConsensusStatesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConsensusStatesResponse();
        message.consensusStates = object.consensusStates?.map((e) => ConsensusStateWithHeight.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryConsensusStateHeightsRequest() {
    return { clientId: "", pagination: undefined };
}
export const QueryConsensusStateHeightsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConsensusStateHeightsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryConsensusStateHeightsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConsensusStateHeightsRequest();
        message.clientId = object.clientId ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryConsensusStateHeightsResponse() {
    return { consensusStateHeights: [], pagination: undefined };
}
export const QueryConsensusStateHeightsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.consensusStateHeights) {
            Height.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConsensusStateHeightsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.consensusStateHeights.push(Height.decode(reader, reader.uint32()));
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
            consensusStateHeights: Array.isArray(object?.consensusStateHeights)
                ? object.consensusStateHeights.map((e) => Height.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.consensusStateHeights?.length) {
            obj.consensusStateHeights = message.consensusStateHeights.map((e) => Height.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryConsensusStateHeightsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConsensusStateHeightsResponse();
        message.consensusStateHeights = object.consensusStateHeights?.map((e) => Height.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryClientStatusRequest() {
    return { clientId: "" };
}
export const QueryClientStatusRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientStatusRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
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
        return { clientId: isSet(object.clientId) ? String(object.clientId) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        return obj;
    },
    create(base) {
        return QueryClientStatusRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientStatusRequest();
        message.clientId = object.clientId ?? "";
        return message;
    },
};
function createBaseQueryClientStatusResponse() {
    return { status: "" };
}
export const QueryClientStatusResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.status !== "") {
            writer.uint32(10).string(message.status);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientStatusResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.status = reader.string();
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
        return { status: isSet(object.status) ? String(object.status) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.status !== "") {
            obj.status = message.status;
        }
        return obj;
    },
    create(base) {
        return QueryClientStatusResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientStatusResponse();
        message.status = object.status ?? "";
        return message;
    },
};
function createBaseQueryClientParamsRequest() {
    return {};
}
export const QueryClientParamsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientParamsRequest();
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
        return QueryClientParamsRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryClientParamsRequest();
        return message;
    },
};
function createBaseQueryClientParamsResponse() {
    return { params: undefined };
}
export const QueryClientParamsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.params = Params.decode(reader, reader.uint32());
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
        return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return QueryClientParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientParamsResponse();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseQueryUpgradedClientStateRequest() {
    return {};
}
export const QueryUpgradedClientStateRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUpgradedClientStateRequest();
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
        return QueryUpgradedClientStateRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryUpgradedClientStateRequest();
        return message;
    },
};
function createBaseQueryUpgradedClientStateResponse() {
    return { upgradedClientState: undefined };
}
export const QueryUpgradedClientStateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.upgradedClientState !== undefined) {
            Any.encode(message.upgradedClientState, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUpgradedClientStateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.upgradedClientState = Any.decode(reader, reader.uint32());
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
            upgradedClientState: isSet(object.upgradedClientState) ? Any.fromJSON(object.upgradedClientState) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.upgradedClientState !== undefined) {
            obj.upgradedClientState = Any.toJSON(message.upgradedClientState);
        }
        return obj;
    },
    create(base) {
        return QueryUpgradedClientStateResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryUpgradedClientStateResponse();
        message.upgradedClientState = (object.upgradedClientState !== undefined && object.upgradedClientState !== null)
            ? Any.fromPartial(object.upgradedClientState)
            : undefined;
        return message;
    },
};
function createBaseQueryUpgradedConsensusStateRequest() {
    return {};
}
export const QueryUpgradedConsensusStateRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUpgradedConsensusStateRequest();
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
        return QueryUpgradedConsensusStateRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryUpgradedConsensusStateRequest();
        return message;
    },
};
function createBaseQueryUpgradedConsensusStateResponse() {
    return { upgradedConsensusState: undefined };
}
export const QueryUpgradedConsensusStateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.upgradedConsensusState !== undefined) {
            Any.encode(message.upgradedConsensusState, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryUpgradedConsensusStateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.upgradedConsensusState = Any.decode(reader, reader.uint32());
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
            upgradedConsensusState: isSet(object.upgradedConsensusState)
                ? Any.fromJSON(object.upgradedConsensusState)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.upgradedConsensusState !== undefined) {
            obj.upgradedConsensusState = Any.toJSON(message.upgradedConsensusState);
        }
        return obj;
    },
    create(base) {
        return QueryUpgradedConsensusStateResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryUpgradedConsensusStateResponse();
        message.upgradedConsensusState =
            (object.upgradedConsensusState !== undefined && object.upgradedConsensusState !== null)
                ? Any.fromPartial(object.upgradedConsensusState)
                : undefined;
        return message;
    },
};
export const QueryServiceName = "ibc.core.client.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.ClientState = this.ClientState.bind(this);
        this.ClientStates = this.ClientStates.bind(this);
        this.ConsensusState = this.ConsensusState.bind(this);
        this.ConsensusStates = this.ConsensusStates.bind(this);
        this.ConsensusStateHeights = this.ConsensusStateHeights.bind(this);
        this.ClientStatus = this.ClientStatus.bind(this);
        this.ClientParams = this.ClientParams.bind(this);
        this.UpgradedClientState = this.UpgradedClientState.bind(this);
        this.UpgradedConsensusState = this.UpgradedConsensusState.bind(this);
    }
    ClientState(request) {
        const data = QueryClientStateRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ClientState", data);
        return promise.then((data) => QueryClientStateResponse.decode(_m0.Reader.create(data)));
    }
    ClientStates(request) {
        const data = QueryClientStatesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ClientStates", data);
        return promise.then((data) => QueryClientStatesResponse.decode(_m0.Reader.create(data)));
    }
    ConsensusState(request) {
        const data = QueryConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConsensusState", data);
        return promise.then((data) => QueryConsensusStateResponse.decode(_m0.Reader.create(data)));
    }
    ConsensusStates(request) {
        const data = QueryConsensusStatesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConsensusStates", data);
        return promise.then((data) => QueryConsensusStatesResponse.decode(_m0.Reader.create(data)));
    }
    ConsensusStateHeights(request) {
        const data = QueryConsensusStateHeightsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConsensusStateHeights", data);
        return promise.then((data) => QueryConsensusStateHeightsResponse.decode(_m0.Reader.create(data)));
    }
    ClientStatus(request) {
        const data = QueryClientStatusRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ClientStatus", data);
        return promise.then((data) => QueryClientStatusResponse.decode(_m0.Reader.create(data)));
    }
    ClientParams(request) {
        const data = QueryClientParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ClientParams", data);
        return promise.then((data) => QueryClientParamsResponse.decode(_m0.Reader.create(data)));
    }
    UpgradedClientState(request) {
        const data = QueryUpgradedClientStateRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpgradedClientState", data);
        return promise.then((data) => QueryUpgradedClientStateResponse.decode(_m0.Reader.create(data)));
    }
    UpgradedConsensusState(request) {
        const data = QueryUpgradedConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpgradedConsensusState", data);
        return promise.then((data) => QueryUpgradedConsensusStateResponse.decode(_m0.Reader.create(data)));
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
