import * as dependency_2 from "./feemarket";
import * as pb_1 from "google-protobuf";
export declare namespace ethermint.feemarket.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_2.ethermint.feemarket.v1.Params;
            block_gas?: number;
        });
        get params(): dependency_2.ethermint.feemarket.v1.Params;
        set params(value: dependency_2.ethermint.feemarket.v1.Params);
        get block_gas(): number;
        set block_gas(value: number);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_2.ethermint.feemarket.v1.Params.prototype.toObject>;
            block_gas?: number;
        }): GenesisState;
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
            block_gas?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map