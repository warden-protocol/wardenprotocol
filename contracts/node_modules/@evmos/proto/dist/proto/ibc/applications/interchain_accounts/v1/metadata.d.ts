import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.interchain_accounts.v1 {
    class Metadata extends pb_1.Message {
        constructor(data?: any[] | {
            version?: string;
            controller_connection_id?: string;
            host_connection_id?: string;
            address?: string;
            encoding?: string;
            tx_type?: string;
        });
        get version(): string;
        set version(value: string);
        get controller_connection_id(): string;
        set controller_connection_id(value: string);
        get host_connection_id(): string;
        set host_connection_id(value: string);
        get address(): string;
        set address(value: string);
        get encoding(): string;
        set encoding(value: string);
        get tx_type(): string;
        set tx_type(value: string);
        static fromObject(data: {
            version?: string;
            controller_connection_id?: string;
            host_connection_id?: string;
            address?: string;
            encoding?: string;
            tx_type?: string;
        }): Metadata;
        toObject(): {
            version?: string | undefined;
            controller_connection_id?: string | undefined;
            host_connection_id?: string | undefined;
            address?: string | undefined;
            encoding?: string | undefined;
            tx_type?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Metadata;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Metadata;
    }
}
//# sourceMappingURL=metadata.d.ts.map