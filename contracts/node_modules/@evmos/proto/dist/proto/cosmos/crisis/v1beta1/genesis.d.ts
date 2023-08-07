import * as dependency_2 from "./../../base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.crisis.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            constant_fee?: dependency_2.cosmos.base.v1beta1.Coin;
        });
        get constant_fee(): dependency_2.cosmos.base.v1beta1.Coin;
        set constant_fee(value: dependency_2.cosmos.base.v1beta1.Coin);
        static fromObject(data: {
            constant_fee?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.Coin.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            constant_fee?: {
                denom?: string | undefined;
                amount?: string | undefined;
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