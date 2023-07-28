import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.interchain_accounts.host.v1 {
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            host_enabled?: boolean;
            allow_messages?: string[];
        });
        get host_enabled(): boolean;
        set host_enabled(value: boolean);
        get allow_messages(): string[];
        set allow_messages(value: string[]);
        static fromObject(data: {
            host_enabled?: boolean;
            allow_messages?: string[];
        }): Params;
        toObject(): {
            host_enabled?: boolean | undefined;
            allow_messages?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=host.d.ts.map