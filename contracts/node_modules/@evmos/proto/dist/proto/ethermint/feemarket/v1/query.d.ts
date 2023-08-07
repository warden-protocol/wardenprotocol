import * as dependency_3 from "./feemarket";
import * as pb_1 from "google-protobuf";
export declare namespace ethermint.feemarket.v1 {
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
            params?: dependency_3.ethermint.feemarket.v1.Params;
        });
        get params(): dependency_3.ethermint.feemarket.v1.Params;
        set params(value: dependency_3.ethermint.feemarket.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_3.ethermint.feemarket.v1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                no_base_fee?: boolean | undefined;
                base_fee_change_denominator?: number | undefined;
                elasticity_multiplier?: number | undefined;
                enable_height?: number | undefined;
                base_fee?: string | undefined;
                min_gas_price?: string | undefined;
                min_gas_multiplier?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QueryBaseFeeRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryBaseFeeRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryBaseFeeRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryBaseFeeRequest;
    }
    class QueryBaseFeeResponse extends pb_1.Message {
        constructor(data?: any[] | {
            base_fee?: string;
        });
        get base_fee(): string;
        set base_fee(value: string);
        static fromObject(data: {
            base_fee?: string;
        }): QueryBaseFeeResponse;
        toObject(): {
            base_fee?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryBaseFeeResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryBaseFeeResponse;
    }
    class QueryBlockGasRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryBlockGasRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryBlockGasRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryBlockGasRequest;
    }
    class QueryBlockGasResponse extends pb_1.Message {
        constructor(data?: any[] | {
            gas?: number;
        });
        get gas(): number;
        set gas(value: number);
        static fromObject(data: {
            gas?: number;
        }): QueryBlockGasResponse;
        toObject(): {
            gas?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryBlockGasResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryBlockGasResponse;
    }
}
//# sourceMappingURL=query.d.ts.map