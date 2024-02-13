/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Deposit, DepositParams, Params, Proposal, proposalStatusFromJSON, proposalStatusToJSON, TallyParams, TallyResult, Vote, VotingParams, } from "./gov";
export const protobufPackage = "cosmos.gov.v1";
function createBaseQueryConstitutionRequest() {
    return {};
}
export const QueryConstitutionRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConstitutionRequest();
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
        return QueryConstitutionRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryConstitutionRequest();
        return message;
    },
};
function createBaseQueryConstitutionResponse() {
    return { constitution: "" };
}
export const QueryConstitutionResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.constitution !== "") {
            writer.uint32(10).string(message.constitution);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryConstitutionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.constitution = reader.string();
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
        return { constitution: isSet(object.constitution) ? String(object.constitution) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.constitution !== "") {
            obj.constitution = message.constitution;
        }
        return obj;
    },
    create(base) {
        return QueryConstitutionResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryConstitutionResponse();
        message.constitution = object.constitution ?? "";
        return message;
    },
};
function createBaseQueryProposalRequest() {
    return { proposalId: 0 };
}
export const QueryProposalRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalRequest();
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
        return QueryProposalRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryProposalRequest();
        message.proposalId = object.proposalId ?? 0;
        return message;
    },
};
function createBaseQueryProposalResponse() {
    return { proposal: undefined };
}
export const QueryProposalResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposal !== undefined) {
            Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.proposal = Proposal.decode(reader, reader.uint32());
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
        return { proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposal !== undefined) {
            obj.proposal = Proposal.toJSON(message.proposal);
        }
        return obj;
    },
    create(base) {
        return QueryProposalResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryProposalResponse();
        message.proposal = (object.proposal !== undefined && object.proposal !== null)
            ? Proposal.fromPartial(object.proposal)
            : undefined;
        return message;
    },
};
function createBaseQueryProposalsRequest() {
    return { proposalStatus: 0, voter: "", depositor: "", pagination: undefined };
}
export const QueryProposalsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalStatus !== 0) {
            writer.uint32(8).int32(message.proposalStatus);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        if (message.depositor !== "") {
            writer.uint32(26).string(message.depositor);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.proposalStatus = reader.int32();
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
                    message.depositor = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
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
            proposalStatus: isSet(object.proposalStatus) ? proposalStatusFromJSON(object.proposalStatus) : 0,
            voter: isSet(object.voter) ? String(object.voter) : "",
            depositor: isSet(object.depositor) ? String(object.depositor) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalStatus !== 0) {
            obj.proposalStatus = proposalStatusToJSON(message.proposalStatus);
        }
        if (message.voter !== "") {
            obj.voter = message.voter;
        }
        if (message.depositor !== "") {
            obj.depositor = message.depositor;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryProposalsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryProposalsRequest();
        message.proposalStatus = object.proposalStatus ?? 0;
        message.voter = object.voter ?? "";
        message.depositor = object.depositor ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryProposalsResponse() {
    return { proposals: [], pagination: undefined };
}
export const QueryProposalsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.proposals) {
            Proposal.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryProposalsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.proposals.push(Proposal.decode(reader, reader.uint32()));
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
            proposals: Array.isArray(object?.proposals) ? object.proposals.map((e) => Proposal.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposals?.length) {
            obj.proposals = message.proposals.map((e) => Proposal.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryProposalsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryProposalsResponse();
        message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryVoteRequest() {
    return { proposalId: 0, voter: "" };
}
export const QueryVoteRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVoteRequest();
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
        return obj;
    },
    create(base) {
        return QueryVoteRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVoteRequest();
        message.proposalId = object.proposalId ?? 0;
        message.voter = object.voter ?? "";
        return message;
    },
};
function createBaseQueryVoteResponse() {
    return { vote: undefined };
}
export const QueryVoteResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.vote !== undefined) {
            Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVoteResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.vote = Vote.decode(reader, reader.uint32());
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
        return { vote: isSet(object.vote) ? Vote.fromJSON(object.vote) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.vote !== undefined) {
            obj.vote = Vote.toJSON(message.vote);
        }
        return obj;
    },
    create(base) {
        return QueryVoteResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVoteResponse();
        message.vote = (object.vote !== undefined && object.vote !== null) ? Vote.fromPartial(object.vote) : undefined;
        return message;
    },
};
function createBaseQueryVotesRequest() {
    return { proposalId: 0, pagination: undefined };
}
export const QueryVotesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVotesRequest();
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
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryVotesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVotesRequest();
        message.proposalId = object.proposalId ?? 0;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryVotesResponse() {
    return { votes: [], pagination: undefined };
}
export const QueryVotesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.votes) {
            Vote.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryVotesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.votes.push(Vote.decode(reader, reader.uint32()));
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
            votes: Array.isArray(object?.votes) ? object.votes.map((e) => Vote.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.votes?.length) {
            obj.votes = message.votes.map((e) => Vote.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryVotesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVotesResponse();
        message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryParamsRequest() {
    return { paramsType: "" };
}
export const QueryParamsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.paramsType !== "") {
            writer.uint32(10).string(message.paramsType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.paramsType = reader.string();
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
        return { paramsType: isSet(object.paramsType) ? String(object.paramsType) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.paramsType !== "") {
            obj.paramsType = message.paramsType;
        }
        return obj;
    },
    create(base) {
        return QueryParamsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryParamsRequest();
        message.paramsType = object.paramsType ?? "";
        return message;
    },
};
function createBaseQueryParamsResponse() {
    return { votingParams: undefined, depositParams: undefined, tallyParams: undefined, params: undefined };
}
export const QueryParamsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.votingParams !== undefined) {
            VotingParams.encode(message.votingParams, writer.uint32(10).fork()).ldelim();
        }
        if (message.depositParams !== undefined) {
            DepositParams.encode(message.depositParams, writer.uint32(18).fork()).ldelim();
        }
        if (message.tallyParams !== undefined) {
            TallyParams.encode(message.tallyParams, writer.uint32(26).fork()).ldelim();
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.votingParams = VotingParams.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.depositParams = DepositParams.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.tallyParams = TallyParams.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
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
            votingParams: isSet(object.votingParams) ? VotingParams.fromJSON(object.votingParams) : undefined,
            depositParams: isSet(object.depositParams) ? DepositParams.fromJSON(object.depositParams) : undefined,
            tallyParams: isSet(object.tallyParams) ? TallyParams.fromJSON(object.tallyParams) : undefined,
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.votingParams !== undefined) {
            obj.votingParams = VotingParams.toJSON(message.votingParams);
        }
        if (message.depositParams !== undefined) {
            obj.depositParams = DepositParams.toJSON(message.depositParams);
        }
        if (message.tallyParams !== undefined) {
            obj.tallyParams = TallyParams.toJSON(message.tallyParams);
        }
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return QueryParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.votingParams = (object.votingParams !== undefined && object.votingParams !== null)
            ? VotingParams.fromPartial(object.votingParams)
            : undefined;
        message.depositParams = (object.depositParams !== undefined && object.depositParams !== null)
            ? DepositParams.fromPartial(object.depositParams)
            : undefined;
        message.tallyParams = (object.tallyParams !== undefined && object.tallyParams !== null)
            ? TallyParams.fromPartial(object.tallyParams)
            : undefined;
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseQueryDepositRequest() {
    return { proposalId: 0, depositor: "" };
}
export const QueryDepositRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositRequest();
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
        return obj;
    },
    create(base) {
        return QueryDepositRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDepositRequest();
        message.proposalId = object.proposalId ?? 0;
        message.depositor = object.depositor ?? "";
        return message;
    },
};
function createBaseQueryDepositResponse() {
    return { deposit: undefined };
}
export const QueryDepositResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.deposit !== undefined) {
            Deposit.encode(message.deposit, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.deposit = Deposit.decode(reader, reader.uint32());
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
        return { deposit: isSet(object.deposit) ? Deposit.fromJSON(object.deposit) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.deposit !== undefined) {
            obj.deposit = Deposit.toJSON(message.deposit);
        }
        return obj;
    },
    create(base) {
        return QueryDepositResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDepositResponse();
        message.deposit = (object.deposit !== undefined && object.deposit !== null)
            ? Deposit.fromPartial(object.deposit)
            : undefined;
        return message;
    },
};
function createBaseQueryDepositsRequest() {
    return { proposalId: 0, pagination: undefined };
}
export const QueryDepositsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositsRequest();
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
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryDepositsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDepositsRequest();
        message.proposalId = object.proposalId ?? 0;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryDepositsResponse() {
    return { deposits: [], pagination: undefined };
}
export const QueryDepositsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.deposits) {
            Deposit.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDepositsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.deposits.push(Deposit.decode(reader, reader.uint32()));
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
            deposits: Array.isArray(object?.deposits) ? object.deposits.map((e) => Deposit.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.deposits?.length) {
            obj.deposits = message.deposits.map((e) => Deposit.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryDepositsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDepositsResponse();
        message.deposits = object.deposits?.map((e) => Deposit.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryTallyResultRequest() {
    return { proposalId: 0 };
}
export const QueryTallyResultRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTallyResultRequest();
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
        return QueryTallyResultRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTallyResultRequest();
        message.proposalId = object.proposalId ?? 0;
        return message;
    },
};
function createBaseQueryTallyResultResponse() {
    return { tally: undefined };
}
export const QueryTallyResultResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tally !== undefined) {
            TallyResult.encode(message.tally, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTallyResultResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.tally = TallyResult.decode(reader, reader.uint32());
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
        return { tally: isSet(object.tally) ? TallyResult.fromJSON(object.tally) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.tally !== undefined) {
            obj.tally = TallyResult.toJSON(message.tally);
        }
        return obj;
    },
    create(base) {
        return QueryTallyResultResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTallyResultResponse();
        message.tally = (object.tally !== undefined && object.tally !== null)
            ? TallyResult.fromPartial(object.tally)
            : undefined;
        return message;
    },
};
export const QueryServiceName = "cosmos.gov.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.Constitution = this.Constitution.bind(this);
        this.Proposal = this.Proposal.bind(this);
        this.Proposals = this.Proposals.bind(this);
        this.Vote = this.Vote.bind(this);
        this.Votes = this.Votes.bind(this);
        this.Params = this.Params.bind(this);
        this.Deposit = this.Deposit.bind(this);
        this.Deposits = this.Deposits.bind(this);
        this.TallyResult = this.TallyResult.bind(this);
    }
    Constitution(request) {
        const data = QueryConstitutionRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Constitution", data);
        return promise.then((data) => QueryConstitutionResponse.decode(_m0.Reader.create(data)));
    }
    Proposal(request) {
        const data = QueryProposalRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Proposal", data);
        return promise.then((data) => QueryProposalResponse.decode(_m0.Reader.create(data)));
    }
    Proposals(request) {
        const data = QueryProposalsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Proposals", data);
        return promise.then((data) => QueryProposalsResponse.decode(_m0.Reader.create(data)));
    }
    Vote(request) {
        const data = QueryVoteRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Vote", data);
        return promise.then((data) => QueryVoteResponse.decode(_m0.Reader.create(data)));
    }
    Votes(request) {
        const data = QueryVotesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Votes", data);
        return promise.then((data) => QueryVotesResponse.decode(_m0.Reader.create(data)));
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
    }
    Deposit(request) {
        const data = QueryDepositRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Deposit", data);
        return promise.then((data) => QueryDepositResponse.decode(_m0.Reader.create(data)));
    }
    Deposits(request) {
        const data = QueryDepositsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Deposits", data);
        return promise.then((data) => QueryDepositsResponse.decode(_m0.Reader.create(data)));
    }
    TallyResult(request) {
        const data = QueryTallyResultRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TallyResult", data);
        return promise.then((data) => QueryTallyResultResponse.decode(_m0.Reader.create(data)));
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
