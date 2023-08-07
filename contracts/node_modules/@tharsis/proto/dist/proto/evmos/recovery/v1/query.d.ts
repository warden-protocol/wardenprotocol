import * as dependency_3 from "./genesis";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.recovery.v1 {
    class QueryParamsRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryParamsRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsRequest;
    }
    class QueryParamsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_3.evmos.recovery.v1.Params;
        });
        get params(): dependency_3.evmos.recovery.v1.Params;
        set params(value: dependency_3.evmos.recovery.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_3.evmos.recovery.v1.Params.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            params?: {
                enable_recovery?: boolean | undefined;
                packet_timeout_duration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
}
//# sourceMappingURL=query.d.ts.map