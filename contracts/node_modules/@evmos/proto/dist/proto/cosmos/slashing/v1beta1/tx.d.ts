import * as pb_1 from "google-protobuf";
export declare namespace cosmos.slashing.v1beta1 {
    class MsgUnjail extends pb_1.Message {
        constructor(data?: any[] | {
            validator_addr?: string;
        });
        get validator_addr(): string;
        set validator_addr(value: string);
        static fromObject(data: {
            validator_addr?: string;
        }): MsgUnjail;
        toObject(): {
            validator_addr?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUnjail;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUnjail;
    }
    class MsgUnjailResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgUnjailResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUnjailResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUnjailResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map