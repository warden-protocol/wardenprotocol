import * as dependency_1 from "./../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_2 from "./genesis";
import * as dependency_3 from "./erc20";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.erc20.v1 {
    class QueryTokenPairsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryTokenPairsRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTokenPairsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTokenPairsRequest;
    }
    class QueryTokenPairsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            token_pairs?: dependency_3.evmos.erc20.v1.TokenPair[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get token_pairs(): dependency_3.evmos.erc20.v1.TokenPair[];
        set token_pairs(value: dependency_3.evmos.erc20.v1.TokenPair[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            token_pairs?: ReturnType<typeof dependency_3.evmos.erc20.v1.TokenPair.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryTokenPairsResponse;
        toObject(): {
            token_pairs?: {
                erc20_address?: string | undefined;
                denom?: string | undefined;
                enabled?: boolean | undefined;
                contract_owner?: dependency_3.evmos.erc20.v1.Owner | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTokenPairsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTokenPairsResponse;
    }
    class QueryTokenPairRequest extends pb_1.Message {
        constructor(data?: any[] | {
            token?: string;
        });
        get token(): string;
        set token(value: string);
        static fromObject(data: {
            token?: string;
        }): QueryTokenPairRequest;
        toObject(): {
            token?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTokenPairRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTokenPairRequest;
    }
    class QueryTokenPairResponse extends pb_1.Message {
        constructor(data?: any[] | {
            token_pair?: dependency_3.evmos.erc20.v1.TokenPair;
        });
        get token_pair(): dependency_3.evmos.erc20.v1.TokenPair;
        set token_pair(value: dependency_3.evmos.erc20.v1.TokenPair);
        static fromObject(data: {
            token_pair?: ReturnType<typeof dependency_3.evmos.erc20.v1.TokenPair.prototype.toObject>;
        }): QueryTokenPairResponse;
        toObject(): {
            token_pair?: {
                erc20_address?: string | undefined;
                denom?: string | undefined;
                enabled?: boolean | undefined;
                contract_owner?: dependency_3.evmos.erc20.v1.Owner | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTokenPairResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTokenPairResponse;
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
            params?: dependency_2.evmos.erc20.v1.Params;
        });
        get params(): dependency_2.evmos.erc20.v1.Params;
        set params(value: dependency_2.evmos.erc20.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_2.evmos.erc20.v1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                enable_erc20?: boolean | undefined;
                enable_evm_hook?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
}
//# sourceMappingURL=query.d.ts.map