import _m0 from "protobufjs/minimal";
import { ConsensusParams } from "../../../tendermint/types/params";
export declare const protobufPackage = "cosmos.consensus.v1";
/** Since: cosmos-sdk 0.47 */
/** QueryParamsRequest defines the request type for querying x/consensus parameters. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse defines the response type for querying x/consensus parameters. */
export interface QueryParamsResponse {
    /**
     * params are the tendermint consensus params stored in the consensus module.
     * Please note that `params.version` is not populated in this response, it is
     * tracked separately in the x/upgrade module.
     */
    params: ConsensusParams | undefined;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    create<I extends {
        params?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        };
    } & {
        params?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        } & {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            } & {
                maxBytes?: number;
                maxGas?: number;
            } & { [K in Exclude<keyof I["params"]["block"], keyof import("../../../tendermint/types/params").BlockParams>]: never; };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            } & {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                } & {
                    seconds?: number;
                    nanos?: number;
                } & { [K_1 in Exclude<keyof I["params"]["evidence"]["maxAgeDuration"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
                maxBytes?: number;
            } & { [K_2 in Exclude<keyof I["params"]["evidence"], keyof import("../../../tendermint/types/params").EvidenceParams>]: never; };
            validator?: {
                pubKeyTypes?: string[];
            } & {
                pubKeyTypes?: string[] & string[] & { [K_3 in Exclude<keyof I["params"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
            } & { [K_4 in Exclude<keyof I["params"]["validator"], "pubKeyTypes">]: never; };
            version?: {
                app?: number;
            } & {
                app?: number;
            } & { [K_5 in Exclude<keyof I["params"]["version"], "app">]: never; };
            abci?: {
                voteExtensionsEnableHeight?: number;
            } & {
                voteExtensionsEnableHeight?: number;
            } & { [K_6 in Exclude<keyof I["params"]["abci"], "voteExtensionsEnableHeight">]: never; };
        } & { [K_7 in Exclude<keyof I["params"], keyof ConsensusParams>]: never; };
    } & { [K_8 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        };
    } & {
        params?: {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            };
            validator?: {
                pubKeyTypes?: string[];
            };
            version?: {
                app?: number;
            };
            abci?: {
                voteExtensionsEnableHeight?: number;
            };
        } & {
            block?: {
                maxBytes?: number;
                maxGas?: number;
            } & {
                maxBytes?: number;
                maxGas?: number;
            } & { [K_9 in Exclude<keyof I_1["params"]["block"], keyof import("../../../tendermint/types/params").BlockParams>]: never; };
            evidence?: {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                };
                maxBytes?: number;
            } & {
                maxAgeNumBlocks?: number;
                maxAgeDuration?: {
                    seconds?: number;
                    nanos?: number;
                } & {
                    seconds?: number;
                    nanos?: number;
                } & { [K_10 in Exclude<keyof I_1["params"]["evidence"]["maxAgeDuration"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
                maxBytes?: number;
            } & { [K_11 in Exclude<keyof I_1["params"]["evidence"], keyof import("../../../tendermint/types/params").EvidenceParams>]: never; };
            validator?: {
                pubKeyTypes?: string[];
            } & {
                pubKeyTypes?: string[] & string[] & { [K_12 in Exclude<keyof I_1["params"]["validator"]["pubKeyTypes"], keyof string[]>]: never; };
            } & { [K_13 in Exclude<keyof I_1["params"]["validator"], "pubKeyTypes">]: never; };
            version?: {
                app?: number;
            } & {
                app?: number;
            } & { [K_14 in Exclude<keyof I_1["params"]["version"], "app">]: never; };
            abci?: {
                voteExtensionsEnableHeight?: number;
            } & {
                voteExtensionsEnableHeight?: number;
            } & { [K_15 in Exclude<keyof I_1["params"]["abci"], "voteExtensionsEnableHeight">]: never; };
        } & { [K_16 in Exclude<keyof I_1["params"], keyof ConsensusParams>]: never; };
    } & { [K_17 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Params queries the parameters of x/consensus module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export declare const QueryServiceName = "cosmos.consensus.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
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
