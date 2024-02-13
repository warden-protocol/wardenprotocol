/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import {
  Deposit,
  DepositParams,
  Params,
  Proposal,
  ProposalStatus,
  proposalStatusFromJSON,
  proposalStatusToJSON,
  TallyParams,
  TallyResult,
  Vote,
  VotingParams,
} from "./gov";

export const protobufPackage = "cosmos.gov.v1";

/** Since: cosmos-sdk 0.46 */

/** QueryConstitutionRequest is the request type for the Query/Constitution RPC method */
export interface QueryConstitutionRequest {
}

/** QueryConstitutionResponse is the response type for the Query/Constitution RPC method */
export interface QueryConstitutionResponse {
  constitution: string;
}

/** QueryProposalRequest is the request type for the Query/Proposal RPC method. */
export interface QueryProposalRequest {
  /** proposal_id defines the unique id of the proposal. */
  proposalId: number;
}

/** QueryProposalResponse is the response type for the Query/Proposal RPC method. */
export interface QueryProposalResponse {
  /** proposal is the requested governance proposal. */
  proposal: Proposal | undefined;
}

/** QueryProposalsRequest is the request type for the Query/Proposals RPC method. */
export interface QueryProposalsRequest {
  /** proposal_status defines the status of the proposals. */
  proposalStatus: ProposalStatus;
  /** voter defines the voter address for the proposals. */
  voter: string;
  /** depositor defines the deposit addresses from the proposals. */
  depositor: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryProposalsResponse is the response type for the Query/Proposals RPC
 * method.
 */
export interface QueryProposalsResponse {
  /** proposals defines all the requested governance proposals. */
  proposals: Proposal[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryVoteRequest is the request type for the Query/Vote RPC method. */
export interface QueryVoteRequest {
  /** proposal_id defines the unique id of the proposal. */
  proposalId: number;
  /** voter defines the voter address for the proposals. */
  voter: string;
}

/** QueryVoteResponse is the response type for the Query/Vote RPC method. */
export interface QueryVoteResponse {
  /** vote defines the queried vote. */
  vote: Vote | undefined;
}

/** QueryVotesRequest is the request type for the Query/Votes RPC method. */
export interface QueryVotesRequest {
  /** proposal_id defines the unique id of the proposal. */
  proposalId: number;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryVotesResponse is the response type for the Query/Votes RPC method. */
export interface QueryVotesResponse {
  /** votes defines the queried votes. */
  votes: Vote[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
  /**
   * params_type defines which parameters to query for, can be one of "voting",
   * "tallying" or "deposit".
   */
  paramsType: string;
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /**
   * Deprecated: Prefer to use `params` instead.
   * voting_params defines the parameters related to voting.
   *
   * @deprecated
   */
  votingParams:
    | VotingParams
    | undefined;
  /**
   * Deprecated: Prefer to use `params` instead.
   * deposit_params defines the parameters related to deposit.
   *
   * @deprecated
   */
  depositParams:
    | DepositParams
    | undefined;
  /**
   * Deprecated: Prefer to use `params` instead.
   * tally_params defines the parameters related to tally.
   *
   * @deprecated
   */
  tallyParams:
    | TallyParams
    | undefined;
  /**
   * params defines all the paramaters of x/gov module.
   *
   * Since: cosmos-sdk 0.47
   */
  params: Params | undefined;
}

/** QueryDepositRequest is the request type for the Query/Deposit RPC method. */
export interface QueryDepositRequest {
  /** proposal_id defines the unique id of the proposal. */
  proposalId: number;
  /** depositor defines the deposit addresses from the proposals. */
  depositor: string;
}

/** QueryDepositResponse is the response type for the Query/Deposit RPC method. */
export interface QueryDepositResponse {
  /** deposit defines the requested deposit. */
  deposit: Deposit | undefined;
}

/** QueryDepositsRequest is the request type for the Query/Deposits RPC method. */
export interface QueryDepositsRequest {
  /** proposal_id defines the unique id of the proposal. */
  proposalId: number;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryDepositsResponse is the response type for the Query/Deposits RPC method. */
export interface QueryDepositsResponse {
  /** deposits defines the requested deposits. */
  deposits: Deposit[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryTallyResultRequest is the request type for the Query/Tally RPC method. */
export interface QueryTallyResultRequest {
  /** proposal_id defines the unique id of the proposal. */
  proposalId: number;
}

/** QueryTallyResultResponse is the response type for the Query/Tally RPC method. */
export interface QueryTallyResultResponse {
  /** tally defines the requested tally. */
  tally: TallyResult | undefined;
}

function createBaseQueryConstitutionRequest(): QueryConstitutionRequest {
  return {};
}

export const QueryConstitutionRequest = {
  encode(_: QueryConstitutionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConstitutionRequest {
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

  fromJSON(_: any): QueryConstitutionRequest {
    return {};
  },

  toJSON(_: QueryConstitutionRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConstitutionRequest>, I>>(base?: I): QueryConstitutionRequest {
    return QueryConstitutionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConstitutionRequest>, I>>(_: I): QueryConstitutionRequest {
    const message = createBaseQueryConstitutionRequest();
    return message;
  },
};

function createBaseQueryConstitutionResponse(): QueryConstitutionResponse {
  return { constitution: "" };
}

export const QueryConstitutionResponse = {
  encode(message: QueryConstitutionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.constitution !== "") {
      writer.uint32(10).string(message.constitution);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConstitutionResponse {
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

  fromJSON(object: any): QueryConstitutionResponse {
    return { constitution: isSet(object.constitution) ? String(object.constitution) : "" };
  },

  toJSON(message: QueryConstitutionResponse): unknown {
    const obj: any = {};
    if (message.constitution !== "") {
      obj.constitution = message.constitution;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConstitutionResponse>, I>>(base?: I): QueryConstitutionResponse {
    return QueryConstitutionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConstitutionResponse>, I>>(object: I): QueryConstitutionResponse {
    const message = createBaseQueryConstitutionResponse();
    message.constitution = object.constitution ?? "";
    return message;
  },
};

function createBaseQueryProposalRequest(): QueryProposalRequest {
  return { proposalId: 0 };
}

export const QueryProposalRequest = {
  encode(message: QueryProposalRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalRequest {
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

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryProposalRequest {
    return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
  },

  toJSON(message: QueryProposalRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryProposalRequest>, I>>(base?: I): QueryProposalRequest {
    return QueryProposalRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryProposalRequest>, I>>(object: I): QueryProposalRequest {
    const message = createBaseQueryProposalRequest();
    message.proposalId = object.proposalId ?? 0;
    return message;
  },
};

function createBaseQueryProposalResponse(): QueryProposalResponse {
  return { proposal: undefined };
}

export const QueryProposalResponse = {
  encode(message: QueryProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalResponse {
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

  fromJSON(object: any): QueryProposalResponse {
    return { proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined };
  },

  toJSON(message: QueryProposalResponse): unknown {
    const obj: any = {};
    if (message.proposal !== undefined) {
      obj.proposal = Proposal.toJSON(message.proposal);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryProposalResponse>, I>>(base?: I): QueryProposalResponse {
    return QueryProposalResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryProposalResponse>, I>>(object: I): QueryProposalResponse {
    const message = createBaseQueryProposalResponse();
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    return message;
  },
};

function createBaseQueryProposalsRequest(): QueryProposalsRequest {
  return { proposalStatus: 0, voter: "", depositor: "", pagination: undefined };
}

export const QueryProposalsRequest = {
  encode(message: QueryProposalsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalsRequest {
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

          message.proposalStatus = reader.int32() as any;
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

  fromJSON(object: any): QueryProposalsRequest {
    return {
      proposalStatus: isSet(object.proposalStatus) ? proposalStatusFromJSON(object.proposalStatus) : 0,
      voter: isSet(object.voter) ? String(object.voter) : "",
      depositor: isSet(object.depositor) ? String(object.depositor) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryProposalsRequest): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<QueryProposalsRequest>, I>>(base?: I): QueryProposalsRequest {
    return QueryProposalsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryProposalsRequest>, I>>(object: I): QueryProposalsRequest {
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

function createBaseQueryProposalsResponse(): QueryProposalsResponse {
  return { proposals: [], pagination: undefined };
}

export const QueryProposalsResponse = {
  encode(message: QueryProposalsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalsResponse {
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

  fromJSON(object: any): QueryProposalsResponse {
    return {
      proposals: Array.isArray(object?.proposals) ? object.proposals.map((e: any) => Proposal.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryProposalsResponse): unknown {
    const obj: any = {};
    if (message.proposals?.length) {
      obj.proposals = message.proposals.map((e) => Proposal.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryProposalsResponse>, I>>(base?: I): QueryProposalsResponse {
    return QueryProposalsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryProposalsResponse>, I>>(object: I): QueryProposalsResponse {
    const message = createBaseQueryProposalsResponse();
    message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryVoteRequest(): QueryVoteRequest {
  return { proposalId: 0, voter: "" };
}

export const QueryVoteRequest = {
  encode(message: QueryVoteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteRequest {
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

          message.proposalId = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): QueryVoteRequest {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      voter: isSet(object.voter) ? String(object.voter) : "",
    };
  },

  toJSON(message: QueryVoteRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.voter !== "") {
      obj.voter = message.voter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVoteRequest>, I>>(base?: I): QueryVoteRequest {
    return QueryVoteRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVoteRequest>, I>>(object: I): QueryVoteRequest {
    const message = createBaseQueryVoteRequest();
    message.proposalId = object.proposalId ?? 0;
    message.voter = object.voter ?? "";
    return message;
  },
};

function createBaseQueryVoteResponse(): QueryVoteResponse {
  return { vote: undefined };
}

export const QueryVoteResponse = {
  encode(message: QueryVoteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vote !== undefined) {
      Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteResponse {
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

  fromJSON(object: any): QueryVoteResponse {
    return { vote: isSet(object.vote) ? Vote.fromJSON(object.vote) : undefined };
  },

  toJSON(message: QueryVoteResponse): unknown {
    const obj: any = {};
    if (message.vote !== undefined) {
      obj.vote = Vote.toJSON(message.vote);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVoteResponse>, I>>(base?: I): QueryVoteResponse {
    return QueryVoteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVoteResponse>, I>>(object: I): QueryVoteResponse {
    const message = createBaseQueryVoteResponse();
    message.vote = (object.vote !== undefined && object.vote !== null) ? Vote.fromPartial(object.vote) : undefined;
    return message;
  },
};

function createBaseQueryVotesRequest(): QueryVotesRequest {
  return { proposalId: 0, pagination: undefined };
}

export const QueryVotesRequest = {
  encode(message: QueryVotesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesRequest {
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

          message.proposalId = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): QueryVotesRequest {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryVotesRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVotesRequest>, I>>(base?: I): QueryVotesRequest {
    return QueryVotesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVotesRequest>, I>>(object: I): QueryVotesRequest {
    const message = createBaseQueryVotesRequest();
    message.proposalId = object.proposalId ?? 0;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryVotesResponse(): QueryVotesResponse {
  return { votes: [], pagination: undefined };
}

export const QueryVotesResponse = {
  encode(message: QueryVotesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.votes) {
      Vote.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesResponse {
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

  fromJSON(object: any): QueryVotesResponse {
    return {
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => Vote.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryVotesResponse): unknown {
    const obj: any = {};
    if (message.votes?.length) {
      obj.votes = message.votes.map((e) => Vote.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVotesResponse>, I>>(base?: I): QueryVotesResponse {
    return QueryVotesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVotesResponse>, I>>(object: I): QueryVotesResponse {
    const message = createBaseQueryVotesResponse();
    message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return { paramsType: "" };
}

export const QueryParamsRequest = {
  encode(message: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paramsType !== "") {
      writer.uint32(10).string(message.paramsType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
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

  fromJSON(object: any): QueryParamsRequest {
    return { paramsType: isSet(object.paramsType) ? String(object.paramsType) : "" };
  },

  toJSON(message: QueryParamsRequest): unknown {
    const obj: any = {};
    if (message.paramsType !== "") {
      obj.paramsType = message.paramsType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(object: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    message.paramsType = object.paramsType ?? "";
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { votingParams: undefined, depositParams: undefined, tallyParams: undefined, params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
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

  fromJSON(object: any): QueryParamsResponse {
    return {
      votingParams: isSet(object.votingParams) ? VotingParams.fromJSON(object.votingParams) : undefined,
      depositParams: isSet(object.depositParams) ? DepositParams.fromJSON(object.depositParams) : undefined,
      tallyParams: isSet(object.tallyParams) ? TallyParams.fromJSON(object.tallyParams) : undefined,
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
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

function createBaseQueryDepositRequest(): QueryDepositRequest {
  return { proposalId: 0, depositor: "" };
}

export const QueryDepositRequest = {
  encode(message: QueryDepositRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.depositor !== "") {
      writer.uint32(18).string(message.depositor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositRequest {
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

          message.proposalId = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): QueryDepositRequest {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      depositor: isSet(object.depositor) ? String(object.depositor) : "",
    };
  },

  toJSON(message: QueryDepositRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.depositor !== "") {
      obj.depositor = message.depositor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDepositRequest>, I>>(base?: I): QueryDepositRequest {
    return QueryDepositRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDepositRequest>, I>>(object: I): QueryDepositRequest {
    const message = createBaseQueryDepositRequest();
    message.proposalId = object.proposalId ?? 0;
    message.depositor = object.depositor ?? "";
    return message;
  },
};

function createBaseQueryDepositResponse(): QueryDepositResponse {
  return { deposit: undefined };
}

export const QueryDepositResponse = {
  encode(message: QueryDepositResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.deposit !== undefined) {
      Deposit.encode(message.deposit, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositResponse {
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

  fromJSON(object: any): QueryDepositResponse {
    return { deposit: isSet(object.deposit) ? Deposit.fromJSON(object.deposit) : undefined };
  },

  toJSON(message: QueryDepositResponse): unknown {
    const obj: any = {};
    if (message.deposit !== undefined) {
      obj.deposit = Deposit.toJSON(message.deposit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDepositResponse>, I>>(base?: I): QueryDepositResponse {
    return QueryDepositResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDepositResponse>, I>>(object: I): QueryDepositResponse {
    const message = createBaseQueryDepositResponse();
    message.deposit = (object.deposit !== undefined && object.deposit !== null)
      ? Deposit.fromPartial(object.deposit)
      : undefined;
    return message;
  },
};

function createBaseQueryDepositsRequest(): QueryDepositsRequest {
  return { proposalId: 0, pagination: undefined };
}

export const QueryDepositsRequest = {
  encode(message: QueryDepositsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositsRequest {
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

          message.proposalId = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): QueryDepositsRequest {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDepositsRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDepositsRequest>, I>>(base?: I): QueryDepositsRequest {
    return QueryDepositsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDepositsRequest>, I>>(object: I): QueryDepositsRequest {
    const message = createBaseQueryDepositsRequest();
    message.proposalId = object.proposalId ?? 0;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDepositsResponse(): QueryDepositsResponse {
  return { deposits: [], pagination: undefined };
}

export const QueryDepositsResponse = {
  encode(message: QueryDepositsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.deposits) {
      Deposit.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositsResponse {
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

  fromJSON(object: any): QueryDepositsResponse {
    return {
      deposits: Array.isArray(object?.deposits) ? object.deposits.map((e: any) => Deposit.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDepositsResponse): unknown {
    const obj: any = {};
    if (message.deposits?.length) {
      obj.deposits = message.deposits.map((e) => Deposit.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDepositsResponse>, I>>(base?: I): QueryDepositsResponse {
    return QueryDepositsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDepositsResponse>, I>>(object: I): QueryDepositsResponse {
    const message = createBaseQueryDepositsResponse();
    message.deposits = object.deposits?.map((e) => Deposit.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryTallyResultRequest(): QueryTallyResultRequest {
  return { proposalId: 0 };
}

export const QueryTallyResultRequest = {
  encode(message: QueryTallyResultRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResultRequest {
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

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTallyResultRequest {
    return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
  },

  toJSON(message: QueryTallyResultRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTallyResultRequest>, I>>(base?: I): QueryTallyResultRequest {
    return QueryTallyResultRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTallyResultRequest>, I>>(object: I): QueryTallyResultRequest {
    const message = createBaseQueryTallyResultRequest();
    message.proposalId = object.proposalId ?? 0;
    return message;
  },
};

function createBaseQueryTallyResultResponse(): QueryTallyResultResponse {
  return { tally: undefined };
}

export const QueryTallyResultResponse = {
  encode(message: QueryTallyResultResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tally !== undefined) {
      TallyResult.encode(message.tally, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResultResponse {
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

  fromJSON(object: any): QueryTallyResultResponse {
    return { tally: isSet(object.tally) ? TallyResult.fromJSON(object.tally) : undefined };
  },

  toJSON(message: QueryTallyResultResponse): unknown {
    const obj: any = {};
    if (message.tally !== undefined) {
      obj.tally = TallyResult.toJSON(message.tally);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTallyResultResponse>, I>>(base?: I): QueryTallyResultResponse {
    return QueryTallyResultResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTallyResultResponse>, I>>(object: I): QueryTallyResultResponse {
    const message = createBaseQueryTallyResultResponse();
    message.tally = (object.tally !== undefined && object.tally !== null)
      ? TallyResult.fromPartial(object.tally)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service for gov module */
export interface Query {
  /** Constitution queries the chain's constitution. */
  Constitution(request: QueryConstitutionRequest): Promise<QueryConstitutionResponse>;
  /** Proposal queries proposal details based on ProposalID. */
  Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
  /** Proposals queries all proposals based on given status. */
  Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
  /** Vote queries voted information based on proposalID, voterAddr. */
  Vote(request: QueryVoteRequest): Promise<QueryVoteResponse>;
  /** Votes queries votes of a given proposal. */
  Votes(request: QueryVotesRequest): Promise<QueryVotesResponse>;
  /** Params queries all parameters of the gov module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Deposit queries single deposit information based on proposalID, depositAddr. */
  Deposit(request: QueryDepositRequest): Promise<QueryDepositResponse>;
  /** Deposits queries all deposits of a single proposal. */
  Deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
  /** TallyResult queries the tally of a proposal vote. */
  TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
}

export const QueryServiceName = "cosmos.gov.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
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
  Constitution(request: QueryConstitutionRequest): Promise<QueryConstitutionResponse> {
    const data = QueryConstitutionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Constitution", data);
    return promise.then((data) => QueryConstitutionResponse.decode(_m0.Reader.create(data)));
  }

  Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
    const data = QueryProposalRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Proposal", data);
    return promise.then((data) => QueryProposalResponse.decode(_m0.Reader.create(data)));
  }

  Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse> {
    const data = QueryProposalsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Proposals", data);
    return promise.then((data) => QueryProposalsResponse.decode(_m0.Reader.create(data)));
  }

  Vote(request: QueryVoteRequest): Promise<QueryVoteResponse> {
    const data = QueryVoteRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Vote", data);
    return promise.then((data) => QueryVoteResponse.decode(_m0.Reader.create(data)));
  }

  Votes(request: QueryVotesRequest): Promise<QueryVotesResponse> {
    const data = QueryVotesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Votes", data);
    return promise.then((data) => QueryVotesResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  Deposit(request: QueryDepositRequest): Promise<QueryDepositResponse> {
    const data = QueryDepositRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Deposit", data);
    return promise.then((data) => QueryDepositResponse.decode(_m0.Reader.create(data)));
  }

  Deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse> {
    const data = QueryDepositsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Deposits", data);
    return promise.then((data) => QueryDepositsResponse.decode(_m0.Reader.create(data)));
  }

  TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse> {
    const data = QueryTallyResultRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TallyResult", data);
    return promise.then((data) => QueryTallyResultResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
