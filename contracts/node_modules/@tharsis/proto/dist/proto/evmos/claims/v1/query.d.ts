import * as dependency_3 from "./../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_4 from "./../../../cosmos/base/v1beta1/coin";
import * as dependency_5 from "./claims";
import * as dependency_6 from "./genesis";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.claims.v1 {
    class QueryTotalUnclaimedRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryTotalUnclaimedRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTotalUnclaimedRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTotalUnclaimedRequest;
    }
    class QueryTotalUnclaimedResponse extends pb_1.Message {
        constructor(data?: any[] | {
            coins?: dependency_4.cosmos.base.v1beta1.Coin[];
        });
        get coins(): dependency_4.cosmos.base.v1beta1.Coin[];
        set coins(value: dependency_4.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            coins?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): QueryTotalUnclaimedResponse;
        toObject(): {
            coins?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTotalUnclaimedResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTotalUnclaimedResponse;
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
            params?: dependency_6.evmos.claims.v1.Params;
        });
        get params(): dependency_6.evmos.claims.v1.Params;
        set params(value: dependency_6.evmos.claims.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_6.evmos.claims.v1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                enable_claims?: boolean | undefined;
                airdrop_start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                duration_until_decay?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                duration_of_decay?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                claims_denom?: string | undefined;
                authorized_channels?: string[] | undefined;
                evm_channels?: string[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QueryClaimsRecordsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_3.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_3.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_3.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_3.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryClaimsRecordsRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClaimsRecordsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClaimsRecordsRequest;
    }
    class QueryClaimsRecordsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            claims?: dependency_5.evmos.claims.v1.ClaimsRecordAddress[];
            pagination?: dependency_3.cosmos.base.query.v1beta1.PageResponse;
        });
        get claims(): dependency_5.evmos.claims.v1.ClaimsRecordAddress[];
        set claims(value: dependency_5.evmos.claims.v1.ClaimsRecordAddress[]);
        get pagination(): dependency_3.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_3.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            claims?: ReturnType<typeof dependency_5.evmos.claims.v1.ClaimsRecordAddress.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_3.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryClaimsRecordsResponse;
        toObject(): {
            claims?: {
                address?: string | undefined;
                initial_claimable_amount?: string | undefined;
                actions_completed?: boolean[] | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClaimsRecordsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClaimsRecordsResponse;
    }
    class QueryClaimsRecordRequest extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
        });
        get address(): string;
        set address(value: string);
        static fromObject(data: {
            address?: string;
        }): QueryClaimsRecordRequest;
        toObject(): {
            address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClaimsRecordRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClaimsRecordRequest;
    }
    class QueryClaimsRecordResponse extends pb_1.Message {
        constructor(data?: any[] | {
            initial_claimable_amount?: string;
            claims?: dependency_5.evmos.claims.v1.Claim[];
        });
        get initial_claimable_amount(): string;
        set initial_claimable_amount(value: string);
        get claims(): dependency_5.evmos.claims.v1.Claim[];
        set claims(value: dependency_5.evmos.claims.v1.Claim[]);
        static fromObject(data: {
            initial_claimable_amount?: string;
            claims?: ReturnType<typeof dependency_5.evmos.claims.v1.Claim.prototype.toObject>[];
        }): QueryClaimsRecordResponse;
        toObject(): {
            initial_claimable_amount?: string | undefined;
            claims?: {
                action?: dependency_5.evmos.claims.v1.Action | undefined;
                completed?: boolean | undefined;
                claimable_amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClaimsRecordResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClaimsRecordResponse;
    }
}
//# sourceMappingURL=query.d.ts.map