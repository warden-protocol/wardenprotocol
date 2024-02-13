/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";
import { Params, voteOptionFromJSON, voteOptionToJSON, WeightedVoteOption } from "./gov";
export const protobufPackage = "cosmos.gov.v1";
function createBaseMsgSubmitProposal() {
    return { messages: [], initialDeposit: [], proposer: "", metadata: "", title: "", summary: "", expedited: false };
}
export const MsgSubmitProposal = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.messages) {
            Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.initialDeposit) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.proposer !== "") {
            writer.uint32(26).string(message.proposer);
        }
        if (message.metadata !== "") {
            writer.uint32(34).string(message.metadata);
        }
        if (message.title !== "") {
            writer.uint32(42).string(message.title);
        }
        if (message.summary !== "") {
            writer.uint32(50).string(message.summary);
        }
        if (message.expedited === true) {
            writer.uint32(56).bool(message.expedited);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.messages.push(Any.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.initialDeposit.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proposer = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.metadata = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.title = reader.string();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.summary = reader.string();
                    continue;
                case 7:
                    if (tag !== 56) {
                        break;
                    }
                    message.expedited = reader.bool();
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
            messages: Array.isArray(object?.messages) ? object.messages.map((e) => Any.fromJSON(e)) : [],
            initialDeposit: Array.isArray(object?.initialDeposit)
                ? object.initialDeposit.map((e) => Coin.fromJSON(e))
                : [],
            proposer: isSet(object.proposer) ? String(object.proposer) : "",
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
            title: isSet(object.title) ? String(object.title) : "",
            summary: isSet(object.summary) ? String(object.summary) : "",
            expedited: isSet(object.expedited) ? Boolean(object.expedited) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages?.length) {
            obj.messages = message.messages.map((e) => Any.toJSON(e));
        }
        if (message.initialDeposit?.length) {
            obj.initialDeposit = message.initialDeposit.map((e) => Coin.toJSON(e));
        }
        if (message.proposer !== "") {
            obj.proposer = message.proposer;
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        if (message.title !== "") {
            obj.title = message.title;
        }
        if (message.summary !== "") {
            obj.summary = message.summary;
        }
        if (message.expedited === true) {
            obj.expedited = message.expedited;
        }
        return obj;
    },
    create(base) {
        return MsgSubmitProposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitProposal();
        message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
        message.initialDeposit = object.initialDeposit?.map((e) => Coin.fromPartial(e)) || [];
        message.proposer = object.proposer ?? "";
        message.metadata = object.metadata ?? "";
        message.title = object.title ?? "";
        message.summary = object.summary ?? "";
        message.expedited = object.expedited ?? false;
        return message;
    },
};
function createBaseMsgSubmitProposalResponse() {
    return { proposalId: 0 };
}
export const MsgSubmitProposalResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitProposalResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
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
        return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        return obj;
    },
    create(base) {
        return MsgSubmitProposalResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitProposalResponse();
        message.proposalId = object.proposalId ?? 0;
        return message;
    },
};
function createBaseMsgExecLegacyContent() {
    return { content: undefined, authority: "" };
}
export const MsgExecLegacyContent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.content !== undefined) {
            Any.encode(message.content, writer.uint32(10).fork()).ldelim();
        }
        if (message.authority !== "") {
            writer.uint32(18).string(message.authority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgExecLegacyContent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.content = Any.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.authority = reader.string();
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
            content: isSet(object.content) ? Any.fromJSON(object.content) : undefined,
            authority: isSet(object.authority) ? String(object.authority) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.content !== undefined) {
            obj.content = Any.toJSON(message.content);
        }
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        return obj;
    },
    create(base) {
        return MsgExecLegacyContent.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgExecLegacyContent();
        message.content = (object.content !== undefined && object.content !== null)
            ? Any.fromPartial(object.content)
            : undefined;
        message.authority = object.authority ?? "";
        return message;
    },
};
function createBaseMsgExecLegacyContentResponse() {
    return {};
}
export const MsgExecLegacyContentResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgExecLegacyContentResponse();
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
        return MsgExecLegacyContentResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgExecLegacyContentResponse();
        return message;
    },
};
function createBaseMsgVote() {
    return { proposalId: 0, voter: "", option: 0, metadata: "" };
}
export const MsgVote = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        if (message.option !== 0) {
            writer.uint32(24).int32(message.option);
        }
        if (message.metadata !== "") {
            writer.uint32(34).string(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVote();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.voter = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.option = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.metadata = reader.string();
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
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            voter: isSet(object.voter) ? String(object.voter) : "",
            option: isSet(object.option) ? voteOptionFromJSON(object.option) : 0,
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.voter !== "") {
            obj.voter = message.voter;
        }
        if (message.option !== 0) {
            obj.option = voteOptionToJSON(message.option);
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        return obj;
    },
    create(base) {
        return MsgVote.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgVote();
        message.proposalId = object.proposalId ?? 0;
        message.voter = object.voter ?? "";
        message.option = object.option ?? 0;
        message.metadata = object.metadata ?? "";
        return message;
    },
};
function createBaseMsgVoteResponse() {
    return {};
}
export const MsgVoteResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVoteResponse();
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
        return MsgVoteResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgVoteResponse();
        return message;
    },
};
function createBaseMsgVoteWeighted() {
    return { proposalId: 0, voter: "", options: [], metadata: "" };
}
export const MsgVoteWeighted = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        for (const v of message.options) {
            WeightedVoteOption.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.metadata !== "") {
            writer.uint32(34).string(message.metadata);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVoteWeighted();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.voter = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.options.push(WeightedVoteOption.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.metadata = reader.string();
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
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            voter: isSet(object.voter) ? String(object.voter) : "",
            options: Array.isArray(object?.options) ? object.options.map((e) => WeightedVoteOption.fromJSON(e)) : [],
            metadata: isSet(object.metadata) ? String(object.metadata) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.voter !== "") {
            obj.voter = message.voter;
        }
        if (message.options?.length) {
            obj.options = message.options.map((e) => WeightedVoteOption.toJSON(e));
        }
        if (message.metadata !== "") {
            obj.metadata = message.metadata;
        }
        return obj;
    },
    create(base) {
        return MsgVoteWeighted.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgVoteWeighted();
        message.proposalId = object.proposalId ?? 0;
        message.voter = object.voter ?? "";
        message.options = object.options?.map((e) => WeightedVoteOption.fromPartial(e)) || [];
        message.metadata = object.metadata ?? "";
        return message;
    },
};
function createBaseMsgVoteWeightedResponse() {
    return {};
}
export const MsgVoteWeightedResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgVoteWeightedResponse();
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
        return MsgVoteWeightedResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgVoteWeightedResponse();
        return message;
    },
};
function createBaseMsgDeposit() {
    return { proposalId: 0, depositor: "", amount: [] };
}
export const MsgDeposit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeposit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.depositor = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
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
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            depositor: isSet(object.depositor) ? String(object.depositor) : "",
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.depositor !== "") {
            obj.depositor = message.depositor;
        }
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgDeposit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgDeposit();
        message.proposalId = object.proposalId ?? 0;
        message.depositor = object.depositor ?? "";
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgDepositResponse() {
    return {};
}
export const MsgDepositResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositResponse();
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
        return MsgDepositResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgDepositResponse();
        return message;
    },
};
function createBaseMsgUpdateParams() {
    return { authority: "", params: undefined };
}
export const MsgUpdateParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
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
        return {
            authority: isSet(object.authority) ? String(object.authority) : "",
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return MsgUpdateParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseMsgUpdateParamsResponse() {
    return {};
}
export const MsgUpdateParamsResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
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
        return MsgUpdateParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
};
function createBaseMsgCancelProposal() {
    return { proposalId: 0, proposer: "" };
}
export const MsgCancelProposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.proposer !== "") {
            writer.uint32(18).string(message.proposer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.proposer = reader.string();
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
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            proposer: isSet(object.proposer) ? String(object.proposer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.proposer !== "") {
            obj.proposer = message.proposer;
        }
        return obj;
    },
    create(base) {
        return MsgCancelProposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgCancelProposal();
        message.proposalId = object.proposalId ?? 0;
        message.proposer = object.proposer ?? "";
        return message;
    },
};
function createBaseMsgCancelProposalResponse() {
    return { proposalId: 0, canceledTime: undefined, canceledHeight: 0 };
}
export const MsgCancelProposalResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.canceledTime !== undefined) {
            Timestamp.encode(toTimestamp(message.canceledTime), writer.uint32(18).fork()).ldelim();
        }
        if (message.canceledHeight !== 0) {
            writer.uint32(24).uint64(message.canceledHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelProposalResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.canceledTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.canceledHeight = longToNumber(reader.uint64());
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
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            canceledTime: isSet(object.canceledTime) ? fromJsonTimestamp(object.canceledTime) : undefined,
            canceledHeight: isSet(object.canceledHeight) ? Number(object.canceledHeight) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.canceledTime !== undefined) {
            obj.canceledTime = message.canceledTime.toISOString();
        }
        if (message.canceledHeight !== 0) {
            obj.canceledHeight = Math.round(message.canceledHeight);
        }
        return obj;
    },
    create(base) {
        return MsgCancelProposalResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgCancelProposalResponse();
        message.proposalId = object.proposalId ?? 0;
        message.canceledTime = object.canceledTime ?? undefined;
        message.canceledHeight = object.canceledHeight ?? 0;
        return message;
    },
};
export const MsgServiceName = "cosmos.gov.v1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.SubmitProposal = this.SubmitProposal.bind(this);
        this.ExecLegacyContent = this.ExecLegacyContent.bind(this);
        this.Vote = this.Vote.bind(this);
        this.VoteWeighted = this.VoteWeighted.bind(this);
        this.Deposit = this.Deposit.bind(this);
        this.UpdateParams = this.UpdateParams.bind(this);
        this.CancelProposal = this.CancelProposal.bind(this);
    }
    SubmitProposal(request) {
        const data = MsgSubmitProposal.encode(request).finish();
        const promise = this.rpc.request(this.service, "SubmitProposal", data);
        return promise.then((data) => MsgSubmitProposalResponse.decode(_m0.Reader.create(data)));
    }
    ExecLegacyContent(request) {
        const data = MsgExecLegacyContent.encode(request).finish();
        const promise = this.rpc.request(this.service, "ExecLegacyContent", data);
        return promise.then((data) => MsgExecLegacyContentResponse.decode(_m0.Reader.create(data)));
    }
    Vote(request) {
        const data = MsgVote.encode(request).finish();
        const promise = this.rpc.request(this.service, "Vote", data);
        return promise.then((data) => MsgVoteResponse.decode(_m0.Reader.create(data)));
    }
    VoteWeighted(request) {
        const data = MsgVoteWeighted.encode(request).finish();
        const promise = this.rpc.request(this.service, "VoteWeighted", data);
        return promise.then((data) => MsgVoteWeightedResponse.decode(_m0.Reader.create(data)));
    }
    Deposit(request) {
        const data = MsgDeposit.encode(request).finish();
        const promise = this.rpc.request(this.service, "Deposit", data);
        return promise.then((data) => MsgDepositResponse.decode(_m0.Reader.create(data)));
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
    CancelProposal(request) {
        const data = MsgCancelProposal.encode(request).finish();
        const promise = this.rpc.request(this.service, "CancelProposal", data);
        return promise.then((data) => MsgCancelProposalResponse.decode(_m0.Reader.create(data)));
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
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = (t.seconds || 0) * 1000;
    millis += (t.nanos || 0) / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
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
