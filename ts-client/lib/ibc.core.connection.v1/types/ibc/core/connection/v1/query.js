/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { Height, IdentifiedClientState } from "../../client/v1/client";
import { ConnectionEnd, IdentifiedConnection, Params } from "./connection";
export const protobufPackage = "ibc.core.connection.v1";
function createBaseQueryConnectionRequest() {
    return { connectionId: "" };
}
export const QueryConnectionRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConnectionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.connectionId = reader.string();
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
        return { connectionId: isSet(object.connectionId) ? String(object.connectionId) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.connectionId !== "") {
            obj.connectionId = message.connectionId;
        }
        return obj;
    },
    create(base) {
        return QueryConnectionRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionRequest();
        message.connectionId = object.connectionId ?? "";
        return message;
    },
};
function createBaseQueryConnectionResponse() {
    return { connection: undefined, proof: new Uint8Array(0), proofHeight: undefined };
}
export const QueryConnectionResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.connection !== undefined) {
            ConnectionEnd.encode(message.connection, writer.uint32(10).fork()).ldelim();
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
        const message = createBaseQueryConnectionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.connection = ConnectionEnd.decode(reader, reader.uint32());
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
            connection: isSet(object.connection) ? ConnectionEnd.fromJSON(object.connection) : undefined,
            proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.connection !== undefined) {
            obj.connection = ConnectionEnd.toJSON(message.connection);
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
        return QueryConnectionResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionResponse();
        message.connection = (object.connection !== undefined && object.connection !== null)
            ? ConnectionEnd.fromPartial(object.connection)
            : undefined;
        message.proof = object.proof ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        return message;
    },
};
function createBaseQueryConnectionsRequest() {
    return { pagination: undefined };
}
export const QueryConnectionsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConnectionsRequest();
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
        return QueryConnectionsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryConnectionsResponse() {
    return { connections: [], pagination: undefined, height: undefined };
}
export const QueryConnectionsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.connections) {
            IdentifiedConnection.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConnectionsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.connections.push(IdentifiedConnection.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.height = Height.decode(reader, reader.uint32());
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
            connections: Array.isArray(object?.connections)
                ? object.connections.map((e) => IdentifiedConnection.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
            height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.connections?.length) {
            obj.connections = message.connections.map((e) => IdentifiedConnection.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        if (message.height !== undefined) {
            obj.height = Height.toJSON(message.height);
        }
        return obj;
    },
    create(base) {
        return QueryConnectionsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionsResponse();
        message.connections = object.connections?.map((e) => IdentifiedConnection.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        message.height = (object.height !== undefined && object.height !== null)
            ? Height.fromPartial(object.height)
            : undefined;
        return message;
    },
};
function createBaseQueryClientConnectionsRequest() {
    return { clientId: "" };
}
export const QueryClientConnectionsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryClientConnectionsRequest();
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
        return QueryClientConnectionsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientConnectionsRequest();
        message.clientId = object.clientId ?? "";
        return message;
    },
};
function createBaseQueryClientConnectionsResponse() {
    return { connectionPaths: [], proof: new Uint8Array(0), proofHeight: undefined };
}
export const QueryClientConnectionsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.connectionPaths) {
            writer.uint32(10).string(v);
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
        const message = createBaseQueryClientConnectionsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.connectionPaths.push(reader.string());
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
            connectionPaths: Array.isArray(object?.connectionPaths) ? object.connectionPaths.map((e) => String(e)) : [],
            proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.connectionPaths?.length) {
            obj.connectionPaths = message.connectionPaths;
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
        return QueryClientConnectionsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryClientConnectionsResponse();
        message.connectionPaths = object.connectionPaths?.map((e) => e) || [];
        message.proof = object.proof ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        return message;
    },
};
function createBaseQueryConnectionClientStateRequest() {
    return { connectionId: "" };
}
export const QueryConnectionClientStateRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConnectionClientStateRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.connectionId = reader.string();
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
        return { connectionId: isSet(object.connectionId) ? String(object.connectionId) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.connectionId !== "") {
            obj.connectionId = message.connectionId;
        }
        return obj;
    },
    create(base) {
        return QueryConnectionClientStateRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionClientStateRequest();
        message.connectionId = object.connectionId ?? "";
        return message;
    },
};
function createBaseQueryConnectionClientStateResponse() {
    return { identifiedClientState: undefined, proof: new Uint8Array(0), proofHeight: undefined };
}
export const QueryConnectionClientStateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.identifiedClientState !== undefined) {
            IdentifiedClientState.encode(message.identifiedClientState, writer.uint32(10).fork()).ldelim();
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
        const message = createBaseQueryConnectionClientStateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.identifiedClientState = IdentifiedClientState.decode(reader, reader.uint32());
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
            identifiedClientState: isSet(object.identifiedClientState)
                ? IdentifiedClientState.fromJSON(object.identifiedClientState)
                : undefined,
            proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.identifiedClientState !== undefined) {
            obj.identifiedClientState = IdentifiedClientState.toJSON(message.identifiedClientState);
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
        return QueryConnectionClientStateResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionClientStateResponse();
        message.identifiedClientState =
            (object.identifiedClientState !== undefined && object.identifiedClientState !== null)
                ? IdentifiedClientState.fromPartial(object.identifiedClientState)
                : undefined;
        message.proof = object.proof ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        return message;
    },
};
function createBaseQueryConnectionConsensusStateRequest() {
    return { connectionId: "", revisionNumber: 0, revisionHeight: 0 };
}
export const QueryConnectionConsensusStateRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
        }
        if (message.revisionNumber !== 0) {
            writer.uint32(16).uint64(message.revisionNumber);
        }
        if (message.revisionHeight !== 0) {
            writer.uint32(24).uint64(message.revisionHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConnectionConsensusStateRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.connectionId = reader.string();
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
            connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
            revisionNumber: isSet(object.revisionNumber) ? Number(object.revisionNumber) : 0,
            revisionHeight: isSet(object.revisionHeight) ? Number(object.revisionHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.connectionId !== "") {
            obj.connectionId = message.connectionId;
        }
        if (message.revisionNumber !== 0) {
            obj.revisionNumber = Math.round(message.revisionNumber);
        }
        if (message.revisionHeight !== 0) {
            obj.revisionHeight = Math.round(message.revisionHeight);
        }
        return obj;
    },
    create(base) {
        return QueryConnectionConsensusStateRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionConsensusStateRequest();
        message.connectionId = object.connectionId ?? "";
        message.revisionNumber = object.revisionNumber ?? 0;
        message.revisionHeight = object.revisionHeight ?? 0;
        return message;
    },
};
function createBaseQueryConnectionConsensusStateResponse() {
    return { consensusState: undefined, clientId: "", proof: new Uint8Array(0), proofHeight: undefined };
}
export const QueryConnectionConsensusStateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.consensusState !== undefined) {
            Any.encode(message.consensusState, writer.uint32(10).fork()).ldelim();
        }
        if (message.clientId !== "") {
            writer.uint32(18).string(message.clientId);
        }
        if (message.proof.length !== 0) {
            writer.uint32(26).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConnectionConsensusStateResponse();
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
                    message.clientId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proof = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            proof: isSet(object.proof) ? bytesFromBase64(object.proof) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.consensusState !== undefined) {
            obj.consensusState = Any.toJSON(message.consensusState);
        }
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
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
        return QueryConnectionConsensusStateResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionConsensusStateResponse();
        message.consensusState = (object.consensusState !== undefined && object.consensusState !== null)
            ? Any.fromPartial(object.consensusState)
            : undefined;
        message.clientId = object.clientId ?? "";
        message.proof = object.proof ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        return message;
    },
};
function createBaseQueryConnectionParamsRequest() {
    return {};
}
export const QueryConnectionParamsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConnectionParamsRequest();
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
        return QueryConnectionParamsRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryConnectionParamsRequest();
        return message;
    },
};
function createBaseQueryConnectionParamsResponse() {
    return { params: undefined };
}
export const QueryConnectionParamsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConnectionParamsResponse();
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
        return QueryConnectionParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConnectionParamsResponse();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
export const QueryServiceName = "ibc.core.connection.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.Connection = this.Connection.bind(this);
        this.Connections = this.Connections.bind(this);
        this.ClientConnections = this.ClientConnections.bind(this);
        this.ConnectionClientState = this.ConnectionClientState.bind(this);
        this.ConnectionConsensusState = this.ConnectionConsensusState.bind(this);
        this.ConnectionParams = this.ConnectionParams.bind(this);
    }
    Connection(request) {
        const data = QueryConnectionRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Connection", data);
        return promise.then((data) => QueryConnectionResponse.decode(_m0.Reader.create(data)));
    }
    Connections(request) {
        const data = QueryConnectionsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Connections", data);
        return promise.then((data) => QueryConnectionsResponse.decode(_m0.Reader.create(data)));
    }
    ClientConnections(request) {
        const data = QueryClientConnectionsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ClientConnections", data);
        return promise.then((data) => QueryClientConnectionsResponse.decode(_m0.Reader.create(data)));
    }
    ConnectionClientState(request) {
        const data = QueryConnectionClientStateRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConnectionClientState", data);
        return promise.then((data) => QueryConnectionClientStateResponse.decode(_m0.Reader.create(data)));
    }
    ConnectionConsensusState(request) {
        const data = QueryConnectionConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConnectionConsensusState", data);
        return promise.then((data) => QueryConnectionConsensusStateResponse.decode(_m0.Reader.create(data)));
    }
    ConnectionParams(request) {
        const data = QueryConnectionParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConnectionParams", data);
        return promise.then((data) => QueryConnectionParamsResponse.decode(_m0.Reader.create(data)));
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
