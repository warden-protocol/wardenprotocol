import * as dependency_1 from "./../../../cosmos/base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.vesting.v1 {
    class QueryBalancesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
        });
        get address(): string;
        set address(value: string);
        static fromObject(data: {
            address?: string;
        }): QueryBalancesRequest;
        toObject(): {
            address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryBalancesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryBalancesRequest;
    }
    class QueryBalancesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            locked?: dependency_1.cosmos.base.v1beta1.Coin[];
            unvested?: dependency_1.cosmos.base.v1beta1.Coin[];
            vested?: dependency_1.cosmos.base.v1beta1.Coin[];
        });
        get locked(): dependency_1.cosmos.base.v1beta1.Coin[];
        set locked(value: dependency_1.cosmos.base.v1beta1.Coin[]);
        get unvested(): dependency_1.cosmos.base.v1beta1.Coin[];
        set unvested(value: dependency_1.cosmos.base.v1beta1.Coin[]);
        get vested(): dependency_1.cosmos.base.v1beta1.Coin[];
        set vested(value: dependency_1.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            locked?: ReturnType<typeof dependency_1.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            unvested?: ReturnType<typeof dependency_1.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            vested?: ReturnType<typeof dependency_1.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): QueryBalancesResponse;
        toObject(): {
            locked?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            unvested?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            vested?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryBalancesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryBalancesResponse;
    }
}
//# sourceMappingURL=query.d.ts.map