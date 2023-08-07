import * as pb_1 from "google-protobuf";
export declare namespace cosmos.mint.v1beta1 {
    class Minter extends pb_1.Message {
        constructor(data?: any[] | {
            inflation?: string;
            annual_provisions?: string;
        });
        get inflation(): string;
        set inflation(value: string);
        get annual_provisions(): string;
        set annual_provisions(value: string);
        static fromObject(data: {
            inflation?: string;
            annual_provisions?: string;
        }): Minter;
        toObject(): {
            inflation?: string | undefined;
            annual_provisions?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Minter;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Minter;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            mint_denom?: string;
            inflation_rate_change?: string;
            inflation_max?: string;
            inflation_min?: string;
            goal_bonded?: string;
            blocks_per_year?: number;
        });
        get mint_denom(): string;
        set mint_denom(value: string);
        get inflation_rate_change(): string;
        set inflation_rate_change(value: string);
        get inflation_max(): string;
        set inflation_max(value: string);
        get inflation_min(): string;
        set inflation_min(value: string);
        get goal_bonded(): string;
        set goal_bonded(value: string);
        get blocks_per_year(): number;
        set blocks_per_year(value: number);
        static fromObject(data: {
            mint_denom?: string;
            inflation_rate_change?: string;
            inflation_max?: string;
            inflation_min?: string;
            goal_bonded?: string;
            blocks_per_year?: number;
        }): Params;
        toObject(): {
            mint_denom?: string | undefined;
            inflation_rate_change?: string | undefined;
            inflation_max?: string | undefined;
            inflation_min?: string | undefined;
            goal_bonded?: string | undefined;
            blocks_per_year?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=mint.d.ts.map