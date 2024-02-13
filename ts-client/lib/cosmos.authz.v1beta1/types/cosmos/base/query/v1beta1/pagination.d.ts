import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.base.query.v1beta1";
/**
 * PageRequest is to be embedded in gRPC request messages for efficient
 * pagination. Ex:
 *
 *  message SomeRequest {
 *          Foo some_parameter = 1;
 *          PageRequest pagination = 2;
 *  }
 */
export interface PageRequest {
    /**
     * key is a value returned in PageResponse.next_key to begin
     * querying the next page most efficiently. Only one of offset or key
     * should be set.
     */
    key: Uint8Array;
    /**
     * offset is a numeric offset that can be used when key is unavailable.
     * It is less efficient than using key. Only one of offset or key should
     * be set.
     */
    offset: number;
    /**
     * limit is the total number of results to be returned in the result page.
     * If left empty it will default to a value to be set by each app.
     */
    limit: number;
    /**
     * count_total is set to true  to indicate that the result set should include
     * a count of the total number of items available for pagination in UIs.
     * count_total is only respected when offset is used. It is ignored when key
     * is set.
     */
    countTotal: boolean;
    /**
     * reverse is set to true if results are to be returned in the descending order.
     *
     * Since: cosmos-sdk 0.43
     */
    reverse: boolean;
}
/**
 * PageResponse is to be embedded in gRPC response messages where the
 * corresponding request message has used PageRequest.
 *
 *  message SomeResponse {
 *          repeated Bar results = 1;
 *          PageResponse page = 2;
 *  }
 */
export interface PageResponse {
    /**
     * next_key is the key to be passed to PageRequest.key to
     * query the next page most efficiently. It will be empty if
     * there are no more results.
     */
    nextKey: Uint8Array;
    /**
     * total is total number of results available if PageRequest.count_total
     * was set, its value is undefined otherwise
     */
    total: number;
}
export declare const PageRequest: {
    encode(message: PageRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PageRequest;
    fromJSON(object: any): PageRequest;
    toJSON(message: PageRequest): unknown;
    create<I extends {
        key?: Uint8Array;
        offset?: number;
        limit?: number;
        countTotal?: boolean;
        reverse?: boolean;
    } & {
        key?: Uint8Array;
        offset?: number;
        limit?: number;
        countTotal?: boolean;
        reverse?: boolean;
    } & { [K in Exclude<keyof I, keyof PageRequest>]: never; }>(base?: I): PageRequest;
    fromPartial<I_1 extends {
        key?: Uint8Array;
        offset?: number;
        limit?: number;
        countTotal?: boolean;
        reverse?: boolean;
    } & {
        key?: Uint8Array;
        offset?: number;
        limit?: number;
        countTotal?: boolean;
        reverse?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof PageRequest>]: never; }>(object: I_1): PageRequest;
};
export declare const PageResponse: {
    encode(message: PageResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PageResponse;
    fromJSON(object: any): PageResponse;
    toJSON(message: PageResponse): unknown;
    create<I extends {
        nextKey?: Uint8Array;
        total?: number;
    } & {
        nextKey?: Uint8Array;
        total?: number;
    } & { [K in Exclude<keyof I, keyof PageResponse>]: never; }>(base?: I): PageResponse;
    fromPartial<I_1 extends {
        nextKey?: Uint8Array;
        total?: number;
    } & {
        nextKey?: Uint8Array;
        total?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof PageResponse>]: never; }>(object: I_1): PageResponse;
};
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
