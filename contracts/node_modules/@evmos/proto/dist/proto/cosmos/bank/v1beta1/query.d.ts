import * as dependency_1 from "./../../base/query/v1beta1/pagination";
import * as dependency_4 from "./../../base/v1beta1/coin";
import * as dependency_5 from "./bank";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.bank.v1beta1 {
    class QueryBalanceRequest extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            denom?: string;
        });
        get address(): string;
        set address(value: string);
        get denom(): string;
        set denom(value: string);
        static fromObject(data: {
            address?: string;
            denom?: string;
        }): QueryBalanceRequest;
        toObject(): {
            address?: string | undefined;
            denom?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryBalanceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryBalanceRequest;
    }
    class QueryBalanceResponse extends pb_1.Message {
        constructor(data?: any[] | {
            balance?: dependency_4.cosmos.base.v1beta1.Coin;
        });
        get balance(): dependency_4.cosmos.base.v1beta1.Coin;
        set balance(value: dependency_4.cosmos.base.v1beta1.Coin);
        static fromObject(data: {
            balance?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>;
        }): QueryBalanceResponse;
        toObject(): {
            balance?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryBalanceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryBalanceResponse;
    }
    class QueryAllBalancesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get address(): string;
        set address(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            address?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryAllBalancesRequest;
        toObject(): {
            address?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllBalancesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllBalancesRequest;
    }
    class QueryAllBalancesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            balances?: dependency_4.cosmos.base.v1beta1.Coin[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get balances(): dependency_4.cosmos.base.v1beta1.Coin[];
        set balances(value: dependency_4.cosmos.base.v1beta1.Coin[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            balances?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryAllBalancesResponse;
        toObject(): {
            balances?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllBalancesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllBalancesResponse;
    }
    class QuerySpendableBalancesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get address(): string;
        set address(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            address?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QuerySpendableBalancesRequest;
        toObject(): {
            address?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QuerySpendableBalancesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QuerySpendableBalancesRequest;
    }
    class QuerySpendableBalancesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            balances?: dependency_4.cosmos.base.v1beta1.Coin[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get balances(): dependency_4.cosmos.base.v1beta1.Coin[];
        set balances(value: dependency_4.cosmos.base.v1beta1.Coin[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            balances?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QuerySpendableBalancesResponse;
        toObject(): {
            balances?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QuerySpendableBalancesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QuerySpendableBalancesResponse;
    }
    class QueryTotalSupplyRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryTotalSupplyRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTotalSupplyRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTotalSupplyRequest;
    }
    class QueryTotalSupplyResponse extends pb_1.Message {
        constructor(data?: any[] | {
            supply?: dependency_4.cosmos.base.v1beta1.Coin[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get supply(): dependency_4.cosmos.base.v1beta1.Coin[];
        set supply(value: dependency_4.cosmos.base.v1beta1.Coin[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            supply?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryTotalSupplyResponse;
        toObject(): {
            supply?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTotalSupplyResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTotalSupplyResponse;
    }
    class QuerySupplyOfRequest extends pb_1.Message {
        constructor(data?: any[] | {
            denom?: string;
        });
        get denom(): string;
        set denom(value: string);
        static fromObject(data: {
            denom?: string;
        }): QuerySupplyOfRequest;
        toObject(): {
            denom?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QuerySupplyOfRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QuerySupplyOfRequest;
    }
    class QuerySupplyOfResponse extends pb_1.Message {
        constructor(data?: any[] | {
            amount?: dependency_4.cosmos.base.v1beta1.Coin;
        });
        get amount(): dependency_4.cosmos.base.v1beta1.Coin;
        set amount(value: dependency_4.cosmos.base.v1beta1.Coin);
        static fromObject(data: {
            amount?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>;
        }): QuerySupplyOfResponse;
        toObject(): {
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QuerySupplyOfResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QuerySupplyOfResponse;
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
            params?: dependency_5.cosmos.bank.v1beta1.Params;
        });
        get params(): dependency_5.cosmos.bank.v1beta1.Params;
        set params(value: dependency_5.cosmos.bank.v1beta1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_5.cosmos.bank.v1beta1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                send_enabled?: {
                    denom?: string | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
                default_send_enabled?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QueryDenomsMetadataRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryDenomsMetadataRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomsMetadataRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomsMetadataRequest;
    }
    class QueryDenomsMetadataResponse extends pb_1.Message {
        constructor(data?: any[] | {
            metadatas?: dependency_5.cosmos.bank.v1beta1.Metadata[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get metadatas(): dependency_5.cosmos.bank.v1beta1.Metadata[];
        set metadatas(value: dependency_5.cosmos.bank.v1beta1.Metadata[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            metadatas?: ReturnType<typeof dependency_5.cosmos.bank.v1beta1.Metadata.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryDenomsMetadataResponse;
        toObject(): {
            metadatas?: {
                description?: string | undefined;
                denom_units?: {
                    denom?: string | undefined;
                    exponent?: number | undefined;
                    aliases?: string[] | undefined;
                }[] | undefined;
                base?: string | undefined;
                display?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomsMetadataResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomsMetadataResponse;
    }
    class QueryDenomMetadataRequest extends pb_1.Message {
        constructor(data?: any[] | {
            denom?: string;
        });
        get denom(): string;
        set denom(value: string);
        static fromObject(data: {
            denom?: string;
        }): QueryDenomMetadataRequest;
        toObject(): {
            denom?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomMetadataRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomMetadataRequest;
    }
    class QueryDenomMetadataResponse extends pb_1.Message {
        constructor(data?: any[] | {
            metadata?: dependency_5.cosmos.bank.v1beta1.Metadata;
        });
        get metadata(): dependency_5.cosmos.bank.v1beta1.Metadata;
        set metadata(value: dependency_5.cosmos.bank.v1beta1.Metadata);
        static fromObject(data: {
            metadata?: ReturnType<typeof dependency_5.cosmos.bank.v1beta1.Metadata.prototype.toObject>;
        }): QueryDenomMetadataResponse;
        toObject(): {
            metadata?: {
                description?: string | undefined;
                denom_units?: {
                    denom?: string | undefined;
                    exponent?: number | undefined;
                    aliases?: string[] | undefined;
                }[] | undefined;
                base?: string | undefined;
                display?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDenomMetadataResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDenomMetadataResponse;
    }
}
//# sourceMappingURL=query.d.ts.map