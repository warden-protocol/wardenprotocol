import * as pb_1 from "google-protobuf";
export declare namespace cosmos.authz.v1beta1 {
    class EventGrant extends pb_1.Message {
        constructor(data?: any[] | {
            msg_type_url?: string;
            granter?: string;
            grantee?: string;
        });
        get msg_type_url(): string;
        set msg_type_url(value: string);
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        static fromObject(data: {
            msg_type_url?: string;
            granter?: string;
            grantee?: string;
        }): EventGrant;
        toObject(): {
            msg_type_url?: string | undefined;
            granter?: string | undefined;
            grantee?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventGrant;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EventGrant;
    }
    class EventRevoke extends pb_1.Message {
        constructor(data?: any[] | {
            msg_type_url?: string;
            granter?: string;
            grantee?: string;
        });
        get msg_type_url(): string;
        set msg_type_url(value: string);
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        static fromObject(data: {
            msg_type_url?: string;
            granter?: string;
            grantee?: string;
        }): EventRevoke;
        toObject(): {
            msg_type_url?: string | undefined;
            granter?: string | undefined;
            grantee?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventRevoke;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EventRevoke;
    }
}
//# sourceMappingURL=event.d.ts.map