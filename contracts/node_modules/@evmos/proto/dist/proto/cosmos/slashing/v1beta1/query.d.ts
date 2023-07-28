import * as dependency_1 from "./../../base/query/v1beta1/pagination";
import * as dependency_4 from "./slashing";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.slashing.v1beta1 {
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
            params?: dependency_4.cosmos.slashing.v1beta1.Params;
        });
        get params(): dependency_4.cosmos.slashing.v1beta1.Params;
        set params(value: dependency_4.cosmos.slashing.v1beta1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_4.cosmos.slashing.v1beta1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                signed_blocks_window?: number | undefined;
                min_signed_per_window?: Uint8Array | undefined;
                downtime_jail_duration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                slash_fraction_double_sign?: Uint8Array | undefined;
                slash_fraction_downtime?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QuerySigningInfoRequest extends pb_1.Message {
        constructor(data?: any[] | {
            cons_address?: string;
        });
        get cons_address(): string;
        set cons_address(value: string);
        static fromObject(data: {
            cons_address?: string;
        }): QuerySigningInfoRequest;
        toObject(): {
            cons_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QuerySigningInfoRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QuerySigningInfoRequest;
    }
    class QuerySigningInfoResponse extends pb_1.Message {
        constructor(data?: any[] | {
            val_signing_info?: dependency_4.cosmos.slashing.v1beta1.ValidatorSigningInfo;
        });
        get val_signing_info(): dependency_4.cosmos.slashing.v1beta1.ValidatorSigningInfo;
        set val_signing_info(value: dependency_4.cosmos.slashing.v1beta1.ValidatorSigningInfo);
        static fromObject(data: {
            val_signing_info?: ReturnType<typeof dependency_4.cosmos.slashing.v1beta1.ValidatorSigningInfo.prototype.toObject>;
        }): QuerySigningInfoResponse;
        toObject(): {
            val_signing_info?: {
                address?: string | undefined;
                start_height?: number | undefined;
                index_offset?: number | undefined;
                jailed_until?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                tombstoned?: boolean | undefined;
                missed_blocks_counter?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QuerySigningInfoResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QuerySigningInfoResponse;
    }
    class QuerySigningInfosRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QuerySigningInfosRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QuerySigningInfosRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QuerySigningInfosRequest;
    }
    class QuerySigningInfosResponse extends pb_1.Message {
        constructor(data?: any[] | {
            info?: dependency_4.cosmos.slashing.v1beta1.ValidatorSigningInfo[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get info(): dependency_4.cosmos.slashing.v1beta1.ValidatorSigningInfo[];
        set info(value: dependency_4.cosmos.slashing.v1beta1.ValidatorSigningInfo[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            info?: ReturnType<typeof dependency_4.cosmos.slashing.v1beta1.ValidatorSigningInfo.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QuerySigningInfosResponse;
        toObject(): {
            info?: {
                address?: string | undefined;
                start_height?: number | undefined;
                index_offset?: number | undefined;
                jailed_until?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                tombstoned?: boolean | undefined;
                missed_blocks_counter?: number | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QuerySigningInfosResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QuerySigningInfosResponse;
    }
}
//# sourceMappingURL=query.d.ts.map