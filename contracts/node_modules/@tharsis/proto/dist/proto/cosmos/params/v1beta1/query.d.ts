import * as dependency_3 from "./params";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.params.v1beta1 {
    class QueryParamsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            subspace?: string;
            key?: string;
        });
        get subspace(): string;
        set subspace(value: string);
        get key(): string;
        set key(value: string);
        static fromObject(data: {
            subspace?: string;
            key?: string;
        }): QueryParamsRequest;
        toObject(): {
            subspace?: string | undefined;
            key?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsRequest;
    }
    class QueryParamsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            param?: dependency_3.cosmos.params.v1beta1.ParamChange;
        });
        get param(): dependency_3.cosmos.params.v1beta1.ParamChange;
        set param(value: dependency_3.cosmos.params.v1beta1.ParamChange);
        static fromObject(data: {
            param?: ReturnType<typeof dependency_3.cosmos.params.v1beta1.ParamChange.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            param?: {
                subspace?: string | undefined;
                key?: string | undefined;
                value?: string | undefined;
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