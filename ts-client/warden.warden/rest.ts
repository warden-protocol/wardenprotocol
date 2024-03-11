/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Any {
  "@type"?: string;
}

export interface Status {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: { "@type"?: string }[];
}

export interface Key {
  /** @format uint64 */
  id?: string;

  /** @format uint64 */
  space_id?: string;

  /** @format uint64 */
  keychain_id?: string;
  type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";

  /** @format byte */
  public_key?: string;
}

export interface KeyRequest {
  /** @format uint64 */
  id?: string;
  creator?: string;

  /** @format uint64 */
  space_id?: string;

  /** @format uint64 */
  keychain_id?: string;
  key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
  status?:
    | "KEY_REQUEST_STATUS_UNSPECIFIED"
    | "KEY_REQUEST_STATUS_PENDING"
    | "KEY_REQUEST_STATUS_FULFILLED"
    | "KEY_REQUEST_STATUS_REJECTED";
  reject_reason?: string;
}

export enum KeyRequestStatus {
  KEY_REQUEST_STATUS_UNSPECIFIED = "KEY_REQUEST_STATUS_UNSPECIFIED",
  KEY_REQUEST_STATUS_PENDING = "KEY_REQUEST_STATUS_PENDING",
  KEY_REQUEST_STATUS_FULFILLED = "KEY_REQUEST_STATUS_FULFILLED",
  KEY_REQUEST_STATUS_REJECTED = "KEY_REQUEST_STATUS_REJECTED",
}

export interface KeyResponse {
  key?: {
    id?: string;
    space_id?: string;
    keychain_id?: string;
    type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
    public_key?: string;
  };
  wallets?: {
    address?: string;
    type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
  }[];
}

export enum KeyType {
  KEY_TYPE_UNSPECIFIED = "KEY_TYPE_UNSPECIFIED",
  KEYTYPEECDSASECP256K1 = "KEY_TYPE_ECDSA_SECP256K1",
  KEYTYPEEDDSAED25519 = "KEY_TYPE_EDDSA_ED25519",
}

export interface Keychain {
  /** @format uint64 */
  id?: string;
  creator?: string;
  description?: string;
  admins?: string[];
  parties?: string[];

  /** @format uint64 */
  admin_intent_id?: string;
  fees?: { key_req?: string; sig_req?: string };
  is_active?: boolean;
}

export interface KeychainFees {
  /** @format int64 */
  key_req?: string;

  /** @format int64 */
  sig_req?: string;
}

export interface PageRequest {
  /** @format byte */
  key?: string;

  /** @format uint64 */
  offset?: string;

  /** @format uint64 */
  limit?: string;
  count_total?: boolean;
  reverse?: boolean;
}

export interface PageResponse {
  /** @format byte */
  next_key?: string;

  /** @format uint64 */
  total?: string;
}

export type Params = object;

export interface QueryKeyRequestByIdResponse {
  key_request?: {
    id?: string;
    creator?: string;
    space_id?: string;
    keychain_id?: string;
    key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
    status?:
      | "KEY_REQUEST_STATUS_UNSPECIFIED"
      | "KEY_REQUEST_STATUS_PENDING"
      | "KEY_REQUEST_STATUS_FULFILLED"
      | "KEY_REQUEST_STATUS_REJECTED";
    reject_reason?: string;
  };
}

export interface QueryKeyRequestsResponse {
  pagination?: { next_key?: string; total?: string };
  key_requests?: {
    id?: string;
    creator?: string;
    space_id?: string;
    keychain_id?: string;
    key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
    status?:
      | "KEY_REQUEST_STATUS_UNSPECIFIED"
      | "KEY_REQUEST_STATUS_PENDING"
      | "KEY_REQUEST_STATUS_FULFILLED"
      | "KEY_REQUEST_STATUS_REJECTED";
    reject_reason?: string;
  }[];
}

export interface QueryKeychainByIdResponse {
  keychain?: {
    id?: string;
    creator?: string;
    description?: string;
    admins?: string[];
    parties?: string[];
    admin_intent_id?: string;
    fees?: { key_req?: string; sig_req?: string };
    is_active?: boolean;
  };
}

export interface QueryKeychainsResponse {
  pagination?: { next_key?: string; total?: string };
  keychains?: {
    id?: string;
    creator?: string;
    description?: string;
    admins?: string[];
    parties?: string[];
    admin_intent_id?: string;
    fees?: { key_req?: string; sig_req?: string };
    is_active?: boolean;
  }[];
}

export interface QueryKeysResponse {
  pagination?: { next_key?: string; total?: string };
  keys?: {
    key?: {
      id?: string;
      space_id?: string;
      keychain_id?: string;
      type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
      public_key?: string;
    };
    wallets?: {
      address?: string;
      type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
    }[];
  }[];
}

export interface QueryParamsResponse {
  params?: object;
}

export interface QuerySignTransactionRequestByIdResponse {
  sign_transaction_request?: {
    id?: string;
    creator?: string;
    key_id?: string;
    wallet_type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
    unsigned_transaction?: string;
    sign_request_id?: string;
  };
}

export interface QuerySignTransactionRequestsResponse {
  pagination?: { next_key?: string; total?: string };
  sign_transaction_requests?: {
    sign_transaction_request?: {
      id?: string;
      creator?: string;
      key_id?: string;
      wallet_type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
      unsigned_transaction?: string;
      sign_request_id?: string;
    };
    sign_request?: {
      id?: string;
      creator?: string;
      key_id?: string;
      data_for_signing?: string;
      status?:
        | "SIGN_REQUEST_STATUS_UNSPECIFIED"
        | "SIGN_REQUEST_STATUS_PENDING"
        | "SIGN_REQUEST_STATUS_FULFILLED"
        | "SIGN_REQUEST_STATUS_REJECTED";
      key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
      signed_data?: string;
      reject_reason?: string;
    };
  }[];
}

export interface QuerySignatureRequestByIdResponse {
  sign_request?: {
    id?: string;
    creator?: string;
    key_id?: string;
    data_for_signing?: string;
    status?:
      | "SIGN_REQUEST_STATUS_UNSPECIFIED"
      | "SIGN_REQUEST_STATUS_PENDING"
      | "SIGN_REQUEST_STATUS_FULFILLED"
      | "SIGN_REQUEST_STATUS_REJECTED";
    key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
    signed_data?: string;
    reject_reason?: string;
  };
}

export interface QuerySignatureRequestsResponse {
  pagination?: { next_key?: string; total?: string };
  sign_requests?: {
    id?: string;
    creator?: string;
    key_id?: string;
    data_for_signing?: string;
    status?:
      | "SIGN_REQUEST_STATUS_UNSPECIFIED"
      | "SIGN_REQUEST_STATUS_PENDING"
      | "SIGN_REQUEST_STATUS_FULFILLED"
      | "SIGN_REQUEST_STATUS_REJECTED";
    key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
    signed_data?: string;
    reject_reason?: string;
  }[];
}

export interface QuerySpaceByIdResponse {
  space?: { id?: string; creator?: string; owners?: string[]; admin_intent_id?: string; sign_intent_id?: string };
}

export interface QuerySpacesResponse {
  pagination?: { next_key?: string; total?: string };
  spaces?: { id?: string; creator?: string; owners?: string[]; admin_intent_id?: string; sign_intent_id?: string }[];
}

export interface SignRequest {
  /** @format uint64 */
  id?: string;
  creator?: string;

  /** @format uint64 */
  key_id?: string;

  /** @format byte */
  data_for_signing?: string;
  status?:
    | "SIGN_REQUEST_STATUS_UNSPECIFIED"
    | "SIGN_REQUEST_STATUS_PENDING"
    | "SIGN_REQUEST_STATUS_FULFILLED"
    | "SIGN_REQUEST_STATUS_REJECTED";
  key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";

  /** @format byte */
  signed_data?: string;
  reject_reason?: string;
}

export enum SignRequestStatus {
  SIGN_REQUEST_STATUS_UNSPECIFIED = "SIGN_REQUEST_STATUS_UNSPECIFIED",
  SIGN_REQUEST_STATUS_PENDING = "SIGN_REQUEST_STATUS_PENDING",
  SIGN_REQUEST_STATUS_FULFILLED = "SIGN_REQUEST_STATUS_FULFILLED",
  SIGN_REQUEST_STATUS_REJECTED = "SIGN_REQUEST_STATUS_REJECTED",
}

export interface SignTransactionRequest {
  /** @format uint64 */
  id?: string;
  creator?: string;

  /** @format uint64 */
  key_id?: string;
  wallet_type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";

  /** @format byte */
  unsigned_transaction?: string;

  /** @format uint64 */
  sign_request_id?: string;
}

export interface SignTransactionRequestResponse {
  sign_transaction_request?: {
    id?: string;
    creator?: string;
    key_id?: string;
    wallet_type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
    unsigned_transaction?: string;
    sign_request_id?: string;
  };
  sign_request?: {
    id?: string;
    creator?: string;
    key_id?: string;
    data_for_signing?: string;
    status?:
      | "SIGN_REQUEST_STATUS_UNSPECIFIED"
      | "SIGN_REQUEST_STATUS_PENDING"
      | "SIGN_REQUEST_STATUS_FULFILLED"
      | "SIGN_REQUEST_STATUS_REJECTED";
    key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
    signed_data?: string;
    reject_reason?: string;
  };
}

export interface Space {
  /** @format uint64 */
  id?: string;
  creator?: string;
  owners?: string[];

  /** @format uint64 */
  admin_intent_id?: string;

  /** @format uint64 */
  sign_intent_id?: string;
}

export interface WalletKeyResponse {
  address?: string;
  type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
}

export enum WalletType {
  WALLET_TYPE_UNSPECIFIED = "WALLET_TYPE_UNSPECIFIED",
  WALLET_TYPE_ETH = "WALLET_TYPE_ETH",
  WALLET_TYPE_CELESTIA = "WALLET_TYPE_CELESTIA",
  WALLET_TYPE_SUI = "WALLET_TYPE_SUI",
}

export interface Action {
  /** @format uint64 */
  id?: string;
  approvers?: { address?: string; approved_at?: string }[];
  status?:
    | "ACTION_STATUS_UNSPECIFIED"
    | "ACTION_STATUS_PENDING"
    | "ACTION_STATUS_COMPLETED"
    | "ACTION_STATUS_REVOKED"
    | "ACTION_STATUS_TIMEOUT";

  /** @format uint64 */
  intent_id?: string;
  msg?: { "@type"?: string };
  result?: { "@type"?: string };
  creator?: string;

  /** @format uint64 */
  btl?: string;

  /** @format date-time */
  created_at?: string;

  /** @format date-time */
  updated_at?: string;
}

export enum ActionStatus {
  ACTION_STATUS_UNSPECIFIED = "ACTION_STATUS_UNSPECIFIED",
  ACTION_STATUS_PENDING = "ACTION_STATUS_PENDING",
  ACTION_STATUS_COMPLETED = "ACTION_STATUS_COMPLETED",
  ACTION_STATUS_REVOKED = "ACTION_STATUS_REVOKED",
  ACTION_STATUS_TIMEOUT = "ACTION_STATUS_TIMEOUT",
}

export interface Approver {
  address?: string;

  /** @format date-time */
  approved_at?: string;
}

export interface MsgActionCreated {
  action?: {
    id?: string;
    approvers?: { address?: string; approved_at?: string }[];
    status?:
      | "ACTION_STATUS_UNSPECIFIED"
      | "ACTION_STATUS_PENDING"
      | "ACTION_STATUS_COMPLETED"
      | "ACTION_STATUS_REVOKED"
      | "ACTION_STATUS_TIMEOUT";
    intent_id?: string;
    msg?: { "@type"?: string };
    result?: { "@type"?: string };
    creator?: string;
    btl?: string;
    created_at?: string;
    updated_at?: string;
  };
}

export type MsgAddKeychainPartyResponse = object;

export type MsgFulfilSignatureRequestResponse = object;

export interface MsgNewKey {
  /** @format byte */
  public_key?: string;
}

export interface MsgNewKeychainResponse {
  /** @format uint64 */
  id?: string;
}

export interface MsgNewSpaceResponse {
  /** @format uint64 */
  id?: string;
}

export interface MsgSignedData {
  /** @format byte */
  signed_data?: string;
}

export type MsgUpdateKeyRequestResponse = object;

export type MsgUpdateKeychainResponse = object;

export type MsgUpdateParamsResponse = object;

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title HTTP API Console warden.warden
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QuerySignatureRequests
   * @request GET:/wardenprotocol/warden/warden/get_signature_requests
   */
  querySignatureRequests = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      keychain_id?: string;
      status?:
        | "SIGN_REQUEST_STATUS_UNSPECIFIED"
        | "SIGN_REQUEST_STATUS_PENDING"
        | "SIGN_REQUEST_STATUS_FULFILLED"
        | "SIGN_REQUEST_STATUS_REJECTED";
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        pagination?: { next_key?: string; total?: string };
        sign_requests?: {
          id?: string;
          creator?: string;
          key_id?: string;
          data_for_signing?: string;
          status?:
            | "SIGN_REQUEST_STATUS_UNSPECIFIED"
            | "SIGN_REQUEST_STATUS_PENDING"
            | "SIGN_REQUEST_STATUS_FULFILLED"
            | "SIGN_REQUEST_STATUS_REJECTED";
          key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
          signed_data?: string;
          reject_reason?: string;
        }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/get_signature_requests`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryKeyRequestById
   * @request GET:/wardenprotocol/warden/warden/key_request_by_id
   */
  queryKeyRequestById = (query?: { id?: string }, params: RequestParams = {}) =>
    this.request<
      {
        key_request?: {
          id?: string;
          creator?: string;
          space_id?: string;
          keychain_id?: string;
          key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
          status?:
            | "KEY_REQUEST_STATUS_UNSPECIFIED"
            | "KEY_REQUEST_STATUS_PENDING"
            | "KEY_REQUEST_STATUS_FULFILLED"
            | "KEY_REQUEST_STATUS_REJECTED";
          reject_reason?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/key_request_by_id`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryKeyRequests
   * @request GET:/wardenprotocol/warden/warden/key_requests
   */
  queryKeyRequests = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      keychain_id?: string;
      status?:
        | "KEY_REQUEST_STATUS_UNSPECIFIED"
        | "KEY_REQUEST_STATUS_PENDING"
        | "KEY_REQUEST_STATUS_FULFILLED"
        | "KEY_REQUEST_STATUS_REJECTED";
      space_id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        pagination?: { next_key?: string; total?: string };
        key_requests?: {
          id?: string;
          creator?: string;
          space_id?: string;
          keychain_id?: string;
          key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
          status?:
            | "KEY_REQUEST_STATUS_UNSPECIFIED"
            | "KEY_REQUEST_STATUS_PENDING"
            | "KEY_REQUEST_STATUS_FULFILLED"
            | "KEY_REQUEST_STATUS_REJECTED";
          reject_reason?: string;
        }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/key_requests`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryKeychainById
   * @request GET:/wardenprotocol/warden/warden/keychain_by_id
   */
  queryKeychainById = (query?: { id?: string }, params: RequestParams = {}) =>
    this.request<
      {
        keychain?: {
          id?: string;
          creator?: string;
          description?: string;
          admins?: string[];
          parties?: string[];
          admin_intent_id?: string;
          fees?: { key_req?: string; sig_req?: string };
          is_active?: boolean;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/keychain_by_id`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryKeychains
   * @request GET:/wardenprotocol/warden/warden/keychains
   */
  queryKeychains = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        pagination?: { next_key?: string; total?: string };
        keychains?: {
          id?: string;
          creator?: string;
          description?: string;
          admins?: string[];
          parties?: string[];
          admin_intent_id?: string;
          fees?: { key_req?: string; sig_req?: string };
          is_active?: boolean;
        }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/keychains`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryKeys
   * @request GET:/wardenprotocol/warden/warden/keys
   */
  queryKeys = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      space_id?: string;
      type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
      key_id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        pagination?: { next_key?: string; total?: string };
        keys?: {
          key?: {
            id?: string;
            space_id?: string;
            keychain_id?: string;
            type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
            public_key?: string;
          };
          wallets?: {
            address?: string;
            type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
          }[];
        }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/keys`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/wardenprotocol/warden/warden/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<{ params?: object }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/wardenprotocol/warden/warden/params`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySignTransactionRequestById
   * @request GET:/wardenprotocol/warden/warden/sign_transaction_request_by_id
   */
  querySignTransactionRequestById = (query?: { id?: string }, params: RequestParams = {}) =>
    this.request<
      {
        sign_transaction_request?: {
          id?: string;
          creator?: string;
          key_id?: string;
          wallet_type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
          unsigned_transaction?: string;
          sign_request_id?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/sign_transaction_request_by_id`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySignTransactionRequests
   * @request GET:/wardenprotocol/warden/warden/sign_transaction_requests
   */
  querySignTransactionRequests = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      wallet_type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
      key_id?: string;
      status?:
        | "SIGN_REQUEST_STATUS_UNSPECIFIED"
        | "SIGN_REQUEST_STATUS_PENDING"
        | "SIGN_REQUEST_STATUS_FULFILLED"
        | "SIGN_REQUEST_STATUS_REJECTED";
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        pagination?: { next_key?: string; total?: string };
        sign_transaction_requests?: {
          sign_transaction_request?: {
            id?: string;
            creator?: string;
            key_id?: string;
            wallet_type?: "WALLET_TYPE_UNSPECIFIED" | "WALLET_TYPE_ETH" | "WALLET_TYPE_CELESTIA" | "WALLET_TYPE_SUI";
            unsigned_transaction?: string;
            sign_request_id?: string;
          };
          sign_request?: {
            id?: string;
            creator?: string;
            key_id?: string;
            data_for_signing?: string;
            status?:
              | "SIGN_REQUEST_STATUS_UNSPECIFIED"
              | "SIGN_REQUEST_STATUS_PENDING"
              | "SIGN_REQUEST_STATUS_FULFILLED"
              | "SIGN_REQUEST_STATUS_REJECTED";
            key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
            signed_data?: string;
            reject_reason?: string;
          };
        }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/sign_transaction_requests`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySignatureRequestById
   * @request GET:/wardenprotocol/warden/warden/signature_pb_request_by_id
   */
  querySignatureRequestById = (query?: { id?: string }, params: RequestParams = {}) =>
    this.request<
      {
        sign_request?: {
          id?: string;
          creator?: string;
          key_id?: string;
          data_for_signing?: string;
          status?:
            | "SIGN_REQUEST_STATUS_UNSPECIFIED"
            | "SIGN_REQUEST_STATUS_PENDING"
            | "SIGN_REQUEST_STATUS_FULFILLED"
            | "SIGN_REQUEST_STATUS_REJECTED";
          key_type?: "KEY_TYPE_UNSPECIFIED" | "KEY_TYPE_ECDSA_SECP256K1" | "KEY_TYPE_EDDSA_ED25519";
          signed_data?: string;
          reject_reason?: string;
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/signature_pb_request_by_id`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySpaceById
   * @request GET:/wardenprotocol/warden/warden/space_by_address
   */
  querySpaceById = (query?: { id?: string }, params: RequestParams = {}) =>
    this.request<
      {
        space?: { id?: string; creator?: string; owners?: string[]; admin_intent_id?: string; sign_intent_id?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/space_by_address`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySpaces
   * @request GET:/wardenprotocol/warden/warden/spaces
   */
  querySpaces = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        pagination?: { next_key?: string; total?: string };
        spaces?: {
          id?: string;
          creator?: string;
          owners?: string[];
          admin_intent_id?: string;
          sign_intent_id?: string;
        }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/spaces`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySpacesByOwner
   * @request GET:/wardenprotocol/warden/warden/spaces_by_owner
   */
  querySpacesByOwner = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      owner?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        pagination?: { next_key?: string; total?: string };
        spaces?: {
          id?: string;
          creator?: string;
          owners?: string[];
          admin_intent_id?: string;
          sign_intent_id?: string;
        }[];
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/wardenprotocol/warden/warden/spaces_by_owner`,
      method: "GET",
      query: query,
      ...params,
    });
}
