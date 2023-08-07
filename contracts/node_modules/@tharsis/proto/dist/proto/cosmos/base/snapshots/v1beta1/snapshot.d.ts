import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.snapshots.v1beta1 {
    class Snapshot extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: Metadata;
        });
        get height(): number;
        set height(value: number);
        get format(): number;
        set format(value: number);
        get chunks(): number;
        set chunks(value: number);
        get hash(): Uint8Array;
        set hash(value: Uint8Array);
        get metadata(): Metadata;
        set metadata(value: Metadata);
        static fromObject(data: {
            height?: number;
            format?: number;
            chunks?: number;
            hash?: Uint8Array;
            metadata?: ReturnType<typeof Metadata.prototype.toObject>;
        }): Snapshot;
        toObject(): {
            height?: number | undefined;
            format?: number | undefined;
            chunks?: number | undefined;
            hash?: Uint8Array | undefined;
            metadata?: {
                chunk_hashes?: Uint8Array[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Snapshot;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Snapshot;
    }
    class Metadata extends pb_1.Message {
        constructor(data?: any[] | {
            chunk_hashes?: Uint8Array[];
        });
        get chunk_hashes(): Uint8Array[];
        set chunk_hashes(value: Uint8Array[]);
        static fromObject(data: {
            chunk_hashes?: Uint8Array[];
        }): Metadata;
        toObject(): {
            chunk_hashes?: Uint8Array[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Metadata;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Metadata;
    }
    class SnapshotItem extends pb_1.Message {
        constructor(data?: any[] | ({} & (({
            store?: SnapshotStoreItem;
            iavl?: never;
            extension?: never;
            extension_payload?: never;
        } | {
            store?: never;
            iavl?: SnapshotIAVLItem;
            extension?: never;
            extension_payload?: never;
        } | {
            store?: never;
            iavl?: never;
            extension?: SnapshotExtensionMeta;
            extension_payload?: never;
        } | {
            store?: never;
            iavl?: never;
            extension?: never;
            extension_payload?: SnapshotExtensionPayload;
        }))));
        get store(): SnapshotStoreItem;
        set store(value: SnapshotStoreItem);
        get iavl(): SnapshotIAVLItem;
        set iavl(value: SnapshotIAVLItem);
        get extension(): SnapshotExtensionMeta;
        set extension(value: SnapshotExtensionMeta);
        get extension_payload(): SnapshotExtensionPayload;
        set extension_payload(value: SnapshotExtensionPayload);
        get item(): "none" | "store" | "iavl" | "extension" | "extension_payload";
        static fromObject(data: {
            store?: ReturnType<typeof SnapshotStoreItem.prototype.toObject>;
            iavl?: ReturnType<typeof SnapshotIAVLItem.prototype.toObject>;
            extension?: ReturnType<typeof SnapshotExtensionMeta.prototype.toObject>;
            extension_payload?: ReturnType<typeof SnapshotExtensionPayload.prototype.toObject>;
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
            extension?: {
                name?: string | undefined;
                format?: number | undefined;
            } | undefined;
            extension_payload?: {
                payload?: Uint8Array | undefined;
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
    class SnapshotExtensionMeta extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
            format?: number;
        });
        get name(): string;
        set name(value: string);
        get format(): number;
        set format(value: number);
        static fromObject(data: {
            name?: string;
            format?: number;
        }): SnapshotExtensionMeta;
        toObject(): {
            name?: string | undefined;
            format?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SnapshotExtensionMeta;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SnapshotExtensionMeta;
    }
    class SnapshotExtensionPayload extends pb_1.Message {
        constructor(data?: any[] | {
            payload?: Uint8Array;
        });
        get payload(): Uint8Array;
        set payload(value: Uint8Array);
        static fromObject(data: {
            payload?: Uint8Array;
        }): SnapshotExtensionPayload;
        toObject(): {
            payload?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SnapshotExtensionPayload;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SnapshotExtensionPayload;
    }
}
//# sourceMappingURL=snapshot.d.ts.map