import * as dependency_3 from "./../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_4 from "./genesis";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.epochs.v1 {
    class QueryEpochsInfoRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_3.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_3.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_3.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_3.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryEpochsInfoRequest;
        toObject(): {
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryEpochsInfoRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryEpochsInfoRequest;
    }
    class QueryEpochsInfoResponse extends pb_1.Message {
        constructor(data?: any[] | {
            epochs?: dependency_4.evmos.epochs.v1.EpochInfo[];
            pagination?: dependency_3.cosmos.base.query.v1beta1.PageResponse;
        });
        get epochs(): dependency_4.evmos.epochs.v1.EpochInfo[];
        set epochs(value: dependency_4.evmos.epochs.v1.EpochInfo[]);
        get pagination(): dependency_3.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_3.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            epochs?: ReturnType<typeof dependency_4.evmos.epochs.v1.EpochInfo.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_3.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryEpochsInfoResponse;
        toObject(): {
            epochs?: {
                identifier?: string | undefined;
                start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                duration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                current_epoch?: number | undefined;
                current_epoch_start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                epoch_counting_started?: boolean | undefined;
                current_epoch_start_height?: number | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryEpochsInfoResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryEpochsInfoResponse;
    }
    class QueryCurrentEpochRequest extends pb_1.Message {
        constructor(data?: any[] | {
            identifier?: string;
        });
        get identifier(): string;
        set identifier(value: string);
        static fromObject(data: {
            identifier?: string;
        }): QueryCurrentEpochRequest;
        toObject(): {
            identifier?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryCurrentEpochRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryCurrentEpochRequest;
    }
    class QueryCurrentEpochResponse extends pb_1.Message {
        constructor(data?: any[] | {
            current_epoch?: number;
        });
        get current_epoch(): number;
        set current_epoch(value: number);
        static fromObject(data: {
            current_epoch?: number;
        }): QueryCurrentEpochResponse;
        toObject(): {
            current_epoch?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryCurrentEpochResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryCurrentEpochResponse;
    }
}
//# sourceMappingURL=query.d.ts.map