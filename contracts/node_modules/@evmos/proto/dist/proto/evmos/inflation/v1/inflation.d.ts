import * as pb_1 from "google-protobuf";
export declare namespace evmos.inflation.v1 {
    class InflationDistribution extends pb_1.Message {
        constructor(data?: any[] | {
            staking_rewards?: string;
            usage_incentives?: string;
            community_pool?: string;
        });
        get staking_rewards(): string;
        set staking_rewards(value: string);
        get usage_incentives(): string;
        set usage_incentives(value: string);
        get community_pool(): string;
        set community_pool(value: string);
        static fromObject(data: {
            staking_rewards?: string;
            usage_incentives?: string;
            community_pool?: string;
        }): InflationDistribution;
        toObject(): {
            staking_rewards?: string | undefined;
            usage_incentives?: string | undefined;
            community_pool?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): InflationDistribution;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): InflationDistribution;
    }
    class ExponentialCalculation extends pb_1.Message {
        constructor(data?: any[] | {
            a?: string;
            r?: string;
            c?: string;
            bonding_target?: string;
            max_variance?: string;
        });
        get a(): string;
        set a(value: string);
        get r(): string;
        set r(value: string);
        get c(): string;
        set c(value: string);
        get bonding_target(): string;
        set bonding_target(value: string);
        get max_variance(): string;
        set max_variance(value: string);
        static fromObject(data: {
            a?: string;
            r?: string;
            c?: string;
            bonding_target?: string;
            max_variance?: string;
        }): ExponentialCalculation;
        toObject(): {
            a?: string | undefined;
            r?: string | undefined;
            c?: string | undefined;
            bonding_target?: string | undefined;
            max_variance?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExponentialCalculation;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExponentialCalculation;
    }
}
//# sourceMappingURL=inflation.d.ts.map