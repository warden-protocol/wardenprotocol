/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import {
  DelegationResponse,
  HistoricalInfo,
  Params,
  Pool,
  RedelegationResponse,
  UnbondingDelegation,
  Validator,
} from "./staking";

export const protobufPackage = "cosmos.staking.v1beta1";

/** QueryValidatorsRequest is request type for Query/Validators RPC method. */
export interface QueryValidatorsRequest {
  /** status enables to query for validators matching a given status. */
  status: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryValidatorsResponse is response type for the Query/Validators RPC method */
export interface QueryValidatorsResponse {
  /** validators contains all the queried validators. */
  validators: Validator[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryValidatorRequest is response type for the Query/Validator RPC method */
export interface QueryValidatorRequest {
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}

/** QueryValidatorResponse is response type for the Query/Validator RPC method */
export interface QueryValidatorResponse {
  /** validator defines the validator info. */
  validator: Validator | undefined;
}

/**
 * QueryValidatorDelegationsRequest is request type for the
 * Query/ValidatorDelegations RPC method
 */
export interface QueryValidatorDelegationsRequest {
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryValidatorDelegationsResponse is response type for the
 * Query/ValidatorDelegations RPC method
 */
export interface QueryValidatorDelegationsResponse {
  delegationResponses: DelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryValidatorUnbondingDelegationsRequest is required type for the
 * Query/ValidatorUnbondingDelegations RPC method
 */
export interface QueryValidatorUnbondingDelegationsRequest {
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryValidatorUnbondingDelegationsResponse is response type for the
 * Query/ValidatorUnbondingDelegations RPC method.
 */
export interface QueryValidatorUnbondingDelegationsResponse {
  unbondingResponses: UnbondingDelegation[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryDelegationRequest is request type for the Query/Delegation RPC method. */
export interface QueryDelegationRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}

/** QueryDelegationResponse is response type for the Query/Delegation RPC method. */
export interface QueryDelegationResponse {
  /** delegation_responses defines the delegation info of a delegation. */
  delegationResponse: DelegationResponse | undefined;
}

/**
 * QueryUnbondingDelegationRequest is request type for the
 * Query/UnbondingDelegation RPC method.
 */
export interface QueryUnbondingDelegationRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}

/**
 * QueryDelegationResponse is response type for the Query/UnbondingDelegation
 * RPC method.
 */
export interface QueryUnbondingDelegationResponse {
  /** unbond defines the unbonding information of a delegation. */
  unbond: UnbondingDelegation | undefined;
}

/**
 * QueryDelegatorDelegationsRequest is request type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface QueryDelegatorDelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryDelegatorDelegationsResponse is response type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface QueryDelegatorDelegationsResponse {
  /** delegation_responses defines all the delegations' info of a delegator. */
  delegationResponses: DelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryDelegatorUnbondingDelegationsRequest is request type for the
 * Query/DelegatorUnbondingDelegations RPC method.
 */
export interface QueryDelegatorUnbondingDelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryUnbondingDelegatorDelegationsResponse is response type for the
 * Query/UnbondingDelegatorDelegations RPC method.
 */
export interface QueryDelegatorUnbondingDelegationsResponse {
  unbondingResponses: UnbondingDelegation[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryRedelegationsRequest is request type for the Query/Redelegations RPC
 * method.
 */
export interface QueryRedelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** src_validator_addr defines the validator address to redelegate from. */
  srcValidatorAddr: string;
  /** dst_validator_addr defines the validator address to redelegate to. */
  dstValidatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryRedelegationsResponse is response type for the Query/Redelegations RPC
 * method.
 */
export interface QueryRedelegationsResponse {
  redelegationResponses: RedelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryDelegatorValidatorsRequest is request type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryDelegatorValidatorsResponse is response type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsResponse {
  /** validators defines the validators' info of a delegator. */
  validators: Validator[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryDelegatorValidatorRequest is request type for the
 * Query/DelegatorValidator RPC method.
 */
export interface QueryDelegatorValidatorRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegatorAddr: string;
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}

/**
 * QueryDelegatorValidatorResponse response type for the
 * Query/DelegatorValidator RPC method.
 */
export interface QueryDelegatorValidatorResponse {
  /** validator defines the validator info. */
  validator: Validator | undefined;
}

/**
 * QueryHistoricalInfoRequest is request type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoRequest {
  /** height defines at which height to query the historical info. */
  height: number;
}

/**
 * QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoResponse {
  /** hist defines the historical info at the given height. */
  hist: HistoricalInfo | undefined;
}

/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryPoolRequest {
}

/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryPoolResponse {
  /** pool defines the pool info. */
  pool: Pool | undefined;
}

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

function createBaseQueryValidatorsRequest(): QueryValidatorsRequest {
  return { status: "", pagination: undefined };
}

export const QueryValidatorsRequest = {
  encode(message: QueryValidatorsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.status = reader.string();
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

  fromJSON(object: any): QueryValidatorsRequest {
    return {
      status: isSet(object.status) ? String(object.status) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryValidatorsRequest): unknown {
    const obj: any = {};
    if (message.status !== "") {
      obj.status = message.status;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryValidatorsRequest>, I>>(base?: I): QueryValidatorsRequest {
    return QueryValidatorsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorsRequest>, I>>(object: I): QueryValidatorsRequest {
    const message = createBaseQueryValidatorsRequest();
    message.status = object.status ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryValidatorsResponse(): QueryValidatorsResponse {
  return { validators: [], pagination: undefined };
}

export const QueryValidatorsResponse = {
  encode(message: QueryValidatorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validators.push(Validator.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryValidatorsResponse {
    return {
      validators: Array.isArray(object?.validators) ? object.validators.map((e: any) => Validator.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryValidatorsResponse): unknown {
    const obj: any = {};
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => Validator.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryValidatorsResponse>, I>>(base?: I): QueryValidatorsResponse {
    return QueryValidatorsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorsResponse>, I>>(object: I): QueryValidatorsResponse {
    const message = createBaseQueryValidatorsResponse();
    message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryValidatorRequest(): QueryValidatorRequest {
  return { validatorAddr: "" };
}

export const QueryValidatorRequest = {
  encode(message: QueryValidatorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorRequest {
    return { validatorAddr: isSet(object.validatorAddr) ? String(object.validatorAddr) : "" };
  },

  toJSON(message: QueryValidatorRequest): unknown {
    const obj: any = {};
    if (message.validatorAddr !== "") {
      obj.validatorAddr = message.validatorAddr;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryValidatorRequest>, I>>(base?: I): QueryValidatorRequest {
    return QueryValidatorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorRequest>, I>>(object: I): QueryValidatorRequest {
    const message = createBaseQueryValidatorRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
};

function createBaseQueryValidatorResponse(): QueryValidatorResponse {
  return { validator: undefined };
}

export const QueryValidatorResponse = {
  encode(message: QueryValidatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorResponse {
    return { validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined };
  },

  toJSON(message: QueryValidatorResponse): unknown {
    const obj: any = {};
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryValidatorResponse>, I>>(base?: I): QueryValidatorResponse {
    return QueryValidatorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorResponse>, I>>(object: I): QueryValidatorResponse {
    const message = createBaseQueryValidatorResponse();
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    return message;
  },
};

function createBaseQueryValidatorDelegationsRequest(): QueryValidatorDelegationsRequest {
  return { validatorAddr: "", pagination: undefined };
}

export const QueryValidatorDelegationsRequest = {
  encode(message: QueryValidatorDelegationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorDelegationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddr = reader.string();
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

  fromJSON(object: any): QueryValidatorDelegationsRequest {
    return {
      validatorAddr: isSet(object.validatorAddr) ? String(object.validatorAddr) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryValidatorDelegationsRequest): unknown {
    const obj: any = {};
    if (message.validatorAddr !== "") {
      obj.validatorAddr = message.validatorAddr;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryValidatorDelegationsRequest>, I>>(
    base?: I,
  ): QueryValidatorDelegationsRequest {
    return QueryValidatorDelegationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorDelegationsRequest>, I>>(
    object: I,
  ): QueryValidatorDelegationsRequest {
    const message = createBaseQueryValidatorDelegationsRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryValidatorDelegationsResponse(): QueryValidatorDelegationsResponse {
  return { delegationResponses: [], pagination: undefined };
}

export const QueryValidatorDelegationsResponse = {
  encode(message: QueryValidatorDelegationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.delegationResponses) {
      DelegationResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorDelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegationResponses.push(DelegationResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryValidatorDelegationsResponse {
    return {
      delegationResponses: Array.isArray(object?.delegationResponses)
        ? object.delegationResponses.map((e: any) => DelegationResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryValidatorDelegationsResponse): unknown {
    const obj: any = {};
    if (message.delegationResponses?.length) {
      obj.delegationResponses = message.delegationResponses.map((e) => DelegationResponse.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryValidatorDelegationsResponse>, I>>(
    base?: I,
  ): QueryValidatorDelegationsResponse {
    return QueryValidatorDelegationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorDelegationsResponse>, I>>(
    object: I,
  ): QueryValidatorDelegationsResponse {
    const message = createBaseQueryValidatorDelegationsResponse();
    message.delegationResponses = object.delegationResponses?.map((e) => DelegationResponse.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryValidatorUnbondingDelegationsRequest(): QueryValidatorUnbondingDelegationsRequest {
  return { validatorAddr: "", pagination: undefined };
}

export const QueryValidatorUnbondingDelegationsRequest = {
  encode(message: QueryValidatorUnbondingDelegationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorUnbondingDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorUnbondingDelegationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddr = reader.string();
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

  fromJSON(object: any): QueryValidatorUnbondingDelegationsRequest {
    return {
      validatorAddr: isSet(object.validatorAddr) ? String(object.validatorAddr) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryValidatorUnbondingDelegationsRequest): unknown {
    const obj: any = {};
    if (message.validatorAddr !== "") {
      obj.validatorAddr = message.validatorAddr;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryValidatorUnbondingDelegationsRequest>, I>>(
    base?: I,
  ): QueryValidatorUnbondingDelegationsRequest {
    return QueryValidatorUnbondingDelegationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorUnbondingDelegationsRequest>, I>>(
    object: I,
  ): QueryValidatorUnbondingDelegationsRequest {
    const message = createBaseQueryValidatorUnbondingDelegationsRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryValidatorUnbondingDelegationsResponse(): QueryValidatorUnbondingDelegationsResponse {
  return { unbondingResponses: [], pagination: undefined };
}

export const QueryValidatorUnbondingDelegationsResponse = {
  encode(message: QueryValidatorUnbondingDelegationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.unbondingResponses) {
      UnbondingDelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorUnbondingDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorUnbondingDelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.unbondingResponses.push(UnbondingDelegation.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryValidatorUnbondingDelegationsResponse {
    return {
      unbondingResponses: Array.isArray(object?.unbondingResponses)
        ? object.unbondingResponses.map((e: any) => UnbondingDelegation.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryValidatorUnbondingDelegationsResponse): unknown {
    const obj: any = {};
    if (message.unbondingResponses?.length) {
      obj.unbondingResponses = message.unbondingResponses.map((e) => UnbondingDelegation.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryValidatorUnbondingDelegationsResponse>, I>>(
    base?: I,
  ): QueryValidatorUnbondingDelegationsResponse {
    return QueryValidatorUnbondingDelegationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryValidatorUnbondingDelegationsResponse>, I>>(
    object: I,
  ): QueryValidatorUnbondingDelegationsResponse {
    const message = createBaseQueryValidatorUnbondingDelegationsResponse();
    message.unbondingResponses = object.unbondingResponses?.map((e) => UnbondingDelegation.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDelegationRequest(): QueryDelegationRequest {
  return { delegatorAddr: "", validatorAddr: "" };
}

export const QueryDelegationRequest = {
  encode(message: QueryDelegationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(18).string(message.validatorAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddr = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorAddr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDelegationRequest {
    return {
      delegatorAddr: isSet(object.delegatorAddr) ? String(object.delegatorAddr) : "",
      validatorAddr: isSet(object.validatorAddr) ? String(object.validatorAddr) : "",
    };
  },

  toJSON(message: QueryDelegationRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddr !== "") {
      obj.delegatorAddr = message.delegatorAddr;
    }
    if (message.validatorAddr !== "") {
      obj.validatorAddr = message.validatorAddr;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegationRequest>, I>>(base?: I): QueryDelegationRequest {
    return QueryDelegationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegationRequest>, I>>(object: I): QueryDelegationRequest {
    const message = createBaseQueryDelegationRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
};

function createBaseQueryDelegationResponse(): QueryDelegationResponse {
  return { delegationResponse: undefined };
}

export const QueryDelegationResponse = {
  encode(message: QueryDelegationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegationResponse !== undefined) {
      DelegationResponse.encode(message.delegationResponse, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegationResponse = DelegationResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDelegationResponse {
    return {
      delegationResponse: isSet(object.delegationResponse)
        ? DelegationResponse.fromJSON(object.delegationResponse)
        : undefined,
    };
  },

  toJSON(message: QueryDelegationResponse): unknown {
    const obj: any = {};
    if (message.delegationResponse !== undefined) {
      obj.delegationResponse = DelegationResponse.toJSON(message.delegationResponse);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegationResponse>, I>>(base?: I): QueryDelegationResponse {
    return QueryDelegationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegationResponse>, I>>(object: I): QueryDelegationResponse {
    const message = createBaseQueryDelegationResponse();
    message.delegationResponse = (object.delegationResponse !== undefined && object.delegationResponse !== null)
      ? DelegationResponse.fromPartial(object.delegationResponse)
      : undefined;
    return message;
  },
};

function createBaseQueryUnbondingDelegationRequest(): QueryUnbondingDelegationRequest {
  return { delegatorAddr: "", validatorAddr: "" };
}

export const QueryUnbondingDelegationRequest = {
  encode(message: QueryUnbondingDelegationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(18).string(message.validatorAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnbondingDelegationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnbondingDelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddr = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorAddr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUnbondingDelegationRequest {
    return {
      delegatorAddr: isSet(object.delegatorAddr) ? String(object.delegatorAddr) : "",
      validatorAddr: isSet(object.validatorAddr) ? String(object.validatorAddr) : "",
    };
  },

  toJSON(message: QueryUnbondingDelegationRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddr !== "") {
      obj.delegatorAddr = message.delegatorAddr;
    }
    if (message.validatorAddr !== "") {
      obj.validatorAddr = message.validatorAddr;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUnbondingDelegationRequest>, I>>(base?: I): QueryUnbondingDelegationRequest {
    return QueryUnbondingDelegationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUnbondingDelegationRequest>, I>>(
    object: I,
  ): QueryUnbondingDelegationRequest {
    const message = createBaseQueryUnbondingDelegationRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
};

function createBaseQueryUnbondingDelegationResponse(): QueryUnbondingDelegationResponse {
  return { unbond: undefined };
}

export const QueryUnbondingDelegationResponse = {
  encode(message: QueryUnbondingDelegationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.unbond !== undefined) {
      UnbondingDelegation.encode(message.unbond, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnbondingDelegationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnbondingDelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.unbond = UnbondingDelegation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUnbondingDelegationResponse {
    return { unbond: isSet(object.unbond) ? UnbondingDelegation.fromJSON(object.unbond) : undefined };
  },

  toJSON(message: QueryUnbondingDelegationResponse): unknown {
    const obj: any = {};
    if (message.unbond !== undefined) {
      obj.unbond = UnbondingDelegation.toJSON(message.unbond);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUnbondingDelegationResponse>, I>>(
    base?: I,
  ): QueryUnbondingDelegationResponse {
    return QueryUnbondingDelegationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUnbondingDelegationResponse>, I>>(
    object: I,
  ): QueryUnbondingDelegationResponse {
    const message = createBaseQueryUnbondingDelegationResponse();
    message.unbond = (object.unbond !== undefined && object.unbond !== null)
      ? UnbondingDelegation.fromPartial(object.unbond)
      : undefined;
    return message;
  },
};

function createBaseQueryDelegatorDelegationsRequest(): QueryDelegatorDelegationsRequest {
  return { delegatorAddr: "", pagination: undefined };
}

export const QueryDelegatorDelegationsRequest = {
  encode(message: QueryDelegatorDelegationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorDelegationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddr = reader.string();
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

  fromJSON(object: any): QueryDelegatorDelegationsRequest {
    return {
      delegatorAddr: isSet(object.delegatorAddr) ? String(object.delegatorAddr) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDelegatorDelegationsRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddr !== "") {
      obj.delegatorAddr = message.delegatorAddr;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegatorDelegationsRequest>, I>>(
    base?: I,
  ): QueryDelegatorDelegationsRequest {
    return QueryDelegatorDelegationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegatorDelegationsRequest>, I>>(
    object: I,
  ): QueryDelegatorDelegationsRequest {
    const message = createBaseQueryDelegatorDelegationsRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDelegatorDelegationsResponse(): QueryDelegatorDelegationsResponse {
  return { delegationResponses: [], pagination: undefined };
}

export const QueryDelegatorDelegationsResponse = {
  encode(message: QueryDelegatorDelegationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.delegationResponses) {
      DelegationResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorDelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegationResponses.push(DelegationResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDelegatorDelegationsResponse {
    return {
      delegationResponses: Array.isArray(object?.delegationResponses)
        ? object.delegationResponses.map((e: any) => DelegationResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDelegatorDelegationsResponse): unknown {
    const obj: any = {};
    if (message.delegationResponses?.length) {
      obj.delegationResponses = message.delegationResponses.map((e) => DelegationResponse.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegatorDelegationsResponse>, I>>(
    base?: I,
  ): QueryDelegatorDelegationsResponse {
    return QueryDelegatorDelegationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegatorDelegationsResponse>, I>>(
    object: I,
  ): QueryDelegatorDelegationsResponse {
    const message = createBaseQueryDelegatorDelegationsResponse();
    message.delegationResponses = object.delegationResponses?.map((e) => DelegationResponse.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDelegatorUnbondingDelegationsRequest(): QueryDelegatorUnbondingDelegationsRequest {
  return { delegatorAddr: "", pagination: undefined };
}

export const QueryDelegatorUnbondingDelegationsRequest = {
  encode(message: QueryDelegatorUnbondingDelegationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorUnbondingDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorUnbondingDelegationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddr = reader.string();
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

  fromJSON(object: any): QueryDelegatorUnbondingDelegationsRequest {
    return {
      delegatorAddr: isSet(object.delegatorAddr) ? String(object.delegatorAddr) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDelegatorUnbondingDelegationsRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddr !== "") {
      obj.delegatorAddr = message.delegatorAddr;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegatorUnbondingDelegationsRequest>, I>>(
    base?: I,
  ): QueryDelegatorUnbondingDelegationsRequest {
    return QueryDelegatorUnbondingDelegationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegatorUnbondingDelegationsRequest>, I>>(
    object: I,
  ): QueryDelegatorUnbondingDelegationsRequest {
    const message = createBaseQueryDelegatorUnbondingDelegationsRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDelegatorUnbondingDelegationsResponse(): QueryDelegatorUnbondingDelegationsResponse {
  return { unbondingResponses: [], pagination: undefined };
}

export const QueryDelegatorUnbondingDelegationsResponse = {
  encode(message: QueryDelegatorUnbondingDelegationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.unbondingResponses) {
      UnbondingDelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorUnbondingDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorUnbondingDelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.unbondingResponses.push(UnbondingDelegation.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDelegatorUnbondingDelegationsResponse {
    return {
      unbondingResponses: Array.isArray(object?.unbondingResponses)
        ? object.unbondingResponses.map((e: any) => UnbondingDelegation.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDelegatorUnbondingDelegationsResponse): unknown {
    const obj: any = {};
    if (message.unbondingResponses?.length) {
      obj.unbondingResponses = message.unbondingResponses.map((e) => UnbondingDelegation.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegatorUnbondingDelegationsResponse>, I>>(
    base?: I,
  ): QueryDelegatorUnbondingDelegationsResponse {
    return QueryDelegatorUnbondingDelegationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegatorUnbondingDelegationsResponse>, I>>(
    object: I,
  ): QueryDelegatorUnbondingDelegationsResponse {
    const message = createBaseQueryDelegatorUnbondingDelegationsResponse();
    message.unbondingResponses = object.unbondingResponses?.map((e) => UnbondingDelegation.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryRedelegationsRequest(): QueryRedelegationsRequest {
  return { delegatorAddr: "", srcValidatorAddr: "", dstValidatorAddr: "", pagination: undefined };
}

export const QueryRedelegationsRequest = {
  encode(message: QueryRedelegationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.srcValidatorAddr !== "") {
      writer.uint32(18).string(message.srcValidatorAddr);
    }
    if (message.dstValidatorAddr !== "") {
      writer.uint32(26).string(message.dstValidatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRedelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRedelegationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddr = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.srcValidatorAddr = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.dstValidatorAddr = reader.string();
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

  fromJSON(object: any): QueryRedelegationsRequest {
    return {
      delegatorAddr: isSet(object.delegatorAddr) ? String(object.delegatorAddr) : "",
      srcValidatorAddr: isSet(object.srcValidatorAddr) ? String(object.srcValidatorAddr) : "",
      dstValidatorAddr: isSet(object.dstValidatorAddr) ? String(object.dstValidatorAddr) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryRedelegationsRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddr !== "") {
      obj.delegatorAddr = message.delegatorAddr;
    }
    if (message.srcValidatorAddr !== "") {
      obj.srcValidatorAddr = message.srcValidatorAddr;
    }
    if (message.dstValidatorAddr !== "") {
      obj.dstValidatorAddr = message.dstValidatorAddr;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRedelegationsRequest>, I>>(base?: I): QueryRedelegationsRequest {
    return QueryRedelegationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRedelegationsRequest>, I>>(object: I): QueryRedelegationsRequest {
    const message = createBaseQueryRedelegationsRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.srcValidatorAddr = object.srcValidatorAddr ?? "";
    message.dstValidatorAddr = object.dstValidatorAddr ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryRedelegationsResponse(): QueryRedelegationsResponse {
  return { redelegationResponses: [], pagination: undefined };
}

export const QueryRedelegationsResponse = {
  encode(message: QueryRedelegationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.redelegationResponses) {
      RedelegationResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRedelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRedelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.redelegationResponses.push(RedelegationResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryRedelegationsResponse {
    return {
      redelegationResponses: Array.isArray(object?.redelegationResponses)
        ? object.redelegationResponses.map((e: any) => RedelegationResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryRedelegationsResponse): unknown {
    const obj: any = {};
    if (message.redelegationResponses?.length) {
      obj.redelegationResponses = message.redelegationResponses.map((e) => RedelegationResponse.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRedelegationsResponse>, I>>(base?: I): QueryRedelegationsResponse {
    return QueryRedelegationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRedelegationsResponse>, I>>(object: I): QueryRedelegationsResponse {
    const message = createBaseQueryRedelegationsResponse();
    message.redelegationResponses = object.redelegationResponses?.map((e) => RedelegationResponse.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDelegatorValidatorsRequest(): QueryDelegatorValidatorsRequest {
  return { delegatorAddr: "", pagination: undefined };
}

export const QueryDelegatorValidatorsRequest = {
  encode(message: QueryDelegatorValidatorsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorValidatorsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddr = reader.string();
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

  fromJSON(object: any): QueryDelegatorValidatorsRequest {
    return {
      delegatorAddr: isSet(object.delegatorAddr) ? String(object.delegatorAddr) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDelegatorValidatorsRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddr !== "") {
      obj.delegatorAddr = message.delegatorAddr;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegatorValidatorsRequest>, I>>(base?: I): QueryDelegatorValidatorsRequest {
    return QueryDelegatorValidatorsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegatorValidatorsRequest>, I>>(
    object: I,
  ): QueryDelegatorValidatorsRequest {
    const message = createBaseQueryDelegatorValidatorsRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDelegatorValidatorsResponse(): QueryDelegatorValidatorsResponse {
  return { validators: [], pagination: undefined };
}

export const QueryDelegatorValidatorsResponse = {
  encode(message: QueryDelegatorValidatorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validators.push(Validator.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDelegatorValidatorsResponse {
    return {
      validators: Array.isArray(object?.validators) ? object.validators.map((e: any) => Validator.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDelegatorValidatorsResponse): unknown {
    const obj: any = {};
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => Validator.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegatorValidatorsResponse>, I>>(
    base?: I,
  ): QueryDelegatorValidatorsResponse {
    return QueryDelegatorValidatorsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegatorValidatorsResponse>, I>>(
    object: I,
  ): QueryDelegatorValidatorsResponse {
    const message = createBaseQueryDelegatorValidatorsResponse();
    message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDelegatorValidatorRequest(): QueryDelegatorValidatorRequest {
  return { delegatorAddr: "", validatorAddr: "" };
}

export const QueryDelegatorValidatorRequest = {
  encode(message: QueryDelegatorValidatorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(18).string(message.validatorAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddr = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorAddr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorValidatorRequest {
    return {
      delegatorAddr: isSet(object.delegatorAddr) ? String(object.delegatorAddr) : "",
      validatorAddr: isSet(object.validatorAddr) ? String(object.validatorAddr) : "",
    };
  },

  toJSON(message: QueryDelegatorValidatorRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddr !== "") {
      obj.delegatorAddr = message.delegatorAddr;
    }
    if (message.validatorAddr !== "") {
      obj.validatorAddr = message.validatorAddr;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegatorValidatorRequest>, I>>(base?: I): QueryDelegatorValidatorRequest {
    return QueryDelegatorValidatorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegatorValidatorRequest>, I>>(
    object: I,
  ): QueryDelegatorValidatorRequest {
    const message = createBaseQueryDelegatorValidatorRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
};

function createBaseQueryDelegatorValidatorResponse(): QueryDelegatorValidatorResponse {
  return { validator: undefined };
}

export const QueryDelegatorValidatorResponse = {
  encode(message: QueryDelegatorValidatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDelegatorValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorValidatorResponse {
    return { validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined };
  },

  toJSON(message: QueryDelegatorValidatorResponse): unknown {
    const obj: any = {};
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDelegatorValidatorResponse>, I>>(base?: I): QueryDelegatorValidatorResponse {
    return QueryDelegatorValidatorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDelegatorValidatorResponse>, I>>(
    object: I,
  ): QueryDelegatorValidatorResponse {
    const message = createBaseQueryDelegatorValidatorResponse();
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    return message;
  },
};

function createBaseQueryHistoricalInfoRequest(): QueryHistoricalInfoRequest {
  return { height: 0 };
}

export const QueryHistoricalInfoRequest = {
  encode(message: QueryHistoricalInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHistoricalInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHistoricalInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryHistoricalInfoRequest {
    return { height: isSet(object.height) ? Number(object.height) : 0 };
  },

  toJSON(message: QueryHistoricalInfoRequest): unknown {
    const obj: any = {};
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryHistoricalInfoRequest>, I>>(base?: I): QueryHistoricalInfoRequest {
    return QueryHistoricalInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryHistoricalInfoRequest>, I>>(object: I): QueryHistoricalInfoRequest {
    const message = createBaseQueryHistoricalInfoRequest();
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseQueryHistoricalInfoResponse(): QueryHistoricalInfoResponse {
  return { hist: undefined };
}

export const QueryHistoricalInfoResponse = {
  encode(message: QueryHistoricalInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hist !== undefined) {
      HistoricalInfo.encode(message.hist, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHistoricalInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHistoricalInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hist = HistoricalInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryHistoricalInfoResponse {
    return { hist: isSet(object.hist) ? HistoricalInfo.fromJSON(object.hist) : undefined };
  },

  toJSON(message: QueryHistoricalInfoResponse): unknown {
    const obj: any = {};
    if (message.hist !== undefined) {
      obj.hist = HistoricalInfo.toJSON(message.hist);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryHistoricalInfoResponse>, I>>(base?: I): QueryHistoricalInfoResponse {
    return QueryHistoricalInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryHistoricalInfoResponse>, I>>(object: I): QueryHistoricalInfoResponse {
    const message = createBaseQueryHistoricalInfoResponse();
    message.hist = (object.hist !== undefined && object.hist !== null)
      ? HistoricalInfo.fromPartial(object.hist)
      : undefined;
    return message;
  },
};

function createBaseQueryPoolRequest(): QueryPoolRequest {
  return {};
}

export const QueryPoolRequest = {
  encode(_: QueryPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolRequest();
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

  fromJSON(_: any): QueryPoolRequest {
    return {};
  },

  toJSON(_: QueryPoolRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolRequest>, I>>(base?: I): QueryPoolRequest {
    return QueryPoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolRequest>, I>>(_: I): QueryPoolRequest {
    const message = createBaseQueryPoolRequest();
    return message;
  },
};

function createBaseQueryPoolResponse(): QueryPoolResponse {
  return { pool: undefined };
}

export const QueryPoolResponse = {
  encode(message: QueryPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool = Pool.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPoolResponse {
    return { pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined };
  },

  toJSON(message: QueryPoolResponse): unknown {
    const obj: any = {};
    if (message.pool !== undefined) {
      obj.pool = Pool.toJSON(message.pool);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolResponse>, I>>(base?: I): QueryPoolResponse {
    return QueryPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolResponse>, I>>(object: I): QueryPoolResponse {
    const message = createBaseQueryPoolResponse();
    message.pool = (object.pool !== undefined && object.pool !== null) ? Pool.fromPartial(object.pool) : undefined;
    return message;
  },
};

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
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
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
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
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /**
   * Validators queries all validators that match the given status.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
  /** Validator queries validator info for given validator address. */
  Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse>;
  /**
   * ValidatorDelegations queries delegate info for given validator.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  ValidatorDelegations(request: QueryValidatorDelegationsRequest): Promise<QueryValidatorDelegationsResponse>;
  /**
   * ValidatorUnbondingDelegations queries unbonding delegations of a validator.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  ValidatorUnbondingDelegations(
    request: QueryValidatorUnbondingDelegationsRequest,
  ): Promise<QueryValidatorUnbondingDelegationsResponse>;
  /** Delegation queries delegate info for given validator delegator pair. */
  Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse>;
  /**
   * UnbondingDelegation queries unbonding info for given validator delegator
   * pair.
   */
  UnbondingDelegation(request: QueryUnbondingDelegationRequest): Promise<QueryUnbondingDelegationResponse>;
  /**
   * DelegatorDelegations queries all delegations of a given delegator address.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  DelegatorDelegations(request: QueryDelegatorDelegationsRequest): Promise<QueryDelegatorDelegationsResponse>;
  /**
   * DelegatorUnbondingDelegations queries all unbonding delegations of a given
   * delegator address.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  DelegatorUnbondingDelegations(
    request: QueryDelegatorUnbondingDelegationsRequest,
  ): Promise<QueryDelegatorUnbondingDelegationsResponse>;
  /**
   * Redelegations queries redelegations of given address.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  Redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse>;
  /**
   * DelegatorValidators queries all validators info for given delegator
   * address.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse>;
  /**
   * DelegatorValidator queries validator info for given delegator validator
   * pair.
   */
  DelegatorValidator(request: QueryDelegatorValidatorRequest): Promise<QueryDelegatorValidatorResponse>;
  /** HistoricalInfo queries the historical info for given height. */
  HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse>;
  /** Pool queries the pool info. */
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  /** Parameters queries the staking parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export const QueryServiceName = "cosmos.staking.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Validators = this.Validators.bind(this);
    this.Validator = this.Validator.bind(this);
    this.ValidatorDelegations = this.ValidatorDelegations.bind(this);
    this.ValidatorUnbondingDelegations = this.ValidatorUnbondingDelegations.bind(this);
    this.Delegation = this.Delegation.bind(this);
    this.UnbondingDelegation = this.UnbondingDelegation.bind(this);
    this.DelegatorDelegations = this.DelegatorDelegations.bind(this);
    this.DelegatorUnbondingDelegations = this.DelegatorUnbondingDelegations.bind(this);
    this.Redelegations = this.Redelegations.bind(this);
    this.DelegatorValidators = this.DelegatorValidators.bind(this);
    this.DelegatorValidator = this.DelegatorValidator.bind(this);
    this.HistoricalInfo = this.HistoricalInfo.bind(this);
    this.Pool = this.Pool.bind(this);
    this.Params = this.Params.bind(this);
  }
  Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse> {
    const data = QueryValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Validators", data);
    return promise.then((data) => QueryValidatorsResponse.decode(_m0.Reader.create(data)));
  }

  Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse> {
    const data = QueryValidatorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Validator", data);
    return promise.then((data) => QueryValidatorResponse.decode(_m0.Reader.create(data)));
  }

  ValidatorDelegations(request: QueryValidatorDelegationsRequest): Promise<QueryValidatorDelegationsResponse> {
    const data = QueryValidatorDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ValidatorDelegations", data);
    return promise.then((data) => QueryValidatorDelegationsResponse.decode(_m0.Reader.create(data)));
  }

  ValidatorUnbondingDelegations(
    request: QueryValidatorUnbondingDelegationsRequest,
  ): Promise<QueryValidatorUnbondingDelegationsResponse> {
    const data = QueryValidatorUnbondingDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ValidatorUnbondingDelegations", data);
    return promise.then((data) => QueryValidatorUnbondingDelegationsResponse.decode(_m0.Reader.create(data)));
  }

  Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse> {
    const data = QueryDelegationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Delegation", data);
    return promise.then((data) => QueryDelegationResponse.decode(_m0.Reader.create(data)));
  }

  UnbondingDelegation(request: QueryUnbondingDelegationRequest): Promise<QueryUnbondingDelegationResponse> {
    const data = QueryUnbondingDelegationRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnbondingDelegation", data);
    return promise.then((data) => QueryUnbondingDelegationResponse.decode(_m0.Reader.create(data)));
  }

  DelegatorDelegations(request: QueryDelegatorDelegationsRequest): Promise<QueryDelegatorDelegationsResponse> {
    const data = QueryDelegatorDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DelegatorDelegations", data);
    return promise.then((data) => QueryDelegatorDelegationsResponse.decode(_m0.Reader.create(data)));
  }

  DelegatorUnbondingDelegations(
    request: QueryDelegatorUnbondingDelegationsRequest,
  ): Promise<QueryDelegatorUnbondingDelegationsResponse> {
    const data = QueryDelegatorUnbondingDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DelegatorUnbondingDelegations", data);
    return promise.then((data) => QueryDelegatorUnbondingDelegationsResponse.decode(_m0.Reader.create(data)));
  }

  Redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse> {
    const data = QueryRedelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Redelegations", data);
    return promise.then((data) => QueryRedelegationsResponse.decode(_m0.Reader.create(data)));
  }

  DelegatorValidators(request: QueryDelegatorValidatorsRequest): Promise<QueryDelegatorValidatorsResponse> {
    const data = QueryDelegatorValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DelegatorValidators", data);
    return promise.then((data) => QueryDelegatorValidatorsResponse.decode(_m0.Reader.create(data)));
  }

  DelegatorValidator(request: QueryDelegatorValidatorRequest): Promise<QueryDelegatorValidatorResponse> {
    const data = QueryDelegatorValidatorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DelegatorValidator", data);
    return promise.then((data) => QueryDelegatorValidatorResponse.decode(_m0.Reader.create(data)));
  }

  HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse> {
    const data = QueryHistoricalInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "HistoricalInfo", data);
    return promise.then((data) => QueryHistoricalInfoResponse.decode(_m0.Reader.create(data)));
  }

  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Pool", data);
    return promise.then((data) => QueryPoolResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
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
