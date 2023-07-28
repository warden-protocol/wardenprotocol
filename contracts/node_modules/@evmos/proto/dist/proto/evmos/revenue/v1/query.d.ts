import * as dependency_1 from "./../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_2 from "./genesis";
import * as dependency_3 from "./revenue";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.revenue.v1 {
    class QueryRevenuesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryRevenuesRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryRevenuesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryRevenuesRequest;
    }
    class QueryRevenuesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            revenues?: dependency_3.evmos.revenue.v1.Revenue[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get revenues(): dependency_3.evmos.revenue.v1.Revenue[];
        set revenues(value: dependency_3.evmos.revenue.v1.Revenue[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            revenues?: ReturnType<typeof dependency_3.evmos.revenue.v1.Revenue.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryRevenuesResponse;
        toObject(): {
            revenues?: {
                contract_address?: string | undefined;
                deployer_address?: string | undefined;
                withdrawer_address?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryRevenuesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryRevenuesResponse;
    }
    class QueryRevenueRequest extends pb_1.Message {
        constructor(data?: any[] | {
            contract_address?: string;
        });
        get contract_address(): string;
        set contract_address(value: string);
        static fromObject(data: {
            contract_address?: string;
        }): QueryRevenueRequest;
        toObject(): {
            contract_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryRevenueRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryRevenueRequest;
    }
    class QueryRevenueResponse extends pb_1.Message {
        constructor(data?: any[] | {
            revenue?: dependency_3.evmos.revenue.v1.Revenue;
        });
        get revenue(): dependency_3.evmos.revenue.v1.Revenue;
        set revenue(value: dependency_3.evmos.revenue.v1.Revenue);
        static fromObject(data: {
            revenue?: ReturnType<typeof dependency_3.evmos.revenue.v1.Revenue.prototype.toObject>;
        }): QueryRevenueResponse;
        toObject(): {
            revenue?: {
                contract_address?: string | undefined;
                deployer_address?: string | undefined;
                withdrawer_address?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryRevenueResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryRevenueResponse;
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
            params?: dependency_2.evmos.revenue.v1.Params;
        });
        get params(): dependency_2.evmos.revenue.v1.Params;
        set params(value: dependency_2.evmos.revenue.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_2.evmos.revenue.v1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                enable_revenue?: boolean | undefined;
                developer_shares?: string | undefined;
                addr_derivation_cost_create?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QueryDeployerRevenuesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            deployer_address?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get deployer_address(): string;
        set deployer_address(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            deployer_address?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryDeployerRevenuesRequest;
        toObject(): {
            deployer_address?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDeployerRevenuesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDeployerRevenuesRequest;
    }
    class QueryDeployerRevenuesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            contract_addresses?: string[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get contract_addresses(): string[];
        set contract_addresses(value: string[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            contract_addresses?: string[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryDeployerRevenuesResponse;
        toObject(): {
            contract_addresses?: string[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDeployerRevenuesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDeployerRevenuesResponse;
    }
    class QueryWithdrawerRevenuesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            withdrawer_address?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get withdrawer_address(): string;
        set withdrawer_address(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            withdrawer_address?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryWithdrawerRevenuesRequest;
        toObject(): {
            withdrawer_address?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryWithdrawerRevenuesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryWithdrawerRevenuesRequest;
    }
    class QueryWithdrawerRevenuesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            contract_addresses?: string[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get contract_addresses(): string[];
        set contract_addresses(value: string[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            contract_addresses?: string[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryWithdrawerRevenuesResponse;
        toObject(): {
            contract_addresses?: string[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryWithdrawerRevenuesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryWithdrawerRevenuesResponse;
    }
}
//# sourceMappingURL=query.d.ts.map