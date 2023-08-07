import * as pb_1 from "google-protobuf";
export declare namespace tendermint.libs.bits {
    class BitArray extends pb_1.Message {
        constructor(data?: any[] | {
            bits?: number;
            elems?: number[];
        });
        get bits(): number;
        set bits(value: number);
        get elems(): number[];
        set elems(value: number[]);
        static fromObject(data: {
            bits?: number;
            elems?: number[];
        }): BitArray;
        toObject(): {
            bits?: number | undefined;
            elems?: number[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BitArray;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BitArray;
    }
}
//# sourceMappingURL=types.d.ts.map