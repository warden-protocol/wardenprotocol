import _m0 from "protobufjs/minimal";
import { ModuleVersion, Plan } from "./upgrade";
export declare const protobufPackage = "cosmos.upgrade.v1beta1";
/**
 * QueryCurrentPlanRequest is the request type for the Query/CurrentPlan RPC
 * method.
 */
export interface QueryCurrentPlanRequest {
}
/**
 * QueryCurrentPlanResponse is the response type for the Query/CurrentPlan RPC
 * method.
 */
export interface QueryCurrentPlanResponse {
    /** plan is the current upgrade plan. */
    plan: Plan | undefined;
}
/**
 * QueryCurrentPlanRequest is the request type for the Query/AppliedPlan RPC
 * method.
 */
export interface QueryAppliedPlanRequest {
    /** name is the name of the applied plan to query for. */
    name: string;
}
/**
 * QueryAppliedPlanResponse is the response type for the Query/AppliedPlan RPC
 * method.
 */
export interface QueryAppliedPlanResponse {
    /** height is the block height at which the plan was applied. */
    height: number;
}
/**
 * QueryUpgradedConsensusStateRequest is the request type for the Query/UpgradedConsensusState
 * RPC method.
 *
 * @deprecated
 */
export interface QueryUpgradedConsensusStateRequest {
    /**
     * last height of the current chain must be sent in request
     * as this is the height under which next consensus state is stored
     */
    lastHeight: number;
}
/**
 * QueryUpgradedConsensusStateResponse is the response type for the Query/UpgradedConsensusState
 * RPC method.
 *
 * @deprecated
 */
export interface QueryUpgradedConsensusStateResponse {
    /** Since: cosmos-sdk 0.43 */
    upgradedConsensusState: Uint8Array;
}
/**
 * QueryModuleVersionsRequest is the request type for the Query/ModuleVersions
 * RPC method.
 *
 * Since: cosmos-sdk 0.43
 */
export interface QueryModuleVersionsRequest {
    /**
     * module_name is a field to query a specific module
     * consensus version from state. Leaving this empty will
     * fetch the full list of module versions from state
     */
    moduleName: string;
}
/**
 * QueryModuleVersionsResponse is the response type for the Query/ModuleVersions
 * RPC method.
 *
 * Since: cosmos-sdk 0.43
 */
export interface QueryModuleVersionsResponse {
    /** module_versions is a list of module names with their consensus versions. */
    moduleVersions: ModuleVersion[];
}
/**
 * QueryAuthorityRequest is the request type for Query/Authority
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryAuthorityRequest {
}
/**
 * QueryAuthorityResponse is the response type for Query/Authority
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryAuthorityResponse {
    address: string;
}
export declare const QueryCurrentPlanRequest: {
    encode(_: QueryCurrentPlanRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrentPlanRequest;
    fromJSON(_: any): QueryCurrentPlanRequest;
    toJSON(_: QueryCurrentPlanRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryCurrentPlanRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryCurrentPlanRequest;
};
export declare const QueryCurrentPlanResponse: {
    encode(message: QueryCurrentPlanResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrentPlanResponse;
    fromJSON(object: any): QueryCurrentPlanResponse;
    toJSON(message: QueryCurrentPlanResponse): unknown;
    create<I extends {
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
    } & {
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["plan"]["upgradedClientState"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_1 in Exclude<keyof I["plan"], keyof Plan>]: never; };
    } & { [K_2 in Exclude<keyof I, "plan">]: never; }>(base?: I): QueryCurrentPlanResponse;
    fromPartial<I_1 extends {
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
    } & {
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I_1["plan"]["upgradedClientState"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_4 in Exclude<keyof I_1["plan"], keyof Plan>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "plan">]: never; }>(object: I_1): QueryCurrentPlanResponse;
};
export declare const QueryAppliedPlanRequest: {
    encode(message: QueryAppliedPlanRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAppliedPlanRequest;
    fromJSON(object: any): QueryAppliedPlanRequest;
    toJSON(message: QueryAppliedPlanRequest): unknown;
    create<I extends {
        name?: string;
    } & {
        name?: string;
    } & { [K in Exclude<keyof I, "name">]: never; }>(base?: I): QueryAppliedPlanRequest;
    fromPartial<I_1 extends {
        name?: string;
    } & {
        name?: string;
    } & { [K_1 in Exclude<keyof I_1, "name">]: never; }>(object: I_1): QueryAppliedPlanRequest;
};
export declare const QueryAppliedPlanResponse: {
    encode(message: QueryAppliedPlanResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAppliedPlanResponse;
    fromJSON(object: any): QueryAppliedPlanResponse;
    toJSON(message: QueryAppliedPlanResponse): unknown;
    create<I extends {
        height?: number;
    } & {
        height?: number;
    } & { [K in Exclude<keyof I, "height">]: never; }>(base?: I): QueryAppliedPlanResponse;
    fromPartial<I_1 extends {
        height?: number;
    } & {
        height?: number;
    } & { [K_1 in Exclude<keyof I_1, "height">]: never; }>(object: I_1): QueryAppliedPlanResponse;
};
export declare const QueryUpgradedConsensusStateRequest: {
    encode(message: QueryUpgradedConsensusStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateRequest;
    fromJSON(object: any): QueryUpgradedConsensusStateRequest;
    toJSON(message: QueryUpgradedConsensusStateRequest): unknown;
    create<I extends {
        lastHeight?: number;
    } & {
        lastHeight?: number;
    } & { [K in Exclude<keyof I, "lastHeight">]: never; }>(base?: I): QueryUpgradedConsensusStateRequest;
    fromPartial<I_1 extends {
        lastHeight?: number;
    } & {
        lastHeight?: number;
    } & { [K_1 in Exclude<keyof I_1, "lastHeight">]: never; }>(object: I_1): QueryUpgradedConsensusStateRequest;
};
export declare const QueryUpgradedConsensusStateResponse: {
    encode(message: QueryUpgradedConsensusStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateResponse;
    fromJSON(object: any): QueryUpgradedConsensusStateResponse;
    toJSON(message: QueryUpgradedConsensusStateResponse): unknown;
    create<I extends {
        upgradedConsensusState?: Uint8Array;
    } & {
        upgradedConsensusState?: Uint8Array;
    } & { [K in Exclude<keyof I, "upgradedConsensusState">]: never; }>(base?: I): QueryUpgradedConsensusStateResponse;
    fromPartial<I_1 extends {
        upgradedConsensusState?: Uint8Array;
    } & {
        upgradedConsensusState?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "upgradedConsensusState">]: never; }>(object: I_1): QueryUpgradedConsensusStateResponse;
};
export declare const QueryModuleVersionsRequest: {
    encode(message: QueryModuleVersionsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModuleVersionsRequest;
    fromJSON(object: any): QueryModuleVersionsRequest;
    toJSON(message: QueryModuleVersionsRequest): unknown;
    create<I extends {
        moduleName?: string;
    } & {
        moduleName?: string;
    } & { [K in Exclude<keyof I, "moduleName">]: never; }>(base?: I): QueryModuleVersionsRequest;
    fromPartial<I_1 extends {
        moduleName?: string;
    } & {
        moduleName?: string;
    } & { [K_1 in Exclude<keyof I_1, "moduleName">]: never; }>(object: I_1): QueryModuleVersionsRequest;
};
export declare const QueryModuleVersionsResponse: {
    encode(message: QueryModuleVersionsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModuleVersionsResponse;
    fromJSON(object: any): QueryModuleVersionsResponse;
    toJSON(message: QueryModuleVersionsResponse): unknown;
    create<I extends {
        moduleVersions?: {
            name?: string;
            version?: number;
        }[];
    } & {
        moduleVersions?: {
            name?: string;
            version?: number;
        }[] & ({
            name?: string;
            version?: number;
        } & {
            name?: string;
            version?: number;
        } & { [K in Exclude<keyof I["moduleVersions"][number], keyof ModuleVersion>]: never; })[] & { [K_1 in Exclude<keyof I["moduleVersions"], keyof {
            name?: string;
            version?: number;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "moduleVersions">]: never; }>(base?: I): QueryModuleVersionsResponse;
    fromPartial<I_1 extends {
        moduleVersions?: {
            name?: string;
            version?: number;
        }[];
    } & {
        moduleVersions?: {
            name?: string;
            version?: number;
        }[] & ({
            name?: string;
            version?: number;
        } & {
            name?: string;
            version?: number;
        } & { [K_3 in Exclude<keyof I_1["moduleVersions"][number], keyof ModuleVersion>]: never; })[] & { [K_4 in Exclude<keyof I_1["moduleVersions"], keyof {
            name?: string;
            version?: number;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "moduleVersions">]: never; }>(object: I_1): QueryModuleVersionsResponse;
};
export declare const QueryAuthorityRequest: {
    encode(_: QueryAuthorityRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuthorityRequest;
    fromJSON(_: any): QueryAuthorityRequest;
    toJSON(_: QueryAuthorityRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryAuthorityRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryAuthorityRequest;
};
export declare const QueryAuthorityResponse: {
    encode(message: QueryAuthorityResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuthorityResponse;
    fromJSON(object: any): QueryAuthorityResponse;
    toJSON(message: QueryAuthorityResponse): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): QueryAuthorityResponse;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): QueryAuthorityResponse;
};
/** Query defines the gRPC upgrade querier service. */
export interface Query {
    /** CurrentPlan queries the current upgrade plan. */
    CurrentPlan(request: QueryCurrentPlanRequest): Promise<QueryCurrentPlanResponse>;
    /** AppliedPlan queries a previously applied upgrade plan by its name. */
    AppliedPlan(request: QueryAppliedPlanRequest): Promise<QueryAppliedPlanResponse>;
    /**
     * UpgradedConsensusState queries the consensus state that will serve
     * as a trusted kernel for the next version of this chain. It will only be
     * stored at the last height of this chain.
     * UpgradedConsensusState RPC not supported with legacy querier
     * This rpc is deprecated now that IBC has its own replacement
     * (https://github.com/cosmos/ibc-go/blob/2c880a22e9f9cc75f62b527ca94aa75ce1106001/proto/ibc/core/client/v1/query.proto#L54)
     *
     * @deprecated
     */
    UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
    /**
     * ModuleVersions queries the list of module versions from state.
     *
     * Since: cosmos-sdk 0.43
     */
    ModuleVersions(request: QueryModuleVersionsRequest): Promise<QueryModuleVersionsResponse>;
    /**
     * Returns the account with authority to conduct upgrades
     *
     * Since: cosmos-sdk 0.46
     */
    Authority(request: QueryAuthorityRequest): Promise<QueryAuthorityResponse>;
}
export declare const QueryServiceName = "cosmos.upgrade.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    CurrentPlan(request: QueryCurrentPlanRequest): Promise<QueryCurrentPlanResponse>;
    AppliedPlan(request: QueryAppliedPlanRequest): Promise<QueryAppliedPlanResponse>;
    UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
    ModuleVersions(request: QueryModuleVersionsRequest): Promise<QueryModuleVersionsResponse>;
    Authority(request: QueryAuthorityRequest): Promise<QueryAuthorityResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
