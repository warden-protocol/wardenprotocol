import * as dependency_1 from "./../../../google/protobuf/any";
import * as dependency_3 from "./auth";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.auth.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_3.cosmos.auth.v1beta1.Params;
            accounts?: dependency_1.google.protobuf.Any[];
        });
        get params(): dependency_3.cosmos.auth.v1beta1.Params;
        set params(value: dependency_3.cosmos.auth.v1beta1.Params);
        get accounts(): dependency_1.google.protobuf.Any[];
        set accounts(value: dependency_1.google.protobuf.Any[]);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_3.cosmos.auth.v1beta1.Params.prototype.toObject>;
            accounts?: ReturnType<typeof dependency_1.google.protobuf.Any.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            params?: {
                max_memo_characters?: number | undefined;
                tx_sig_limit?: number | undefined;
                tx_size_cost_per_byte?: number | undefined;
                sig_verify_cost_ed25519?: number | undefined;
                sig_verify_cost_secp256k1?: number | undefined;
            } | undefined;
            accounts?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map