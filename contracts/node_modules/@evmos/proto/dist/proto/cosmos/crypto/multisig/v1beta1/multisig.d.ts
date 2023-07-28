import * as pb_1 from "google-protobuf";
export declare namespace cosmos.crypto.multisig.v1beta1 {
    class MultiSignature extends pb_1.Message {
        constructor(data?: any[] | {
            signatures?: Uint8Array[];
        });
        get signatures(): Uint8Array[];
        set signatures(value: Uint8Array[]);
        static fromObject(data: {
            signatures?: Uint8Array[];
        }): MultiSignature;
        toObject(): {
            signatures?: Uint8Array[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MultiSignature;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MultiSignature;
    }
    class CompactBitArray extends pb_1.Message {
        constructor(data?: any[] | {
            extra_bits_stored?: number;
            elems?: Uint8Array;
        });
        get extra_bits_stored(): number;
        set extra_bits_stored(value: number);
        get elems(): Uint8Array;
        set elems(value: Uint8Array);
        static fromObject(data: {
            extra_bits_stored?: number;
            elems?: Uint8Array;
        }): CompactBitArray;
        toObject(): {
            extra_bits_stored?: number | undefined;
            elems?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CompactBitArray;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CompactBitArray;
    }
}
//# sourceMappingURL=multisig.d.ts.map