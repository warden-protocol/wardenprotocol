import * as dependency_1 from "./../../base/query/v1beta1/pagination";
import * as dependency_3 from "./../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.evidence.v1beta1 {
    class QueryEvidenceRequest extends pb_1.Message {
        constructor(data?: any[] | {
            evidence_hash?: Uint8Array;
        });
        get evidence_hash(): Uint8Array;
        set evidence_hash(value: Uint8Array);
        static fromObject(data: {
            evidence_hash?: Uint8Array;
        }): QueryEvidenceRequest;
        toObject(): {
            evidence_hash?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryEvidenceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryEvidenceRequest;
    }
    class QueryEvidenceResponse extends pb_1.Message {
        constructor(data?: any[] | {
            evidence?: dependency_3.google.protobuf.Any;
        });
        get evidence(): dependency_3.google.protobuf.Any;
        set evidence(value: dependency_3.google.protobuf.Any);
        static fromObject(data: {
            evidence?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
        }): QueryEvidenceResponse;
        toObject(): {
            evidence?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryEvidenceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryEvidenceResponse;
    }
    class QueryAllEvidenceRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryAllEvidenceRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllEvidenceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllEvidenceRequest;
    }
    class QueryAllEvidenceResponse extends pb_1.Message {
        constructor(data?: any[] | {
            evidence?: dependency_3.google.protobuf.Any[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get evidence(): dependency_3.google.protobuf.Any[];
        set evidence(value: dependency_3.google.protobuf.Any[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            evidence?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryAllEvidenceResponse;
        toObject(): {
            evidence?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAllEvidenceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAllEvidenceResponse;
    }
}
//# sourceMappingURL=query.d.ts.map