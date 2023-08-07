import * as dependency_1 from "./../../base/query/v1beta1/pagination";
import * as dependency_3 from "./../../../google/protobuf/any";
import * as dependency_5 from "./auth";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.auth.v1beta1 {
    class QueryAccountsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryAccountsRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAccountsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAccountsRequest;
    }
    class QueryAccountsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            accounts?: dependency_3.google.protobuf.Any[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get accounts(): dependency_3.google.protobuf.Any[];
        set accounts(value: dependency_3.google.protobuf.Any[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            accounts?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryAccountsResponse;
        toObject(): {
            accounts?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAccountsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAccountsResponse;
    }
    class QueryAccountRequest extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
        });
        get address(): string;
        set address(value: string);
        static fromObject(data: {
            address?: string;
        }): QueryAccountRequest;
        toObject(): {
            address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAccountRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAccountRequest;
    }
    class QueryAccountResponse extends pb_1.Message {
        constructor(data?: any[] | {
            account?: dependency_3.google.protobuf.Any;
        });
        get account(): dependency_3.google.protobuf.Any;
        set account(value: dependency_3.google.protobuf.Any);
        static fromObject(data: {
            account?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
        }): QueryAccountResponse;
        toObject(): {
            account?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAccountResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAccountResponse;
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
            params?: dependency_5.cosmos.auth.v1beta1.Params;
        });
        get params(): dependency_5.cosmos.auth.v1beta1.Params;
        set params(value: dependency_5.cosmos.auth.v1beta1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_5.cosmos.auth.v1beta1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                max_memo_characters?: number | undefined;
                tx_sig_limit?: number | undefined;
                tx_size_cost_per_byte?: number | undefined;
                sig_verify_cost_ed25519?: number | undefined;
                sig_verify_cost_secp256k1?: number | undefined;
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