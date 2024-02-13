/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Coin } from "../../base/v1beta1/coin";
import { Metadata, Params, SendEnabled } from "./bank";

export const protobufPackage = "cosmos.bank.v1beta1";

/** QueryBalanceRequest is the request type for the Query/Balance RPC method. */
export interface QueryBalanceRequest {
  /** address is the address to query balances for. */
  address: string;
  /** denom is the coin denom to query balances for. */
  denom: string;
}

/** QueryBalanceResponse is the response type for the Query/Balance RPC method. */
export interface QueryBalanceResponse {
  /** balance is the balance of the coin. */
  balance: Coin | undefined;
}

/** QueryBalanceRequest is the request type for the Query/AllBalances RPC method. */
export interface QueryAllBalancesRequest {
  /** address is the address to query balances for. */
  address: string;
  /** pagination defines an optional pagination for the request. */
  pagination:
    | PageRequest
    | undefined;
  /**
   * resolve_denom is the flag to resolve the denom into a human-readable form from the metadata.
   *
   * Since: cosmos-sdk 0.50
   */
  resolveDenom: boolean;
}

/**
 * QueryAllBalancesResponse is the response type for the Query/AllBalances RPC
 * method.
 */
export interface QueryAllBalancesResponse {
  /** balances is the balances of all the coins. */
  balances: Coin[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QuerySpendableBalancesRequest defines the gRPC request structure for querying
 * an account's spendable balances.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QuerySpendableBalancesRequest {
  /** address is the address to query spendable balances for. */
  address: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QuerySpendableBalancesResponse defines the gRPC response structure for querying
 * an account's spendable balances.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QuerySpendableBalancesResponse {
  /** balances is the spendable balances of all the coins. */
  balances: Coin[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QuerySpendableBalanceByDenomRequest defines the gRPC request structure for
 * querying an account's spendable balance for a specific denom.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QuerySpendableBalanceByDenomRequest {
  /** address is the address to query balances for. */
  address: string;
  /** denom is the coin denom to query balances for. */
  denom: string;
}

/**
 * QuerySpendableBalanceByDenomResponse defines the gRPC response structure for
 * querying an account's spendable balance for a specific denom.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QuerySpendableBalanceByDenomResponse {
  /** balance is the balance of the coin. */
  balance: Coin | undefined;
}

/**
 * QueryTotalSupplyRequest is the request type for the Query/TotalSupply RPC
 * method.
 */
export interface QueryTotalSupplyRequest {
  /**
   * pagination defines an optional pagination for the request.
   *
   * Since: cosmos-sdk 0.43
   */
  pagination: PageRequest | undefined;
}

/**
 * QueryTotalSupplyResponse is the response type for the Query/TotalSupply RPC
 * method
 */
export interface QueryTotalSupplyResponse {
  /** supply is the supply of the coins */
  supply: Coin[];
  /**
   * pagination defines the pagination in the response.
   *
   * Since: cosmos-sdk 0.43
   */
  pagination: PageResponse | undefined;
}

/** QuerySupplyOfRequest is the request type for the Query/SupplyOf RPC method. */
export interface QuerySupplyOfRequest {
  /** denom is the coin denom to query balances for. */
  denom: string;
}

/** QuerySupplyOfResponse is the response type for the Query/SupplyOf RPC method. */
export interface QuerySupplyOfResponse {
  /** amount is the supply of the coin. */
  amount: Coin | undefined;
}

/** QueryParamsRequest defines the request type for querying x/bank parameters. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse defines the response type for querying x/bank parameters. */
export interface QueryParamsResponse {
  /** params provides the parameters of the bank module. */
  params: Params | undefined;
}

/** QueryDenomsMetadataRequest is the request type for the Query/DenomsMetadata RPC method. */
export interface QueryDenomsMetadataRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryDenomsMetadataResponse is the response type for the Query/DenomsMetadata RPC
 * method.
 */
export interface QueryDenomsMetadataResponse {
  /** metadata provides the client information for all the registered tokens. */
  metadatas: Metadata[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryDenomMetadataRequest is the request type for the Query/DenomMetadata RPC method. */
export interface QueryDenomMetadataRequest {
  /** denom is the coin denom to query the metadata for. */
  denom: string;
}

/**
 * QueryDenomMetadataResponse is the response type for the Query/DenomMetadata RPC
 * method.
 */
export interface QueryDenomMetadataResponse {
  /** metadata describes and provides all the client information for the requested token. */
  metadata: Metadata | undefined;
}

/**
 * QueryDenomMetadataByQueryStringRequest is the request type for the Query/DenomMetadata RPC method.
 * Identical with QueryDenomMetadataRequest but receives denom as query string.
 */
export interface QueryDenomMetadataByQueryStringRequest {
  /** denom is the coin denom to query the metadata for. */
  denom: string;
}

/**
 * QueryDenomMetadataByQueryStringResponse is the response type for the Query/DenomMetadata RPC
 * method. Identical with QueryDenomMetadataResponse but receives denom as query string in request.
 */
export interface QueryDenomMetadataByQueryStringResponse {
  /** metadata describes and provides all the client information for the requested token. */
  metadata: Metadata | undefined;
}

/**
 * QueryDenomOwnersRequest defines the request type for the DenomOwners RPC query,
 * which queries for a paginated set of all account holders of a particular
 * denomination.
 */
export interface QueryDenomOwnersRequest {
  /** denom defines the coin denomination to query all account holders for. */
  denom: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * DenomOwner defines structure representing an account that owns or holds a
 * particular denominated token. It contains the account address and account
 * balance of the denominated token.
 *
 * Since: cosmos-sdk 0.46
 */
export interface DenomOwner {
  /** address defines the address that owns a particular denomination. */
  address: string;
  /** balance is the balance of the denominated coin for an account. */
  balance: Coin | undefined;
}

/**
 * QueryDenomOwnersResponse defines the RPC response of a DenomOwners RPC query.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryDenomOwnersResponse {
  denomOwners: DenomOwner[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryDenomOwnersByQueryRequest defines the request type for the DenomOwnersByQuery RPC query,
 * which queries for a paginated set of all account holders of a particular
 * denomination.
 *
 * Since: cosmos-sdk 0.50.3
 */
export interface QueryDenomOwnersByQueryRequest {
  /** denom defines the coin denomination to query all account holders for. */
  denom: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryDenomOwnersByQueryResponse defines the RPC response of a DenomOwnersByQuery RPC query.
 *
 * Since: cosmos-sdk 0.50.3
 */
export interface QueryDenomOwnersByQueryResponse {
  denomOwners: DenomOwner[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QuerySendEnabledRequest defines the RPC request for looking up SendEnabled entries.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QuerySendEnabledRequest {
  /** denoms is the specific denoms you want look up. Leave empty to get all entries. */
  denoms: string[];
  /**
   * pagination defines an optional pagination for the request. This field is
   * only read if the denoms field is empty.
   */
  pagination: PageRequest | undefined;
}

/**
 * QuerySendEnabledResponse defines the RPC response of a SendEnable query.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QuerySendEnabledResponse {
  sendEnabled: SendEnabled[];
  /**
   * pagination defines the pagination in the response. This field is only
   * populated if the denoms field in the request is empty.
   */
  pagination: PageResponse | undefined;
}

function createBaseQueryBalanceRequest(): QueryBalanceRequest {
  return { address: "", denom: "" };
}

export const QueryBalanceRequest = {
  encode(message: QueryBalanceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBalanceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalanceRequest();
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

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryBalanceRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: QueryBalanceRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryBalanceRequest>, I>>(base?: I): QueryBalanceRequest {
    return QueryBalanceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryBalanceRequest>, I>>(object: I): QueryBalanceRequest {
    const message = createBaseQueryBalanceRequest();
    message.address = object.address ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryBalanceResponse(): QueryBalanceResponse {
  return { balance: undefined };
}

export const QueryBalanceResponse = {
  encode(message: QueryBalanceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBalanceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.balance = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryBalanceResponse {
    return { balance: isSet(object.balance) ? Coin.fromJSON(object.balance) : undefined };
  },

  toJSON(message: QueryBalanceResponse): unknown {
    const obj: any = {};
    if (message.balance !== undefined) {
      obj.balance = Coin.toJSON(message.balance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryBalanceResponse>, I>>(base?: I): QueryBalanceResponse {
    return QueryBalanceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryBalanceResponse>, I>>(object: I): QueryBalanceResponse {
    const message = createBaseQueryBalanceResponse();
    message.balance = (object.balance !== undefined && object.balance !== null)
      ? Coin.fromPartial(object.balance)
      : undefined;
    return message;
  },
};

function createBaseQueryAllBalancesRequest(): QueryAllBalancesRequest {
  return { address: "", pagination: undefined, resolveDenom: false };
}

export const QueryAllBalancesRequest = {
  encode(message: QueryAllBalancesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.resolveDenom === true) {
      writer.uint32(24).bool(message.resolveDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBalancesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBalancesRequest();
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

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.resolveDenom = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllBalancesRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
      resolveDenom: isSet(object.resolveDenom) ? Boolean(object.resolveDenom) : false,
    };
  },

  toJSON(message: QueryAllBalancesRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    if (message.resolveDenom === true) {
      obj.resolveDenom = message.resolveDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllBalancesRequest>, I>>(base?: I): QueryAllBalancesRequest {
    return QueryAllBalancesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllBalancesRequest>, I>>(object: I): QueryAllBalancesRequest {
    const message = createBaseQueryAllBalancesRequest();
    message.address = object.address ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    message.resolveDenom = object.resolveDenom ?? false;
    return message;
  },
};

function createBaseQueryAllBalancesResponse(): QueryAllBalancesResponse {
  return { balances: [], pagination: undefined };
}

export const QueryAllBalancesResponse = {
  encode(message: QueryAllBalancesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.balances) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBalancesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBalancesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.balances.push(Coin.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllBalancesResponse {
    return {
      balances: Array.isArray(object?.balances) ? object.balances.map((e: any) => Coin.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllBalancesResponse): unknown {
    const obj: any = {};
    if (message.balances?.length) {
      obj.balances = message.balances.map((e) => Coin.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllBalancesResponse>, I>>(base?: I): QueryAllBalancesResponse {
    return QueryAllBalancesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllBalancesResponse>, I>>(object: I): QueryAllBalancesResponse {
    const message = createBaseQueryAllBalancesResponse();
    message.balances = object.balances?.map((e) => Coin.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySpendableBalancesRequest(): QuerySpendableBalancesRequest {
  return { address: "", pagination: undefined };
}

export const QuerySpendableBalancesRequest = {
  encode(message: QuerySpendableBalancesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpendableBalancesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpendableBalancesRequest();
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

  fromJSON(object: any): QuerySpendableBalancesRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QuerySpendableBalancesRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpendableBalancesRequest>, I>>(base?: I): QuerySpendableBalancesRequest {
    return QuerySpendableBalancesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpendableBalancesRequest>, I>>(
    object: I,
  ): QuerySpendableBalancesRequest {
    const message = createBaseQuerySpendableBalancesRequest();
    message.address = object.address ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySpendableBalancesResponse(): QuerySpendableBalancesResponse {
  return { balances: [], pagination: undefined };
}

export const QuerySpendableBalancesResponse = {
  encode(message: QuerySpendableBalancesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.balances) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpendableBalancesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpendableBalancesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.balances.push(Coin.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QuerySpendableBalancesResponse {
    return {
      balances: Array.isArray(object?.balances) ? object.balances.map((e: any) => Coin.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QuerySpendableBalancesResponse): unknown {
    const obj: any = {};
    if (message.balances?.length) {
      obj.balances = message.balances.map((e) => Coin.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpendableBalancesResponse>, I>>(base?: I): QuerySpendableBalancesResponse {
    return QuerySpendableBalancesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpendableBalancesResponse>, I>>(
    object: I,
  ): QuerySpendableBalancesResponse {
    const message = createBaseQuerySpendableBalancesResponse();
    message.balances = object.balances?.map((e) => Coin.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySpendableBalanceByDenomRequest(): QuerySpendableBalanceByDenomRequest {
  return { address: "", denom: "" };
}

export const QuerySpendableBalanceByDenomRequest = {
  encode(message: QuerySpendableBalanceByDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpendableBalanceByDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpendableBalanceByDenomRequest();
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

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpendableBalanceByDenomRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: QuerySpendableBalanceByDenomRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpendableBalanceByDenomRequest>, I>>(
    base?: I,
  ): QuerySpendableBalanceByDenomRequest {
    return QuerySpendableBalanceByDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpendableBalanceByDenomRequest>, I>>(
    object: I,
  ): QuerySpendableBalanceByDenomRequest {
    const message = createBaseQuerySpendableBalanceByDenomRequest();
    message.address = object.address ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQuerySpendableBalanceByDenomResponse(): QuerySpendableBalanceByDenomResponse {
  return { balance: undefined };
}

export const QuerySpendableBalanceByDenomResponse = {
  encode(message: QuerySpendableBalanceByDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpendableBalanceByDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpendableBalanceByDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.balance = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpendableBalanceByDenomResponse {
    return { balance: isSet(object.balance) ? Coin.fromJSON(object.balance) : undefined };
  },

  toJSON(message: QuerySpendableBalanceByDenomResponse): unknown {
    const obj: any = {};
    if (message.balance !== undefined) {
      obj.balance = Coin.toJSON(message.balance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpendableBalanceByDenomResponse>, I>>(
    base?: I,
  ): QuerySpendableBalanceByDenomResponse {
    return QuerySpendableBalanceByDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpendableBalanceByDenomResponse>, I>>(
    object: I,
  ): QuerySpendableBalanceByDenomResponse {
    const message = createBaseQuerySpendableBalanceByDenomResponse();
    message.balance = (object.balance !== undefined && object.balance !== null)
      ? Coin.fromPartial(object.balance)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalSupplyRequest(): QueryTotalSupplyRequest {
  return { pagination: undefined };
}

export const QueryTotalSupplyRequest = {
  encode(message: QueryTotalSupplyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalSupplyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalSupplyRequest();
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

  fromJSON(object: any): QueryTotalSupplyRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryTotalSupplyRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalSupplyRequest>, I>>(base?: I): QueryTotalSupplyRequest {
    return QueryTotalSupplyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalSupplyRequest>, I>>(object: I): QueryTotalSupplyRequest {
    const message = createBaseQueryTotalSupplyRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalSupplyResponse(): QueryTotalSupplyResponse {
  return { supply: [], pagination: undefined };
}

export const QueryTotalSupplyResponse = {
  encode(message: QueryTotalSupplyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.supply) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalSupplyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalSupplyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.supply.push(Coin.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryTotalSupplyResponse {
    return {
      supply: Array.isArray(object?.supply) ? object.supply.map((e: any) => Coin.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryTotalSupplyResponse): unknown {
    const obj: any = {};
    if (message.supply?.length) {
      obj.supply = message.supply.map((e) => Coin.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalSupplyResponse>, I>>(base?: I): QueryTotalSupplyResponse {
    return QueryTotalSupplyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalSupplyResponse>, I>>(object: I): QueryTotalSupplyResponse {
    const message = createBaseQueryTotalSupplyResponse();
    message.supply = object.supply?.map((e) => Coin.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySupplyOfRequest(): QuerySupplyOfRequest {
  return { denom: "" };
}

export const QuerySupplyOfRequest = {
  encode(message: QuerySupplyOfRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyOfRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySupplyOfRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySupplyOfRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: QuerySupplyOfRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySupplyOfRequest>, I>>(base?: I): QuerySupplyOfRequest {
    return QuerySupplyOfRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySupplyOfRequest>, I>>(object: I): QuerySupplyOfRequest {
    const message = createBaseQuerySupplyOfRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQuerySupplyOfResponse(): QuerySupplyOfResponse {
  return { amount: undefined };
}

export const QuerySupplyOfResponse = {
  encode(message: QuerySupplyOfResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyOfResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySupplyOfResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySupplyOfResponse {
    return { amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined };
  },

  toJSON(message: QuerySupplyOfResponse): unknown {
    const obj: any = {};
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySupplyOfResponse>, I>>(base?: I): QuerySupplyOfResponse {
    return QuerySupplyOfResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySupplyOfResponse>, I>>(object: I): QuerySupplyOfResponse {
    const message = createBaseQuerySupplyOfResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
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

function createBaseQueryDenomsMetadataRequest(): QueryDenomsMetadataRequest {
  return { pagination: undefined };
}

export const QueryDenomsMetadataRequest = {
  encode(message: QueryDenomsMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsMetadataRequest();
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

  fromJSON(object: any): QueryDenomsMetadataRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryDenomsMetadataRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomsMetadataRequest>, I>>(base?: I): QueryDenomsMetadataRequest {
    return QueryDenomsMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomsMetadataRequest>, I>>(object: I): QueryDenomsMetadataRequest {
    const message = createBaseQueryDenomsMetadataRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomsMetadataResponse(): QueryDenomsMetadataResponse {
  return { metadatas: [], pagination: undefined };
}

export const QueryDenomsMetadataResponse = {
  encode(message: QueryDenomsMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.metadatas) {
      Metadata.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metadatas.push(Metadata.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDenomsMetadataResponse {
    return {
      metadatas: Array.isArray(object?.metadatas) ? object.metadatas.map((e: any) => Metadata.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomsMetadataResponse): unknown {
    const obj: any = {};
    if (message.metadatas?.length) {
      obj.metadatas = message.metadatas.map((e) => Metadata.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomsMetadataResponse>, I>>(base?: I): QueryDenomsMetadataResponse {
    return QueryDenomsMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomsMetadataResponse>, I>>(object: I): QueryDenomsMetadataResponse {
    const message = createBaseQueryDenomsMetadataResponse();
    message.metadatas = object.metadatas?.map((e) => Metadata.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomMetadataRequest(): QueryDenomMetadataRequest {
  return { denom: "" };
}

export const QueryDenomMetadataRequest = {
  encode(message: QueryDenomMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomMetadataRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: QueryDenomMetadataRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomMetadataRequest>, I>>(base?: I): QueryDenomMetadataRequest {
    return QueryDenomMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomMetadataRequest>, I>>(object: I): QueryDenomMetadataRequest {
    const message = createBaseQueryDenomMetadataRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryDenomMetadataResponse(): QueryDenomMetadataResponse {
  return { metadata: undefined };
}

export const QueryDenomMetadataResponse = {
  encode(message: QueryDenomMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metadata = Metadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomMetadataResponse {
    return { metadata: isSet(object.metadata) ? Metadata.fromJSON(object.metadata) : undefined };
  },

  toJSON(message: QueryDenomMetadataResponse): unknown {
    const obj: any = {};
    if (message.metadata !== undefined) {
      obj.metadata = Metadata.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomMetadataResponse>, I>>(base?: I): QueryDenomMetadataResponse {
    return QueryDenomMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomMetadataResponse>, I>>(object: I): QueryDenomMetadataResponse {
    const message = createBaseQueryDenomMetadataResponse();
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Metadata.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomMetadataByQueryStringRequest(): QueryDenomMetadataByQueryStringRequest {
  return { denom: "" };
}

export const QueryDenomMetadataByQueryStringRequest = {
  encode(message: QueryDenomMetadataByQueryStringRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomMetadataByQueryStringRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomMetadataByQueryStringRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomMetadataByQueryStringRequest {
    return { denom: isSet(object.denom) ? String(object.denom) : "" };
  },

  toJSON(message: QueryDenomMetadataByQueryStringRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomMetadataByQueryStringRequest>, I>>(
    base?: I,
  ): QueryDenomMetadataByQueryStringRequest {
    return QueryDenomMetadataByQueryStringRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomMetadataByQueryStringRequest>, I>>(
    object: I,
  ): QueryDenomMetadataByQueryStringRequest {
    const message = createBaseQueryDenomMetadataByQueryStringRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryDenomMetadataByQueryStringResponse(): QueryDenomMetadataByQueryStringResponse {
  return { metadata: undefined };
}

export const QueryDenomMetadataByQueryStringResponse = {
  encode(message: QueryDenomMetadataByQueryStringResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomMetadataByQueryStringResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomMetadataByQueryStringResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metadata = Metadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomMetadataByQueryStringResponse {
    return { metadata: isSet(object.metadata) ? Metadata.fromJSON(object.metadata) : undefined };
  },

  toJSON(message: QueryDenomMetadataByQueryStringResponse): unknown {
    const obj: any = {};
    if (message.metadata !== undefined) {
      obj.metadata = Metadata.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomMetadataByQueryStringResponse>, I>>(
    base?: I,
  ): QueryDenomMetadataByQueryStringResponse {
    return QueryDenomMetadataByQueryStringResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomMetadataByQueryStringResponse>, I>>(
    object: I,
  ): QueryDenomMetadataByQueryStringResponse {
    const message = createBaseQueryDenomMetadataByQueryStringResponse();
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Metadata.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomOwnersRequest(): QueryDenomOwnersRequest {
  return { denom: "", pagination: undefined };
}

export const QueryDenomOwnersRequest = {
  encode(message: QueryDenomOwnersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomOwnersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomOwnersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
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

  fromJSON(object: any): QueryDenomOwnersRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomOwnersRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomOwnersRequest>, I>>(base?: I): QueryDenomOwnersRequest {
    return QueryDenomOwnersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomOwnersRequest>, I>>(object: I): QueryDenomOwnersRequest {
    const message = createBaseQueryDenomOwnersRequest();
    message.denom = object.denom ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseDenomOwner(): DenomOwner {
  return { address: "", balance: undefined };
}

export const DenomOwner = {
  encode(message: DenomOwner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DenomOwner {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomOwner();
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

          message.balance = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DenomOwner {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      balance: isSet(object.balance) ? Coin.fromJSON(object.balance) : undefined,
    };
  },

  toJSON(message: DenomOwner): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.balance !== undefined) {
      obj.balance = Coin.toJSON(message.balance);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DenomOwner>, I>>(base?: I): DenomOwner {
    return DenomOwner.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DenomOwner>, I>>(object: I): DenomOwner {
    const message = createBaseDenomOwner();
    message.address = object.address ?? "";
    message.balance = (object.balance !== undefined && object.balance !== null)
      ? Coin.fromPartial(object.balance)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomOwnersResponse(): QueryDenomOwnersResponse {
  return { denomOwners: [], pagination: undefined };
}

export const QueryDenomOwnersResponse = {
  encode(message: QueryDenomOwnersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denomOwners) {
      DenomOwner.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomOwnersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomOwnersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomOwners.push(DenomOwner.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDenomOwnersResponse {
    return {
      denomOwners: Array.isArray(object?.denomOwners) ? object.denomOwners.map((e: any) => DenomOwner.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomOwnersResponse): unknown {
    const obj: any = {};
    if (message.denomOwners?.length) {
      obj.denomOwners = message.denomOwners.map((e) => DenomOwner.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomOwnersResponse>, I>>(base?: I): QueryDenomOwnersResponse {
    return QueryDenomOwnersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomOwnersResponse>, I>>(object: I): QueryDenomOwnersResponse {
    const message = createBaseQueryDenomOwnersResponse();
    message.denomOwners = object.denomOwners?.map((e) => DenomOwner.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomOwnersByQueryRequest(): QueryDenomOwnersByQueryRequest {
  return { denom: "", pagination: undefined };
}

export const QueryDenomOwnersByQueryRequest = {
  encode(message: QueryDenomOwnersByQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomOwnersByQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomOwnersByQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
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

  fromJSON(object: any): QueryDenomOwnersByQueryRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomOwnersByQueryRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomOwnersByQueryRequest>, I>>(base?: I): QueryDenomOwnersByQueryRequest {
    return QueryDenomOwnersByQueryRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomOwnersByQueryRequest>, I>>(
    object: I,
  ): QueryDenomOwnersByQueryRequest {
    const message = createBaseQueryDenomOwnersByQueryRequest();
    message.denom = object.denom ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomOwnersByQueryResponse(): QueryDenomOwnersByQueryResponse {
  return { denomOwners: [], pagination: undefined };
}

export const QueryDenomOwnersByQueryResponse = {
  encode(message: QueryDenomOwnersByQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denomOwners) {
      DenomOwner.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomOwnersByQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomOwnersByQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomOwners.push(DenomOwner.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDenomOwnersByQueryResponse {
    return {
      denomOwners: Array.isArray(object?.denomOwners) ? object.denomOwners.map((e: any) => DenomOwner.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomOwnersByQueryResponse): unknown {
    const obj: any = {};
    if (message.denomOwners?.length) {
      obj.denomOwners = message.denomOwners.map((e) => DenomOwner.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomOwnersByQueryResponse>, I>>(base?: I): QueryDenomOwnersByQueryResponse {
    return QueryDenomOwnersByQueryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomOwnersByQueryResponse>, I>>(
    object: I,
  ): QueryDenomOwnersByQueryResponse {
    const message = createBaseQueryDenomOwnersByQueryResponse();
    message.denomOwners = object.denomOwners?.map((e) => DenomOwner.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySendEnabledRequest(): QuerySendEnabledRequest {
  return { denoms: [], pagination: undefined };
}

export const QuerySendEnabledRequest = {
  encode(message: QuerySendEnabledRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denoms) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(794).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySendEnabledRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySendEnabledRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denoms.push(reader.string());
          continue;
        case 99:
          if (tag !== 794) {
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

  fromJSON(object: any): QuerySendEnabledRequest {
    return {
      denoms: Array.isArray(object?.denoms) ? object.denoms.map((e: any) => String(e)) : [],
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QuerySendEnabledRequest): unknown {
    const obj: any = {};
    if (message.denoms?.length) {
      obj.denoms = message.denoms;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySendEnabledRequest>, I>>(base?: I): QuerySendEnabledRequest {
    return QuerySendEnabledRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySendEnabledRequest>, I>>(object: I): QuerySendEnabledRequest {
    const message = createBaseQuerySendEnabledRequest();
    message.denoms = object.denoms?.map((e) => e) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySendEnabledResponse(): QuerySendEnabledResponse {
  return { sendEnabled: [], pagination: undefined };
}

export const QuerySendEnabledResponse = {
  encode(message: QuerySendEnabledResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sendEnabled) {
      SendEnabled.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(794).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySendEnabledResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySendEnabledResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sendEnabled.push(SendEnabled.decode(reader, reader.uint32()));
          continue;
        case 99:
          if (tag !== 794) {
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

  fromJSON(object: any): QuerySendEnabledResponse {
    return {
      sendEnabled: Array.isArray(object?.sendEnabled)
        ? object.sendEnabled.map((e: any) => SendEnabled.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QuerySendEnabledResponse): unknown {
    const obj: any = {};
    if (message.sendEnabled?.length) {
      obj.sendEnabled = message.sendEnabled.map((e) => SendEnabled.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySendEnabledResponse>, I>>(base?: I): QuerySendEnabledResponse {
    return QuerySendEnabledResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySendEnabledResponse>, I>>(object: I): QuerySendEnabledResponse {
    const message = createBaseQuerySendEnabledResponse();
    message.sendEnabled = object.sendEnabled?.map((e) => SendEnabled.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Balance queries the balance of a single coin for a single account. */
  Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
  /**
   * AllBalances queries the balance of all coins for a single account.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  AllBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse>;
  /**
   * SpendableBalances queries the spendable balance of all coins for a single
   * account.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   *
   * Since: cosmos-sdk 0.46
   */
  SpendableBalances(request: QuerySpendableBalancesRequest): Promise<QuerySpendableBalancesResponse>;
  /**
   * SpendableBalanceByDenom queries the spendable balance of a single denom for
   * a single account.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   *
   * Since: cosmos-sdk 0.47
   */
  SpendableBalanceByDenom(request: QuerySpendableBalanceByDenomRequest): Promise<QuerySpendableBalanceByDenomResponse>;
  /**
   * TotalSupply queries the total supply of all coins.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  TotalSupply(request: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse>;
  /**
   * SupplyOf queries the supply of a single coin.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  SupplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse>;
  /** Params queries the parameters of x/bank module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** DenomMetadata queries the client metadata of a given coin denomination. */
  DenomMetadata(request: QueryDenomMetadataRequest): Promise<QueryDenomMetadataResponse>;
  /** DenomMetadataByQueryString queries the client metadata of a given coin denomination. */
  DenomMetadataByQueryString(
    request: QueryDenomMetadataByQueryStringRequest,
  ): Promise<QueryDenomMetadataByQueryStringResponse>;
  /**
   * DenomsMetadata queries the client metadata for all registered coin
   * denominations.
   */
  DenomsMetadata(request: QueryDenomsMetadataRequest): Promise<QueryDenomsMetadataResponse>;
  /**
   * DenomOwners queries for all account addresses that own a particular token
   * denomination.
   *
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   *
   * Since: cosmos-sdk 0.46
   */
  DenomOwners(request: QueryDenomOwnersRequest): Promise<QueryDenomOwnersResponse>;
  /**
   * DenomOwnersByQuery queries for all account addresses that own a particular token
   * denomination.
   *
   * Since: cosmos-sdk 0.50.3
   */
  DenomOwnersByQuery(request: QueryDenomOwnersByQueryRequest): Promise<QueryDenomOwnersByQueryResponse>;
  /**
   * SendEnabled queries for SendEnabled entries.
   *
   * This query only returns denominations that have specific SendEnabled settings.
   * Any denomination that does not have a specific setting will use the default
   * params.default_send_enabled, and will not be returned by this query.
   *
   * Since: cosmos-sdk 0.47
   */
  SendEnabled(request: QuerySendEnabledRequest): Promise<QuerySendEnabledResponse>;
}

export const QueryServiceName = "cosmos.bank.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Balance = this.Balance.bind(this);
    this.AllBalances = this.AllBalances.bind(this);
    this.SpendableBalances = this.SpendableBalances.bind(this);
    this.SpendableBalanceByDenom = this.SpendableBalanceByDenom.bind(this);
    this.TotalSupply = this.TotalSupply.bind(this);
    this.SupplyOf = this.SupplyOf.bind(this);
    this.Params = this.Params.bind(this);
    this.DenomMetadata = this.DenomMetadata.bind(this);
    this.DenomMetadataByQueryString = this.DenomMetadataByQueryString.bind(this);
    this.DenomsMetadata = this.DenomsMetadata.bind(this);
    this.DenomOwners = this.DenomOwners.bind(this);
    this.DenomOwnersByQuery = this.DenomOwnersByQuery.bind(this);
    this.SendEnabled = this.SendEnabled.bind(this);
  }
  Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse> {
    const data = QueryBalanceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Balance", data);
    return promise.then((data) => QueryBalanceResponse.decode(_m0.Reader.create(data)));
  }

  AllBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse> {
    const data = QueryAllBalancesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllBalances", data);
    return promise.then((data) => QueryAllBalancesResponse.decode(_m0.Reader.create(data)));
  }

  SpendableBalances(request: QuerySpendableBalancesRequest): Promise<QuerySpendableBalancesResponse> {
    const data = QuerySpendableBalancesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpendableBalances", data);
    return promise.then((data) => QuerySpendableBalancesResponse.decode(_m0.Reader.create(data)));
  }

  SpendableBalanceByDenom(request: QuerySpendableBalanceByDenomRequest): Promise<QuerySpendableBalanceByDenomResponse> {
    const data = QuerySpendableBalanceByDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpendableBalanceByDenom", data);
    return promise.then((data) => QuerySpendableBalanceByDenomResponse.decode(_m0.Reader.create(data)));
  }

  TotalSupply(request: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse> {
    const data = QueryTotalSupplyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalSupply", data);
    return promise.then((data) => QueryTotalSupplyResponse.decode(_m0.Reader.create(data)));
  }

  SupplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse> {
    const data = QuerySupplyOfRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SupplyOf", data);
    return promise.then((data) => QuerySupplyOfResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  DenomMetadata(request: QueryDenomMetadataRequest): Promise<QueryDenomMetadataResponse> {
    const data = QueryDenomMetadataRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomMetadata", data);
    return promise.then((data) => QueryDenomMetadataResponse.decode(_m0.Reader.create(data)));
  }

  DenomMetadataByQueryString(
    request: QueryDenomMetadataByQueryStringRequest,
  ): Promise<QueryDenomMetadataByQueryStringResponse> {
    const data = QueryDenomMetadataByQueryStringRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomMetadataByQueryString", data);
    return promise.then((data) => QueryDenomMetadataByQueryStringResponse.decode(_m0.Reader.create(data)));
  }

  DenomsMetadata(request: QueryDenomsMetadataRequest): Promise<QueryDenomsMetadataResponse> {
    const data = QueryDenomsMetadataRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomsMetadata", data);
    return promise.then((data) => QueryDenomsMetadataResponse.decode(_m0.Reader.create(data)));
  }

  DenomOwners(request: QueryDenomOwnersRequest): Promise<QueryDenomOwnersResponse> {
    const data = QueryDenomOwnersRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomOwners", data);
    return promise.then((data) => QueryDenomOwnersResponse.decode(_m0.Reader.create(data)));
  }

  DenomOwnersByQuery(request: QueryDenomOwnersByQueryRequest): Promise<QueryDenomOwnersByQueryResponse> {
    const data = QueryDenomOwnersByQueryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomOwnersByQuery", data);
    return promise.then((data) => QueryDenomOwnersByQueryResponse.decode(_m0.Reader.create(data)));
  }

  SendEnabled(request: QuerySendEnabledRequest): Promise<QuerySendEnabledResponse> {
    const data = QuerySendEnabledRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SendEnabled", data);
    return promise.then((data) => QuerySendEnabledResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
