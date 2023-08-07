import * as dependency_2 from "./mint";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.mint.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            minter?: dependency_2.cosmos.mint.v1beta1.Minter;
            params?: dependency_2.cosmos.mint.v1beta1.Params;
        });
        get minter(): dependency_2.cosmos.mint.v1beta1.Minter;
        set minter(value: dependency_2.cosmos.mint.v1beta1.Minter);
        get params(): dependency_2.cosmos.mint.v1beta1.Params;
        set params(value: dependency_2.cosmos.mint.v1beta1.Params);
        static fromObject(data: {
            minter?: ReturnType<typeof dependency_2.cosmos.mint.v1beta1.Minter.prototype.toObject>;
            params?: ReturnType<typeof dependency_2.cosmos.mint.v1beta1.Params.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            minter?: {
                inflation?: string | undefined;
                annual_provisions?: string | undefined;
            } | undefined;
            params?: {
                mint_denom?: string | undefined;
                inflation_rate_change?: string | undefined;
                inflation_max?: string | undefined;
                inflation_min?: string | undefined;
                goal_bonded?: string | undefined;
                blocks_per_year?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map