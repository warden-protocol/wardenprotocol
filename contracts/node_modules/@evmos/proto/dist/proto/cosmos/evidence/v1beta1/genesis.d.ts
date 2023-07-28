import * as dependency_1 from "./../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.evidence.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            evidence?: dependency_1.google.protobuf.Any[];
        });
        get evidence(): dependency_1.google.protobuf.Any[];
        set evidence(value: dependency_1.google.protobuf.Any[]);
        static fromObject(data: {
            evidence?: ReturnType<typeof dependency_1.google.protobuf.Any.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            evidence?: {
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