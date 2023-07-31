import * as pb_1 from "google-protobuf";
export declare namespace google.protobuf {
    class Timestamp extends pb_1.Message {
        constructor(data?: any[] | {
            seconds?: number;
            nanos?: number;
        });
        get seconds(): number;
        set seconds(value: number);
        get nanos(): number;
        set nanos(value: number);
        static fromObject(data: {
            seconds?: number;
            nanos?: number;
        }): Timestamp;
        toObject(): {
            seconds?: number | undefined;
            nanos?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Timestamp;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Timestamp;
    }
}
//# sourceMappingURL=timestamp.d.ts.map