import * as dependency_2 from "./../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.evidence.v1beta1 {
    class MsgSubmitEvidence extends pb_1.Message {
        constructor(data?: any[] | {
            submitter?: string;
            evidence?: dependency_2.google.protobuf.Any;
        });
        get submitter(): string;
        set submitter(value: string);
        get evidence(): dependency_2.google.protobuf.Any;
        set evidence(value: dependency_2.google.protobuf.Any);
        static fromObject(data: {
            submitter?: string;
            evidence?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
        }): MsgSubmitEvidence;
        toObject(): {
            submitter?: string | undefined;
            evidence?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgSubmitEvidence;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgSubmitEvidence;
    }
    class MsgSubmitEvidenceResponse extends pb_1.Message {
        constructor(data?: any[] | {
            hash?: Uint8Array;
        });
        get hash(): Uint8Array;
        set hash(value: Uint8Array);
        static fromObject(data: {
            hash?: Uint8Array;
        }): MsgSubmitEvidenceResponse;
        toObject(): {
            hash?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgSubmitEvidenceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgSubmitEvidenceResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map