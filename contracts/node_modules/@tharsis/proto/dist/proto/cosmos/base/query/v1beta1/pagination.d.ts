import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.query.v1beta1 {
    class PageRequest extends pb_1.Message {
        constructor(data?: any[] | {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            count_total?: boolean;
            reverse?: boolean;
        });
        get key(): Uint8Array;
        set key(value: Uint8Array);
        get offset(): number;
        set offset(value: number);
        get limit(): number;
        set limit(value: number);
        get count_total(): boolean;
        set count_total(value: boolean);
        get reverse(): boolean;
        set reverse(value: boolean);
        static fromObject(data: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            count_total?: boolean;
            reverse?: boolean;
        }): PageRequest;
        toObject(): {
            key?: Uint8Array | undefined;
            offset?: number | undefined;
            limit?: number | undefined;
            count_total?: boolean | undefined;
            reverse?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PageRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PageRequest;
    }
    class PageResponse extends pb_1.Message {
        constructor(data?: any[] | {
            next_key?: Uint8Array;
            total?: number;
        });
        get next_key(): Uint8Array;
        set next_key(value: Uint8Array);
        get total(): number;
        set total(value: number);
        static fromObject(data: {
            next_key?: Uint8Array;
            total?: number;
        }): PageResponse;
        toObject(): {
            next_key?: Uint8Array | undefined;
            total?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PageResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PageResponse;
    }
}
//# sourceMappingURL=pagination.d.ts.map