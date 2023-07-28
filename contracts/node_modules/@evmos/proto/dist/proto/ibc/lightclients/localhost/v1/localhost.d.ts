import * as dependency_2 from "./../../../core/client/v1/client";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.lightclients.localhost.v1 {
    class ClientState extends pb_1.Message {
        constructor(data?: any[] | {
            chain_id?: string;
            height?: dependency_2.ibc.core.client.v1.Height;
        });
        get chain_id(): string;
        set chain_id(value: string);
        get height(): dependency_2.ibc.core.client.v1.Height;
        set height(value: dependency_2.ibc.core.client.v1.Height);
        static fromObject(data: {
            chain_id?: string;
            height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
        }): ClientState;
        toObject(): {
            chain_id?: string | undefined;
            height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ClientState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ClientState;
    }
}
//# sourceMappingURL=localhost.d.ts.map