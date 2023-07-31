import * as dependency_1 from "./../../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.interchain_accounts.v1 {
    enum Type {
        TYPE_UNSPECIFIED = 0,
        TYPE_EXECUTE_TX = 1
    }
    class InterchainAccountPacketData extends pb_1.Message {
        constructor(data?: any[] | {
            type?: Type;
            data?: Uint8Array;
            memo?: string;
        });
        get type(): Type;
        set type(value: Type);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get memo(): string;
        set memo(value: string);
        static fromObject(data: {
            type?: Type;
            data?: Uint8Array;
            memo?: string;
        }): InterchainAccountPacketData;
        toObject(): {
            type?: Type | undefined;
            data?: Uint8Array | undefined;
            memo?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): InterchainAccountPacketData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): InterchainAccountPacketData;
    }
    class CosmosTx extends pb_1.Message {
        constructor(data?: any[] | {
            messages?: dependency_1.google.protobuf.Any[];
        });
        get messages(): dependency_1.google.protobuf.Any[];
        set messages(value: dependency_1.google.protobuf.Any[]);
        static fromObject(data: {
            messages?: ReturnType<typeof dependency_1.google.protobuf.Any.prototype.toObject>[];
        }): CosmosTx;
        toObject(): {
            messages?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CosmosTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CosmosTx;
    }
}
//# sourceMappingURL=packet.d.ts.map