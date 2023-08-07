import * as pb_1 from "google-protobuf";
export declare namespace google.protobuf {
    class Any extends pb_1.Message {
        constructor(data?: any[] | {
            type_url?: string;
            value?: Uint8Array;
        });
        get type_url(): string;
        set type_url(value: string);
        get value(): Uint8Array;
        set value(value: Uint8Array);
        static fromObject(data: {
            type_url?: string;
            value?: Uint8Array;
        }): Any;
        toObject(): {
            type_url?: string | undefined;
            value?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Any;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Any;
    }
}
//# sourceMappingURL=any.d.ts.map