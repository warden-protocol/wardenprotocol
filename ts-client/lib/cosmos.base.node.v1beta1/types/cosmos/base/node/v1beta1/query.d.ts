import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.base.node.v1beta1";
/** ConfigRequest defines the request structure for the Config gRPC query. */
export interface ConfigRequest {
}
/** ConfigResponse defines the response structure for the Config gRPC query. */
export interface ConfigResponse {
    minimumGasPrice: string;
    pruningKeepRecent: string;
    pruningInterval: string;
    haltHeight: number;
}
/** StateRequest defines the request structure for the status of a node. */
export interface StatusRequest {
}
/** StateResponse defines the response structure for the status of a node. */
export interface StatusResponse {
    /** earliest block height available in the store */
    earliestStoreHeight: number;
    /** current block height */
    height: number;
    /** block height timestamp */
    timestamp: Date | undefined;
    /** app hash of the current block */
    appHash: Uint8Array;
    /** validator hash provided by the consensus header */
    validatorHash: Uint8Array;
}
export declare const ConfigRequest: {
    encode(_: ConfigRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConfigRequest;
    fromJSON(_: any): ConfigRequest;
    toJSON(_: ConfigRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): ConfigRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): ConfigRequest;
};
export declare const ConfigResponse: {
    encode(message: ConfigResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConfigResponse;
    fromJSON(object: any): ConfigResponse;
    toJSON(message: ConfigResponse): unknown;
    create<I extends {
        minimumGasPrice?: string;
        pruningKeepRecent?: string;
        pruningInterval?: string;
        haltHeight?: number;
    } & {
        minimumGasPrice?: string;
        pruningKeepRecent?: string;
        pruningInterval?: string;
        haltHeight?: number;
    } & { [K in Exclude<keyof I, keyof ConfigResponse>]: never; }>(base?: I): ConfigResponse;
    fromPartial<I_1 extends {
        minimumGasPrice?: string;
        pruningKeepRecent?: string;
        pruningInterval?: string;
        haltHeight?: number;
    } & {
        minimumGasPrice?: string;
        pruningKeepRecent?: string;
        pruningInterval?: string;
        haltHeight?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof ConfigResponse>]: never; }>(object: I_1): ConfigResponse;
};
export declare const StatusRequest: {
    encode(_: StatusRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusRequest;
    fromJSON(_: any): StatusRequest;
    toJSON(_: StatusRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): StatusRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): StatusRequest;
};
export declare const StatusResponse: {
    encode(message: StatusResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StatusResponse;
    fromJSON(object: any): StatusResponse;
    toJSON(message: StatusResponse): unknown;
    create<I extends {
        earliestStoreHeight?: number;
        height?: number;
        timestamp?: Date | undefined;
        appHash?: Uint8Array;
        validatorHash?: Uint8Array;
    } & {
        earliestStoreHeight?: number;
        height?: number;
        timestamp?: Date | undefined;
        appHash?: Uint8Array;
        validatorHash?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof StatusResponse>]: never; }>(base?: I): StatusResponse;
    fromPartial<I_1 extends {
        earliestStoreHeight?: number;
        height?: number;
        timestamp?: Date | undefined;
        appHash?: Uint8Array;
        validatorHash?: Uint8Array;
    } & {
        earliestStoreHeight?: number;
        height?: number;
        timestamp?: Date | undefined;
        appHash?: Uint8Array;
        validatorHash?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof StatusResponse>]: never; }>(object: I_1): StatusResponse;
};
/** Service defines the gRPC querier service for node related queries. */
export interface Service {
    /** Config queries for the operator configuration. */
    Config(request: ConfigRequest): Promise<ConfigResponse>;
    /** Status queries for the node status. */
    Status(request: StatusRequest): Promise<StatusResponse>;
}
export declare const ServiceServiceName = "cosmos.base.node.v1beta1.Service";
export declare class ServiceClientImpl implements Service {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Config(request: ConfigRequest): Promise<ConfigResponse>;
    Status(request: StatusRequest): Promise<StatusResponse>;
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
