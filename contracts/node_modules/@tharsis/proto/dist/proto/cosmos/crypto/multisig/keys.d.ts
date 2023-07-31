import * as dependency_2 from "./../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.crypto.multisig {
    class LegacyAminoPubKey extends pb_1.Message {
        constructor(data?: any[] | {
            threshold?: number;
            public_keys?: dependency_2.google.protobuf.Any[];
        });
        get threshold(): number;
        set threshold(value: number);
        get public_keys(): dependency_2.google.protobuf.Any[];
        set public_keys(value: dependency_2.google.protobuf.Any[]);
        static fromObject(data: {
            threshold?: number;
            public_keys?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>[];
        }): LegacyAminoPubKey;
        toObject(): {
            threshold?: number | undefined;
            public_keys?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LegacyAminoPubKey;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): LegacyAminoPubKey;
    }
}
//# sourceMappingURL=keys.d.ts.map