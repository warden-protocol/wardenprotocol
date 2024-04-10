export interface Any {
    "@type"?: string;
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export interface Action {
    /** @format uint64 */
    id?: string;
    approvers?: {
        address?: string;
        approved_at?: string;
    }[];
    status?: "ACTION_STATUS_UNSPECIFIED" | "ACTION_STATUS_PENDING" | "ACTION_STATUS_COMPLETED" | "ACTION_STATUS_REVOKED" | "ACTION_STATUS_TIMEOUT";
    msg?: {
        "@type"?: string;
    };
    result?: {
        "@type"?: string;
    };
    creator?: string;
    /** @format uint64 */
    btl?: string;
    /** @format date-time */
    created_at?: string;
    /** @format date-time */
    updated_at?: string;
    intent?: Intent;
    mentions?: string[];
}
export declare enum ActionStatus {
    ACTION_STATUS_UNSPECIFIED = "ACTION_STATUS_UNSPECIFIED",
    ACTION_STATUS_PENDING = "ACTION_STATUS_PENDING",
    ACTION_STATUS_COMPLETED = "ACTION_STATUS_COMPLETED",
    ACTION_STATUS_REVOKED = "ACTION_STATUS_REVOKED",
    ACTION_STATUS_TIMEOUT = "ACTION_STATUS_TIMEOUT"
}
export interface Approver {
    address?: string;
    /** @format date-time */
    approved_at?: string;
}
export interface ArrayLiteral {
    token?: {
        type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
        literal?: string;
    };
    elements?: Expression[];
}
export interface BooleanLiteral {
    token?: {
        type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
        literal?: string;
    };
    value?: boolean;
}
export interface CallExpression {
    token?: {
        type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
        literal?: string;
    };
    function?: {
        token?: {
            type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
            literal?: string;
        };
        value?: string;
    };
    arguments?: Expression[];
}
export interface Expression {
    identifier?: {
        token?: {
            type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
            literal?: string;
        };
        value?: string;
    };
    integer_literal?: {
        token?: {
            type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
            literal?: string;
        };
        value?: string;
    };
    boolean_literal?: {
        token?: {
            type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
            literal?: string;
        };
        value?: boolean;
    };
    array_literal?: ArrayLiteral;
    call_expression?: CallExpression;
    infix_expression?: InfixExpression;
}
export interface Identifier {
    token?: {
        type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
        literal?: string;
    };
    value?: string;
}
export interface InfixExpression {
    token?: {
        type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
        literal?: string;
    };
    left?: Expression;
    operator?: string;
    right?: Expression;
}
export interface IntegerLiteral {
    token?: {
        type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
        literal?: string;
    };
    /** @format int64 */
    value?: string;
}
export interface Intent {
    /** @format uint64 */
    id?: string;
    creator?: string;
    name?: string;
    expression?: Expression;
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
export interface QueryActionByIdResponse {
    action?: Action;
}
export interface QueryActionsByAddressResponse {
    pagination?: {
        next_key?: string;
        total?: string;
    };
    actions?: Action[];
}
export interface QueryActionsResponse {
    pagination?: {
        next_key?: string;
        total?: string;
    };
    actions?: Action[];
}
export interface QueryIntentByIdResponse {
    intent?: Intent;
}
export interface QueryIntentsResponse {
    pagination?: {
        next_key?: string;
        total?: string;
    };
    intents?: Intent[];
}
export interface QueryParamsResponse {
    params?: object;
}
export interface Token {
    type?: "ILLEGAL" | "EOF" | "IDENT" | "INT" | "COMMA" | "SEMICOLON" | "LPAREN" | "RPAREN" | "LBRACKET" | "RBRACKET" | "AND" | "OR" | "TRUE" | "FALSE";
    literal?: string;
}
export type IntentParams = object;
export declare enum TokenType {
    ILLEGAL = "ILLEGAL",
    EOF = "EOF",
    IDENT = "IDENT",
    INT = "INT",
    COMMA = "COMMA",
    SEMICOLON = "SEMICOLON",
    LPAREN = "LPAREN",
    RPAREN = "RPAREN",
    LBRACKET = "LBRACKET",
    RBRACKET = "RBRACKET",
    AND = "AND",
    OR = "OR",
    TRUE = "TRUE",
    FALSE = "FALSE"
}
export interface MsgApproveActionResponse {
    status?: string;
}
export interface MsgNewIntentResponse {
    /** @format uint64 */
    id?: string;
}
export type MsgRevokeActionResponse = object;
export type MsgUpdateIntentResponse = object;
export type MsgUpdateParamsResponse = object;
export type Params = object;
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
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
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private mergeRequestParams;
    private createFormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title HTTP API Console warden.intent
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryActionById
     * @request GET:/wardenprotocol/warden/intent/action_by_id
     */
    queryActionById: (query?: {
        id?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<QueryActionByIdResponse>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryActions
     * @request GET:/wardenprotocol/warden/intent/actions
     */
    queryActions: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<QueryActionsResponse>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryActionsByAddress
     * @request GET:/wardenprotocol/warden/intent/actions_by_address
     */
    queryActionsByAddress: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
        address?: string;
        status?: "ACTION_STATUS_UNSPECIFIED" | "ACTION_STATUS_PENDING" | "ACTION_STATUS_COMPLETED" | "ACTION_STATUS_REVOKED" | "ACTION_STATUS_TIMEOUT";
    }, params?: RequestParams) => Promise<AxiosResponse<QueryActionsByAddressResponse>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryIntentById
     * @request GET:/wardenprotocol/warden/intent/intent_by_id
     */
    queryIntentById: (query?: {
        id?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<QueryIntentByIdResponse>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryIntents
     * @request GET:/wardenprotocol/warden/intent/intents
     */
    queryIntents: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<QueryIntentsResponse>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/wardenprotocol/warden/intent/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: object;
    }>>;
}
