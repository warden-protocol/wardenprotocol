import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.store.v1beta1 {
    class SnapshotItem extends pb_1.Message {
        constructor(data?: any[] | ({} & (({
            store?: SnapshotStoreItem;
            iavl?: never;
        } | {
            store?: never;
            iavl?: SnapshotIAVLItem;
        }))));
        get store(): SnapshotStoreItem;
        set store(value: SnapshotStoreItem);
        get iavl(): SnapshotIAVLItem;
        set iavl(value: SnapshotIAVLItem);
        get item(): "none" | "store" | "iavl";
        static fromObject(data: {
            store?: ReturnType<typeof SnapshotStoreItem.prototype.toObject>;
            iavl?: ReturnType<typeof SnapshotIAVLItem.prototype.toObject>;
        }): SnapshotItem;
        toObject(): {
            store?: {
                name?: string | undefined;
            } | undefined;
            iavl?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                version?: number | undefined;
                height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SnapshotItem;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SnapshotItem;
    }
    class SnapshotStoreItem extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
        });
        get name(): string;
        set name(value: string);
        static fromObject(data: {
            name?: string;
        }): SnapshotStoreItem;
        toObject(): {
            name?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SnapshotStoreItem;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SnapshotStoreItem;
    }
    class SnapshotIAVLItem extends pb_1.Message {
        constructor(data?: any[] | {
            key?: Uint8Array;
            value?: Uint8Array;
            version?: number;
            height?: number;
        });
        get key(): Uint8Array;
        set key(value: Uint8Array);
        get value(): Uint8Array;
        set value(value: Uint8Array);
        get version(): number;
        set version(value: number);
        get height(): number;
        set height(value: number);
        static fromObject(data: {
            key?: Uint8Array;
            value?: Uint8Array;
            version?: number;
            height?: number;
        }): SnapshotIAVLItem;
        toObject(): {
            key?: Uint8Array | undefined;
            value?: Uint8Array | undefined;
            version?: number | undefined;
            height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SnapshotIAVLItem;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SnapshotIAVLItem;
    }
}
//# sourceMappingURL=snapshot.d.ts.map