import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.transfer.v1 {
    class DenomTrace extends pb_1.Message {
        constructor(data?: any[] | {
            path?: string;
            base_denom?: string;
        });
        get path(): string;
        set path(value: string);
        get base_denom(): string;
        set base_denom(value: string);
        static fromObject(data: {
            path?: string;
            base_denom?: string;
        }): DenomTrace;
        toObject(): {
            path?: string | undefined;
            base_denom?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DenomTrace;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DenomTrace;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            send_enabled?: boolean;
            receive_enabled?: boolean;
        });
        get send_enabled(): boolean;
        set send_enabled(value: boolean);
        get receive_enabled(): boolean;
        set receive_enabled(value: boolean);
        static fromObject(data: {
            send_enabled?: boolean;
            receive_enabled?: boolean;
        }): Params;
        toObject(): {
            send_enabled?: boolean | undefined;
            receive_enabled?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=transfer.d.ts.map