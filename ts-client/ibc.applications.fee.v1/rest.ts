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

export interface Coin {
  denom?: string;
  amount?: string;
}

export interface Fee {
  recv_fee?: { denom?: string; amount?: string }[];
  ack_fee?: { denom?: string; amount?: string }[];
  timeout_fee?: { denom?: string; amount?: string }[];
}

export interface IdentifiedPacketFees {
  packet_id?: { port_id?: string; channel_id?: string; sequence?: string };
  packet_fees?: {
    fee?: {
      recv_fee?: { denom?: string; amount?: string }[];
      ack_fee?: { denom?: string; amount?: string }[];
      timeout_fee?: { denom?: string; amount?: string }[];
    };
    refund_address?: string;
    relayers?: string[];
  }[];
}

export interface PacketFee {
  fee?: {
    recv_fee?: { denom?: string; amount?: string }[];
    ack_fee?: { denom?: string; amount?: string }[];
    timeout_fee?: { denom?: string; amount?: string }[];
  };
  refund_address?: string;
  relayers?: string[];
}

export interface PacketId {
  port_id?: string;
  channel_id?: string;

  /** @format uint64 */
  sequence?: string;
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

export interface QueryCounterpartyPayeeResponse {
  counterparty_payee?: string;
}

export interface QueryFeeEnabledChannelResponse {
  fee_enabled?: boolean;
}

export interface QueryFeeEnabledChannelsResponse {
  fee_enabled_channels?: { port_id?: string; channel_id?: string }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryIncentivizedPacketResponse {
  incentivized_packet?: {
    packet_id?: { port_id?: string; channel_id?: string; sequence?: string };
    packet_fees?: {
      fee?: {
        recv_fee?: { denom?: string; amount?: string }[];
        ack_fee?: { denom?: string; amount?: string }[];
        timeout_fee?: { denom?: string; amount?: string }[];
      };
      refund_address?: string;
      relayers?: string[];
    }[];
  };
}

export interface QueryIncentivizedPacketsForChannelResponse {
  incentivized_packets?: {
    packet_id?: { port_id?: string; channel_id?: string; sequence?: string };
    packet_fees?: {
      fee?: {
        recv_fee?: { denom?: string; amount?: string }[];
        ack_fee?: { denom?: string; amount?: string }[];
        timeout_fee?: { denom?: string; amount?: string }[];
      };
      refund_address?: string;
      relayers?: string[];
    }[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryIncentivizedPacketsResponse {
  incentivized_packets?: {
    packet_id?: { port_id?: string; channel_id?: string; sequence?: string };
    packet_fees?: {
      fee?: {
        recv_fee?: { denom?: string; amount?: string }[];
        ack_fee?: { denom?: string; amount?: string }[];
        timeout_fee?: { denom?: string; amount?: string }[];
      };
      refund_address?: string;
      relayers?: string[];
    }[];
  }[];
  pagination?: { next_key?: string; total?: string };
}

export interface QueryPayeeResponse {
  payee_address?: string;
}

export interface QueryTotalAckFeesResponse {
  ack_fees?: { denom?: string; amount?: string }[];
}

export interface QueryTotalRecvFeesResponse {
  recv_fees?: { denom?: string; amount?: string }[];
}

export interface QueryTotalTimeoutFeesResponse {
  timeout_fees?: { denom?: string; amount?: string }[];
}

export interface V1FeeEnabledChannel {
  port_id?: string;
  channel_id?: string;
}

export type MsgPayPacketFeeAsyncResponse = object;

export type MsgPayPacketFeeResponse = object;

export type MsgRegisterCounterpartyPayeeResponse = object;

export type MsgRegisterPayeeResponse = object;

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
 * @title HTTP API Console ibc.applications.fee.v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryFeeEnabledChannel
   * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/ports/{port_id}/fee_enabled
   */
  queryFeeEnabledChannel = (channelId: string, portId: string, params: RequestParams = {}) =>
    this.request<{ fee_enabled?: boolean }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/ibc/apps/fee/v1/channels/${channelId}/ports/${portId}/fee_enabled`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIncentivizedPacketsForChannel
   * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/ports/{port_id}/incentivized_packets
   */
  queryIncentivizedPacketsForChannel = (
    channelId: string,
    portId: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      query_height?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        incentivized_packets?: {
          packet_id?: { port_id?: string; channel_id?: string; sequence?: string };
          packet_fees?: {
            fee?: {
              recv_fee?: { denom?: string; amount?: string }[];
              ack_fee?: { denom?: string; amount?: string }[];
              timeout_fee?: { denom?: string; amount?: string }[];
            };
            refund_address?: string;
            relayers?: string[];
          }[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/fee/v1/channels/${channelId}/ports/${portId}/incentivized_packets`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryCounterpartyPayee
   * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/relayers/{relayer}/counterparty_payee
   */
  queryCounterpartyPayee = (channelId: string, relayer: string, params: RequestParams = {}) =>
    this.request<
      { counterparty_payee?: string },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/fee/v1/channels/${channelId}/relayers/${relayer}/counterparty_payee`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryPayee
   * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/relayers/{relayer}/payee
   */
  queryPayee = (channelId: string, relayer: string, params: RequestParams = {}) =>
    this.request<{ payee_address?: string }, { code?: number; message?: string; details?: { "@type"?: string }[] }>({
      path: `/ibc/apps/fee/v1/channels/${channelId}/relayers/${relayer}/payee`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIncentivizedPacket
   * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/incentivized_packet
   */
  queryIncentivizedPacket = (
    packetIdChannelId: string,
    packetIdPortId: string,
    packetIdSequence: string,
    query?: { query_height?: string },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        incentivized_packet?: {
          packet_id?: { port_id?: string; channel_id?: string; sequence?: string };
          packet_fees?: {
            fee?: {
              recv_fee?: { denom?: string; amount?: string }[];
              ack_fee?: { denom?: string; amount?: string }[];
              timeout_fee?: { denom?: string; amount?: string }[];
            };
            refund_address?: string;
            relayers?: string[];
          }[];
        };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/incentivized_packet`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTotalAckFees
   * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_ack_fees
   */
  queryTotalAckFees = (
    packetIdChannelId: string,
    packetIdPortId: string,
    packetIdSequence: string,
    params: RequestParams = {},
  ) =>
    this.request<
      { ack_fees?: { denom?: string; amount?: string }[] },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_ack_fees`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTotalRecvFees
   * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_recv_fees
   */
  queryTotalRecvFees = (
    packetIdChannelId: string,
    packetIdPortId: string,
    packetIdSequence: string,
    params: RequestParams = {},
  ) =>
    this.request<
      { recv_fees?: { denom?: string; amount?: string }[] },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_recv_fees`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryTotalTimeoutFees
   * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_timeout_fees
   */
  queryTotalTimeoutFees = (
    packetIdChannelId: string,
    packetIdPortId: string,
    packetIdSequence: string,
    params: RequestParams = {},
  ) =>
    this.request<
      { timeout_fees?: { denom?: string; amount?: string }[] },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_timeout_fees`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryFeeEnabledChannels
   * @request GET:/ibc/apps/fee/v1/fee_enabled
   */
  queryFeeEnabledChannels = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      query_height?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        fee_enabled_channels?: { port_id?: string; channel_id?: string }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/fee/v1/fee_enabled`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIncentivizedPackets
   * @request GET:/ibc/apps/fee/v1/incentivized_packets
   */
  queryIncentivizedPackets = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
      query_height?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        incentivized_packets?: {
          packet_id?: { port_id?: string; channel_id?: string; sequence?: string };
          packet_fees?: {
            fee?: {
              recv_fee?: { denom?: string; amount?: string }[];
              ack_fee?: { denom?: string; amount?: string }[];
              timeout_fee?: { denom?: string; amount?: string }[];
            };
            refund_address?: string;
            relayers?: string[];
          }[];
        }[];
        pagination?: { next_key?: string; total?: string };
      },
      { code?: number; message?: string; details?: { "@type"?: string }[] }
    >({
      path: `/ibc/apps/fee/v1/incentivized_packets`,
      method: "GET",
      query: query,
      ...params,
    });
}
