import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.store.v1beta1 {
    class StoreKVPair extends pb_1.Message {
        constructor(data?: any[] | {
            store_key?: string;
            delete?: boolean;
            key?: Uint8Array;
            value?: Uint8Array;
        });
        get store_key(): string;
        set store_key(value: string);
        get delete(): boolean;
        set delete(value: boolean);
        get key(): Uint8Array;
        set key(value: Uint8Array);
        get value(): Uint8Array;
        set value(value: Uint8Array);
        static fromObject(data: {
            store_key?: string;
            delete?: boolean;
            key?: Uint8Array;
            value?: Uint8Array;
        }): StoreKVPair;
        toObject(): {
            store_key?: string | undefined;
            delete?: boolean | undefined;
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StoreKVPair;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): StoreKVPair;
    }
}
//# sourceMappingURL=listening.d.ts.map