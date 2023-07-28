import * as dependency_1 from "./../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_2 from "./../../../cosmos/base/v1beta1/coin";
import * as dependency_3 from "./genesis";
import * as dependency_4 from "./incentives";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.incentives.v1 {
    class QueryIncentivesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryIncentivesRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryIncentivesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryIncentivesRequest;
    }
    class QueryIncentivesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            incentives?: dependency_4.evmos.incentives.v1.Incentive[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get incentives(): dependency_4.evmos.incentives.v1.Incentive[];
        set incentives(value: dependency_4.evmos.incentives.v1.Incentive[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            incentives?: ReturnType<typeof dependency_4.evmos.incentives.v1.Incentive.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryIncentivesResponse;
        toObject(): {
            incentives?: {
                contract?: string | undefined;
                allocations?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                epochs?: number | undefined;
                start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                total_gas?: number | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryIncentivesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryIncentivesResponse;
    }
    class QueryIncentiveRequest extends pb_1.Message {
        constructor(data?: any[] | {
            contract?: string;
        });
        get contract(): string;
        set contract(value: string);
        static fromObject(data: {
            contract?: string;
        }): QueryIncentiveRequest;
        toObject(): {
            contract?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryIncentiveRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryIncentiveRequest;
    }
    class QueryIncentiveResponse extends pb_1.Message {
        constructor(data?: any[] | {
            incentive?: dependency_4.evmos.incentives.v1.Incentive;
        });
        get incentive(): dependency_4.evmos.incentives.v1.Incentive;
        set incentive(value: dependency_4.evmos.incentives.v1.Incentive);
        static fromObject(data: {
            incentive?: ReturnType<typeof dependency_4.evmos.incentives.v1.Incentive.prototype.toObject>;
        }): QueryIncentiveResponse;
        toObject(): {
            incentive?: {
                contract?: string | undefined;
                allocations?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                epochs?: number | undefined;
                start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                total_gas?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryIncentiveResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryIncentiveResponse;
    }
    class QueryGasMetersRequest extends pb_1.Message {
        constructor(data?: any[] | {
            contract?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get contract(): string;
        set contract(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            contract?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryGasMetersRequest;
        toObject(): {
            contract?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGasMetersRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGasMetersRequest;
    }
    class QueryGasMetersResponse extends pb_1.Message {
        constructor(data?: any[] | {
            gas_meters?: dependency_4.evmos.incentives.v1.GasMeter[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get gas_meters(): dependency_4.evmos.incentives.v1.GasMeter[];
        set gas_meters(value: dependency_4.evmos.incentives.v1.GasMeter[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            gas_meters?: ReturnType<typeof dependency_4.evmos.incentives.v1.GasMeter.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryGasMetersResponse;
        toObject(): {
            gas_meters?: {
                contract?: string | undefined;
                participant?: string | undefined;
                cumulative_gas?: number | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGasMetersResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGasMetersResponse;
    }
    class QueryGasMeterRequest extends pb_1.Message {
        constructor(data?: any[] | {
            contract?: string;
            participant?: string;
        });
        get contract(): string;
        set contract(value: string);
        get participant(): string;
        set participant(value: string);
        static fromObject(data: {
            contract?: string;
            participant?: string;
        }): QueryGasMeterRequest;
        toObject(): {
            contract?: string | undefined;
            participant?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGasMeterRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGasMeterRequest;
    }
    class QueryGasMeterResponse extends pb_1.Message {
        constructor(data?: any[] | {
            gas_meter?: number;
        });
        get gas_meter(): number;
        set gas_meter(value: number);
        static fromObject(data: {
            gas_meter?: number;
        }): QueryGasMeterResponse;
        toObject(): {
            gas_meter?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryGasMeterResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryGasMeterResponse;
    }
    class QueryAllocationMetersRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryAllocationMetersRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllocationMetersRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllocationMetersRequest;
    }
    class QueryAllocationMetersResponse extends pb_1.Message {
        constructor(data?: any[] | {
            allocation_meters?: dependency_2.cosmos.base.v1beta1.DecCoin[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get allocation_meters(): dependency_2.cosmos.base.v1beta1.DecCoin[];
        set allocation_meters(value: dependency_2.cosmos.base.v1beta1.DecCoin[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            allocation_meters?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryAllocationMetersResponse;
        toObject(): {
            allocation_meters?: {
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllocationMetersResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllocationMetersResponse;
    }
    class QueryAllocationMeterRequest extends pb_1.Message {
        constructor(data?: any[] | {
            denom?: string;
        });
        get denom(): string;
        set denom(value: string);
        static fromObject(data: {
            denom?: string;
        }): QueryAllocationMeterRequest;
        toObject(): {
            denom?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllocationMeterRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllocationMeterRequest;
    }
    class QueryAllocationMeterResponse extends pb_1.Message {
        constructor(data?: any[] | {
            allocation_meter?: dependency_2.cosmos.base.v1beta1.DecCoin;
        });
        get allocation_meter(): dependency_2.cosmos.base.v1beta1.DecCoin;
        set allocation_meter(value: dependency_2.cosmos.base.v1beta1.DecCoin);
        static fromObject(data: {
            allocation_meter?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>;
        }): QueryAllocationMeterResponse;
        toObject(): {
            allocation_meter?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllocationMeterResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllocationMeterResponse;
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
            params?: dependency_3.evmos.incentives.v1.Params;
        });
        get params(): dependency_3.evmos.incentives.v1.Params;
        set params(value: dependency_3.evmos.incentives.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_3.evmos.incentives.v1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                enable_incentives?: boolean | undefined;
                allocation_limit?: string | undefined;
                incentives_epoch_identifier?: string | undefined;
                reward_scaler?: string | undefined;
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