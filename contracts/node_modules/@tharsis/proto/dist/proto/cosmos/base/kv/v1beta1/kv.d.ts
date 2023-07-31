import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.kv.v1beta1 {
    class Pairs extends pb_1.Message {
        constructor(data?: any[] | {
            pairs?: Pair[];
        });
        get pairs(): Pair[];
        set pairs(value: Pair[]);
        static fromObject(data: {
            pairs?: ReturnType<typeof Pair.prototype.toObject>[];
        }): Pairs;
        toObject(): {
            pairs?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Pairs;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Pairs;
    }
    class Pair extends pb_1.Message {
        constructor(data?: any[] | {
            key?: Uint8Array;
            value?: Uint8Array;
        });
        get key(): Uint8Array;
        set key(value: Uint8Array);
        get value(): Uint8Array;
        set value(value: Uint8Array);
        static fromObject(data: {
            key?: Uint8Array;
            value?: Uint8Array;
        }): Pair;
        toObject(): {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Pair;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Pair;
    }
}
//# sourceMappingURL=kv.d.ts.map