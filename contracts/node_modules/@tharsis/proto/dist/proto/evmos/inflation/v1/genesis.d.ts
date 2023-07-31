import * as dependency_2 from "./inflation";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.inflation.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: Params;
            period?: number;
            epoch_identifier?: string;
            epochs_per_period?: number;
            skipped_epochs?: number;
        });
        get params(): Params;
        set params(value: Params);
        get period(): number;
        set period(value: number);
        get epoch_identifier(): string;
        set epoch_identifier(value: string);
        get epochs_per_period(): number;
        set epochs_per_period(value: number);
        get skipped_epochs(): number;
        set skipped_epochs(value: number);
        static fromObject(data: {
            params?: ReturnType<typeof Params.prototype.toObject>;
            period?: number;
            epoch_identifier?: string;
            epochs_per_period?: number;
            skipped_epochs?: number;
        }): GenesisState;
        toObject(): {
            params?: {
                mint_denom?: string | undefined;
                exponential_calculation?: {
                    a?: string | undefined;
                    r?: string | undefined;
                    c?: string | undefined;
                    bonding_target?: string | undefined;
                    max_variance?: string | undefined;
                } | undefined;
                inflation_distribution?: {
                    staking_rewards?: string | undefined;
                    usage_incentives?: string | undefined;
                    community_pool?: string | undefined;
                } | undefined;
                enable_inflation?: boolean | undefined;
            } | undefined;
            period?: number | undefined;
            epoch_identifier?: string | undefined;
            epochs_per_period?: number | undefined;
            skipped_epochs?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            mint_denom?: string;
            exponential_calculation?: dependency_2.evmos.inflation.v1.ExponentialCalculation;
            inflation_distribution?: dependency_2.evmos.inflation.v1.InflationDistribution;
            enable_inflation?: boolean;
        });
        get mint_denom(): string;
        set mint_denom(value: string);
        get exponential_calculation(): dependency_2.evmos.inflation.v1.ExponentialCalculation;
        set exponential_calculation(value: dependency_2.evmos.inflation.v1.ExponentialCalculation);
        get inflation_distribution(): dependency_2.evmos.inflation.v1.InflationDistribution;
        set inflation_distribution(value: dependency_2.evmos.inflation.v1.InflationDistribution);
        get enable_inflation(): boolean;
        set enable_inflation(value: boolean);
        static fromObject(data: {
            mint_denom?: string;
            exponential_calculation?: ReturnType<typeof dependency_2.evmos.inflation.v1.ExponentialCalculation.prototype.toObject>;
            inflation_distribution?: ReturnType<typeof dependency_2.evmos.inflation.v1.InflationDistribution.prototype.toObject>;
            enable_inflation?: boolean;
        }): Params;
        toObject(): {
            mint_denom?: string | undefined;
            exponential_calculation?: {
                a?: string | undefined;
                r?: string | undefined;
                c?: string | undefined;
                bonding_target?: string | undefined;
                max_variance?: string | undefined;
            } | undefined;
            inflation_distribution?: {
                staking_rewards?: string | undefined;
                usage_incentives?: string | undefined;
                community_pool?: string | undefined;
            } | undefined;
            enable_inflation?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=genesis.d.ts.map