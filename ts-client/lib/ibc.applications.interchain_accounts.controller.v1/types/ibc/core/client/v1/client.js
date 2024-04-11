/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Plan } from "../../../../cosmos/upgrade/v1beta1/upgrade";
import { Any } from "../../../../google/protobuf/any";
export const protobufPackage = "ibc.core.client.v1";
function createBaseIdentifiedClientState() {
    return { clientId: "", clientState: undefined };
}
export const IdentifiedClientState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.clientState !== undefined) {
            Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentifiedClientState();
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
                    message.clientState = Any.decode(reader, reader.uint32());
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
            clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.clientState !== undefined) {
            obj.clientState = Any.toJSON(message.clientState);
        }
        return obj;
    },
    create(base) {
        return IdentifiedClientState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIdentifiedClientState();
        message.clientId = object.clientId ?? "";
        message.clientState = (object.clientState !== undefined && object.clientState !== null)
            ? Any.fromPartial(object.clientState)
            : undefined;
        return message;
    },
};
function createBaseConsensusStateWithHeight() {
    return { height: undefined, consensusState: undefined };
}
export const ConsensusStateWithHeight = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.height !== undefined) {
            Height.encode(message.height, writer.uint32(10).fork()).ldelim();
        }
        if (message.consensusState !== undefined) {
            Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConsensusStateWithHeight();
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
                    if (tag !== 18) {
                        break;
                    }
                    message.consensusState = Any.decode(reader, reader.uint32());
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
            consensusState: isSet(object.consensusState) ? Any.fromJSON(object.consensusState) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.height !== undefined) {
            obj.height = Height.toJSON(message.height);
        }
        if (message.consensusState !== undefined) {
            obj.consensusState = Any.toJSON(message.consensusState);
        }
        return obj;
    },
    create(base) {
        return ConsensusStateWithHeight.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseConsensusStateWithHeight();
        message.height = (object.height !== undefined && object.height !== null)
            ? Height.fromPartial(object.height)
            : undefined;
        message.consensusState = (object.consensusState !== undefined && object.consensusState !== null)
            ? Any.fromPartial(object.consensusState)
            : undefined;
        return message;
    },
};
function createBaseClientConsensusStates() {
    return { clientId: "", consensusStates: [] };
}
export const ClientConsensusStates = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        for (const v of message.consensusStates) {
            ConsensusStateWithHeight.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClientConsensusStates();
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
                    message.consensusStates.push(ConsensusStateWithHeight.decode(reader, reader.uint32()));
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
            consensusStates: Array.isArray(object?.consensusStates)
                ? object.consensusStates.map((e) => ConsensusStateWithHeight.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.consensusStates?.length) {
            obj.consensusStates = message.consensusStates.map((e) => ConsensusStateWithHeight.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ClientConsensusStates.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseClientConsensusStates();
        message.clientId = object.clientId ?? "";
        message.consensusStates = object.consensusStates?.map((e) => ConsensusStateWithHeight.fromPartial(e)) || [];
        return message;
    },
};
function createBaseHeight() {
    return { revisionNumber: 0, revisionHeight: 0 };
}
export const Height = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.revisionNumber !== 0) {
            writer.uint32(8).uint64(message.revisionNumber);
        }
        if (message.revisionHeight !== 0) {
            writer.uint32(16).uint64(message.revisionHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHeight();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.revisionNumber = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
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
            revisionNumber: isSet(object.revisionNumber) ? Number(object.revisionNumber) : 0,
            revisionHeight: isSet(object.revisionHeight) ? Number(object.revisionHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.revisionNumber !== 0) {
            obj.revisionNumber = Math.round(message.revisionNumber);
        }
        if (message.revisionHeight !== 0) {
            obj.revisionHeight = Math.round(message.revisionHeight);
        }
        return obj;
    },
    create(base) {
        return Height.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseHeight();
        message.revisionNumber = object.revisionNumber ?? 0;
        message.revisionHeight = object.revisionHeight ?? 0;
        return message;
    },
};
function createBaseParams() {
    return { allowedClients: [] };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.allowedClients) {
            writer.uint32(10).string(v);
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
                    message.allowedClients.push(reader.string());
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
            allowedClients: Array.isArray(object?.allowedClients) ? object.allowedClients.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.allowedClients?.length) {
            obj.allowedClients = message.allowedClients;
        }
        return obj;
    },
    create(base) {
        return Params.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.allowedClients = object.allowedClients?.map((e) => e) || [];
        return message;
    },
};
function createBaseClientUpdateProposal() {
    return { title: "", description: "", subjectClientId: "", substituteClientId: "" };
}
export const ClientUpdateProposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        if (message.subjectClientId !== "") {
            writer.uint32(26).string(message.subjectClientId);
        }
        if (message.substituteClientId !== "") {
            writer.uint32(34).string(message.substituteClientId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClientUpdateProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.title = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.description = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.subjectClientId = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.substituteClientId = reader.string();
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
            title: isSet(object.title) ? String(object.title) : "",
            description: isSet(object.description) ? String(object.description) : "",
            subjectClientId: isSet(object.subjectClientId) ? String(object.subjectClientId) : "",
            substituteClientId: isSet(object.substituteClientId) ? String(object.substituteClientId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.title !== "") {
            obj.title = message.title;
        }
        if (message.description !== "") {
            obj.description = message.description;
        }
        if (message.subjectClientId !== "") {
            obj.subjectClientId = message.subjectClientId;
        }
        if (message.substituteClientId !== "") {
            obj.substituteClientId = message.substituteClientId;
        }
        return obj;
    },
    create(base) {
        return ClientUpdateProposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseClientUpdateProposal();
        message.title = object.title ?? "";
        message.description = object.description ?? "";
        message.subjectClientId = object.subjectClientId ?? "";
        message.substituteClientId = object.substituteClientId ?? "";
        return message;
    },
};
function createBaseUpgradeProposal() {
    return { title: "", description: "", plan: undefined, upgradedClientState: undefined };
}
export const UpgradeProposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        if (message.plan !== undefined) {
            Plan.encode(message.plan, writer.uint32(26).fork()).ldelim();
        }
        if (message.upgradedClientState !== undefined) {
            Any.encode(message.upgradedClientState, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpgradeProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.title = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.description = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.plan = Plan.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
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
            title: isSet(object.title) ? String(object.title) : "",
            description: isSet(object.description) ? String(object.description) : "",
            plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
            upgradedClientState: isSet(object.upgradedClientState) ? Any.fromJSON(object.upgradedClientState) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.title !== "") {
            obj.title = message.title;
        }
        if (message.description !== "") {
            obj.description = message.description;
        }
        if (message.plan !== undefined) {
            obj.plan = Plan.toJSON(message.plan);
        }
        if (message.upgradedClientState !== undefined) {
            obj.upgradedClientState = Any.toJSON(message.upgradedClientState);
        }
        return obj;
    },
    create(base) {
        return UpgradeProposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseUpgradeProposal();
        message.title = object.title ?? "";
        message.description = object.description ?? "";
        message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
        message.upgradedClientState = (object.upgradedClientState !== undefined && object.upgradedClientState !== null)
            ? Any.fromPartial(object.upgradedClientState)
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
