import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.store.v1beta1 {
    class CommitInfo extends pb_1.Message {
        constructor(data?: any[] | {
            version?: number;
            store_infos?: StoreInfo[];
        });
        get version(): number;
        set version(value: number);
        get store_infos(): StoreInfo[];
        set store_infos(value: StoreInfo[]);
        static fromObject(data: {
            version?: number;
            store_infos?: ReturnType<typeof StoreInfo.prototype.toObject>[];
        }): CommitInfo;
        toObject(): {
            version?: number | undefined;
            store_infos?: {
                name?: string | undefined;
                commit_id?: {
                    version?: number | undefined;
                    hash?: Uint8Array | undefined;
                } | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CommitInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CommitInfo;
    }
    class StoreInfo extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
            commit_id?: CommitID;
        });
        get name(): string;
        set name(value: string);
        get commit_id(): CommitID;
        set commit_id(value: CommitID);
        static fromObject(data: {
            name?: string;
            commit_id?: ReturnType<typeof CommitID.prototype.toObject>;
        }): StoreInfo;
        toObject(): {
            name?: string | undefined;
            commit_id?: {
                version?: number | undefined;
                hash?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StoreInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): StoreInfo;
    }
    class CommitID extends pb_1.Message {
        constructor(data?: any[] | {
            version?: number;
            hash?: Uint8Array;
        });
        get version(): number;
        set version(value: number);
        get hash(): Uint8Array;
        set hash(value: Uint8Array);
        static fromObject(data: {
            version?: number;
            hash?: Uint8Array;
        }): CommitID;
        toObject(): {
            version?: number | undefined;
            hash?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CommitID;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CommitID;
    }
}
//# sourceMappingURL=commit_info.d.ts.map