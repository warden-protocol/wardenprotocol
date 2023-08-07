import * as dependency_2 from "./../../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_3 from "./transfer";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.transfer.v1 {
    class QueryDenomTraceRequest extends pb_1.Message {
        constructor(data?: any[] | {
            hash?: string;
        });
        get hash(): string;
        set hash(value: string);
        static fromObject(data: {
            hash?: string;
        }): QueryDenomTraceRequest;
        toObject(): {
            hash?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomTraceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomTraceRequest;
    }
    class QueryDenomTraceResponse extends pb_1.Message {
        constructor(data?: any[] | {
            denom_trace?: dependency_3.ibc.applications.transfer.v1.DenomTrace;
        });
        get denom_trace(): dependency_3.ibc.applications.transfer.v1.DenomTrace;
        set denom_trace(value: dependency_3.ibc.applications.transfer.v1.DenomTrace);
        static fromObject(data: {
            denom_trace?: ReturnType<typeof dependency_3.ibc.applications.transfer.v1.DenomTrace.prototype.toObject>;
        }): QueryDenomTraceResponse;
        toObject(): {
            denom_trace?: {
                path?: string | undefined;
                base_denom?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomTraceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomTraceResponse;
    }
    class QueryDenomTracesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryDenomTracesRequest;
        toObject(): {
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomTracesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomTracesRequest;
    }
    class QueryDenomTracesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            denom_traces?: dependency_3.ibc.applications.transfer.v1.DenomTrace[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
        });
        get denom_traces(): dependency_3.ibc.applications.transfer.v1.DenomTrace[];
        set denom_traces(value: dependency_3.ibc.applications.transfer.v1.DenomTrace[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            denom_traces?: ReturnType<typeof dependency_3.ibc.applications.transfer.v1.DenomTrace.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryDenomTracesResponse;
        toObject(): {
            denom_traces?: {
                path?: string | undefined;
                base_denom?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomTracesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomTracesResponse;
    }
    class QueryParamsRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryParamsRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsRequest;
    }
    class QueryParamsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_3.ibc.applications.transfer.v1.Params;
        });
        get params(): dependency_3.ibc.applications.transfer.v1.Params;
        set params(value: dependency_3.ibc.applications.transfer.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_3.ibc.applications.transfer.v1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                send_enabled?: boolean | undefined;
                receive_enabled?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QueryDenomHashRequest extends pb_1.Message {
        constructor(data?: any[] | {
            trace?: string;
        });
        get trace(): string;
        set trace(value: string);
        static fromObject(data: {
            trace?: string;
        }): QueryDenomHashRequest;
        toObject(): {
            trace?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomHashRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomHashRequest;
    }
    class QueryDenomHashResponse extends pb_1.Message {
        constructor(data?: any[] | {
            hash?: string;
        });
        get hash(): string;
        set hash(value: string);
        static fromObject(data: {
            hash?: string;
        }): QueryDenomHashResponse;
        toObject(): {
            hash?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomHashResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomHashResponse;
    }
}
//# sourceMappingURL=query.d.ts.map