import * as pb_1 from "google-protobuf";
export declare namespace ethermint.feemarket.v1 {
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            no_base_fee?: boolean;
            base_fee_change_denominator?: number;
            elasticity_multiplier?: number;
            enable_height?: number;
            base_fee?: string;
            min_gas_price?: string;
            min_gas_multiplier?: string;
        });
        get no_base_fee(): boolean;
        set no_base_fee(value: boolean);
        get base_fee_change_denominator(): number;
        set base_fee_change_denominator(value: number);
        get elasticity_multiplier(): number;
        set elasticity_multiplier(value: number);
        get enable_height(): number;
        set enable_height(value: number);
        get base_fee(): string;
        set base_fee(value: string);
        get min_gas_price(): string;
        set min_gas_price(value: string);
        get min_gas_multiplier(): string;
        set min_gas_multiplier(value: string);
        static fromObject(data: {
            no_base_fee?: boolean;
            base_fee_change_denominator?: number;
            elasticity_multiplier?: number;
            enable_height?: number;
            base_fee?: string;
            min_gas_price?: string;
            min_gas_multiplier?: string;
        }): Params;
        toObject(): {
            no_base_fee?: boolean | undefined;
            base_fee_change_denominator?: number | undefined;
            elasticity_multiplier?: number | undefined;
            enable_height?: number | undefined;
            base_fee?: string | undefined;
            min_gas_price?: string | undefined;
            min_gas_multiplier?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=feemarket.d.ts.map